const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
});

let registration = `CREATE TABLE if not exists registration (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    UNIQUE KEY (user_name)
)`;

let profile = `CREATE TABLE if not exists profile (
    user_profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,        
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;

let question = `CREATE TABLE if not exists question (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    question_text TEXT NOT NULL,
    time DATETIME NOT NULL,        
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;

let answer = `CREATE TABLE if not exists answer (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    answer_text TEXT NOT NULL,
    time DATETIME NOT NULL,        
    FOREIGN KEY (user_id) REFERENCES registration(user_id),
    FOREIGN KEY (question_id) REFERENCES question(question_id)
)`;

pool.query(registration, (err, results) => {
  if (err) throw err;
  console.log("Registration table created");
});

pool.query(profile, (err, results) => {
  if (err) throw err;
  console.log("Profile table created");
});

pool.query(question, (err, results) => {
  if (err) throw err;
  console.log("Question table created");
});

pool.query(answer, (err, results) => {
  if (err) throw err;
  console.log("Answer table created");
});

module.exports = pool;
