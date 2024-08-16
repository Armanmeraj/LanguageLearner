import  mysql from 'mysql2';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function _createAccount(firstname, lastname, user, pass, lang) {
    try {
        const sql = `INSERT INTO accounts (firstname, lastname, user, pass, lang) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.query(sql, [firstname, lastname, user, pass, lang]);
        return { message: 'Account created', id: result.insertId };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function _readAccount(username) {
    try {
        const sql = `SELECT * FROM accounts WHERE user = ?`;
        const [rows] = await pool.query(sql, [username]);
        return rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function _updateAccount(firstname, lastname, username, password) {
    try {
        const sql = `UPDATE accounts SET first_name = ?, last_name = ?, pass_word = ? WHERE username = ?`;
        const [result] = await pool.query(sql, [firstname, lastname, password, username]);
        return { message: 'Account updated', affectedRows: result.affectedRows };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function _deleteAccount(username) {
    try {
        const sql = `DELETE FROM accounts WHERE username = ?`;
        const [result] = await pool.query(sql, [username]);
        return { message: 'Account deleted', affectedRows: result.affectedRows };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const app = express();

app.use(express.json());
app.use(cors());

app.get("/accounts", async (req, res) => {
    // const username = req.query.user; // Read username from query parameters
    // const accounts = await _readAccount(username);
    // res.send(accounts);

    const username = req.query.user; // Read username from query parameters
    if (!username) {
        return res.status(400).send({ error: 'Username is required' });
    }
    try {
        const account = await _readAccount(username);
        if (!account) {
            return res.status(404).send({ error: 'Account not found' });
        }
        res.send(account);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.post("/accounts", async (req, res) => {
    const { firstname, lastname, user, pass, lang } = req.body;   
    const result = await _createAccount(firstname, lastname, user, pass, lang);
    res.status(201).send(result);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = 3000;
app.listen(port, () => {
    console.log('Server is running on port 3000');
});


// console.log(await _read('zainbeast'))

// await _create('Arman', 'Meraj', 'arman0615', 'dog');

// console.log(await _read('arman0615'))
