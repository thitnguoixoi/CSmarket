import connection from "../config/connectDB"
const createUser = (steamID) => {
    connection.query('SELECT * FROM user WHERE SteamID = ?', [steamID], (error, results) => {
        if (error) {
            return done(error);
        }
        if (results.length === 0) {
            connection.query('INSERT INTO user (SteamID) VALUES (?)', [steamID], (insertError) => {
                if (insertError) {
                    return done(insertError);
                }
            });
        }
    })
}
const getUserList = () => {
    let users = []
    connection.query('SELECT * FROM user',
        function (err, results, fields) {
            if (err) {
                console.log(err)
                return users;
            }
            users = results;
            return users;
        }

    )
}
module.exports = {
    createUser,
    getUserList
}