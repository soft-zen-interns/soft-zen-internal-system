const sinon = require('sinon')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../getApp')
const dao = require('../dao/clients')
const _ = require('lodash')
const assert = require('assert')
const expect = chai.expect

// tell chai to use http middleware
chai.use(chaiHttp)
chai.should()

describe("Test client endpoints", () => {

    it('should get all clients', (done) => {

        const client1 = {
            name: 'Pesho',
        }
        const client2 = {
            name: 'Ivan',
        }
        const dbClientsResponse = [client1, client2]

        // Simulate the db call to return fake clients
        // Stub is a function whose behaviour you specify, eg. tell what to do and what to return
        const getClientsStub = sinon.stub(dao, 'getClients').resolves(dbClientsResponse)

        // () => {
        //     return new Promise(res => {res()})
        // }
        // make a GET request to /clients endpoint

        chai.request(app())
            .get('/clients')
            .end((err, res) => {

                // compare response status
                expect(res.status).to.equal(200)

                // make sure get clients from the db was called once
                assert(getClientsStub.calledOnce, 'Expected to call dao.getClients() once')

                // see if http response clients has the same size as the one we expect
                expect(res.body.length).to.equal(dbClientsResponse.length)

                // compare each http response client name to the the one we expect
                _.forEach((client, index) => {
                    expect(client.name).to.equal(dbClientsResponse[index].name)
                })

                // Restore the stub
                getClientsStub.restore()

                // call done() to complete async it() test
                done()
            })
    })

    it('should create new client', (done) => {
        let name = "testClient"
        let contactName = "testContact"
        let email = "testEmail"
        let type = "testType"
        let country = "testCountry"
        let startDate = "2019-12-14T13:04:40.574Z"
        let endDate = "2019-12-14T13:04:40.574Z"

        const client = {
            name: name,
            contactName: contactName,
            email: email,
            type: type,
            country: country,
            startDate: startDate,
            endDate: endDate
        }

        const getClientByNameStub = sinon.stub(dao, 'getClientByName').resolves([])
        const createClientStub = sinon.stub(dao, 'createClient').resolves(client)

        chai.request(app())
            .post('/clients')
            .send(client)
            .end((err, res) => {

                expect(res.status).to.equal(200)

                assert(getClientByNameStub.calledOnce, 'Expected to call dao.getClientByName() once')
                assert(getClientByNameStub.calledWithExactly(name), 'Expected to call dao.getClientByName() with exact args')

                assert(createClientStub.calledOnce, 'Expected to call dao.createClient() once')
                assert(createClientStub.calledWithExactly(name, contactName, email, type, country, startDate, endDate), 'Expected to call dao.createClient() with exact args')

                expect(res.body).to.deep.equal(client)

                createClientStub.restore()
                getClientByNameStub.restore()

                done()
            })
    })


    it('should edit client', (done) => {

        let id = '1'
        let name = "testClient"
        let contactName = "testContact"
        let email = "testEmail"
        let type = "testType"
        let country = "testCountry"
        let startDate = "2019-12-14T13:04:40.574Z"
        let endDate = "2019-12-14T13:04:40.574Z"

        const client = {
            id: id,
            name: name,
            contactName: contactName,
            email: email,
            type: type,
            country: country,
            startDate: startDate,
            endDate: endDate
        }

        const getClientByNameStub = sinon.stub(dao, 'getClientByName').resolves([])
        //const createClientStub = sinon.stub(dao, 'createClient').resolves(client)
        const updateClientStub = sinon.stub(dao, 'updateClient').resolves(1)

        //client.name = "updatedName"

        chai.request(app())
            .put('/clients/' + id)
            .send(client)
            .end((err, res) => {
                expect(res.status).to.equal(200)

                assert(getClientByNameStub.calledOnce, 'Expected to call dao.getClientByName() once')
                assert(getClientByNameStub.calledWithExactly(name), 'Expected to call dao.getClientByName() with exact args')

                assert(updateClientStub.calledOnce, 'Expected to call dao.updateClient() once')
                console.log({ id, name, contactName, email, type, country, startDate, endDate })
                assert(updateClientStub.calledWith(id, name, contactName, email, type, country, startDate, endDate), 'Expected to call dao.updateClient() with exact args')

                expect(res.body).to.deep.equal(1)

                updateClientStub.restore()

                done()
            })
    })


    // it('should delete client', (done) => {
    //     const client = {
    //         name: "testClient",
    //         contactName: "testContact",
    //         email: "testEmail",
    //         type: "testType",
    //         country: "testCountry",
    //         startDate: "2019-12-14T13:04:40.574Z"
    //     }

    //     const deleteClientStub = sinon.stub(dao, 'deleteClient').resolves(client)

    //     chai.request(app())
    //         .delete('/clients/delete/1')
    //         .end((err, res) => {
    //             expect(res.status).to.equal(200)

    //             assert(deleteClientStub.calledOnce, 'Expected to call dao.getClients() once')

    //             deleteClientStub.restore()

    //             done()
    //         })
    // })
})