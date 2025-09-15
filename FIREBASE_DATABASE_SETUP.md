# 🔥 Firebase Database Setup - T4M Billing System

## 📋 Übersicht

Diese Anleitung führt Sie durch die komplette Einrichtung einer neuen Firebase-Datenbank für das T4M-Abrechnungssystem. Alle Konfigurationsdateien und Skripte sind bereits vorbereitet.

---

## 🚀 Schritt 1: Firebase-Projekt erstellen

### 1.1 Neues Firebase-Projekt anlegen
```bash
# Firebase CLI installieren (falls noch nicht vorhanden)
npm install -g firebase-tools

# Bei Firebase anmelden
firebase login

# Neues Projekt erstellen
firebase projects:create trend4media-billing-[IHR-PROJEKT-NAME]
```

### 1.2 Projekt initialisieren
```bash
# In das Projektverzeichnis wechseln
cd /workspace

# Firebase-Projekt initialisieren
firebase init firestore
firebase init functions
firebase init hosting
```

**Wichtige Auswahlen:**
- **Firestore**: Ja, mit Sicherheitsregeln und Indexen
- **Functions**: Ja, mit TypeScript (oder JavaScript)
- **Hosting**: Ja, mit Next.js

---

## 🔧 Schritt 2: Firestore-Konfiguration

### 2.1 Sicherheitsregeln anwenden
```bash
# Sicherheitsregeln deployen
firebase deploy --only firestore:rules
```

### 2.2 Indexe deployen
```bash
# Indexe deployen
firebase deploy --only firestore:indexes
```

