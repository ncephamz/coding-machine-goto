class Limiter {
    constructor(count, time) {
        this.count = count;
        this.time = time
    }

    getCount = () => this.count;
    getTime = () => this.time;

    setCount = () => this.count++;
    setTime = () => this.time = new Date().getTime();
    
    resetCount = () => this.count = 1;
}

module.exports = Limiter;