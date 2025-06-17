export const formConfig = {
  address: {
    min: 2
  },
  city: {
    min: 2,
    pattern: /^[^\d]*$/
  },
  email: {
    max: 254,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i
  },
  name: {
    min: 2,
    pattern: /^[^\d]*$/
  },
  password: {
    max: 20,
    min: 6,
    pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/
  }
};
