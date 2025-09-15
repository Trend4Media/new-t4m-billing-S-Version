# 🔥 Firestore Collections Structure - T4M Billing System

## 📋 Sammlungsübersicht

### 1. **managers** - Manager-Verwaltung
```javascript
{
  id: "manager_john_doe",
  handle: "john-doe",
  name: "John Doe",
  type: "LIVE" | "TEAM",
  commissionRate: 0.30 | 0.35,
  email: "john.doe@manager.com",
  createdAt: Timestamp,
  batchId: "batch_1234567890_abc123"
}
```

### 2. **creators** - Creator-Verwaltung
```javascript
{
  id: "creator_creator_handle",
  creatorId: "12345",
  name: "Creator Name",
  handle: "creator_handle",
  email: "creator_handle@creator.com",
  createdAt: Timestamp,
  batchId: "batch_1234567890_abc123"
}
```

### 3. **transactions** - Transaktionsdaten
```javascript
{
  id: "trans_batch_123_0",
  creatorId: "creator_creator_handle",
  creatorName: "Creator Name",
  creatorHandle: "creator_handle",
  period: "202506",
  
  // Kommissions-Datenstruktur
  grossAmount: 2000.00,
  bonusSum: 1690.00,        // Summe aller Abzüge
  net: 310.00,              // gross - bonusSum
  
  // Manager-Zuordnungen
  liveManagerId: "manager_john_doe",
  liveManagerName: "John Doe",
  teamManagerId: "manager_jane_smith",
  teamManagerName: "Jane Smith",
  
  // Berechnete Provisionen
  baseCommission: 93.00,
  downlineIncome: {
    levelA: 0,
    levelB: 0,
    levelC: 0,
    total: 0
  },
  
  // Meilenstein-Boni
  liveMilestoneBonuses: {
    S: 75,    // Half-Milestone
    N: 150,   // Milestone 1
    O: 400,   // Milestone 2
    P: 100    // Retention
  },
  teamMilestoneBonuses: {
    S: 80,
    N: 165,
    O: 450,
    P: 120
  },
  
  // Metadata
  batchId: "batch_1234567890_abc123",
  createdAt: Timestamp,
  calculationVersion: "DEFINITIVE_v1.0"
}
```

### 4. **bonuses** - Bonus-Verwaltung
```javascript
{
  id: "bonus_uuid",
  managerId: "manager_john_doe",
  managerHandle: "john-doe",
  managerName: "John Doe",
  managerType: "LIVE" | "TEAM",
  amount: 300.00,
  type: "BASE_COMMISSION" | "MILESTONE_1" | "MILESTONE_2" | 
        "MILESTONE_3" | "GRADUATION_BONUS" | "DIAMOND_BONUS" | 
        "RECRUITMENT_BONUS" | "DOWNLINE_PROVISION",
  basedOnNet: 310.00,
  commissionRate: 0.30,
  creatorId: "creator_creator_handle",
  creatorName: "Creator Name",
  transactionId: "trans_batch_123_0",
  batchId: "batch_1234567890_abc123",
  period: "202506",
  month: "202506",
  calculatedAt: Timestamp
}
```

### 5. **uploadBatches** - Upload-Verwaltung
```javascript
{
  id: "batch_1234567890_abc123",
  filename: "july-2025.xlsx",
  originalName: "july-2025.xlsx",
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "ERROR",
  uploadedBy: "admin@trend4media.com",
  uploadedAt: Timestamp,
  processedCount: 150,
  newCreators: 25,
  newManagers: 5,
  transactionCount: 150,
  completedAt: Timestamp,
  error: "Error message if status is ERROR"
}
```

### 6. **genealogy** - Manager-Hierarchien
```javascript
{
  id: "genealogy_uuid",
  teamManagerHandle: "jane-smith",
  liveManagerHandle: "john-doe",
  level: "A" | "B" | "C",
  assignedAt: Timestamp
}
```

### 7. **payouts** - Auszahlungsanträge
```javascript
{
  id: "payout_uuid",
  managerHandle: "john-doe",
  managerId: "manager_john_doe",
  managerName: "John Doe",
  amount: 1500.00,
  status: "PENDING" | "APPROVED" | "PAID" | "REJECTED",
  description: "Monthly commission payout",
  requestedAt: Timestamp,
  requestedBy: "user_id",
  processedAt: Timestamp,
  processedBy: "admin_user_id",
  notes: "Admin notes"
}
```

### 8. **messages** - Nachrichtensystem
```javascript
{
  id: "message_uuid",
  userHandle: "john-doe",
  module: "COMMISSION" | "PAYOUT" | "GENERAL",
  content: "Your commission has been calculated",
  read: false,
  createdAt: Timestamp
}
```

### 9. **audit-logs** - Audit-Trail
```javascript
{
  id: "audit_uuid",
  userId: "user_id",
  action: "RECRUITMENT_BONUS_CREATED" | "GENEALOGY_CREATED" | 
          "PAYOUT_REQUEST_CREATED" | "UPLOAD_PROCESSED",
  details: {
    // Action-specific details
  },
  timestamp: Timestamp
}
```

### 10. **managerMonthlyNet** - Diamond-Bonus-Vergleichsdaten
```javascript
{
  id: "manager_john_doe_202506",
  managerId: "manager_john_doe",
  period: "202506",
  netCent: 31000,  // Net amount in cents
  uploadedAt: Timestamp
}
```

## 🔍 Wichtige Indizes

### Composite Indexes für Abfragen:
1. `managers` → `handle` (unique)
2. `transactions` → `liveManagerId` + `period`
3. `transactions` → `teamManagerId` + `period`
4. `transactions` → `batchId`
5. `bonuses` → `managerId` + `period`
6. `bonuses` → `managerId` + `month`
7. `genealogy` → `teamManagerHandle`
8. `genealogy` → `liveManagerHandle`
9. `payouts` → `managerHandle` + `requestedAt`
10. `messages` → `userHandle` + `createdAt`
11. `uploadBatches` → `uploadedAt`
12. `managerMonthlyNet` → `managerId` + `period`

## 📊 Datenintegrität

### Eindeutige Constraints:
- `managers.handle` → unique
- `creators.handle` → unique
- `managerMonthlyNet` → `managerId` + `period` → unique

### Referenzielle Integrität:
- `transactions.liveManagerId` → `managers.id`
- `transactions.teamManagerId` → `managers.id`
- `transactions.creatorId` → `creators.id`
- `bonuses.managerId` → `managers.id`
- `bonuses.transactionId` → `transactions.id`
- `genealogy.teamManagerHandle` → `managers.handle`
- `genealogy.liveManagerHandle` → `managers.handle`