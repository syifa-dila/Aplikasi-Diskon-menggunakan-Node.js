CREATE TABLE `diskon` (
    `id_barang` INT AUTO_INCREMENT,
    `nama_barang` VARCHAR(255) DEFAULT NULL,
    `kategori` VARCHAR(200),
    `harga_awal` DECIMAL(10,2),
    `diskon_persen` DECIMAL(5,2),
    `harga_setelah_diskon` DECIMAL(10,2),
    `stok` INT,
    PRIMARY KEY (`id_barang`)
) ENGINE=InnoDB;

-- CREATE TABLE barang (
--     'id_barang' INT AUTO_INCREMENT PRIMARY KEY,
--     'nama_barang' VARCHAR(255) NOT NULL,
--     'harga' DECIMAL(10,2) NOT NULL,
--     'jumlah_barang' INT NOT NULL,
--     'total_harga' DECIMAL(10,2) GENERATED ALWAYS AS (harga * jumlah_barang) STORED,
--     'diskon' DECIMAL(5,2) DEFAULT 0,
--     'total_setelah_diskon' DECIMAL(10,2) GENERATED ALWAYS AS (total_harga - (total_harga * diskon / 100)) STORED
-- ); route tidak tersambung ke database!
