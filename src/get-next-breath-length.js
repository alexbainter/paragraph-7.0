const OUT_BREATH_AVERAGE_LENGTH_MS = 8000;
const IN_BREATH_AVERAGE_LENGTH_MS = 1000;
const BREATH_VARIANCE_MS = 1000;

const makeGetBreath = average => () =>
  average +
  (Math.random() * (BREATH_VARIANCE_MS - -BREATH_VARIANCE_MS) +
    -BREATH_VARIANCE_MS);

const getInBreath = makeGetBreath(IN_BREATH_AVERAGE_LENGTH_MS);
const getOutBreath = makeGetBreath(OUT_BREATH_AVERAGE_LENGTH_MS);

const getNextBreathLength = () => ({ in: getInBreath(), out: getOutBreath() });

export default getNextBreathLength;
