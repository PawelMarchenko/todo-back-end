const mysql = require("mysql");

//Конфигурация MySQL
const conn = mysql.createConnection({
  host: "localhost",
  user: "Admin",
  database: "productsdb",
  password: "qweqwe123",
});

conn.connect((err) => {
  if (err) {
    console.log(err);
    return err;
  } else {
    console.log("database--------OK");
  }
});

let query = "SELECT * FROM productsdb.todos;"; //Подключение к таблице TODOS

conn.query(query, (err, result, field) => {
  console.log(err);
  console.log(result);
  //   console.log(result[2], ["todo"]);
  //   console.log(field);
});

conn.end((err) => {
  if (err) {
    console.log(err);
    return err;
  } else {
    console.log("Database------CLOSE");
  }
});
