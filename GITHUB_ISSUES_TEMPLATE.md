# 🚨 GitHub Issues - Trend4Media Billing System

## 🔴 CRITICAL SECURITY ISSUES

### Issue #1: Service Account Key Kompromittiert
- [ ] **Priority:** 🔴 CRITICAL
- [ ] **Status:** Open
- [ ] **Assignee:** @security-team
- [ ] **Description:** `service-account-key.json` ist im Repository eingecheckt
- [ ] **Impact:** Vollzugriff auf Firebase-Projekt möglich
- [ ] **Actions:**
  - [ ] Service Account Key in Firebase Console rotieren
  - [ ] Neuen Key generieren und sicher speichern
  - [ ] Git-History bereinigen mit `git filter-repo`
  - [ ] `.gitignore` erweitern um `service-account-key.json`
- [ ] **Acceptance Criteria:**
  - [ ] Alter Key ist rotiert
  - [ ] Neuer Key ist sicher gespeichert
  - [ ] Git-History ist bereinigt
  - [ ] Keine Keys mehr im Repository

### Issue #2: Produktive Daten im Repository
- [ ] **Priority:** 🔴 CRITICAL
- [ ] **Status:** Open
- [ ] **Assignee:** @data-protection-team
- [ ] **Description:** Echte Nutzerdaten in `.json` und `.xlsx` Dateien
- [ ] **Impact:** DSGVO-Verletzung, Datenleak
- [ ] **Actions:**
  - [ ] Alle `.json` Dateien mit echten Daten entfernen
  - [ ] Alle `.xlsx` Dateien mit echten Daten entfernen
  - [ ] Nur Dummy-/Seed-Daten behalten
  - [ ] `.gitignore` erweitern um `*.json`, `*.xlsx`
- [ ] **Acceptance Criteria:**
  - [ ] Keine echten Daten mehr im Repository
  - [ ] Nur Dummy-/Seed-Daten vorhanden
  - [ ] `.gitignore` erweitert

### Issue #3: Firestore-Regeln Unsicher
- [ ] **Priority:** 🟠 HIGH
- [ ] **Status:** Open
- [ ] **Assignee:** @security-team
- [ ] **Description:** Kein "deny by default", Rollen nicht durchgesetzt
- [ ] **Impact:** Unbefugter Datenzugriff möglich
- [ ] **Actions:**
  - [ ] Firestore-Regeln auf "deny by default" umstellen
  - [ ] Custom Claims für Rollen implementieren
  - [ ] Unit-Tests für Firestore-Regeln schreiben
- [ ] **Acceptance Criteria:**
  - [ ] Alle Regeln folgen "deny by default"
  - [ ] Rollen sind korrekt durchgesetzt
  - [ ] Unit-Tests bestehen

## 🟠 ARCHITECTURE & DATA FLOW

### Issue #4: Architektur Inkonsistent
- [ ] **Priority:** 🟠 HIGH
- [ ] **Status:** Open
- [ ] **Assignee:** @architecture-team
- [ ] **Description:** README spricht von Next.js, aber statische HTML/JS Files vorhanden
- [ ] **Impact:** Verwirrung, Wartbarkeit
- [ ] **Actions:**
  - [ ] Entscheidung für Next.js ODER Static Hosting
  - [ ] Codebase konsolidieren
  - [ ] README aktualisieren
- [ ] **Acceptance Criteria:**
  - [ ] Einheitliche Architektur
  - [ ] README stimmt mit Code überein
  - [ ] Wartbare Codebase

### Issue #5: Upload-Pipeline Nicht Idempotent
- [ ] **Priority:** 🟠 HIGH
- [ ] **Status:** Open
- [ ] **Assignee:** @backend-team
- [ ] **Description:** Mehrfaches Einspielen kann Daten duplizieren
- [ ] **Impact:** Dateninkonsistenz, Duplikate
- [ ] **Actions:**
  - [ ] Idempotency-Key implementieren
  - [ ] Batch/Transaktionen verwenden
  - [ ] Validierungsreport erstellen
  - [ ] Dead-letter-Queue implementieren
- [ ] **Acceptance Criteria:**
  - [ ] Uploads sind idempotent
  - [ ] Keine Duplikate möglich
  - [ ] Validierung funktioniert

### Issue #6: Kommissionslogik Verstreut
- [ ] **Priority:** 🟡 MEDIUM
- [ ] **Status:** Open
- [ ] **Assignee:** @business-logic-team
- [ ] **Description:** Mehrere Test-Dateien deuten auf verstreute Business-Logik
- [ ] **Impact:** Wartbarkeit, Testbarkeit
- [ ] **Actions:**
  - [ ] Logik als isoliertes Domain-Paket extrahieren
  - [ ] Pure Functions implementieren
  - [ ] Snapshot-Tests schreiben
- [ ] **Acceptance Criteria:**
  - [ ] Kommissionslogik ist zentralisiert
  - [ ] Pure Functions sind testbar
  - [ ] Snapshot-Tests bestehen

## 🟡 CI/CD, QUALITY, MONITORING

### Issue #7: CI-Pipeline Unklar
- [ ] **Priority:** 🟡 MEDIUM
- [ ] **Status:** Open
- [ ] **Assignee:** @devops-team
- [ ] **Description:** Mehrere unklare CI-YMLs vorhanden
- [ ] **Impact:** Deployment-Probleme
- [ ] **Actions:**
  - [ ] CI-Pipeline vereinheitlichen
  - [ ] Pipeline: lint → typecheck → test → build → deploy
  - [ ] Dokumentation erstellen
- [ ] **Acceptance Criteria:**
  - [ ] Einheitliche CI-Pipeline
  - [ ] Alle Schritte dokumentiert
  - [ ] Deployment funktioniert

