# 💊 PharmaTrack — Gestion de Pharmacie (Angular)

## 📖 Contexte

Dans les zones rurales du **Burkina Faso**, les dépôts pharmaceutiques manquent souvent d’outils numériques.  
**PharmaTrack** est une application simple et légère permettant :

- le suivi du stock de médicaments,  
- la gestion des ventes,  
- les alertes automatiques en cas de rupture,  
- un tableau de bord avec statistiques et indicateurs.

---

## 🚀 Fonctionnalités

- **Gestion des médicaments** : CRUD complet (ajouter, modifier, supprimer, lister).  
- **Ventes** : enregistrement des ventes, décrément automatique du stock, calcul du chiffre d’affaires.  
- **Dashboard** : chiffre d’affaires du jour, médicaments en rupture, graphique des ventes.  
- **Authentification simplifiée** : admin / utilisateur avec guards.  
- **API REST mockée** avec *json-server*.

---

## 🛠️ Installation

### 1️⃣ Prérequis
- **Node.js** (v18 ou plus recommandé)  
- **Angular CLI** installé globalement :
  ```bash
  npm install -g @angular/cli
  ```
- **json-server** pour simuler l’API REST :
  ```bash
  npm install -g json-server
  ```

### 2️⃣ Cloner le projet
```bash
git clone https://github.com/ka609/pharma-track.git
cd pharma-track
```

### 3️⃣ Installer les dépendances
```bash
npm install
```

### 4️⃣ Lancer l’API REST (json-server)
Dans un terminal séparé :
```bash
json-server --watch db.json --port 3000
```

👉 L’API sera disponible sur [http://localhost:3000](http://localhost:3000).  
Endpoints simulés :  
- `/medicines` → gestion des médicaments  
- `/sales` → gestion des ventes  
- `/users` → gestion des utilisateurs

### 5️⃣ Lancer l’application Angular
```bash
ng serve
```

👉 L’application sera disponible sur [http://localhost:4200](http://localhost:4200).

---

## 🔑 Authentification

Deux types d’utilisateurs sont gérés :  
- **Admin** → accès complet (stocks + utilisateurs + ventes)  
- **Utilisateur** → accès limité (ventes et dashboard)

---

## 📊 Aperçu rapide des pages

- **Login** → connexion admin / utilisateur  
- **Dashboard** → statistiques principales (CA du jour, ventes, ruptures)  
- **Médicaments** → gestion des stocks (admin uniquement)  
- **Ventes** → enregistrement et suivi des ventes  
- **Utilisateurs** → gestion des comptes (admin uniquement)

---

## 🎥 Démonstration

Une vidéo de démonstration est disponible dans le dossier [`/demo`](./demo/video.mp4).  
👉 [Clique ici pour voir la vidéo](./demo/video.mp4)

---

## 👥 Équipe du projet

Projet développé par **3 étudiants** :  
- 👤 *KASSONGO Moussa*  
- 👤 *BIKIEGA Hamza*  
- 👤 *MARANGA Neimatou*

---

## 👨‍💻 Contribution

1. Fork le projet  
2. Crée une branche :
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
3. Commit :
   ```bash
   git commit -m "Ajout d’une nouvelle fonctionnalité"
   ```
4. Push :
   ```bash
   git push origin feature/ma-fonctionnalite
   ```
5. Crée une **Pull Request**

---

## 📜 Licence

_Projet académique — libre d’utilisation pour améliorer la gestion des pharmacies locales._
