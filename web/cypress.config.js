const { defineConfig } = require("cypress");
const { Pool } = require("pg");

const dbConfig = {
  host: "localhost",
  port: 5432,
  database: "dualexperience",
  password: "qaninja",
  user: "postgres",
};

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        deleteStudents(studentEmail) {
          return new Promise((resolve, reject) => {
            const pool = new Pool(dbConfig);

            const query = "DELETE FROM students WHERE email = $1;";

            pool.query(query, [studentEmail], (err, res) => {
              if (err) {
                reject(err.stack);
              } else {
                resolve({ success: res });
              }
              pool.end();
            });
          });
        },
        resetStudent(student) {
          return new Promise((resolve, reject) => {
            const pool = new Pool(dbConfig);

            const query = `
              WITH add AS (
                INSERT INTO students (name, email, age, weight, feet_tall) 
                VALUES ($1, $2, $3, $4, $5)
              )
              DELETE FROM students WHERE email = $2;
            `;

            const values = [
              student.name,
              student.email,
              student.age,
              student.weight,
              student.feet_tall,
            ];
            pool.query(query, values, (err, res) => {
              if (err) {
                reject(err.stack);
              } else {
                resolve({ success: res });
              }
              pool.end();
            });
          });
        },
      });
    },
  },
});
