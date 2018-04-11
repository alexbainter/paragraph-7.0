import Tone from 'tone';

const potentialNotes = [
  'A',
  'A#',
  'B',
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
].reduce((notesWithOctaves, note) => {
  const noteWithOctaves = [];
  for (let i = 3; i <= 6; i++) {
    noteWithOctaves.push(`${note}${i}`);
  }
  return notesWithOctaves.concat(noteWithOctaves);
}, []);

const playRandomNote = synth => {
  const note =
    potentialNotes[Math.floor(Math.random() * potentialNotes.length)];
  synth.triggerAttackRelease(note, '8n');
};

const numberOfSingers = 3;

for (let i = 1; i <= numberOfSingers; i++) {
  const synth = new Tone.Synth().toMaster();

  setInterval(() => {
    playRandomNote(synth);
  }, Math.random() * 10000);
}

//synth.triggerAttackRelease(potentialNotes, '8n');
