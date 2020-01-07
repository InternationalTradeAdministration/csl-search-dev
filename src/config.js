import { assign } from './utils/lodash';

const config = assign({
  development: {
    api: {
      csl: {
        host: 'https://api.trade.gov/gateway/v1/consolidated_screening_list/search',
        accessToken: 'b19262a5-9372-3204-8289-268d082428af',
      },
    },
  },
  production: {
    api: {
      csl: {
        host: 'https://api.trade.gov/gateway/v1/consolidated_screening_list/search',
        accessToken: 'b19262a5-9372-3204-8289-268d082428af',
      },
    },
  },
});

export default config[process.env.NODE_ENV];
