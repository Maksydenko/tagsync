export const formConfig = {
  email: {
    max: 254,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  },
  name: {
    min: 2,
    pattern: /^[^\d]*$/,
  },
  password: {
    max: 128,
    min: 8,
    pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/,
  },
  phone: {
    max: 20,
    pattern: /^\+?\d[\d- ()]+$/,
  },
};
