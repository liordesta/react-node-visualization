export const getDataFromApi = () => {
  return fetch(
    'https://enso-public-content.s3.us-east-2.amazonaws.com/tree.json'
  )
    .then((result) => result.json())
    .then((data) => data);
};
