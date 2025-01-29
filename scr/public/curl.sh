# # Daftar diskon
# curl http://localhost:1900/api/diskon -v

# # Tambah
# curl -X POST -H "Content-Type:application/json" -d "{\"jenis\":\"pemasukan\",\"keterangan\":\"Gaji bulan Januari 2023\",\"jumlah\":15000000,\"tanggal\":\"2023-01-01\"}" http://localhost:1900/api/diskon -v

# curl -X POST -H "Content-Type:application/json" -d "{\"jenis\":\"pengeluaran\",\"keterangan\":\"Listrik\",\"jumlah\":500000,\"tanggal\":\"2023-03-01\"}" http://localhost:1900/api/diskon -v

# # Hapus diskon
# curl -X DELETE http://localhost:1900/api/diskon/31