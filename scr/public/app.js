const formDiskon = document.querySelector('#form-diskon');
const inputNamaBarang = document.querySelector('#nama_barang');
const inputKategori = document.querySelector('#kategori');
const inputHargaAwal = document.querySelector('#harga_awal');
const inputDiskonPersen = document.querySelector('#diskon_persen');
const inputHargaSetelahDiskon = document.querySelector('#harga_setelah_diskon');
const inputStok = document.querySelector('#stok');
const bodiTabel = document.querySelector('#tabel-diskon tbody');
// const inputCari = document.querySelector('#cari');

let daftarBarang = [];

async function fetchBarang() {
  try {
    const response = await fetch("/api/diskon");
    if (!response.ok) throw new Error("Gagal memasukkan data!");
    daftarBarang = await response.json();
    updateTabel(daftarBarang);
  } catch (error) {
    console.error(error);
  }
}

function updateTabel(dataBarang) {
  bodiTabel.innerHTML = '';
  dataBarang.forEach((barang) => {
    const hargaSetelahDiskon = barang.harga_awal * (1 - barang.diskon_persen / 100);
    const baris = document.createElement("tr");
    baris.innerHTML = `
      <td>${barang.id_barang}</td>
      <td>${barang.nama_barang}</td>
      <td>${barang.kategori}</td>
      <td>Rp ${parseFloat(barang.harga_awal).toLocaleString()}</td>
      <td>${parseFloat(barang.diskon_persen).toFixed(2)}%</td>
      <td>Rp ${hargaSetelahDiskon.toLocaleString()}</td>
      <td>${barang.stok}</td>
      <td>
        <button onclick="hapusBarang(${barang.id_barang})">Hapus</button>
      </td>
    `;
    bodiTabel.appendChild(baris);
  });
}

formDiskon.addEventListener('submit', async function (event) {
  event.preventDefault();

  const hargaAwal = parseFloat(inputHargaAwal.value);
  const diskonPersen = parseFloat(inputDiskonPersen.value);
  const hargaSetelahDiskon = hargaAwal - (hargaAwal * diskonPersen / 100);

  const barangBaru = {
    nama_barang: inputNamaBarang.value,
    kategori: inputKategori.value,
    harga_awal: hargaAwal,
    diskon_persen: diskonPersen,
    harga_setelah_diskon: hargaSetelahDiskon,
    stok: parseInt(inputStok.value, 10),
  };

  try {
    const response = await fetch('/api/diskon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(barangBaru),
    });

    if (!response.ok) throw new Error("Gagal Menambahkan data!");

    await fetchBarang(); // Memuat ulang data barang setelah ditambahkan
    formDiskon.reset(); // Reset form setelah submit

  } catch (error) {
    console.error(error);
  }
});

async function hapusBarang(id) {
  try {
    const response = await fetch(`/api/diskon/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Gagal menghapus data!");
    await fetchBarang(); // Memuat ulang data barang setelah dihapus
  } catch (error) {
    console.error(error);
  }
}

// inputCari.addEventListener('input', () => {
//   const keyword = inputCari.value.toLowerCase();
//   const hasilFilter = daftarBarang.filter(
//     (barang) =>
//       barang.nama_barang.toLowerCase().includes(keyword) ||
//       barang.kategori.toLowerCase().includes(keyword)
//   );
//   updateTabel(hasilFilter);
// });

fetchBarang();
