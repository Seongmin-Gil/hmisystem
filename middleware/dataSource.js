const { DataSource } = require('typeorm');

const appData = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
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