    const express = require('express');
    const bodyParser = require('body-parser');
    const morgan = require('morgan');
    const path = require('path');
    const routes = require('./routes');
    const db = require('./db');

    const app = express();

    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', (req, res) => {
        res.send('Selamat datang di aplikasi saya!');
    });

    app.use("/api", routes);

    // Cek koneksi database
    db.query('SELECT 1 + 1 AS result')
    .then(() => {
        console.log('Database connected successfully');
        const port = 1900;
        app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });

    // Route untuk '/barang'
    app.get('/barang', async (req, res) => {
        try {
            const [rows, fields] = await db.query('SELECT * FROM nama_barang');
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Database query error!');
        }
    });
