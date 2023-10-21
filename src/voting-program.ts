import * as fs from 'fs';

const filePath = 'votes.txt';

interface Vote {
  voterId: string;
  candidateId: number;
}


const voters: Set<string> = new Set();
const candidates: Map<number, number> = new Map();
const readStream = fs.createReadStream(filePath, 'utf-8');

readStream.on('data', (data: string) => {
  const lines = data.split('\n');
  lines.forEach((line) => {
    if (line.trim() !== '') {
      const [voterId, candidateId] = line
        .slice(1, -1)
        .split(',')
        .map((part) => part.trim());
      const candidateIdNum = parseInt(candidateId, 10);

      if (voters.has(voterId)) {
        console.log(`Fraude detectee: l'electeur ${voterId} a voté plus d'une fois .`);
      } else {
        voters.add(voterId);

        if (candidates.has(candidateIdNum)) {
          candidates.set(candidateIdNum, candidates.get(candidateIdNum)! + 1);
        } else {
          candidates.set(candidateIdNum, 1);
        }
      }
    }
  });
});

readStream.on('end', () => {
  // logique pour renvoyer les candidats
});

readStream.on('error', (error) => {
  console.error('Erreur de lecture du fichier txt :', error);
});
