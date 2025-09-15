# 🔥 T4M Billing - Firebase Database Setup

## 📋 Projekt: t4m-billing

**Firebase Console:** https://console.firebase.google.com/u/0/project/t4m-billing/overview

---

## 🚀 Schritt 1: Projekt verknüpfen

### 1.1 Firebase CLI mit Ihrem Projekt verknüpfen
```bash
# In das Projektverzeichnis wechseln
cd /workspace

# Firebase-Projekt auswählen
firebase use t4m-billing

# Status überprüfen
firebase projects:list
```

**Erwartete Ausgabe:**
```
✔ Using project t4m-billing
```

---

## 🔧 Schritt 2: Firestore-Datenbank einrichten

### 2.1 Firestore-Datenbank erstellen
1. Gehen Sie zu: https://console.firebase.google.com/u/0/project/t4m-billing/firestore
2. Klicken Sie auf **"Create database"**
3. Wählen Sie **"Start in test mode"** (wir konfigurieren die Regeln später)
4. Wählen Sie **"europe-west1"** als Region (für bessere Performance in Deutschland)

### 2.2 Sicherheitsregeln deployen
```bash
# Sicherheitsregeln für t4m-billing deployen
firebase deploy --only firestore:rules --project t4m-billing
```

### 2.3 Indexe deployen
```bash
# Indexe für t4m-billing deployen
firebase deploy --only firestore:indexes --project t4m-billing
```

**Wichtiger Hinweis:** Die Indexe können 5-10 Minuten zum Erstellen benötigen.

---

## 🔑 Schritt 3: Service Account Key erstellen

### 3.1 Service Account Key generieren
1. Gehen Sie zu: https://console.firebase.google.com/u/0/project/t4m-billing/settings/serviceaccounts/adminsdk
2. Klicken Sie auf **"Generate new private key"**
3. Laden Sie die JSON-Datei herunter
4. Benennen Sie sie um zu `service-account-key.json`

### 3.2 Service Account Key einrichten
```bash
# Service Account Key in das Projektverzeichnis kopieren
# (Ersetzen Sie den Pfad durch den tatsächlichen Download-Pfad)
cp ~/Downloads/t4m-billing-firebase-adminsdk-xxxxx.json ./service-account-key.json

# Berechtigungen setzen
chmod 600 service-account-key.json

# Überprüfen
ls -la service-account-key.json
```

---

## 🌱 Schritt 4: Beispieldaten laden

### 4.1 Dependencies installieren (falls noch nicht geschehen)
```bash
# Firebase Admin SDK installieren
npm install firebase-admin

# Seed-Skript ausführbar machen
chmod +x seed-firestore-data.js
```

### 4.2 Datenbank mit Beispieldaten füllen
```bash
# Seed-Skript für t4m-billing ausführen
node seed-firestore-data.js
```

**Erwartete Ausgabe:**
```
🚀 Starting Firestore database seeding...
=====================================
🌱 Seeding managers...
✅ Created manager: John Doe
✅ Created manager: Jane Smith
✅ Created manager: Mike Wilson
✅ Created manager: Sarah Jones
🌱 Seeding creators...
✅ Created creator: Creator One
✅ Created creator: Creator Two
✅ Created creator: Creator Three
✅ Created creator: Creator Four
🌱 Seeding genealogy...
✅ Created genealogy: jane-smith -> john-doe (A)
✅ Created genealogy: jane-smith -> mike-wilson (A)
✅ Created genealogy: sarah-jones -> john-doe (B)
🌱 Seeding transactions...
✅ Created transaction: trans_sample_1
✅ Created transaction: trans_sample_2
🌱 Seeding bonuses...
✅ Created bonus: BASE_COMMISSION for John Doe - €93
✅ Created bonus: BASE_COMMISSION for Jane Smith - €108.5
✅ Created bonus: MILESTONE_HALF for John Doe - €75
✅ Created bonus: MILESTONE_1 for John Doe - €150
✅ Created bonus: MILESTONE_2 for John Doe - €400
✅ Created bonus: RETENTION for John Doe - €100
🌱 Seeding upload batches...
✅ Created upload batch: july-2025-sample.xlsx
🌱 Seeding payouts...
✅ Created payout: John Doe - €1500 (PENDING)
✅ Created payout: Jane Smith - €2200 (APPROVED)
🌱 Seeding messages...
✅ Created message: COMMISSION for john-doe
✅ Created message: PAYOUT for jane-smith
🌱 Seeding manager monthly net data...
✅ Created monthly net: manager_john_doe for 202505 - €250
✅ Created monthly net: manager_jane_smith for 202505 - €400
🌱 Seeding audit logs...
✅ Created audit log: SEED_DATA_CREATED
=====================================
✅ Database seeding completed successfully!
```

