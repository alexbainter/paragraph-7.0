import Tone from "tone";
import getNextBreathLength from "./get-next-breath-length";
import piece from "./piece";
import notes from "./notes";

const getRandomNote = potentialNotes =>
  potentialNotes[Math.floor(Math.random() * potentialNotes.length)];

const singer = singers => {
  const synth = new Tone.Synth({
    envelope: {
      release: 0.3,
    },
  }).toMaster();
  let currentNote;

  const getNextNote = () => {
    const notesBeingSung = singers.map(({ getCurrentNote }) =>
      getCurrentNote()
    );
    let possibleNextNotes = notes.filter(
      note => !notesBeingSung.includes(note)
    );
    if (possibleNextNotes.length === 0) {
      possibleNextNotes = notes;
    }
    let note = getRandomNote(possibleNextNotes);
    while (note === currentNote) {
      note = getRandomNote(possibleNextNotes);
    }
    return note;
  };

  const singNote = (note, length) => {
    currentNote = note;
    synth.triggerAttackRelease(note, length / 1000);
  };

  const singLine = (line, breath) => {
    const note = getNextNote();
    singNote(note, breath.out);
  };

  const schedulePiece = () => {
    let totalBreathTime = 0;
    piece.forEach(line => {
      const breath = getNextBreathLength();
      Tone.Transport.schedule(() => {
        singLine(line, breath);
      }, totalBreathTime / 1000);
      totalBreathTime += breath.in + breath.out;
    });
  };

  return {
    getCurrentNote: () => currentNote,
    schedulePiece,
  };
};

export default singer;
