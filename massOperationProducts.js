import { Worker } from 'node:worker_threads';
import { CrudProduct } from './CrudProduct.js';
import { DriverManager } from './DriverManager.js';
import { JsonRelatory } from './JSONRelatory.js';
import fs from 'node:fs';

export async function massOperationProducts(to, number) {
    let timeStart = null;
    let timeEnd = null;
    const conn = await DriverManager.createConnection();
    const jsonRelatory = new JsonRelatory();
    await getValuesBenchmark(to, conn, timeStart, timeEnd, jsonRelatory);
    
    const json = jsonRelatory.getJSONRelatory();

    fs.writeFile(`./jsons/json-relatory-${number}.json`, json, (err) => {
        if(err) throw err;
        console.log('Create file successfully!');
    })
    console.log('Benchmark finished!');
    return;
}

async function getValuesBenchmark(to, conn, timeStart, timeEnd, jsonRelatory) {
    for (let i = 0; i < to; i++) {
        timeStart = performance.now();
        await operationLoopProducts(1000, conn);
        await operationLoopProducts(1000, conn);
        await operationLoopProducts(1000, conn);
        timeEnd = performance.now();
        jsonRelatory.setComumAwait(Math.floor(timeEnd - timeStart) / 1000);

        timeStart = performance.now();
        await Promise.all([
            operationLoopProducts(1000, conn),
            operationLoopProducts(1000, conn),
            operationLoopProducts(1000, conn)
        ]);
        timeEnd = performance.now();
        jsonRelatory.setPromiseAll(Math.floor(timeEnd - timeStart) / 1000);

        timeStart = performance.now();
        await Promise.all([
            createThreadProduct(1000),
            createThreadProduct(1000),
            createThreadProduct(1000)
        ]);
        timeEnd = performance.now();
        jsonRelatory.setCreateThreadPromiseAll(Math.floor(timeEnd - timeStart) / 1000);
    }
}

function createThreadProduct (to) {
    const worker = new Worker("./worker.js");
    const promise = new Promise((resolve, reject) => {
        worker.once('message', (message) => {
            return resolve(message);
        })
        worker.once('error', reject);
    })

    worker.postMessage({to});

    return promise;
}

async function operationLoopProducts (to, conn) {
    const crudProduct = new CrudProduct(conn);

    for(let i = 0; i < to; i++){
        await crudProduct.createProducts(i);
    }
}