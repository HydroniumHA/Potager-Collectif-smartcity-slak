module.exports.getUser = async (connection, email) => {
    const result = await connection.query(`
    SELECT * FROM Account WHERE email = $1 LIMIT 1
    `, [email]);

    return result.rows[0];
}

module.exports.addNewUser = async (connection, email, name, firstName, password) => {
    let result = true;
    await connection.query(`
    INSERT INTO Account(email, name, first_name, password) 
    VALUES ($1, $2, $3, $4)  
    `, [email, name, firstName, password]).catch(() => result=false);

    return result;
}