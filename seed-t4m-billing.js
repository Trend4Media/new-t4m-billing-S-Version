#!/usr/bin/env node

/**
 * 🔥 T4M Billing - Firestore Seed Script
 * 
 * Spezifisch für das t4m-billing Firebase-Projekt
 * 
 * Usage:
 *   node seed-t4m-billing.js
 *   npm run seed:t4m
 */

const admin = require('firebase-admin');

// Service Account Key laden
const serviceAccount = require('./service-account-key.json');

// Initialize Firebase Admin für t4m-billing
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 't4m-billing'
});

const db = admin.firestore();

console.log('🚀 T4M Billing - Firestore Seeding gestartet');
console.log('Projekt: t4m-billing');
console.log('=====================================');

// Sample data für t4m-billing
const sampleManagers = [
  {
    id: 'manager_john_doe',
    handle: 'john-doe',
    name: 'John Doe',
    type: 'LIVE',
    commissionRate: 0.30,
    email: 'john.doe@trend4media.com',
    createdAt: admin.firestore.Timestamp.now()
  },
  {
    id: 'manager_jane_smith',
    handle: 'jane-smith',
    name: 'Jane Smith',
    type: 'TEAM',
    commissionRate: 0.35,
    email: 'jane.smith@trend4media.com',
    createdAt: admin.firestore.Timestamp.now()
  },
  {
    id: 'manager_mike_wilson',
    handle: 'mike-wilson',
    name: 'Mike Wilson',
    type: 'LIVE',
    commissionRate: 0.30,
    email: 'mike.wilson@trend4media.com',
    createdAt: admin.firestore.Timestamp.now()
  },
  {
    id: 'manager_sarah_jones',
    handle: 'sarah-jones',
    name: 'Sarah Jones',
    type: 'TEAM',
    commissionRate: 0.35,
    email: 'sarah.jones@trend4media.com',
    createdAt: admin.firestore.Timestamp.now()
  }
];

const sampleCreators = [
  {
    id: 'creator_creator1',
    creatorId: '12345',
    name: 'Creator One',
    handle: 'creator1',
    email: 'creator1@creator.com',
    createdAt: admin.firestore.Timestamp.now()
  },
  {
    id: 'creator_creator2',
    creatorId: '12346',
    name: 'Creator Two',
    handle: 'creator2',
    email: 'creator2@creator.com',
    createdAt: admin.firestore.Timestamp.now()
  },
  {
    id: 'creator_creator3',
    creatorId: '12347',
    name: 'Creator Three',
    handle: 'creator3',
    email: 'creator3@creator.com',
    createdAt: admin.firestore.Timestamp.now()
  },
  {
    id: 'creator_creator4',
    creatorId: '12348',
    name: 'Creator Four',
    handle: 'creator4',
    email: 'creator4@creator.com',
    createdAt: admin.firestore.Timestamp.now()
  }
];

const sampleGenealogy = [
  {
    teamManagerHandle: 'jane-smith',
    liveManagerHandle: 'john-doe',
    level: 'A',
    assignedAt: admin.firestore.Timestamp.now()
  },
  {
    teamManagerHandle: 'jane-smith',
    liveManagerHandle: 'mike-wilson',
    level: 'A',
    assignedAt: admin.firestore.Timestamp.now()
  },
  {
    teamManagerHandle: 'sarah-jones',
    liveManagerHandle: 'john-doe',
    level: 'B',
    assignedAt: admin.firestore.Timestamp.now()
  }
];

