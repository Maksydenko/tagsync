export const formatLabel = (label: string, required?: boolean) => {
  return label + (required ? "*" : "");
};
