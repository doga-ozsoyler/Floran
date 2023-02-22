export const validateEmail = (text: string) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
};

export const validatePassword = (text: string) => {
  if (text.length < 6) {
    return false;
  } else {
    return true;
  }
};
