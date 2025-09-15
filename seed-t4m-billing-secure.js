const admin = require('firebase-admin');

// Initialize Firebase Admin
// Option 1: Mit Service Account Key (empfohlen für lokale Entwicklung)
try {
  const serviceAccount = require('./service-account-key.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 't4m-billing'
  });
  console.log('✅ Firebase Admin mit Service Account Key initialisiert');
} catch (error) {
  // Option 2: Mit Application Default Credentials (für Firebase Functions)
  admin.initializeApp({
    projectId: 't4m-billing'
  });
  console.log('✅ Firebase Admin mit Application Default Credentials initialisiert');
}

const db = admin.firestore();

// Sample data for t4m-billing project
const sampleData = {
  managers: [
    {
      id: 'manager_admin_001',
      handle: 'admin',
      name: 'System Administrator',
      email: 'admin@trend4media.com',
      role: 'admin',
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastLogin: admin.firestore.FieldValue.serverTimestamp()
    },
    {
      id: 'manager_live_001',
      handle: 'live_manager_1',
      name: 'Live Manager 1',
      email: 'live1@trend4media.com',
      role: 'manager',
      managerType: 'live',
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastLogin: admin.firestore.FieldValue.serverTimestamp()
    },
    {
      id: 'manager_team_001',
      handle: 'team_manager_1',
      name: 'Team Manager 1',
      email: 'team1@trend4media.com',
      role: 'manager',
      managerType: 'team',
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastLogin: admin.firestore.FieldValue.serverTimestamp()
    }
  ],
  
  creators: [
    {
      id: 'creator_001',
      handle: 'creator_1',
      name: 'Creator 1',
      email: 'creator1@example.com',
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
      id: 'creator_002',
      handle: 'creator_2',
      name: 'Creator 2',
      email: 'creator2@example.com',
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],
  
  transactions: [
    {
      id: 'trans_001',
      creatorId: 'creator_001',
      liveManagerId: 'manager_live_001',
      teamManagerId: 'manager_team_001',
      amount: 1000.00,
      currency: 'EUR',
      transactionDate: admin.firestore.Timestamp.fromDate(new Date('2025-01-15')),
      status: 'completed',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
      id: 'trans_002',
      creatorId: 'creator_002',
      liveManagerId: 'manager_live_001',
      teamManagerId: 'manager_team_001',
      amount: 1500.00,
      currency: 'EUR',
      transactionDate: admin.firestore.Timestamp.fromDate(new Date('2025-01-16')),
      status: 'completed',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],
  
  bonuses: [
    {
      id: 'bonus_001',
      managerId: 'manager_live_001',
      type: 'base_commission',
      amount: 300.00,
      currency: 'EUR',
      period: '2025-01',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
      id: 'bonus_002',
      managerId: 'manager_team_001',
      type: 'base_commission',
      amount: 525.00,
      currency: 'EUR',
      period: '2025-01',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],
  
  uploadBatches: [
    {
      id: 'batch_001_202501',
      fileName: 'sample-commission-data.xlsx',
      uploadDate: admin.firestore.FieldValue.serverTimestamp(),
      status: 'completed',
      recordsProcessed: 2,
      createdBy: 'admin',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],
  
  genealogy: [
    {
      id: 'genealogy_001',
      managerId: 'manager_live_001',
      level: 'A',
      parentId: null,
      children: ['manager_team_001'],
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
      id: 'genealogy_002',
      managerId: 'manager_team_001',
      level: 'B',
      parentId: 'manager_live_001',
      children: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],
  
  payouts: [
    {
      id: 'payout_001',
      managerHandle: 'live_manager_1',
      amount: 300.00,
      currency: 'EUR',
      status: 'pending',
      requestedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],
  
  messages: [
    {
      id: 'msg_001',
      userHandle: 'live_manager_1',
      title: 'Willkommen im System',
      content: 'Willkommen im Trend4Media Billing System!',
      isRead: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],
  
  auditLogs: [
    {
      id: 'audit_001',
      action: 'system_initialized',
      userId: 'admin',
      details: 'System wurde initialisiert mit Beispieldaten',
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    }
  ],
  
  managerMonthlyNet: [
    {
      id: 'net_001_202501',
      managerId: 'manager_live_001',
      period: '2025-01',
      netAmount: 300.00,
      currency: 'EUR',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ]
};

async function seedDatabase() {
  try {
    console.log('🚀 Starte Seeding für t4m-billing...');
    
    // Seed managers
    console.log('📝 Seeding managers...');
    for (const manager of sampleData.managers) {
      await db.collection('managers').doc(manager.id).set(manager);
    }
    
    // Seed creators
    console.log('📝 Seeding creators...');
    for (const creator of sampleData.creators) {
      await db.collection('creators').doc(creator.id).set(creator);
    }
    
    // Seed transactions
    console.log('📝 Seeding transactions...');
    for (const transaction of sampleData.transactions) {
      await db.collection('transactions').doc(transaction.id).set(transaction);
    }
    
    // Seed bonuses
    console.log('📝 Seeding bonuses...');
    for (const bonus of sampleData.bonuses) {
      await db.collection('bonuses').doc(bonus.id).set(bonus);
    }
    
    // Seed upload batches
    console.log('📝 Seeding upload batches...');
    for (const batch of sampleData.uploadBatches) {
      await db.collection('uploadBatches').doc(batch.id).set(batch);
    }
    
    // Seed genealogy
    console.log('📝 Seeding genealogy...');
    for (const genealogy of sampleData.genealogy) {
      await db.collection('genealogy').doc(genealogy.id).set(genealogy);
    }
    
    // Seed payouts
    console.log('📝 Seeding payouts...');
    for (const payout of sampleData.payouts) {
      await db.collection('payouts').doc(payout.id).set(payout);
    }
    
    // Seed messages
    console.log('📝 Seeding messages...');
    for (const message of sampleData.messages) {
      await db.collection('messages').doc(message.id).set(message);
    }
    
    // Seed audit logs
    console.log('📝 Seeding audit logs...');
    for (const auditLog of sampleData.auditLogs) {
      await db.collection('audit-logs').doc(auditLog.id).set(auditLog);
    }
    
    // Seed manager monthly net
    console.log('📝 Seeding manager monthly net...');
    for (const net of sampleData.managerMonthlyNet) {
      await db.collection('managerMonthlyNet').doc(net.id).set(net);
    }
    
    console.log('✅ Seeding erfolgreich abgeschlossen!');
    console.log('📊 Datenbank-Statistiken:');
    console.log(`   - Managers: ${sampleData.managers.length}`);
    console.log(`   - Creators: ${sampleData.creators.length}`);
    console.log(`   - Transactions: ${sampleData.transactions.length}`);
    console.log(`   - Bonuses: ${sampleData.bonuses.length}`);
    console.log(`   - Upload Batches: ${sampleData.uploadBatches.length}`);
    console.log(`   - Genealogy: ${sampleData.genealogy.length}`);
    console.log(`   - Payouts: ${sampleData.payouts.length}`);
    console.log(`   - Messages: ${sampleData.messages.length}`);
    console.log(`   - Audit Logs: ${sampleData.auditLogs.length}`);
    console.log(`   - Manager Monthly Net: ${sampleData.managerMonthlyNet.length}`);
    
  } catch (error) {
    console.error('❌ Fehler beim Seeding:', error);
    throw error;
  }
}

// Run seeding
seedDatabase()
  .then(() => {
    console.log('🎉 Seeding abgeschlossen!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding fehlgeschlagen:', error);
    process.exit(1);
  });