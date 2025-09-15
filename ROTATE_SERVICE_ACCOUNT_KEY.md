# 🔑 Service Account Key Rotation - Schritt-für-Schritt

## ⚠️ KRITISCH: Service Account Key war kompromittiert!

### Schritt 1: Firebase Console öffnen
1. Gehen Sie zu: https://console.firebase.google.com/u/0/project/t4m-billing/settings/serviceaccounts/adminsdk
2. Melden Sie sich mit Ihrem Google-Account an

### Schritt 2: Alten Key löschen
1. Klicken Sie auf den **Service Account** `firebase-adminsdk-fbsvc@t4m-billing.iam.gserviceaccount.com`
2. Klicken Sie auf **"Schlüssel löschen"** oder **"Delete Key"**
3. Bestätigen Sie die Löschung

### Schritt 3: Neuen Key generieren
1. Klicken Sie auf **"Neuen privaten Schlüssel generieren"** oder **"Generate new private key"**
2. Wählen Sie **JSON-Format**
3. Klicken Sie auf **"Schlüssel generieren"**

### Schritt 4: Neuen Key sicher speichern
1. **NICHT** im Repository speichern!
2. Speichern Sie als `service-account-key-NEU.json` außerhalb des Projekts
3. Setzen Sie Berechtigungen: `chmod 600 service-account-key-NEU.json`

### Schritt 5: Neuen Key in Seed-Skript verwenden
```bash
# Kopieren Sie den neuen Key in das Projekt
cp /path/to/service-account-key-NEU.json /workspace/service-account-key.json

# Berechtigungen setzen
chmod 600 service-account-key.json

# Testen
npm run seed:t4m
```

### Schritt 6: Git-History bereinigen
```bash
# ACHTUNG: Verliert Git-History!
git filter-repo --path service-account-key.json --invert-paths
git push origin main --force
```

## ✅ Erfolgskriterien:
- [ ] Alter Key ist gelöscht
- [ ] Neuer Key ist generiert
- [ ] Neuer Key ist sicher gespeichert
- [ ] Seed-Skript funktioniert mit neuem Key
- [ ] Git-History ist bereinigt
- [ ] Keine Keys mehr im Repository

## 🚨 WARNUNG:
**Der alte Key ist kompromittiert und muss sofort rotiert werden!**