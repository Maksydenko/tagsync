export const sortSearchParams = (params: URLSearchParams) => {
  const sortedParams = new URLSearchParams();
  const keys = Array.from(params.keys());
  const sortedKeys = keys.sort();

  sortedKeys.forEach(key => {
    const values = params.getAll(key);

    values.forEach(value => sortedParams.append(key, value));
  });

  return sortedParams.toString();
};
