#!/bin/bash

# Deploy Firebase Functions mit Service Account Key
echo "🚀 Deploying Firebase Functions mit Service Account Key..."

# Prüfen ob Service Account Key existiert
if [ ! -f "service-account-key.json" ]; then
    echo "❌ Service Account Key nicht gefunden!"
    echo "Bitte Service Account Key als 'service-account-key.json' speichern"
    echo "Download von: https://console.firebase.google.com/u/0/project/t4m-billing/settings/serviceaccounts/adminsdk"
    exit 1
fi

# Service Account Key für Firebase verwenden
export GOOGLE_APPLICATION_CREDENTIALS="./service-account-key.json"

# Firebase Functions deployen
echo "📦 Deploying Functions..."
firebase deploy --only functions --project t4m-billing

# Firestore Rules deployen
echo "📋 Deploying Firestore Rules..."
firebase deploy --only firestore:rules --project t4m-billing

# Firestore Indexes deployen
echo "🔍 Deploying Firestore Indexes..."
firebase deploy --only firestore:indexes --project t4m-billing

echo "✅ Deployment abgeschlossen!"
echo "🌐 API verfügbar unter: https://europe-west1-t4m-billing.cloudfunctions.net/api"