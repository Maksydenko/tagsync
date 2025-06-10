export const removeLocalePrefix = (pathname: string) => {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length > 1 && parts[0].length === 2) {
    return `/${parts.slice(1).join("/")}`;
  }
  return pathname;
};
