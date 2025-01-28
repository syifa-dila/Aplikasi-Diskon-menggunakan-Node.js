const formDiskon = document.querySelector('#form-diskon');
const inputNamaBarang = document.querySelector('#nama_barang');
const inputKategori = document.querySelector('#kategori');
const inputHargaAwal = document.querySelector('#harga_awal');
const inputDiskonPersen = document.querySelector('#diskon_persen');
const inputStok = document.querySelector('#stok');
const bodiTabel = document.querySelector('#tabel-barang tbody');
const inputCari = document.querySelector('#cari');

let daftarBarang = [];

async function fetchBarang() {
  try {
    const response = await fetch('/api/diskon');
    const data = await response.json();
    daftarBarang = data;
    updateTabel(daftarBarang);
  } catch (error) {
    console.error('Gagal mengambil data diskon:', error);
  }
}

function updateTabel(dataBarang) {
  bodiTabel.innerHTML = '';
  for (let barang of dataBarang) {
    const hargaSetelahDiskon = barang.harga_awal * (1 - barang.diskon_persen / 100);
    const baris = document.createElement('tr');
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
  }
}

formDiskon.addEventListener('submit', async (e) => {
  e.preventDefault();
  const hargaSetelahDiskon = parseFloat(inputHargaAwal.value) * (1 - parseFloat(inputDiskonPersen.value) / 100);
  const barangBaru = {
    nama_barang: inputNamaBarang.value,
    kategori: inputKategori.value,
    harga_awal: parseFloat(inputHargaAwal.value),
    diskon_persen: parseFloat(inputDiskonPersen.value),
    harga_setelah_diskon: hargaSetelahDiskon,
    stok: parseInt(inputStok.value, 10),
  };

  try {
    const response = await fetch('/api/diskon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(barangBaru),
    });
    if (response.ok) {
      await fetchBarang(); 
      formDiskon.reset();
    } else {
      console.error('Gagal menambah barang:', response.statusText);
    }
  } catch (error) {
    console.error('Error saat menambah barang:', error);
  }
});

async function hapusBarang(id) {
  try {
    const response = await fetch(`/api/barang/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      await fetchBarang();
    } else {
      console.error('Gagal menghapus barang:', response.statusText);
    }
  } catch (error) {
    console.error('Error saat menghapus barang:', error);
  }
}

inputCari.addEventListener('input', () => {
  const keyword = inputCari.value.toLowerCase();
  const hasilFilter = daftarBarang.filter(
    (barang) =>
      barang.nama_barang.toLowerCase().includes(keyword) ||
      barang.kategori.toLowerCase().includes(keyword)
  );
  updateTabel(hasilFilter);
});

fetchBarang();