const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// CORS für alle Origins erlauben
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 't4m-billing-demo-api',
    version: '1.0.0'
  });
});

// Demo login endpoint
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  
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

  const validPasswords = {
    'admin': 'admin123',
    'live_manager_1': 'manager123',
    'team_manager_1': 'manager123'
  };

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Benutzername und Passwort sind erforderlich'
    });
  }

  const user = demoUsers[username];
  
  if (!user || validPasswords[username] !== password) {
    return res.status(401).json({
      success: false,
      message: 'Ungültige Anmeldedaten'
    });
  }

  // Demo token
  const token = `demo-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  res.json({
    success: true,
    message: 'Anmeldung erfolgreich',
    token: token,
    user: user
  });
});

// Demo data endpoints
app.get('/managers', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'manager_admin_001',
        handle: 'admin',
        name: 'System Administrator',
        email: 'admin@trend4media.com',
        role: 'admin',
        isActive: true
      },
      {
        id: 'manager_live_001',
        handle: 'live_manager_1',
        name: 'Live Manager 1',
        email: 'live1@trend4media.com',
        role: 'manager',
        managerType: 'live',
        isActive: true
      },
      {
        id: 'manager_team_001',
        handle: 'team_manager_1',
        name: 'Team Manager 1',
        email: 'team1@trend4media.com',
        role: 'manager',
        managerType: 'team',
        isActive: true
      }
    ]
  });
});

app.get('/transactions', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'trans_001',
        creatorId: 'creator_001',
        liveManagerId: 'manager_live_001',
        teamManagerId: 'manager_team_001',
        amount: 1000.00,
        currency: 'EUR',
        transactionDate: new Date().toISOString(),
        status: 'completed'
      },
      {
        id: 'trans_002',
        creatorId: 'creator_002',
        liveManagerId: 'manager_live_001',
        teamManagerId: 'manager_team_001',
        amount: 1500.00,
        currency: 'EUR',
        transactionDate: new Date().toISOString(),
        status: 'completed'
      }
    ]
  });
});

app.get('/bonuses', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'bonus_001',
        managerId: 'manager_live_001',
        type: 'base_commission',
        amount: 300.00,
        currency: 'EUR',
        period: '2025-01'
      },
      {
        id: 'bonus_002',
        managerId: 'manager_team_001',
        type: 'base_commission',
        amount: 525.00,
        currency: 'EUR',
        period: '2025-01'
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Demo API Server läuft auf Port ${PORT}`);
  console.log(`🌐 Health Check: http://localhost:${PORT}/health`);
  console.log(`🔑 Login: http://localhost:${PORT}/auth/login`);
  console.log(`👥 Managers: http://localhost:${PORT}/managers`);
  console.log(`💰 Transactions: http://localhost:${PORT}/transactions`);
  console.log(`🎁 Bonuses: http://localhost:${PORT}/bonuses`);
});