---

## 🧪 Schritt 5: Datenbank überprüfen

### 5.1 Firebase Console überprüfen
Gehen Sie zu: https://console.firebase.google.com/u/0/project/t4m-billing/firestore/data

**Erwartete Sammlungen:**
- ✅ `managers` (4 Dokumente)
- ✅ `creators` (4 Dokumente)
- ✅ `transactions` (2 Dokumente)
- ✅ `bonuses` (6 Dokumente)
- ✅ `genealogy` (3 Dokumente)
- ✅ `payouts` (2 Dokumente)
- ✅ `messages` (2 Dokumente)
- ✅ `uploadBatches` (1 Dokument)
- ✅ `managerMonthlyNet` (2 Dokumente)
- ✅ `audit-logs` (1 Dokument)

### 5.2 Indexe überprüfen
Gehen Sie zu: https://console.firebase.google.com/u/0/project/t4m-billing/firestore/indexes

**Status sollte sein:**
- ✅ "Enabled" oder "Building" (falls noch in Bearbeitung)

---

## 🚀 Schritt 6: Functions deployen

### 6.1 Functions für t4m-billing deployen
```bash
# Functions deployen
firebase deploy --only functions --project t4m-billing
```

**Erwartete Ausgabe:**
```
✔ Deploying functions to t4m-billing...
✔ functions[api(europe-west1)]: Successful create operation.
✔ Deploy complete!
```

### 6.2 API-URL notieren
Nach dem Deployment erhalten Sie:
- **API-URL**: `https://europe-west1-t4m-billing.cloudfunctions.net/api`

---

## 🌐 Schritt 7: Frontend konfigurieren

### 7.1 Frontend-Umgebungsvariablen setzen
```bash
# Frontend .env.local erstellen
cat > trend4media-frontend/.env.local << EOF
NEXT_PUBLIC_FIREBASE_PROJECT_ID=t4m-billing
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=t4m-billing.firebaseapp.com
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=t4m-billing.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
NEXT_PUBLIC_API_URL=https://europe-west1-t4m-billing.cloudfunctions.net/api
EOF
```

**Wichtige Werte finden Sie hier:**
- Gehen Sie zu: https://console.firebase.google.com/u/0/project/t4m-billing/settings/general
- Scrollen Sie zu "Your apps" → "Web app" → "Config"

### 7.2 Frontend starten
```bash
# Frontend starten
cd trend4media-frontend
npm install
npm run dev
```

**Test-URLs:**
- Frontend: `http://localhost:3000`
- Admin Login: `admin@trend4media.com` / `admin123`
- Manager Login: `live@trend4media.com` / `manager123`

---

## 🧪 Schritt 8: API testen

### 8.1 Health Check
```bash
# Health Check testen
curl https://europe-west1-t4m-billing.cloudfunctions.net/api/health
```

