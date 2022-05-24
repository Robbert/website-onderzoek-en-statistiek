module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', '8r65f823vzl6369lk1jnjl0qj8h1jmco'),
  },
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0d92389926fca69ac29437b12f4ec2c7'),
  },
});
