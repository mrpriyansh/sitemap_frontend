const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://sitemap-api.herokuapp.com'
    : 'http://localhost:3001';
// const apiUrl = 'https://sitemap-api.herokuapp.com';
const config = {
  apiUrl,
};

export default config;
