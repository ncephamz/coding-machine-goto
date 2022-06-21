const maxCount = 5;
const maxSecond = 10;

const Limiter = require('./model/limiter');

class RateLimiter {
    constructor() {
        this.limiter = new Limiter(1, this.getCurrentTime());
        this.prevTime = this.limiter.getTime();
    }

    checkRequest(){
        const prevCount = this.limiter.getCount();

        if (this.getCurrentTime() - this.prevTime <= maxSecond) {
            if (prevCount <= maxCount) {
                this.limiter.setCount();
                return true;
            }
            return false;
        }

        this.limiter.setTime();
        this.limiter.resetCount();
        this.prevTime = this.limiter.getTime();
        
        return true;
    }

    getCurrentTime() {
        return new Date().getTime() / 1000;
    }
}

module.exports = RateLimiter