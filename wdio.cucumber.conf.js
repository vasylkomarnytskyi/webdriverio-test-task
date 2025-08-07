import { config as baseConfig } from './wdio.conf.js';
import _ from 'lodash';

export const config = _.merge({}, baseConfig, {
  specs: ['./test/features/**/*.feature'],
  framework: 'cucumber',
  cucumberOpts: {
    require: ['./test/features/step-definitions/*.js'],
    timeout: 60000,
  },
});
