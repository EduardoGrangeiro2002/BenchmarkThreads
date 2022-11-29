export default({
    loopBenchmark : 1,
    countFileJSON : 1,
    user : 'root',
    host : 'localhost',
    password : '',
    port : 3306,
    database : '',
    scriptTable: "CREATE TABLE IF NOT EXISTS `product` (`id_product` int NOT NULL AUTO_INCREMENT, `name` varchar(45) NOT NULL, `codigo_produto` varchar(45) NOT NULL, `price` decimal(32,12) NOT NULL,`discount` decimal(32,12) DEFAULT NULL, PRIMARY KEY (`id_product`)) ENGINE=InnoDB AUTO_INCREMENT=99001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
})

