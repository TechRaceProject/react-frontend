### Projet frontend ###

Les commandes suivantes sont à exécuter dans le repertoire principal du projet.

#### Installation ####

1. installation des packages : `yarn -i` 

2. lancer l'application web : `yarn run web`

3. lancer l'application mobile : `yarn run android`

#### Helpers ####
- `unix:refresh` : suppression et reinstallation des nodes modules (seulement sur les machines unix)

- `windows:refresh` : suppression et reinstallation des nodes modules (seulement sur les machines windows)

- `yarn lint:format` : formatage du code et prévention des erreurs

- `yarn lint` : vérification des erreurs

### Configuration pour lancer l'application mobile

- Dans le fichier `App.ts` du dossier `react-native`, vous devez définir la variable `apiUrl`.
- Dans le fichier `socket.config.ts`, situé dans `react_native/src`, vous devez définir l'adresse IP pour la configuration du socket.

Si votre application tourne sur un **appareil Android physique** (par exemple, avec l'adresse IP locale `192.168.1.50` et le port `8000`, indiquer le port uniquement pour le `apiUrl`), vous devez indiquer l'IP du réseau local dans ces fichiers.

Si vous utilisez un **émulateur Android virtuel**, alors configurez l'IP comme suit :
  - `apiUrl` : utilisez l'IP `10.0.0.2` avec le port `8000`.
  - `socket` : utilisez uniquement l'IP `10.0.0.2` sans spécifier de port.

