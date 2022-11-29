# BenchmarkThreads
This application did make to measure the performance in queries parallels with the database.
This example is creating 3000 products in the database and approaching the common uses of one per one await, Promise.all and the create new threads with Promise.all have the best performance.
## Requirements
* MYSQL
* Node 16.16.0
## Initialize Setup
* npm install
* Configure the file setup.js to connect in your database
