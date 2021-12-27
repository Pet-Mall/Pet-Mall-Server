export const encryptToken = (authorizations) => {
  const token = authorizations.split(' ')[1];
  return token;
};