const sampleTransactions = [
  {
    id: 'trans_t4m_1',
    creatorId: 'creator_creator1',
    creatorName: 'Creator One',
    creatorHandle: 'creator1',
    period: '202506',
    grossAmount: 2000.00,
    bonusSum: 1690.00, // 300+1000+240+150
    net: 310.00,
    liveManagerId: 'manager_john_doe',
    liveManagerName: 'John Doe',
    teamManagerId: 'manager_jane_smith',
    teamManagerName: 'Jane Smith',
    baseCommission: 93.00, // 30% of 310
    downlineIncome: { levelA: 0, levelB: 0, levelC: 0, total: 0 },
    liveMilestoneBonuses: { S: 75, N: 150, O: 400, P: 100 },
    teamMilestoneBonuses: { S: 80, N: 165, O: 450, P: 120 },
    batchId: 'batch_t4m_1',
    createdAt: admin.firestore.Timestamp.now(),
    calculationVersion: 'DEFINITIVE_v1.0'
  },
  {
    id: 'trans_t4m_2',
    creatorId: 'creator_creator2',
    creatorName: 'Creator Two',
    creatorHandle: 'creator2',
    period: '202506',
    grossAmount: 1500.00,
    bonusSum: 540.00, // 300+240
    net: 960.00,
    liveManagerId: 'manager_mike_wilson',
    liveManagerName: 'Mike Wilson',
    teamManagerId: 'manager_sarah_jones',
    teamManagerName: 'Sarah Jones',
    baseCommission: 288.00, // 30% of 960
    downlineIncome: { levelA: 0, levelB: 0, levelC: 0, total: 0 },
    liveMilestoneBonuses: { S: 0, N: 150, O: 0, P: 100 },
    teamMilestoneBonuses: { S: 0, N: 165, O: 0, P: 120 },
    batchId: 'batch_t4m_1',
    createdAt: admin.firestore.Timestamp.now(),
    calculationVersion: 'DEFINITIVE_v1.0'
  }
];

const sampleBonuses = [
  // Base commissions
  {
    managerId: 'manager_john_doe',
    managerHandle: 'john-doe',
    managerName: 'John Doe',
    managerType: 'LIVE',
    amount: 93.00,
    type: 'BASE_COMMISSION',
    basedOnNet: 310.00,
    commissionRate: 0.30,
    creatorId: 'creator_creator1',
    creatorName: 'Creator One',
    transactionId: 'trans_t4m_1',
    batchId: 'batch_t4m_1',
    period: '202506',
    month: '202506',
    calculatedAt: admin.firestore.Timestamp.now()
  },
  {
    managerId: 'manager_jane_smith',
    managerHandle: 'jane-smith',
    managerName: 'Jane Smith',
    managerType: 'TEAM',
    amount: 108.50, // 35% of 310
    type: 'BASE_COMMISSION',
    basedOnNet: 310.00,
    commissionRate: 0.35,
    creatorId: 'creator_creator1',
    creatorName: 'Creator One',
    transactionId: 'trans_t4m_1',
    batchId: 'batch_t4m_1',
    period: '202506',
    month: '202506',
    calculatedAt: admin.firestore.Timestamp.now()
  },
  // Milestone bonuses for John Doe
  {
    managerId: 'manager_john_doe',
    managerHandle: 'john-doe',
    managerName: 'John Doe',
    managerType: 'LIVE',
    amount: 75.00,
    type: 'MILESTONE_HALF',
    creatorId: 'creator_creator1',
    creatorName: 'Creator One',
    transactionId: 'trans_t4m_1',
    batchId: 'batch_t4m_1',
    period: '202506',
    month: '202506',
    calculatedAt: admin.firestore.Timestamp.now()
  },
  {
    managerId: 'manager_john_doe',
    managerHandle: 'john-doe',
    managerName: 'John Doe',
    managerType: 'LIVE',
    amount: 150.00,
    type: 'MILESTONE_1',
    creatorId: 'creator_creator1',
    creatorName: 'Creator One',
    transactionId: 'trans_t4m_1',
    batchId: 'batch_t4m_1',
    period: '202506',
    month: '202506',
    calculatedAt: admin.firestore.Timestamp.now()
  },
  {
    managerId: 'manager_john_doe',
    managerHandle: 'john-doe',
    managerName: 'John Doe',
    managerType: 'LIVE',
    amount: 400.00,
    type: 'MILESTONE_2',
    creatorId: 'creator_creator1',
    creatorName: 'Creator One',
    transactionId: 'trans_t4m_1',
    batchId: 'batch_t4m_1',
    period: '202506',
    month: '202506',
    calculatedAt: admin.firestore.Timestamp.now()
  },
  {
    managerId: 'manager_john_doe',
    managerHandle: 'john-doe',
    managerName: 'John Doe',
    managerType: 'LIVE',
    amount: 100.00,
    type: 'RETENTION',
    creatorId: 'creator_creator1',
    creatorName: 'Creator One',
    transactionId: 'trans_t4m_1',
    batchId: 'batch_t4m_1',
    period: '202506',
    month: '202506',
    calculatedAt: admin.firestore.Timestamp.now()
  }
];

