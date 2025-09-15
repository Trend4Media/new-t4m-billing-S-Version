# 🚀 Firebase Functions manuell deployen

## ⚠️ Problem: CORS-Fehler weil Functions nicht deployed sind

### Lösung 1: Firebase Login (empfohlen)
```bash
# 1. Firebase login (manuell im Browser)
firebase login

# 2. Functions deployen
firebase deploy --only functions --project t4m-billing

# 3. Firestore Rules deployen
firebase deploy --only firestore:rules --project t4m-billing
```

### Lösung 2: Service Account Key verwenden
```bash
# 1. Service Account Key rotieren (Firebase Console)
# 2. Neuen Key als service-account-key.json speichern
# 3. Mit Key deployen
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json firebase deploy --only functions --project t4m-billing
```

### Lösung 3: Demo-Modus verwenden (sofort verfügbar)
- Verwenden Sie: `central-login-working.html`
- Funktioniert ohne Firebase Functions
- Simuliert Login für Demo-Zwecke

## 🎯 Sofortige Lösung

**Verwenden Sie diese URL für sofortige Tests:**
https://trend4media.github.io/new-t4m-billing-S-Version/central-login-working.html

**Oder lokal:**
http://localhost:8000/central-login-working.html