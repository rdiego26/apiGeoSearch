/**
 * Created by ramos on 29/09/15.
 */

var request = require('supertest'),
    app = require('../route/routes');


describe('API Module', function() {

    describe('Routes', function() {

        it('Nonexistent route returns 404', function(done) {
            request(app)
                .get('/')
                .expect(404, done);
        });

        it('Send address valid returns JSON', function(done) {

            this.timeout(4000);

            request(app)
                .get('/Avenida Rio Branco')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('Send address valid returns valid addresses', function(done) {

            this.timeout(4000);

            request(app)
                .get('/Avenida Rio Branco 156')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if(!err) {
                        var _result = res.body;
                        if(_result.data[0].address_components.length > 0) done();
                    }
                });
        });

        it('Send lat and lng valid returns valid addresses', function(done) {

            this.timeout(4000);

            request(app)
                .get('/-23.6432603/-45.4315461')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if(!err) {
                        var _result = res.body;
                        if(_result.data[0].address_components.length > 0) done();
                    }
                });
        });

        it('Send a invalid lat and lng valid returns zero addresses', function(done) {

            this.timeout(4000);

            request(app)
                .get('/-233333/-2323')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if(!err) {
                        var _result = res.body;
                        if(_result.data.length == 0) done();
                    }
                });
        });

    });

});