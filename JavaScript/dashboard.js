async function getUsersTable(res) {
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'mydb'
    });
    connection.connect();
    const [rows, fields] =
          await connection.execute("SELECT * FROM user");
    let table = "<table><tr><th>ID</th><th>First_Name</th><th>Last_Name</th><th>Email</th></tr>";
    for (let i = 0; i < rows.length; i++) {
        table += "<tr><td>" + rows[i].ID + "</td><td>" + rows[i].fistName + "</td><td>"
            + rows[i].lastName + "</td><td>" + rows[i].email + "</td></tr>";
    }

    console.log("rows", rows);
    // don't forget the '+'
    table += "</table>";
    await connection.end();
    res.send(table);

}

document.getElementById("#userList").addEventListener("load", getUsersTable);