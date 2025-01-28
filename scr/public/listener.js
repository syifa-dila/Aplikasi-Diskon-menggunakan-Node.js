document.addEventListener('DOMContentLoaded', ambilDiskon);

formDiskon.addEventListener('submit', function (event) {
  event.preventDefault();
  const namaBarang = inputNamaBarang.value.trim();
  const kategori = inputKategori.value.trim();
  const hargaAwal = parseFloat(inputHargaAwal.value);
  const diskonPersen = parseFloat(inputDiskonPersen.value);
  const stok = parseInt(inputStok.value, 10);

  if (!namaBarang || !kategori || isNaN(hargaAwal) || isNaN(diskonPersen) || isNaN(stok)) {
    alert('Silakan isi semua kolom dengan benar.');
    return;
  }

  const hargaSetelahDiskon = hargaAwal - (hargaAwal * (diskonPersen / 100));
  tambahDiskon({
    nama_barang: namaBarang,
    kategori,
    harga_awal: hargaAwal,
    diskon_persen: diskonPersen,
    harga_setelah_diskon: hargaSetelahDiskon,
    stok
  });

  formDiskon.reset();
});

inputCari.addEventListener('input', function (event) {
  const keyword = event.target.value.trim().replace(/\s+/g, "|");
  const polaKeyword = new RegExp('(' + keyword + ')', 'i');

  const filteredItems = daftarDiskon.filter(item => {
    const gabunganData = 
      item.nama_barang + " " + 
      item.kategori + " " + 
      item.harga_awal + " " + 
      item.harga_setelah_diskon + " " +
      item.stok;

    return polaKeyword.test(gabunganData);
  });

  updateTabel(filteredItems);
});

function tambahDiskon(diskon) {
  daftarDiskon.push(diskon);
  updateTabel(daftarDiskon);
}

function updateTabel(data) {
  const tbody = document.querySelector('#tabelDiskon tbody');
  tbody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.nama_barang}</td>
      <td>${item.kategori}</td>
      <td>${item.harga_awal.toFixed(2)}</td>
      <td>${item.diskon_persen.toFixed(2)}%</td>
      <td>${item.harga_setelah_diskon.toFixed(2)}</td>
      <td>${item.stok}</td>
    `;

    tbody.appendChild(row);
  });
}
