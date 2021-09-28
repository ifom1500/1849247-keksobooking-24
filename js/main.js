const getRandomFloat = (min, max, precision) => {
  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  return +(Math.random() * (max - min) + min).toFixed(precision);
};

const getRandomInteger = (min, max) => getRandomFloat(min, max, 0);

getRandomFloat(1, 10, 2);
getRandomInteger (20, 40);
