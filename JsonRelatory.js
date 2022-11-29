export class JsonRelatory {
    constructor() {
        this.comumAwait = [];
        this.promiseAll = [];
        this.createThreadPromiseAll = [];
    }

    setComumAwait(time) {
        this.comumAwait.push(time);
    }

    setPromiseAll(time) {
        this.promiseAll.push(time);
    }

    setCreateThreadPromiseAll(time) {
        this.createThreadPromiseAll.push(time);
    }

    getJSONRelatory() {
        const json = {
            comunAwait: this.comumAwait,
            promiseAll: this.promiseAll,
            createThreadPromiseAll: this.createThreadPromiseAll
        }

        return JSON.stringify(json)
    }
}