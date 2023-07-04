export const formatUrl = (valueWithOutFormat) => {
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