**Erwartete Antwort:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "service": "T4M Firebase Backend"
}
```

### 8.2 Authentication testen
```bash
# Login testen
curl -X POST https://europe-west1-t4m-billing.cloudfunctions.net/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@trend4media.com","password":"admin123"}'
```

**Erwartete Antwort:**
```json
{
  "access_token": "eyJ...",
  "user": {
    "id": "user_...",
    "email": "admin@trend4media.com",
    "firstName": "Admin",
    "lastName": "User",
    "role": "admin"
  }
}
```

---

## 📊 Schritt 9: Vollständiges System testen

### 9.1 Admin-Panel testen
1. Gehen Sie zu `http://localhost:3000/admin`
2. Melden Sie sich mit `admin@trend4media.com` / `admin123` an
3. Überprüfen Sie alle Bereiche:
   - ✅ Manager-Übersicht (4 Manager)
   - ✅ Creator-Übersicht (4 Creator)
   - ✅ Transaktions-Übersicht (2 Transaktionen)
   - ✅ Bonus-Übersicht (6 Boni)
   - ✅ Upload-Historie (1 Batch)
   - ✅ Payout-Management (2 Payouts)

### 9.2 Manager-Dashboard testen
1. Gehen Sie zu `http://localhost:3000/dashboard`
2. Melden Sie sich mit `live@trend4media.com` / `manager123` an
3. Überprüfen Sie:
   - ✅ Einnahmen-Übersicht
   - ✅ Transaktions-Historie
   - ✅ Payout-Status

---

## 🚀 Schritt 10: Produktions-Deployment

### 10.1 Frontend builden
```bash
# Frontend für Produktion builden
cd trend4media-frontend
npm run build
```

### 10.2 Alles deployen
```bash
# Komplettes System deployen
firebase deploy --project t4m-billing
```

**Nach dem Deployment:**
- **Frontend**: `https://t4m-billing.web.app`
- **API**: `https://europe-west1-t4m-billing.cloudfunctions.net/api`

---

## ✅ Erfolgskontrolle

### Checkliste:
- [ ] Firebase-Projekt `t4m-billing` verknüpft
- [ ] Firestore-Datenbank erstellt (europe-west1)
- [ ] Sicherheitsregeln deployed
- [ ] Indexe deployed (Status: Enabled)
- [ ] Service Account Key konfiguriert
- [ ] Beispieldaten geladen (10 Sammlungen)
- [ ] Functions deployed
- [ ] Frontend konfiguriert
- [ ] API-Endpoints funktionieren
- [ ] Admin-Panel funktioniert
- [ ] Manager-Dashboard funktioniert

---

## 🛠️ Troubleshooting

### Problem: "Project not found"
```bash
# Projekt-Liste überprüfen
firebase projects:list

# Korrektes Projekt auswählen
firebase use t4m-billing
```

### Problem: "Permission denied"
```bash
# Bei Firebase anmelden
firebase login

# Projekt erneut auswählen
firebase use t4m-billing
```

### Problem: Indexe werden nicht erstellt
```bash
# Indexe-Status überprüfen
firebase firestore:indexes --project t4m-billing

# Indexe erneut deployen
firebase deploy --only firestore:indexes --project t4m-billing
```

### Problem: Service Account Key nicht gefunden
```bash
# Pfad überprüfen
ls -la service-account-key.json

# Umgebungsvariable setzen
export GOOGLE_APPLICATION_CREDENTIALS="./service-account-key.json"
```

---

## 🎯 Nächste Schritte

Nach erfolgreichem Setup:
1. **Echte Daten importieren**: Ersetzen Sie Beispieldaten durch Produktionsdaten
2. **Benutzer verwalten**: Erstellen Sie echte Manager- und Admin-Accounts
3. **Excel-Upload testen**: Testen Sie mit echten Excel-Dateien
4. **Monitoring einrichten**: Konfigurieren Sie Firebase Monitoring
5. **Backup-Strategie**: Richten Sie regelmäßige Backups ein

---

**🎉 Herzlichen Glückwunsch! Ihre t4m-billing Datenbank ist jetzt vollständig konfiguriert!**

**Firebase Console:** https://console.firebase.google.com/u/0/project/t4m-billing/overview