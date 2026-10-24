# Morgane Le Bastard – Sexologue (site statique)

Conversion du site Webflow en HTML/CSS/JS pur, sans dépendance Webflow.

## Structure
- `index.html` : la page (version A de la maquette : identité conservée, optimisée)
- `mentions-legales.html` : mentions légales
- `css/style.css` : styles du site (plus aucune dépendance Webflow)
- `js/main.js` : menu mobile, apparition au scroll, envoi du formulaire
- `images/` : images WebP optimisées
- `vercel.json`, `robots.txt`, `sitemap.xml`
- `_ancienne-version/` : copie fidèle du site Webflow, pour mémoire (exclue du déploiement)

Les dossiers `_transfer/`, `_source/` et `_ancienne-version/` sont exclus du déploiement : tu peux les supprimer.

## Formulaire de contact
Le formulaire envoie les messages à morganeccfsexo@gmail.com via FormSubmit (gratuit, sans compte).
Activation : au tout premier envoi, FormSubmit envoie un e-mail « Activate Form » à cette adresse → cliquer sur le lien.
Fait : l'adresse est remplacée par l'alias 9e0a94e5defee38cfc3578923b3847af dans `index.html`.
`action` du formulaire par cet identifiant pour ne plus exposer l'adresse dans le code.

## Tester en local
    npx serve .

## Déployer sur Vercel
Option 1 (GitHub) : pousse ce dossier sur un dépôt GitHub → vercel.com → Add New Project → importer le dépôt
→ Framework Preset : « Other », pas de commande de build, Output Directory : `.` → Deploy.

Option 2 (CLI) :
    npm i -g vercel
    vercel        # prévisualisation
    vercel --prod # production

## Nom de domaine
Dans Vercel → Project → Settings → Domains : ajoute `www.morganelebastard-sexologue.fr` et
`morganelebastard-sexologue.fr`, puis chez ton registrar remplace les DNS Webflow par ceux indiqués
par Vercel (A `76.76.21.21` pour la racine, CNAME `cname.vercel-dns.com` pour www).
Ne résilie l'hébergement Webflow qu'une fois le site Vercel en ligne sur le domaine.
