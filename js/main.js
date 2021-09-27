const getRandomFloat = (min, max, precision) => {
  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }

  const numIncludeToRange = (precision === 0) ? 1 : (1 / 10 ** precision);
  const num = min + Math.random() * (max + numIncludeToRange - min);
  return Math.floor(num * 10 ** precision) / 10 ** precision;
};

const getRandomIntNumber = (min, max) => getRandomFloat(min, max, 0);

getRandomFloat(1, 10, 2);
getRandomIntNumber (20, 40);
