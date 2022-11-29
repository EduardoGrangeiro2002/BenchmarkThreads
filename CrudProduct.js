class CrudProduct {
    constructor (conn) {
        this.connection = conn
    }
    async createProducts(index) {
        const params = this._buildProduct(index);
        const sql = 'INSERT INTO product (name, codigo_produto, price, discount) VALUES (?, ?, ?, ?);'
        const [rows] = await this.connection.query(sql, params)

        return rows.insertId
    }

    async readProducts() {
        const sql = 'SELECT * FROM product;'
        await this.connection.query(sql)
    }
    
    async updateProducts(index, idProduct) {
        const params = this._buildProduct(index);
        params.push(idProduct);
        const sql = `UPDATE product
        SET 
        name = ?,
        codigo_produto = ?,
        price = ?,
        discount = ?
        WHERE id_product = ?;`

        await this.connection.query(sql, params)
        
    }
    
    _buildProduct(index) {
        const name = 'Produto' + parseInt(index + 1)
        const codigo = '' + parseInt(index + 1)
        const price = Math.random() * 1000;
        const discount = Math.random() * 25;
        const params = [name, codigo, price, discount];
        return params;
    }
}


export { CrudProduct }