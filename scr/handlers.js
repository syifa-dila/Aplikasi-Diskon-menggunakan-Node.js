// const Diskon = require('.Diskon/scr/models/Diskon'); // Pastikan model sudah dibuat

// // Ambil semua diskon
// const daftarDiskon = async (req, res) => {
//   try {
//     const diskonList = await Diskon.find(); // Ambil dari database
//     res.json(diskonList);
//   } catch (error) {
//     res.status(500).json({ error: 'Gagal mengambil data' });
//   }
// };

// // Tambah diskon baru
// const tambahDiskon = async (req, res) => {
//   try {
//     const { nama_barang, kategori, harga_awal, diskon_persen, stok } = req.body;
//     const harga_setelah_diskon = (harga_awal * (1 - diskon_persen / 100)).toFixed(2);

//     const newDiskon = new Diskon({
//       nama_barang,
//       kategori,
//       harga_awal,
//       diskon_persen,
//       harga_setelah_diskon,
//       stok
//     });

//     await newDiskon.save(); // Simpan ke database
//     res.status(201).json(newDiskon); // Kirim respons ke frontend
//   } catch (error) {
//     res.status(500).json({ error: 'Gagal menambah diskon' });
//   }
// };

// // Hapus diskon berdasarkan ID
// const hapusDiskon = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Diskon.findByIdAndDelete(id);
//     res.json({ message: 'Diskon berhasil dihapus' });
//   } catch (error) {
//     res.status(500).json({ error: 'Gagal menghapus diskon' });
//   }
// };

// module.exports = { daftarDiskon, tambahDiskon, hapusDiskon };



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