import { config as baseConfig } from './wdio.conf.js';
import _ from 'lodash';

export const config = _.merge({}, baseConfig, {
  specs: ['./test/specs/**/*.js'],
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
});
