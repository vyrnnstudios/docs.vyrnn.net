/**
 * @type {import('next').NextConfig}
 */
export default {
  output: 'export',
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
