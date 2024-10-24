const parseType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

  const isType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType.toLowerCase());

  if (isType(contactType)) return contactType;
  return;
};

const parseIsFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return;

  if (isFavourite.toLowerCase() === 'false') {
    return false;
  }
  if (isFavourite.toLowerCase() === 'true') {
    return true;
  }

  return;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const type = parseType(contactType);

  const favourite = parseIsFavourite(isFavourite);

  return {
    contactType: type,
    isFavourite: favourite,
  };
};
