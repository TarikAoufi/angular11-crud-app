# Angular11-CRUD-App

Dans cette démo, on traite les points suivants : 

- Réalisation des opérations de CRUD sur des produits.

- Utilisation de "Json-server", pour simuler la partie Back-End de l'application :  
  
      - Permet d'exposer une API REST sur: http://localhost:3000/
  
      - Le fichier db.json sera utilisé comme une base de données locale pour stocker les produits.
  
  
- Utilisation de Reactive Forms, pour la gestion et la validation des formulaires.

- Gestion des états de l’application, selon le type des requêtes envoyées. Trois états possibles : Chargement des données en cours, données chargées et Erreur.

- Gestion de la communication entre les composants de l'application via :

       - Des évènements, on utilisant le gestionnaire d’évènements : EventEmitter

       - Un service, dont la solution est sur la branche : event-service

Infos:

- On utilise la commande : npm start , pour lancer simultanément 'ng serve' et 'json-server --watch db.json'

- L'application est accessible sur : http://localhost:4200/ 
  
  
