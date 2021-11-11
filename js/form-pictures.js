const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imageFileChooser = document.querySelector('#images');
const imageContainer = document.querySelector('.ad-form__photo');

const isEndingOnType = (fileName) => FILE_TYPES.some((item) => fileName.endsWith(item));

avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  if (isEndingOnType(fileName)) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

imageFileChooser.addEventListener('change', () => {
  const file = imageFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  if (isEndingOnType(fileName)) {
    if (imageContainer.children) {
      imageContainer.innerHTML = '';
    }

    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.style.maxWidth = '100%';
    image.style.maxHeight = '100%';
    imageContainer.append(image);
  }
});

const clearPictureContainers = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  imageContainer.innerHTML = '';
};

export {clearPictureContainers};
