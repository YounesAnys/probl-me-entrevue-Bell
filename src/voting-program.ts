import * as fs from 'fs';

//// le  path du fichier à partir duquel on va lire les donnees
const filePath = 'votes.txt';


// Définir la structure des donnees d'un vote
interface Vote {
  voterId: string; // Id de l'electeur
  candidateId: number; // Id du candidat
}

// Set pour suivre les electeurs et detecter la fraude
const voters: Set<string> = new Set();

// Map pour suivre le nombre de votes pour chaque candidat
const candidates: Map<number, number> = new Map();


const topCandidates: number[] = [];


// Creer un ReadStream pour lire les données à partir du fichier
// Exemple suivi pour reference : https://stackoverflow.com/questions/33643107/read-and-write-a-text-file-in-typescript

const readStream = fs.createReadStream(filePath, 'utf-8');

readStream.on('data', (data: string) => {
    // Diviser les donnees en lignes
  const lines = data.split('\n');
  lines.forEach((line) => {
    if (line.trim() !== '') {
        // Analyser l'Id de l'électeur et l'Id du candidat a partir de la ligne
      const [voterId, candidateId] = line
        .slice(1, -1)  // Supprimer les parentheses
        .split(',')
        .map((part) => part.trim());
      const candidateIdNum = parseInt(candidateId, 10);


    // Verifier si fraude
      if (voters.has(voterId)) {
        console.log(`Fraude detectee: l'electeur ${voterId} a voté plus d'une fois .`);
      } else {
        voters.add(voterId);

        if (candidates.has(candidateIdNum)) {
          candidates.set(candidateIdNum, candidates.get(candidateIdNum)! + 1);
        } else {
          candidates.set(candidateIdNum, 1);
        }

         // Update du tableau topCandidates avec les 3 premiers candidats avec le plus de votes
         topCandidates.sort((a, b) => candidates[b] - candidates[a]);
         if (
           topCandidates.length < 3 ||
           candidates[candidateIdNum] >= candidates[topCandidates[2]]
         ) {
           topCandidates.push(candidateIdNum);
           topCandidates.sort((a, b) => candidates[b] - candidates[a]);
           if (topCandidates.length > 3) {
             topCandidates.pop();
           }
         }
       }
     }
   });
 });

readStream.on('end', () => {
  // logique pour renvoyer les candidats
  // Print les 3 premeirs candidats
  console.log('Les 3 premiers candidats :');
  for (const candidateId of topCandidates) {
    console.log(`Candidat ${candidateId} - Votes: ${candidates[candidateId]}`);
  }
});

readStream.on('error', (error) => {
  console.error('Erreur de lecture du fichier txt :', error);
});
