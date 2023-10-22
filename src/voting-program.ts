import * as fs from 'fs';

// Définir le chemin du fichier à partir duquel on va lire les données
const filePath = 'votes.txt';

// Définir la structure des données d'un vote
interface Vote {
  voterId: string; // Id de l'électeur
  candidateId: number; // Id du candidat
}

// Set pour suivre les électeurs et détecter la fraude
const voters: Set<string> = new Set();

// Map pour suivre le nombre de votes pour chaque candidat
const candidates: Map<number, number> = new Map();

const topCandidates: number[] = [];

// Créer un ReadStream pour lire les données à partir du fichier
const readStream = fs.createReadStream(filePath, 'utf-8');

readStream.on('data', (data: string) => {
  // Diviser les données en lignes
  const lines = data.split('\n');
  lines.forEach((line) => {
    const match = line.match(/\(([^,]+), (\d+)\)/); // Utilisation d'une expression régulière pour extraire les données

    if (match) {
      const voterId = match[1];
      const candidateId = parseInt(match[2], 10);

      // Vérifier la fraude
      if (voters.has(voterId)) {
        console.log(`Fraude détectée: l'électeur ${voterId} a voté plus d'une fois.`);
      } else {
        voters.add(voterId);

        if (!isNaN(candidateId)) {
          if (candidates.has(candidateId)) {
            candidates.set(candidateId, candidates.get(candidateId)! + 1);
          } else {
            candidates.set(candidateId, 1);
          }

          // Mettre à jour du tableau topCandidates avec les 3 premiers candidats avec le plus de votes
          const sortedCandidates = Array.from(candidates.entries()).sort(
            (a, b) => b[1] - a[1]
          );

          topCandidates.length = 0; // Réinitialiser le tableau

          for (let i = 0; i < 3 && i < sortedCandidates.length; i++) {
            topCandidates.push(sortedCandidates[i][0]);
          }
        } else {
          console.log(`Erreur : Identifiant de candidat non valide - "${candidateId}"`);
        }
      }
    }
  });
});

readStream.on('end', () => {
  // Logique pour renvoyer les candidats
  // Print les 3 premiers candidats
  console.log('Les 3 premiers candidats :');
  for (const candidateId of topCandidates) {
    console.log(`Candidat ${candidateId} - Votes: ${candidates.get(candidateId)}`);
  }
});

readStream.on('error', (error) => {
  console.error('Erreur de lecture du fichier txt :', error);
});
