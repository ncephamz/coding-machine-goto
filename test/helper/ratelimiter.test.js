const Ratelimiter = require('../../helper/ratelimiter');
const assert = require('assert');
const sinon = require('sinon');

describe('ratelimiter', () => {

    const ratelimiter = new Ratelimiter();

    describe('checkRequest', () => {
        it('should return true when 5 request in 10 second', () => {
            for (let i = 0; i < 4; i++) {
                ratelimiter.checkRequest();
            }

            const result = ratelimiter.checkRequest();

            assert.equal(result, true);
        });

        it('should return false when 6 request in 10 second', () => {
            let result = true;
            for (let i = 0; i < 10; i++) {
                result = ratelimiter.checkRequest();
                if (!result) {
                    break;
                }
            }

            assert.equal(result, false);
        });
        
        it('should return false when 6 request more than 10 second', () => {

            sinon.stub(ratelimiter, 'getCurrentTime').returns(new Date().getTime() / 1000 + 11);

            const result = ratelimiter.checkRequest();

            assert.equal(result, true);
        });
    });

    describe('getCurrentTime', async () => {
        it('Valid time', async () => {
            ratelimiter.getCurrentTime();
        })
    })
});