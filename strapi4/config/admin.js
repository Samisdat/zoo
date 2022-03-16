module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'da019d423c934e31d4762db21eeef914'),
  },
});
