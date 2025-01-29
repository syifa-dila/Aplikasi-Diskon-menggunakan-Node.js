# Daftar diskon
curl http://localhost:1900/api/diskon -v

# Tambah
curl -X POST -H "Content-Type:application/json" -d "{\"nama_barang\":\"Gaji bulan Januari 2023\",\"kategori\":\"pemasukan\",\"harga_awal\":15000000,\"diskon_persen\":0,\"harga_setelah_diskon\":15000000,\"stok\":1}" http://localhost:1900/api/diskon -v

curl -X POST -H "Content-Type:application/json" -d "{\"nama_barang\":\"Listrik\",\"kategori\":\"pengeluaran\",\"harga_awal\":500000,\"diskon_persen\":0,\"harga_setelah_diskon\":500000,\"stok\":1}" http://localhost:1900/api/diskon -v


# Hapus diskon
curl -X DELETE http://localhost:1900/api/diskon/${id}
