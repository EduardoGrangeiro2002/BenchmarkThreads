import { threadId, parentPort } from 'node:worker_threads';
import { CrudProduct } from './CrudProduct.js';
import { DriverManager } from './DriverManager.js';


parentPort.once('message', async ({to}) => {
    const conn = await DriverManager.createConnection();
    const crudProduct = new CrudProduct(conn);
    for(let i = 0; i < to; i++){
        await crudProduct.createProducts(i);
    }
    parentPort.postMessage(`I 'm ${threadId} done!`);
});

