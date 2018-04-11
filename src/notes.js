const notes = [
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

export default notes;
