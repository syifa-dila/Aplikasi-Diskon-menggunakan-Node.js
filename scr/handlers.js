const db = require("./db");
exports.daftarDiskon = async (req, res) => {
    try{
        const [barisData] = await db.query('SELECT * FORM diskon ORDER BY tanggal DESC');
        res.json(barisData);
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Kesalahan Server Internet'});
    }
}
exports.tambahDiskon = async (req, res) => {
    const {namaBarang, kategori, harga, stok} = red.body;
    try{
        await db.query('INSERT INTO diskon (namaBarang, kategori, harga, stok) VALUES (?, ?, ?, ?)', [namaBarang, kategori, harga, stok]);
        res.status(201).json({message: 'Diskon berhasil ditambahkan'});
    }catch (error){
        console.error(error)
        res.status(500).json({error: 'Kesalahan pada server internet'});
    }
}

exports.hapusDiskon = async (req, res) => {
    const {id} = req.params;
    try{
        await db.query('DELETE FROM diskon WHERE id = ?', [id]);
        res.json({message: 'Transaksi berhasil di hapus'});
    }catch (error) {
        console.error(error)
        res.status(500).json({error: 'Kesalahan pada server internet'});
    }
};