import singer from "./singer";

const addSinger = singers => {
  const newSinger = singer(singers);
  singers.push(newSinger);
  return newSinger;
};

export default addSinger;