const sampleUploadBatches = [
  {
    id: 'batch_t4m_1',
    filename: 'july-2025-t4m.xlsx',
    originalName: 'july-2025-t4m.xlsx',
    status: 'COMPLETED',
    uploadedBy: 'admin@trend4media.com',
    uploadedAt: admin.firestore.Timestamp.now(),
    processedCount: 2,
    newCreators: 2,
    newManagers: 2,
    transactionCount: 2,
    completedAt: admin.firestore.Timestamp.now()
  }
];

const samplePayouts = [
  {
    managerHandle: 'john-doe',
    managerId: 'manager_john_doe',
    managerName: 'John Doe',
    amount: 1500.00,
    status: 'PENDING',
    description: 'T4M Monthly commission payout - July 2025',
    requestedAt: admin.firestore.Timestamp.now(),
    requestedBy: 'manager_john_doe'
  },
  {
    managerHandle: 'jane-smith',
    managerId: 'manager_jane_smith',
    managerName: 'Jane Smith',
    amount: 2200.00,
    status: 'APPROVED',
    description: 'T4M Monthly commission payout - July 2025',
    requestedAt: admin.firestore.Timestamp.now(),
    requestedBy: 'manager_jane_smith',
    processedAt: admin.firestore.Timestamp.now(),
    processedBy: 'admin@trend4media.com',
    notes: 'Approved for payment'
  }
];

const sampleMessages = [
  {
    userHandle: 'john-doe',
    module: 'COMMISSION',
    content: 'T4M: Your commission for July 2025 has been calculated. Total earnings: €1,500.00',
    read: false,
    createdAt: admin.firestore.Timestamp.now()
  },
  {
    userHandle: 'jane-smith',
    module: 'PAYOUT',
    content: 'T4M: Your payout request for €2,200.00 has been approved and will be processed within 3-5 business days.',
    read: true,
    createdAt: admin.firestore.Timestamp.now()
  }
];

const sampleManagerMonthlyNet = [
  {
    managerId: 'manager_john_doe',
    period: '202505',
    netCent: 25000, // €250.00 in cents
    uploadedAt: admin.firestore.Timestamp.now()
  },
  {
    managerId: 'manager_jane_smith',
    period: '202505',
    netCent: 40000, // €400.00 in cents
    uploadedAt: admin.firestore.Timestamp.now()
  }
];

// Seed functions
async function seedManagers() {
  console.log('🌱 Seeding managers...');
  for (const manager of sampleManagers) {
    await db.collection('managers').doc(manager.id).set(manager);
    console.log(`✅ Created manager: ${manager.name}`);
  }
}

async function seedCreators() {
  console.log('🌱 Seeding creators...');
  for (const creator of sampleCreators) {
    await db.collection('creators').doc(creator.id).set(creator);
    console.log(`✅ Created creator: ${creator.name}`);
  }
}

async function seedGenealogy() {
  console.log('🌱 Seeding genealogy...');
  for (const genealogy of sampleGenealogy) {
    const docRef = await db.collection('genealogy').add(genealogy);
    console.log(`✅ Created genealogy: ${genealogy.teamManagerHandle} -> ${genealogy.liveManagerHandle} (${genealogy.level})`);
  }
}

async function seedTransactions() {
  console.log('🌱 Seeding transactions...');
  for (const transaction of sampleTransactions) {
    await db.collection('transactions').doc(transaction.id).set(transaction);
    console.log(`✅ Created transaction: ${transaction.id}`);
  }
}

