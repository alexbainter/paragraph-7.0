import Tone from "tone";
import maleNotes from "./notes/male";
import femaleNotes from "./notes/female";

const makeGetFilenameForNote = type => note =>
  `chorus-${type}-${note.toLowerCase().replace("#", "sharp")}.wav`;

const getMaleFilenameForNote = makeGetFilenameForNote("male");
const getFemaleFilenameForNote = makeGetFilenameForNote("female");

const makeNoteReduceFunction = getFilenameForNote => (filenames, note) => {
  filenames[note] = getFilenameForNote(note);
  return filenames;
};

const noteMap = Object.assign(
  {},
  maleNotes.reduce(makeNoteReduceFunction(getMaleFilenameForNote), {}),
  femaleNotes.reduce(makeNoteReduceFunction(getFemaleFilenameForNote), {})
);

const getChorus = () =>
  new Promise((resolve, reject) => {
    const chorus = new Tone.Sampler(noteMap, {
      release: 1,
      baseUrl: "./Samples/Chorus/",
      onload: () => resolve(chorus),
    }).toMaster();
  });

export default getChorus;
