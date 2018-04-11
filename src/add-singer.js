import Tone from 'tone';
import notes from './notes';

let currentNote;

const getCurrentNote = () => currentNote;

const singer = () => ({
  getCurrentNote,
});

const getRandomNote = potentialNotes =>
  potentialNotes[Math.floor(Math.random() * potentialNotes.length)];

const selectNote = singers => {
  const notesBeingSung = singers.map(({ getCurrentNote }) => getCurrentNote());
  let possibleNextNotes = notes.filter(note => !notesBeingSung.includes(note));
  if (possibleNextNotes.length === 0) {
    possibleNextNotes = notes;
  }
  let note = getRandomNote(possibleNextNotes);
  while (nextNote === currentNote) {
    nextNote = getRandomNote(possibleNextNotes);
  }
  return note;
};

const addSinger = singers => {};

export default addSinger;
