export const formatUrl = (valueWithOutFormat: string) => {
  if (!valueWithOutFormat) {
    return '';
  }

  const withoutBeginOrEndSpaces = valueWithOutFormat.trim();
  const needHttpsFormat = /^\w+[.]\w+.*/.test(withoutBeginOrEndSpaces);

  if (needHttpsFormat) {
    return `https://${withoutBeginOrEndSpaces}`;
  }
  return withoutBeginOrEndSpaces;
};
