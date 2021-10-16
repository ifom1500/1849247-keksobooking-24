const NounFormsMap = {
  rooms: ['комната', 'комнаты', 'комнат'],
  guests: ['гостя', 'гостей', 'гостей'],
};


const getNounDeclension = (value, nounForms) => {
  value = Math.abs(value);
  const firstValue = value % 100;
  const secondValue = firstValue % 10;

  if (firstValue > 10 && firstValue < 20) {return nounForms[2];}
  if (secondValue > 1 && secondValue < 5) {return nounForms[1];}
  if (secondValue === 1) {return nounForms[0];}

  return nounForms[2];
};

export { NounFormsMap, getNounDeclension };
