const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/i;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){6,}/;

export const isEmail = email => email && emailPattern.test(email);
export const isGoodPassword = password =>
  password && passwordPattern.test(password);

export const checkName = (_, value, cb) =>
  value && value.length >= 3
    ? cb()
    : cb(new Error('Name need to have at least 3 chars'));

export const checkEmail = (_, value, cb) =>
  isEmail(value) ? cb() : cb(new Error('Invalid mail'));

export const checkPassword = (_, value, cb) =>
  isGoodPassword(value) ? cb() : cb(new Error('Invalid password'));
