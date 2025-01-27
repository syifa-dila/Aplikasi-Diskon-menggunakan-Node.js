const express = require('express');
const router = express.Router();
const {daftarDiskon, tambahDiskon, hapusDiskon} = require('./handlers');

router.get('/diskon', daftarDiskon);
router.post('/diskon', tambahDiskon,);
router.delete('/diskon', hapusDiskon,);

module.exports = router