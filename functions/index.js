const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const multer = require("multer");
const xlsx = require("xlsx");

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

// Create Express app
const app = express();

// Configure multer for file uploads with better error handling
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    fieldSize: 10 * 1024 * 1024,
    fields: 10,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    console.log('Multer fileFilter - File info:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      fieldname: file.fieldname
    });
    
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.mimetype === 'application/vnd.ms-excel' ||
        file.originalname.endsWith('.xlsx') ||
        file.originalname.endsWith('.xls')) {
      cb(null, true);
    } else {
      cb(new Error('Only Excel files (.xlsx, .xls) are allowed!'), false);
    }
  }
});

// Middleware
app.use(helmet());
app.use(cors({ 
  origin: [
    'https://trend4media.github.io',
    'https://trend4media-billing.web.app',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5000',
    'http://localhost:8000',
    'http://127.0.0.1:8000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    const origin = req.headers.origin;
    const allowedOrigins = [
      'https://trend4media.github.io',
      'https://trend4media-billing.web.app',
      'http://localhost:3000',
      'http://localhost:5000',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5000',
      'http://localhost:8000',
      'http://127.0.0.1:8000'
    ];
    
    if (allowedOrigins.includes(origin)) {
      res.set({
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400'
      });
    } else {
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400'
      });
    }
    res.status(200).end();
    return;
  }
  next();
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 't4m-billing-api',
    version: '2.0.0'
  });
});

// Authentication endpoints
app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Benutzername und Passwort sind erforderlich'
      });
    }

    // Demo users for testing
    const demoUsers = {
      'admin': {
        id: 'admin_001',
        name: 'System Administrator',
        email: 'admin@trend4media.com',
        role: 'admin',
        isActive: true
      },
      'live_manager_1': {
        id: 'manager_live_001',
        name: 'Live Manager 1',
        email: 'live1@trend4media.com',
        role: 'manager',
        managerType: 'live',
        isActive: true
      },
      'team_manager_1': {
        id: 'manager_team_001',
        name: 'Team Manager 1',
        email: 'team1@trend4media.com',
        role: 'manager',
        managerType: 'team',
        isActive: true
      }
    };

    const user = demoUsers[username];
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Benutzername nicht gefunden'
      });
    }

    // Check password (demo passwords)
    const validPasswords = {
      'admin': 'admin123',
      'live_manager_1': 'manager123',
      'team_manager_1': 'manager123'
    };

    if (validPasswords[username] !== password) {
      return res.status(401).json({
        success: false,
        message: 'Falsches Passwort'
      });
    }

    // Create JWT token
    const token = admin.auth().createCustomToken(user.id, {
      role: user.role,
      managerType: user.managerType || null
    });

    res.json({
      success: true,
      message: 'Anmeldung erfolgreich',
      token: token,
      user: user
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler bei der Anmeldung'
    });
  }
});

// Verify token endpoint
app.post('/auth/verify', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token ist erforderlich'
      });
    }

    // Verify token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    res.json({
      success: true,
      user: decodedToken
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Ungültiger Token'
    });
  }
});

// Get managers endpoint
app.get('/managers', async (req, res) => {
  try {
    const snapshot = await db.collection('managers').get();
    const managers = [];
    
    snapshot.forEach(doc => {
      managers.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      data: managers
    });

  } catch (error) {
    console.error('Get managers error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Laden der Manager'
    });
  }
});

// Get transactions endpoint
app.get('/transactions', async (req, res) => {
  try {
    const { managerId, period } = req.query;
    let query = db.collection('transactions');
    
    if (managerId) {
      query = query.where('liveManagerId', '==', managerId);
    }
    
    if (period) {
      query = query.where('period', '==', period);
    }

    const snapshot = await query.get();
    const transactions = [];
    
    snapshot.forEach(doc => {
      transactions.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      data: transactions
    });

  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Laden der Transaktionen'
    });
  }
});

// Get bonuses endpoint
app.get('/bonuses', async (req, res) => {
  try {
    const { managerId, period } = req.query;
    let query = db.collection('bonuses');
    
    if (managerId) {
      query = query.where('managerId', '==', managerId);
    }
    
    if (period) {
      query = query.where('period', '==', period);
    }

    const snapshot = await query.get();
    const bonuses = [];
    
    snapshot.forEach(doc => {
      bonuses.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      data: bonuses
    });

  } catch (error) {
    console.error('Get bonuses error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Laden der Boni'
    });
  }
});

// Upload Excel file endpoint
app.post('/upload/excel', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Keine Datei hochgeladen'
      });
    }

    const { originalname, buffer } = req.file;
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Create upload batch record
    const batchId = `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const batchData = {
      id: batchId,
      fileName: originalname,
      uploadDate: admin.firestore.FieldValue.serverTimestamp(),
      status: 'processing',
      recordsProcessed: data.length,
      createdBy: 'system',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('uploadBatches').doc(batchId).set(batchData);

    res.json({
      success: true,
      message: 'Datei erfolgreich hochgeladen',
      batchId: batchId,
      recordsProcessed: data.length
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Hochladen der Datei'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Express error:', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Datei ist zu groß. Maximum: 10MB'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: 'Server-Fehler'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint nicht gefunden'
  });
});

// Export the Express app as a Firebase Function
exports.api = onRequest({
  region: 'europe-west1',
  memory: '512MiB',
  timeoutSeconds: 60,
  maxInstances: 10
}, app);