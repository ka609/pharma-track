<h2📌 PharmaTrack — Gestion de Pharmacie (Angular)>
📖 Contexte

Dans les zones rurales au Burkina Faso, les dépôts pharmaceutiques manquent souvent d’outils numériques.
PharmaTrack est une application simple et légère permettant :

le suivi du stock de médicaments,
la gestion des ventes,
les alertes automatiques en cas de rupture,
un tableau de bord avec statistiques et indicateurs.

<h3🚀 Fonctionnalités>

Gestion des médicaments : CRUD complet (ajouter, modifier, supprimer, lister).
Ventes : enregistrement des ventes, décrément automatique du stock, calcul du chiffre d’affaires.
Dashboard : chiffre d’affaires du jour, médicaments en rupture, graphique des ventes.
Authentification simplifiée : admin / utilisateur avec guards.
API REST mockée avec json-server.

<h3🛠️ Installation>
1️⃣ Prérequis

Node.js (v18 ou plus recommandé) ;
Angular CLI installé globalement :
```bash
npm install -g @angular/cli
json-server pour simuler l’API REST :
npm install -g json-server
```

2️⃣ Cloner le projet
```bash
git clone https://github.com/ton-utilisateur/pharmatrack.git
cd pharmatrack
```

3️⃣ Installer les dépendances
```bash
npm install
```
4️⃣ Lancer l’API REST (json-server)
Dans un terminal séparé, exécuter :
```bash
json-server --watch db.json --port 3000
```


👉 L’API sera disponible sur http://localhost:3000.<br>  Endpoints simulés :<br>  http://localhost:3000/medicines → gestion des médicaments <br>  http://localhost:3000/sales → gestion des ventes <br> http://localhost:3000/users → gestion des utilisateurs

5️⃣ Lancer l’application Angular
```bash
ng serve
```


👉 L’application sera disponible sur http://localhost:4200/.<br>

<h3🔑 Authentification>

Deux types d’utilisateurs sont gérés : <br>
Admin → accès complet (stocks + utilisateurs + ventes) <br>
Utilisateur → accès limité (ventes et dashboard).


<h3📊 Aperçu rapide des pages>

Login : connexion admin / utilisateur <br>
Dashboard : statistiques principales (CA du jour, ventes, ruptures) <br>
Médicaments : gestion des stocks (admin uniquement) <br>
Ventes : enregistrement et suivi des ventes <br>
Utilisateurs : gestion des comptes (admin uniquement)

<h3👨‍💻 Contribution>

Fork le projet
Crée une branche (git checkout -b feature/ma-fonctionnalite) <br>
Commit (git commit -m 'Ajout d’une nouvelle fonctionnalité') <br>
Push (git push origin feature/ma-fonctionnalite) <br>
Crée une Pull Request

<h3📜 Licence>

Projet académique, libre d’utilisation pour l’amélioration de la gestion des pharmacies locales.
