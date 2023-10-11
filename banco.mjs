import knex from 'knex';

const knexInstance = knex({
    client: 'mysql2',
    connection: {
        host: '143.106.241.3',
        user: 'cl201282',
        password: 'cl*23022006',
        database: 'cl201282',
        port: 3306,
    },
});

export default knexInstance;