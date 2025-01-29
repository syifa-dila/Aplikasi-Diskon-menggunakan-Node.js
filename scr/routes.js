const express = require('express');
const router = express.Router();
const {daftarDiskon, tambahDiskon, hapusDiskon} = require('./handlers');

router.get('/diskon', daftarDiskon);
router.post('/diskon', tambahDiskon,);
router.delete('/diskon/:id', hapusDiskon,);

module.exports = router