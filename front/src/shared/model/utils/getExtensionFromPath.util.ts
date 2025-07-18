interface IGetExtensionFromPath {
  (path: string): null | string;
}

export const getExtensionFromPath: IGetExtensionFromPath = path => {
  const regex = /(?:\.([^.]+))?$/;
  const matches = regex.exec(path);

  if (matches && matches[1]) {
    return matches[1];
  }
  return null;
};
