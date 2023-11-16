module.exports.join = async (connection, email, gardenID) => {
    await connection.query(`
    INSERT INTO Affiliation (garden_id, user_id, role, join_date) VALUES
        ($1, $2, 'affiliate', NOW())
    `, [gardenID, email]);
}

module.exports.hasAffiliation = async (connection, email, gardenID) => {
    const result = await connection.query(`
    SELECT * FROM Affiliation WHERE garden_id = $1 AND user_id = $2
    `, [gardenID, email]);

    return result.rows[0];
}