const setFormEnabled = (form, enabled, disabledClass) => {
  if (enabled) {
    form.classList.remove(disabledClass);
    for (const item of form.children) {
      item.disabled = false;
    }
  } else {
    form.classList.add(disabledClass);
    for (const item of form.children) {
      item.disabled = true;
    }
  }
};

export {setFormEnabled};
