interface IObject {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  [key: string]: any;
}

export const checkKeyByTypes = <T extends IObject, K extends IObject>(
  item: K | T,
  key: string
): item is T => key in item;
