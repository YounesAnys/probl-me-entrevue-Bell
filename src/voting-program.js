"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
// Définir le chemin du fichier à partir duquel on va lire les données
var filePath = 'votes.txt';
// Set pour suivre les électeurs et détecter la fraude
var voters = new Set();
// Map pour suivre le nombre de votes pour chaque candidat
var candidates = new Map();
var topCandidates = [];
// Créer un ReadStream pour lire les données à partir du fichier
var readStream = fs.createReadStream(filePath, 'utf-8');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function printTopCandidates() {
    // Logique pour renvoyer les candidats
    // Print les 3 premiers candidats
    console.log('Les 3 premiers candidats :');
    for (var _i = 0, topCandidates_1 = topCandidates; _i < topCandidates_1.length; _i++) {
        var candidateId = topCandidates_1[_i];
        console.log("Candidat ".concat(candidateId, " - Votes: ").concat(candidates.get(candidateId)));
    }
}
readStream.on('data', function (data) {
    // Diviser les données en lignes
    var lines = data.split('\n');
    lines.forEach(function (line) {
        var match = line.match(/\(([^,]+), (\d+)\)/); // Utilisation d'une expression régulière pour extraire les données
        if (match) {
            var voterId = match[1];
            var candidateId = parseInt(match[2], 10);
            // Vérifier la fraude
            if (voters.has(voterId)) {
                console.log("Fraude d\u00E9tect\u00E9e: l'\u00E9lecteur ".concat(voterId, " a vot\u00E9 plus d'une fois."));
            }
            else {
                voters.add(voterId);
                if (!isNaN(candidateId)) {
                    if (candidates.has(candidateId)) {
                        candidates.set(candidateId, candidates.get(candidateId) + 1);
                    }
                    else {
                        candidates.set(candidateId, 1);
                    }
                    // Mettre à jour du tableau topCandidates avec les 3 premiers candidats avec le plus de votes
                    var sortedCandidates = Array.from(candidates.entries()).sort(function (a, b) { return b[1] - a[1]; });
                    topCandidates.length = 0; // Réinitialiser le tableau
                    for (var i = 0; i < 3 && i < sortedCandidates.length; i++) {
                        topCandidates.push(sortedCandidates[i][0]);
                    }
                }
                else {
                    console.log("Erreur : Identifiant de candidat non valide - \"".concat(candidateId, "\""));
                }
            }
        }
    });
});
readStream.on('end', function () {
    // Demander à l'utilisateur quand afficher les candidats
    rl.question('Appuyez sur Entrée pour afficher les 3 premiers candidats : ', function () {
        printTopCandidates();
        rl.close();
    });
});
readStream.on('error', function (error) {
    console.error('Erreur de lecture du fichier txt :', error);
});
