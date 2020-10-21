const apiUrl =
process.env.NODE_ENV === 'production'
  ? 'https://alumni-portal-backend-dot-tutorial-262713.el.r.appspot.com'
  : 'http://localhost:3001';
// const apiUrl = 'https://alumni-portal-backend-dot-tutorial-262713.el.r.appspot.com';
const config = {
  apiUrl,
};

export default config;
