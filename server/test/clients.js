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

    it('should get all', (done) => {

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

    it('should create new', (done) => {
        const client = {
            name: "testClient",
            contactName: "testContact",
            email: "testEmail",
            type: "testType",
            country: "testCountry",
            startDate: "2019-12-14T13:04:40.574Z"
        }

        const createClientStub = sinon.stub(dao, 'createClient').resolves(client);

        chai.request(app())
            .post('/clients/create')
            .end((err, res) => {

                // compare response status
                expect(res.status).to.equal(200);

                // make sure get clients from the db was called once
                assert(createClientStub.calledOnce, 'Expected to call dao.getClients() once');

                // see if http response clients has the same size as the one we expect
                //expect(res.body).to.equal("-> Client with name \"" + client.name + "\" was added successfully -> JSON: " + JSON.stringify(client));

                // Restore the stub
                 createClientStub.restore();

                // call done() to complete async it() test
                done();
            });
    });
});