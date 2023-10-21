# probleme-entrevue-Bell

# Détection de Fraude Électorale en TypeScript

Bienvenue dans le référentiel GitHub pour la solution au problème de détection de fraude électorale en TypeScript suite a l'entrevue avec l'equipe de Gestion du centre de contact de Bell !

## Description du Problème

Le jour des élections, une machine à voter enregistre les données sous la forme `(voter_id, candidate_id)` dans un fichier texte. Le but de ce programme est de lire ce fichier en continu en tant que flux et de renvoyer les trois premiers candidats a un moment donné. De plus, si l'algorithme détecte qu'un électeur a voté plus d'une fois, il doit signaler cette situation comme une fraude.

## Comment ça marche

J'utilise TypeScript pour accomplir cette tâche. Voici comment ça fonctionne :

1. **Lecture en continu du fichier**: Le programme lit le fichier texte en continu, ligne par ligne, pour traiter les votes au fur et à mesure qu'ils sont sauvegardes.

2. **Suivi des votes**: Pour chaque vote, le programme maintient un suivi des votes reçus par chaque candidat à l'aide d'une structure de données appropriée.

3. **Détection de la fraude**: Si un électeur vote plus d'une fois pour différents candidats, le programme détecte cette fraude et signale l'incident.

4. **Affichage des résultats**: À tout moment, le programme renvoie les trois premiers candidats.

## Comment Utiliser le Programme

Pour utiliser ce programme, suivez ces étapes :

1. Clonez ce référentiel sur votre ordinateur :

git clone https://github.com/YounesAnys/probleme-entrevue-Bell


2. Assurez-vous d'avoir TypeScript installés sur votre ordinateur.

3. Installez les dépendances en exécutant la commande suivante :
npm install

4. Compilez le code TypeScript utilisant la commande :

tsc

5. Exécutez le programme
   
6.Le programme affichera les trois premiers candidats à un moment donné et signalera toute fraude détectée.

