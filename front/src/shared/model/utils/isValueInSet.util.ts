interface IIsValueInSet<T> {
  data: T[] | undefined;
  key: keyof T;
  value: T[keyof T];
}

export const isValueInSet = <T>({ data, key, value }: IIsValueInSet<T>) => {
  if (!data?.length) {
    return false;
  }

  const setId = new Set(data.map(item => item[key]));

  return setId.has(value);
};
