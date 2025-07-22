// utils/apiConstants.js
const API_ENDPOINTS = {
  AUTH: {
    ADMIN_LOGIN: '/v1/auth/admins/signin',
    SELLER_SIGNIN: '/v1/auth/sellers/signin',
    SELLER_SIGNIN_FOR_STORE: '/v1/auth/sellers/signup/signin/stores',
  },
  ADMIN: {
    ADMIN_CREATE: '/v1/admins',
    SUPER_ADMIN_CREATE: '/v1/admins/super',
    UPDATE_SUPER_ADMIN: '/v1/admins/current',
  },
};
module.exports = { API_ENDPOINTS };