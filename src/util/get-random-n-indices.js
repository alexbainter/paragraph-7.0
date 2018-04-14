import shuffle from 'shuffle-array';

const getRandomNIndices = (n, length) => {
  const possibleIndices = [];
  for (let i = 0; i < length; i++) {
    possibleIndices.push(i);
  }
  shuffle(possibleIndices);
  return possibleIndices.slice(0, n);
};

export default getRandomNIndices;
