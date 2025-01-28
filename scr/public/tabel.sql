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
