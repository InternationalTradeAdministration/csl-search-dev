import { assign } from './utils/lodash';

const config = assign({
  development: {
    api: {
      csl: {
        host: 'https://api.trade.gov/gateway/v1/consolidated_screening_list/search',
        accessToken: 'access_token',
      },
    },
  },
  production: {
    api: {
      csl: {
        host: 'https://api.trade.gov/gateway/v1/consolidated_screening_list/search',
        accessToken: 'access_token',
      },
    },
  },
});

export default config[process.env.NODE_ENV];
