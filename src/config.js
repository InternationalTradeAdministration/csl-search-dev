import { assign } from './utils/lodash';

const config = assign({
  development: {
    api: {
      csl: {
        host: 'https://api.trade.gov/gateway/v1/consolidated_screening_list/search',
        accessToken: 'b0045391-2ef8-3049-a215-f78b7716f045',
      },
    },
  },
  production: {
    api: {
      csl: {
        host: 'https://api.trade.gov/gateway/v1/consolidated_screening_list/search',
        accessToken: 'b0045391-2ef8-3049-a215-f78b7716f045',
      },
    },
  },
});

export default config[process.env.NODE_ENV];
