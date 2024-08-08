import  mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function _create(firstname, lastname, username, password) {
    try {
        const sql = `INSERT INTO accounts (first_name, last_name, username, pass_word, contents) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.query(sql, [firstname, lastname, username, password, 'default']);
        return { message: 'Account created', id: result.insertId };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function _read(username) {
    try {
        const sql = `SELECT * FROM accounts WHERE username = ?`;
        const [rows] = await pool.query(sql, [username]);
        return rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function _update(firstname, lastname, username, password) {
    try {
        const sql = `UPDATE accounts SET first_name = ?, last_name = ?, pass_word = ? WHERE username = ?`;
        const [result] = await pool.query(sql, [firstname, lastname, password, username]);
        return { message: 'Account updated', affectedRows: result.affectedRows };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function _delete(username) {
    try {
        const sql = `DELETE FROM accounts WHERE username = ?`;
        const [result] = await pool.query(sql, [username]);
        return { message: 'Account deleted', affectedRows: result.affectedRows };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

console.log(await _read('zainbeast'))

await _create('Arman', 'Meraj', 'arman0615', 'dog');

console.log(await _read('arman0615'))