### 2.3 Manuelle Überprüfung
Gehen Sie zur [Firebase Console](https://console.firebase.google.com) und überprüfen Sie:
- ✅ **Firestore Database** ist erstellt
- ✅ **Sicherheitsregeln** sind aktiv
- ✅ **Indexe** werden erstellt (kann einige Minuten dauern)

---

## 🔑 Schritt 3: Service Account Key erstellen

### 3.1 Service Account erstellen
1. Gehen Sie zur [Firebase Console](https://console.firebase.google.com)
2. Wählen Sie Ihr Projekt aus
3. Gehen Sie zu **Project Settings** → **Service Accounts**
4. Klicken Sie auf **Generate New Private Key**
5. Laden Sie die JSON-Datei herunter

### 3.2 Service Account Key einrichten
```bash
# Service Account Key in das Projektverzeichnis kopieren
cp ~/Downloads/your-service-account-key.json ./service-account-key.json

# Berechtigungen setzen (Linux/Mac)
chmod 600 service-account-key.json
```

### 3.3 Umgebungsvariablen setzen
```bash
# .env Datei erstellen
cat > .env << EOF
FIREBASE_PROJECT_ID=trend4media-billing-[IHR-PROJEKT-NAME]
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project.iam.gserviceaccount.com
EOF
```

---

## 🌱 Schritt 4: Beispieldaten laden

### 4.1 Dependencies installieren
```bash
# Firebase Admin SDK installieren
npm install firebase-admin

# Seed-Skript ausführbar machen
chmod +x seed-firestore-data.js
```

### 4.2 Datenbank mit Beispieldaten füllen
```bash
# Seed-Skript ausführen
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

📊 Summary:
   - 4 managers
   - 4 creators
   - 3 genealogy entries
   - 2 transactions
   - 6 bonuses
   - 1 upload batches
   - 2 payouts
   - 2 messages
   - 2 monthly net records

🎯 You can now start the application and test the functionality!
```

---

## 🧪 Schritt 5: Datenbank testen

### 5.1 Firebase Functions deployen
```bash
# Functions deployen
firebase deploy --only functions
```

### 5.2 API-Endpoints testen
```bash
# Health Check
curl https://europe-west1-[IHR-PROJEKT-NAME].cloudfunctions.net/api/health

# Managers abrufen (mit Authentication)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     https://europe-west1-[IHR-PROJEKT-NAME].cloudfunctions.net/api/managers
```

### 5.3 Frontend testen
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

## 📊 Schritt 6: Datenbank überprüfen

### 6.1 Firebase Console
Gehen Sie zur [Firestore Console](https://console.firebase.google.com/project/[IHR-PROJEKT-NAME]/firestore) und überprüfen Sie:

**Sammlungen:**
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

### 6.2 Indexe überprüfen
Gehen Sie zu **Firestore** → **Indexe** und überprüfen Sie, dass alle Indexe erstellt wurden (Status: "Building" oder "Enabled").

---

## 🔧 Schritt 7: Produktionskonfiguration

### 7.1 Umgebungsvariablen für Frontend
```bash
# Frontend .env.local erstellen
cat > trend4media-frontend/.env.local << EOF
NEXT_PUBLIC_FIREBASE_PROJECT_ID=trend4media-billing-[IHR-PROJEKT-NAME]
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=[IHR-PROJEKT-NAME].firebaseapp.com
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=[IHR-PROJEKT-NAME].appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_API_URL=https://europe-west1-[IHR-PROJEKT-NAME].cloudfunctions.net/api
EOF
```

### 7.2 Firebase Hosting konfigurieren
```bash
# firebase.json überprüfen
cat firebase.json
```

**Erwartete firebase.json:**
```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "functions": {
    "source": ".",
    "runtime": "nodejs20"
  },
  "hosting": {
    "public": "trend4media-frontend/out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## 🚀 Schritt 8: Vollständiges Deployment

### 8.1 Alles deployen
```bash
# Komplettes System deployen
firebase deploy
```

### 8.2 URLs notieren
Nach dem Deployment erhalten Sie:
- **Frontend**: `https://[IHR-PROJEKT-NAME].web.app`
- **API**: `https://europe-west1-[IHR-PROJEKT-NAME].cloudfunctions.net/api`
- **Firestore**: Über Firebase Console

---

## ✅ Schritt 9: Funktionalitätstest

### 9.1 Admin-Panel testen
1. Gehen Sie zu `https://[IHR-PROJEKT-NAME].web.app/admin`
2. Melden Sie sich mit `admin@trend4media.com` / `admin123` an
3. Überprüfen Sie alle Bereiche:
   - ✅ Manager-Übersicht
   - ✅ Creator-Übersicht
   - ✅ Transaktions-Übersicht
   - ✅ Bonus-Übersicht
   - ✅ Upload-Historie
   - ✅ Payout-Management

### 9.2 Manager-Dashboard testen
1. Gehen Sie zu `https://[IHR-PROJEKT-NAME].web.app/dashboard`
2. Melden Sie sich mit `live@trend4media.com` / `manager123` an
3. Überprüfen Sie:
   - ✅ Einnahmen-Übersicht
   - ✅ Transaktions-Historie
   - ✅ Payout-Status

### 9.3 API-Endpoints testen
```bash
# Alle wichtigen Endpoints testen
curl -H "Authorization: Bearer TOKEN" \
     https://europe-west1-[IHR-PROJEKT-NAME].cloudfunctions.net/api/managers

curl -H "Authorization: Bearer TOKEN" \
     https://europe-west1-[IHR-PROJEKT-NAME].cloudfunctions.net/api/bonuses

curl -H "Authorization: Bearer TOKEN" \
     https://europe-west1-[IHR-PROJEKT-NAME].cloudfunctions.net/api/genealogy
```

---

## 🛠️ Troubleshooting

### Problem: Indexe werden nicht erstellt
**Lösung:**
```bash
# Indexe manuell deployen
firebase deploy --only firestore:indexes

# Status überprüfen
firebase firestore:indexes
```

### Problem: Service Account Key wird nicht gefunden
**Lösung:**
```bash
# Pfad überprüfen
ls -la service-account-key.json

# Umgebungsvariable setzen
export GOOGLE_APPLICATION_CREDENTIALS="./service-account-key.json"
```

### Problem: CORS-Fehler im Frontend
**Lösung:**
1. Überprüfen Sie die CORS-Konfiguration in `index.js`
2. Stellen Sie sicher, dass die Frontend-URL in den CORS-Einstellungen enthalten ist

### Problem: Authentication schlägt fehl
**Lösung:**
1. Überprüfen Sie die JWT-Token-Erstellung
2. Stellen Sie sicher, dass die Test-User korrekt konfiguriert sind

---

## 📞 Support

Bei Problemen:
1. Überprüfen Sie die Firebase Console auf Fehler
2. Schauen Sie in die Function-Logs: `firebase functions:log`
3. Überprüfen Sie die Firestore-Sicherheitsregeln
4. Testen Sie die API-Endpoints einzeln

---

## 🎯 Nächste Schritte

Nach erfolgreichem Setup:
1. **Produktionsdaten importieren**: Ersetzen Sie die Beispieldaten durch echte Daten
2. **Benutzer verwalten**: Erstellen Sie echte Manager- und Admin-Accounts
3. **Excel-Upload testen**: Testen Sie den Upload mit echten Excel-Dateien
4. **Monitoring einrichten**: Konfigurieren Sie Firebase Monitoring und Alerts
5. **Backup-Strategie**: Richten Sie regelmäßige Backups ein

---

**🎉 Herzlichen Glückwunsch! Ihre Firebase-Datenbank ist jetzt vollständig konfiguriert und einsatzbereit!**