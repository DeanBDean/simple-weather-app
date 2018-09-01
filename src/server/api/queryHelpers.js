export const createQueryParamString = queryParams => Object.entries(queryParams).reduce((accumulator, keyValuePair) => {
  const [paramName, paramValue] = keyValuePair;
  const andOrQuestionMark = accumulator === '' ? '?' : '&';

  return `${accumulator}${andOrQuestionMark}${paramName}=${paramValue}`;
}, '');
