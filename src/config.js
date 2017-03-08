import { assign } from './utils/lodash';

const config = assign({
  development: {
    api: {
      csl: {
        host: 'https://api.govwizely.com/consolidated_screening_list/search',
        apiKey: 'Z48wSr3E3nNN4itDUvE4Clje',
      },
    },
  },
  production: {
    api: {
      csl: {
        host: 'https://api.trade.gov/consolidated_screening_list/search',
        apiKey: 'hQ4L7ylI9POH3QuqxOY_l2UC',
      },
    },
  },
});

export default config[process.env.NODE_ENV];
