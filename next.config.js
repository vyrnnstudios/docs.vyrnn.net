/**
 * @type {import('next').NextConfig}
 */
export default {
  output: 'export',
  compiler: {
    styledComponents: true
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-inline-loader'
    });
    return config;
  }
};
