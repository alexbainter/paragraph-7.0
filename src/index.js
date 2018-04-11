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

const getRandomNote = () =>
  potentialNotes[Math.floor(Math.random() * potentialNotes.length)];

const playRandomNote = synth => {
  const note = getRandomNote();
  playNote(synth, note);
};

const playNote = (synth, note) => {
  synth.triggerAttackRelease(note, '8n');
};

const numberOfSingers = 0;

for (let i = 1; i <= numberOfSingers; i++) {
  const synth = new Tone.Synth().toMaster();
  const note = getRandomNote();
  setInterval(() => {
    playRandomNote(synth, note);
  }, Math.random() * 1000);
}

//synth.triggerAttackRelease(potentialNotes, '8n');
