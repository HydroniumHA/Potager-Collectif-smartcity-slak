module.exports.searchGarden = async (connection, query) => {
    const result = await connection.query(`
    SELECT id, name, address, date FROM Garden WHERE name LIKE '%' || $1 || '%'
    `, [query]);

    return result.rows;
}

module.exports.getAll = async (connection) => {
    const result = await connection.query(`
    SELECT id, name, address, date FROM Garden
    `);

    return result.rows;
}

