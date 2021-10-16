import { NounFormsMap, getNounDeclension } from './util.js';

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const typeTranslationMap = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createListOfSimilarAdCards = (adDataArray) => {
  const fragmentOfSimilarAdCards = document.createDocumentFragment();

  adDataArray.forEach((ad) => {
    const card = cardTemplate.cloneNode(true);

    const { author: { avatar }, offer: { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } } = ad;

    const cardAvatar = card.querySelector('.popup__avatar');
    const cardTitle = card.querySelector('.popup__title');
    const cardAddress = card.querySelector('.popup__text--address');
    const cardPrice = card.querySelector('.popup__text--price');
    const cardType = card.querySelector('.popup__type');
    const cardCapacity = card.querySelector('.popup__text--capacity');
    const cardTime = card.querySelector('.popup__text--time');
    const cardFeaturesContainer = card.querySelector('.popup__features');
    const cardDescription = card.querySelector('.popup__description');
    const cardPhotoContainer = card.querySelector('.popup__photos');

    if (avatar) {
      cardAvatar.src = avatar;
    } else {
      cardAvatar.remove();
    }

    if (title) {
      cardTitle.textContent = title;
    } else {
      cardTitle.remove();
    }

    if (address) {
      cardAddress.textContent = address;
    } else {
      cardAddress.remove();
    }

    if (price) {
      cardPrice.textContent = `${price} ₽/ночь`;
    } else {
      cardPrice.remove();
    }

    if (type) {
      cardType.textContent = typeTranslationMap[type];
    } else {
      cardType.remove();
    }

    if (rooms && guests) {
      cardCapacity.textContent = `${rooms} ${getNounDeclension(rooms, NounFormsMap.rooms)} для ${guests} ${getNounDeclension(guests, NounFormsMap.guests)}`;
    } else if (!rooms && guests) {
      cardCapacity.textContent = `Просторное жилье для ${guests} ${getNounDeclension(guests, NounFormsMap.guests)}`;
    } else if (rooms && !guests) {
      cardCapacity.textContent = `${rooms} ${getNounDeclension(rooms, NounFormsMap.rooms)} для одного или нескольких гостей`;
    } else {
      cardCapacity.remove();
    }

    if (checkin && checkout) {
      cardTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    } else if (!checkin && checkout) {
      cardTime.textContent = `Выезд до ${checkout}, время заезда - по договоренности`;
    } else if (checkin && !checkout) {
      cardTime.textContent = `Заезд после ${checkin}, время выезда - по договоренности`;
    } else {
      cardTime.remove();
    }

    if (features && features.length !== 0) {
      const featuresFragment = document.createDocumentFragment();

      features.forEach((feature) => {
        const featureLi = cardFeaturesContainer.querySelector(`.popup__feature--${feature}`);

        if (featureLi) {
          featuresFragment.append(featureLi);
        }
      });

      cardFeaturesContainer.innerHTML = '';
      cardFeaturesContainer.append(featuresFragment);
    } else {
      cardFeaturesContainer.remove();
    }

    if (description) {
      cardDescription.textContent = description;
    } else {
      cardDescription.remove();
    }

    if (photos && photos.length !== 0) {
      const photoFragment = document.createDocumentFragment();

      photos.forEach((photoUrl) => {
        const photoImg = cardPhotoContainer.querySelector('.popup__photo').cloneNode(true);
        photoImg.src = photoUrl;
        photoFragment.append(photoImg);
      });

      cardPhotoContainer.innerHTML = '';
      cardPhotoContainer.append(photoFragment);
    } else {
      cardPhotoContainer.remove();
    }

    fragmentOfSimilarAdCards.append(card);
  });

  return fragmentOfSimilarAdCards;
};

export { createListOfSimilarAdCards };


