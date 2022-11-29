import mysql from "mysql2/promise";
import setup from "./setup.js";
export class DriverManager {
    static async createConnection() {
        if(this.connection && this.connection.state !== 'disconnected')
            return this.getConnection();
        const connection = await mysql.createConnection(`mysql://${setup.user}:${setup.password}@${setup.host}:${setup.port}/${setup.database}`);
        console.log('Conectado no MYSQL');
        this.connection = connection;
        await this.connection.query(setup.scriptTable);
        return this.getConnection();
    }
    static getConnection() {
        return this.connection;
    }
}