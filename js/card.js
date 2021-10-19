const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const TypeTranslation = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const addContentToElement = (element, content) => {
  if (element) {
    element.textContent = content;
  } else {
    element.remove();
  }
};

const createCards = (dataArray) => {
  const fragmentOfSimilarAdCards = document.createDocumentFragment();

  dataArray.forEach((ad) => {
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

    addContentToElement(cardTitle, title);

    addContentToElement(cardAddress, address);

    if (price) {
      cardPrice.textContent = `${price} ₽/ночь`;
    } else {
      cardPrice.remove();
    }

    addContentToElement(cardType, TypeTranslation[type]);

    if (rooms && guests) {
      cardCapacity.textContent = `${rooms} комнаты для ${guests} гостей`;
    } else {
      cardCapacity.remove();
    }

    if (checkin && checkout) {
      cardTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
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

export { createCards };


