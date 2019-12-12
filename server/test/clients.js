const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../getApp');
const dao = require('../dao/clients');
const _ = require('lodash');
const assert = require('assert');
const expect = chai.expect;

// tell chai to use http middleware
chai.use(chaiHttp);
chai.should();

describe("Test client endpoints", () => {

    it('Get all', (done) => {

        const client1 = {
            name: 'Pesho',
        };
        const client2 = {
            name: 'Ivan',
        };
        const dbClientsResponse = [client1, client2];

        // Simulate the db call to return fake clients
        // Stub is a function whose behaviour you specify, eg. tell what to do and what to return
        const getClientsStub = sinon.stub(dao, 'getClients').resolves(dbClientsResponse);

        // () => {
        //     return new Promise(res => {res()})
        // }
        // make a GET request to /clients endpoint
        chai.request(app())
            .get('/clients')
            .end((err, res) => {

                // compare response status
                expect(res.status).to.equal(200);

                // make sure get clients from the db was called once
                assert(getClientsStub.calledOnce, 'Expected to call dao.getClients() once');

                // see if http response clients has the same size as the one we expect
                expect(res.body.length).to.equal(dbClientsResponse.length);

                // compare each http response client name to the the one we expect
                _.forEach((client, index) => {
                    expect(client.name).to.equal(dbClientsResponse[index].name);
                });

                // Restore the stub
                getClientsStub.restore();

                // call done() to complete async it() test
                done();
            })
    });
});