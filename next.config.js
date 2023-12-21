/**
 * @type {import('next').NextConfig}
 */
export default {
  compiler: {
    styledComponents: true
  },
  rewrites: async () => [
    {
      source: '/',
      destination: '/home'
    }
  ]
};
