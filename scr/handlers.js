const db = require("./db");
exports.daftarDiskon = async (req, res) => {
    try {
        const [barisData] = await db.query('SELECT * FROM diskon ORDER BY id_barang DESC');
        res.json(barisData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kesalahan Server Internet' });
    }
};
exports.tambahDiskon = async (req, res) => {
    const { nama_barang, kategori, harga_awal, diskon_persen, stok } = req.body;
    if (!nama_barang || !kategori || !harga_awal || !diskon_persen || !stok) {
        return res.status(400).json({ error: 'Semua data harus diisi' });
    }
    const harga_setelah_diskon = harga_awal - (harga_awal * (diskon_persen / 100));
    try {
        await db.query(
            'INSERT INTO diskon (nama_barang, kategori, harga_awal, diskon_persen, harga_setelah_diskon, stok) VALUES (?, ?, ?, ?, ?, ?)',
            [nama_barang, kategori, harga_awal, diskon_persen, harga_setelah_diskon, stok]
        );
        res.status(201).json({ message: 'Diskon berhasil ditambahkan' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kesalahan pada server internet' });
    }
};
exports.hapusDiskon = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM diskon WHERE id_barang = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Diskon tidak ditemukan' });
        }

        res.json({ message: 'Diskon berhasil dihapus' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kesalahan pada server internet' });
    }
};