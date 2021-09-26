const getRandomNumber = (min, max) => {
  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }

  const result = min + Math.random() * (max - min);
  return result;
};

const getRandomIntNumber = (min, max) => {
  const number = getRandomNumber(min, max + 1);
  const roundedNumber = Math.floor(number);
  return roundedNumber;
};

const getRandomAnyNumber = (min, max, signsAfterComma = 0) => {
  let numIncludeToRange;
  signsAfterComma === 0
    ? (numIncludeToRange = 1)
    : (numIncludeToRange = 1 / 10 ** signsAfterComma);

  const number = getRandomNumber(min, max + numIncludeToRange);

  const roundedNumber = (Math.floor(number * 10 ** signsAfterComma)) / 10 ** signsAfterComma;

  return roundedNumber;
};

getRandomIntNumber(10, 40);
getRandomAnyNumber(5, 10, 3);