async function seedBonuses() {
  console.log('🌱 Seeding bonuses...');
  for (const bonus of sampleBonuses) {
    const docRef = await db.collection('bonuses').add(bonus);
    console.log(`✅ Created bonus: ${bonus.type} for ${bonus.managerName} - €${bonus.amount}`);
  }
}

async function seedUploadBatches() {
  console.log('🌱 Seeding upload batches...');
  for (const batch of sampleUploadBatches) {
    await db.collection('uploadBatches').doc(batch.id).set(batch);
    console.log(`✅ Created upload batch: ${batch.filename}`);
  }
}

async function seedPayouts() {
  console.log('🌱 Seeding payouts...');
  for (const payout of samplePayouts) {
    const docRef = await db.collection('payouts').add(payout);
    console.log(`✅ Created payout: ${payout.managerName} - €${payout.amount} (${payout.status})`);
  }
}

async function seedMessages() {
  console.log('🌱 Seeding messages...');
  for (const message of sampleMessages) {
    const docRef = await db.collection('messages').add(message);
    console.log(`✅ Created message: ${message.module} for ${message.userHandle}`);
  }
}

async function seedManagerMonthlyNet() {
  console.log('🌱 Seeding manager monthly net data...');
  for (const netData of sampleManagerMonthlyNet) {
    const docId = `${netData.managerId}_${netData.period}`;
    await db.collection('managerMonthlyNet').doc(docId).set(netData);
    console.log(`✅ Created monthly net: ${netData.managerId} for ${netData.period} - €${netData.netCent / 100}`);
  }
}

async function seedAuditLogs() {
  console.log('🌱 Seeding audit logs...');
  const auditLogs = [
    {
      userId: 'admin@trend4media.com',
      action: 'T4M_BILLING_SEED_DATA_CREATED',
      details: {
        description: 'T4M Billing initial seed data created',
        collections: ['managers', 'creators', 'transactions', 'bonuses', 'genealogy', 'payouts', 'messages'],
        project: 't4m-billing',
        timestamp: new Date().toISOString()
      },
      timestamp: admin.firestore.Timestamp.now()
    }
  ];

  for (const log of auditLogs) {
    const docRef = await db.collection('audit-logs').add(log);
    console.log(`✅ Created audit log: ${log.action}`);
  }
}

// Main seed function
async function seedT4MBilling() {
  try {
    console.log('🚀 Starting T4M Billing Firestore seeding...');
    console.log('Projekt: t4m-billing');
    console.log('=====================================');

    await seedManagers();
    await seedCreators();
    await seedGenealogy();
    await seedTransactions();
    await seedBonuses();
    await seedUploadBatches();
    await seedPayouts();
    await seedMessages();
    await seedManagerMonthlyNet();
    await seedAuditLogs();

    console.log('=====================================');
    console.log('✅ T4M Billing database seeding completed successfully!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   - ${sampleManagers.length} managers`);
    console.log(`   - ${sampleCreators.length} creators`);
    console.log(`   - ${sampleGenealogy.length} genealogy entries`);
    console.log(`   - ${sampleTransactions.length} transactions`);
    console.log(`   - ${sampleBonuses.length} bonuses`);
    console.log(`   - ${sampleUploadBatches.length} upload batches`);
    console.log(`   - ${samplePayouts.length} payouts`);
    console.log(`   - ${sampleMessages.length} messages`);
    console.log(`   - ${sampleManagerMonthlyNet.length} monthly net records`);
    console.log('');
    console.log('🌐 URLs:');
    console.log('  - Firebase Console: https://console.firebase.google.com/u/0/project/t4m-billing/overview');
    console.log('  - Firestore: https://console.firebase.google.com/u/0/project/t4m-billing/firestore/data');
    console.log('  - API: https://europe-west1-t4m-billing.cloudfunctions.net/api');
    console.log('');
    console.log('🎯 You can now start the application and test the functionality!');

  } catch (error) {
    console.error('❌ Error seeding T4M Billing database:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Run the seed function
if (require.main === module) {
  seedT4MBilling();
}

module.exports = {
  seedT4MBilling,
  sampleManagers,
  sampleCreators,
  sampleTransactions,
  sampleBonuses
};