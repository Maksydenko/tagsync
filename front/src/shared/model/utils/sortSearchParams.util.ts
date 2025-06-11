export const sortSearchParams = (params: URLSearchParams) => {
  const sortedParams = new URLSearchParams();
  const sortedKeys = Array.from(params.keys()).sort();

  sortedKeys.forEach(key => {
    const values = params.getAll(key);

    values.forEach(value => sortedParams.append(key, value));
  });

  return sortedParams.toString();
};
