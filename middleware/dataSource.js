const { DataSource } = require('typeorm');

const appData = new DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

appData
    .initialize()
    .then(() => {
        console.log('DataSource has been initialized!');
    })
    .catch(err => {
        console.error('Error during DataSource initialization', err);
        appData.destroy();
    });

module.exports = { appData };