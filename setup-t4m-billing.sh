#!/bin/bash

# 🔥 T4M Billing - Quick Setup Script
# Für Firebase-Projekt: t4m-billing

set -e  # Exit on any error

echo "🚀 T4M Billing - Firebase Database Setup"
echo "========================================"
echo "Projekt: t4m-billing"
echo "Console: https://console.firebase.google.com/u/0/project/t4m-billing/overview"
echo ""

# Schritt 1: Firebase-Projekt verknüpfen
echo "📋 Schritt 1: Firebase-Projekt verknüpfen..."
firebase use t4m-billing
echo "✅ Projekt t4m-billing verknüpft"
echo ""

# Schritt 2: Dependencies installieren
echo "📦 Schritt 2: Dependencies installieren..."
npm install firebase-admin
echo "✅ Dependencies installiert"
echo ""

# Schritt 3: Service Account Key prüfen
echo "🔑 Schritt 3: Service Account Key prüfen..."
if [ ! -f "service-account-key.json" ]; then
    echo "❌ Service Account Key nicht gefunden!"
    echo "Bitte laden Sie den Key von hier herunter:"
    echo "https://console.firebase.google.com/u/0/project/t4m-billing/settings/serviceaccounts/adminsdk"
    echo "und speichern Sie ihn als 'service-account-key.json'"
    exit 1
fi
echo "✅ Service Account Key gefunden"
echo ""

# Schritt 4: Firestore-Regeln deployen
echo "🔒 Schritt 4: Firestore-Sicherheitsregeln deployen..."
firebase deploy --only firestore:rules --project t4m-billing
echo "✅ Sicherheitsregeln deployed"
echo ""

# Schritt 5: Indexe deployen
echo "📊 Schritt 5: Firestore-Indexe deployen..."
firebase deploy --only firestore:indexes --project t4m-billing
echo "✅ Indexe deployed (kann 5-10 Minuten dauern)"
echo ""

# Schritt 6: Beispieldaten laden
echo "🌱 Schritt 6: Beispieldaten laden..."
node seed-firestore-data.js
echo "✅ Beispieldaten geladen"
echo ""

# Schritt 7: Functions deployen
echo "⚡ Schritt 7: Firebase Functions deployen..."
firebase deploy --only functions --project t4m-billing
echo "✅ Functions deployed"
echo ""

# Schritt 8: Status anzeigen
echo "📊 Schritt 8: Setup-Status..."
echo "========================================"
echo "✅ Firebase-Projekt: t4m-billing"
echo "✅ Firestore-Datenbank: Konfiguriert"
echo "✅ Sicherheitsregeln: Deployed"
echo "✅ Indexe: Deployed"
echo "✅ Beispieldaten: Geladen"
echo "✅ Functions: Deployed"
echo ""
echo "🌐 URLs:"
echo "  - Firebase Console: https://console.firebase.google.com/u/0/project/t4m-billing/overview"
echo "  - Firestore: https://console.firebase.google.com/u/0/project/t4m-billing/firestore/data"
echo "  - API: https://europe-west1-t4m-billing.cloudfunctions.net/api"
echo ""
echo "🧪 Nächste Schritte:"
echo "  1. Frontend starten: cd trend4media-frontend && npm run dev"
echo "  2. Admin-Panel testen: http://localhost:3000/admin"
echo "  3. Login: admin@trend4media.com / admin123"
echo ""
echo "🎉 Setup erfolgreich abgeschlossen!"