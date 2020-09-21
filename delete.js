const pool = require('./config/connection');

const productsTableSql = `
DELETE * FROM pirates
);
`;

pool.query(productsTableSql, (err, data) => {
    if (err) {
        throw err;
    } else {
        console.log('ded');
        pool.end();
    }
}); 