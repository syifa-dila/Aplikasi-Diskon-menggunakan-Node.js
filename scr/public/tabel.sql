CREATE TABLE 'nama_barang'(
    'id_barang' INT AUTO_INCREMENT,
    'nama_barang' VARCHAR(255) DEFAULT NULL,
    'kategori' VARCHAR(200),
    'harga' DECIMAL (10,2),
    'stok' VARCHAR (100),
    PRIMARY KEY ('id_barang')
)ENGINE=InnoDB