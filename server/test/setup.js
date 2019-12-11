/*global before beforeEach afterEach*/
const sinon = require('sinon');
const chai = require('chai');
const moment = require('moment');
const mysql = require('mysql');
global.assert = chai.assert;
global.expect = chai.expect;
global.should = chai.should;

var mysqlPool;
var stubs = {};

before(() => {
  setEnvVariables()
  global.stubs = stubs
})

// beforeEach(() => {
//   stubMysql()
// })

// afterEach(() => {
//   restoreMysqlStub()
// })

const setEnvVariables = () => {
  process.env.NODE_ENV = 'testing'
}

// const stubMysql = () => {
//   sinon.stub(mysql, 'createPool').callsFake(() => { })
//   mysqlPool = require('../src/utils/mySQLPool')
//   stubs.mysqlPool = sinon.stub(mysqlPool, "query").callsFake(() => new Promise((res) => {
//     res([])
//   }))
// }

// const restoreMysqlStub = () => {
//   if (mysqlPool && mysqlPool.query && mysqlPool.query.restore) {
//     mysqlPool.query.restore()
//   }
//   if (mysql && mysql.createPool && mysql.createPool.restore) {
//     mysql.createPool.restore()
//   }
// }
