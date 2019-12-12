const chai = require('chai');
const assert = require('chai').assert;
const clients = require('../routes/clients');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

describe('Clients', function () {
    it('should return clients', function() {
        chai.request('http://localhost:8000')
            .get('/clients')
            .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('object');
                chai.request('http://localhost:8000').post('/clients/create');
                console.log(res.body.length);
            });
        //chai.equal(clients().get('/clients').length, 5);
    })
});