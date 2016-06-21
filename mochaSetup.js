'use strict';

const sinon = require('sinon');
const chai = require('chai');
const moment = require('moment');

chai.use(require('dirty-chai'));
chai.use(require('sinon-chai'));

Object.assign(global, {
  sinon,
  expect: chai.expect
});