### Issue #8: Tests Unsystematisch
- [ ] **Priority:** 🟡 MEDIUM
- [ ] **Status:** Open
- [ ] **Assignee:** @qa-team
- [ ] **Description:** Unit-/Integration-/E2E-Trennung fehlt
- [ ] **Impact:** Qualität, Wartbarkeit
- [ ] **Actions:**
  - [ ] Unit-Tests für Berechnungsregeln
  - [ ] Integration-Tests für Uploads
  - [ ] E2E-Tests mit Playwright
  - [ ] Firestore-Rule-Tests
- [ ] **Acceptance Criteria:**
  - [ ] Test-Pyramide implementiert
  - [ ] Alle Tests bestehen
  - [ ] Coverage > 80%

### Issue #9: Fehlendes Monitoring
- [ ] **Priority:** 🟡 MEDIUM
- [ ] **Status:** Open
- [ ] **Assignee:** @ops-team
- [ ] **Description:** Kein strukturiertes Logging und Monitoring
- [ ] **Impact:** Debugging, Performance
- [ ] **Actions:**
  - [ ] Strukturiertes Logging implementieren
  - [ ] Cloud Monitoring Alerts einrichten
  - [ ] Metriken definieren
- [ ] **Acceptance Criteria:**
  - [ ] Logging ist strukturiert
  - [ ] Alerts sind konfiguriert
  - [ ] Metriken sind verfügbar

## 🟢 UX & PRODUKT

### Issue #10: Rollenbasierte Navigation Unklar
- [ ] **Priority:** 🟢 LOW
- [ ] **Status:** Open
- [ ] **Assignee:** @ux-team
- [ ] **Description:** Getrennte Dashboards für Admin/Manager unklar
- [ ] **Impact:** Benutzerfreundlichkeit
- [ ] **Actions:**
  - [ ] Getrennte Dashboards implementieren
  - [ ] Feature-Flags für neue Bonusarten
  - [ ] UX-Tests durchführen
- [ ] **Acceptance Criteria:**
  - [ ] Klare Navigation pro Rolle
  - [ ] Feature-Flags funktionieren
  - [ ] UX-Tests bestehen

### Issue #11: Excel-Upload Unfreundlich
- [ ] **Priority:** 🟢 LOW
- [ ] **Status:** Open
- [ ] **Assignee:** @ux-team
- [ ] **Description:** Excel-Upload-Prozess ist nicht benutzerfreundlich
- [ ] **Impact:** Benutzerfreundlichkeit
- [ ] **Actions:**
  - [ ] Wizard implementieren (Schritt 1: Vergleichsmonat, Schritt 2: aktueller Monat)
  - [ ] Validierungsreport mit Fehlerzeilen
  - [ ] Retry/Undo-Funktionalität
- [ ] **Acceptance Criteria:**
  - [ ] Wizard ist implementiert
  - [ ] Validierung funktioniert
  - [ ] Retry/Undo funktioniert

## 🔵 DOKUMENTATION & DX

### Issue #12: README vs. Realität Inkonsistent
- [ ] **Priority:** 🟢 LOW
- [ ] **Status:** Open
- [ ] **Assignee:** @docs-team
- [ ] **Description:** README stimmt nicht mit der Realität überein
- [ ] **Impact:** Entwicklererfahrung
- [ ] **Actions:**
  - [ ] README anpassen
  - [ ] Echtes Setup dokumentieren
  - [ ] Deploy-Befehle dokumentieren
- [ ] **Acceptance Criteria:**
  - [ ] README ist aktuell
  - [ ] Setup funktioniert
  - [ ] Deploy funktioniert

### Issue #13: Setup-Skripte Unsicher
- [ ] **Priority:** 🟡 MEDIUM
- [ ] **Status:** Open
- [ ] **Assignee:** @devops-team
- [ ] **Description:** Setup-Skripte sind unsicher
- [ ] **Impact:** Sicherheit, Stabilität
- [ ] **Actions:**
  - [ ] `set -e` hinzufügen
  - [ ] Projekt-ID-Prompt implementieren
  - [ ] Schutz vor Prod-Deploy
- [ ] **Acceptance Criteria:**
  - [ ] Skripte sind sicher
  - [ ] Fehler werden abgefangen
  - [ ] Prod-Deploy ist geschützt

### Issue #14: Changelogs Fehlen
- [ ] **Priority:** 🟢 LOW
- [ ] **Status:** Open
- [ ] **Assignee:** @docs-team
- [ ] **Description:** Keine Changelogs für Änderungen
- [ ] **Impact:** Nachverfolgbarkeit
- [ ] **Actions:**
  - [ ] Changelog-System implementieren
  - [ ] Änderungs-Log pro Kommissionsregel
  - [ ] Versionierung einführen
- [ ] **Acceptance Criteria:**
  - [ ] Changelog-System ist implementiert
  - [ ] Alle Änderungen sind dokumentiert
  - [ ] Versionierung funktioniert

---

## 📋 PRIORITÄTEN

1. **🔴 SOFORT:** Issues #1, #2, #3 (Sicherheit)
2. **🟠 DIESE WOCHE:** Issues #4, #5, #6 (Architektur)
3. **🟡 NÄCHSTE WOCHE:** Issues #7, #8, #9 (CI/CD, Qualität)
4. **🟢 BALD:** Issues #10-14 (UX, Dokumentation)

---

## 🎯 NÄCHSTE SCHRITTE

1. **Sofortige Maßnahmen:** Secrets löschen & rotieren, Daten/Backups raus
2. **Sicherheit:** Firestore-Regeln härten, CI-Secrets korrekt setzen
3. **Architektur:** Codebase refactoren, Pipelines vereinheitlichen
4. **Qualität:** Tests implementieren, Monitoring einrichten