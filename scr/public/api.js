async function ambilDiskon() {
    try {
      const response = await fetch('/api/diskon');
      if (response.ok) {
        const data = await response.json();
        daftarDiskon = data;
        updateTabel(daftarDiskon);
        return;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function tambahDiskon(diskon) {
    try {
      diskon.harga_setelah_diskon = (diskon.harga_awal * (1 - diskon.diskon_persen / 100)).toFixed(2);
  
      const response = await fetch('/api/diskon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(diskon),
      });
  
      if (response.ok) {
        ambilDiskon();
        return;
      }
    } catch (error) {
      console.error('Error:', error);
    }
    alert('Gagal menambah data diskon.');
  }
  async function hapusDiskon(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        const response = await fetch(`/api/diskon/${id}`, { method: 'DELETE' });
        if (response.ok) {
          ambilDiskon();
          return;
        }
      } catch (error) {
        console.error('Error:', error);
      }
      alert('Gagal menghapus data diskon.');
    }
  }
  async function editDiskon(id, diskon) {
    try {
      diskon.harga_setelah_diskon = (diskon.harga_awal * (1 - diskon.diskon_persen / 100)).toFixed(2);
  
      const response = await fetch(`/api/diskon/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(diskon),
      });
  
      if (response.ok) {
        ambilDiskon();
        return;
      }
    } catch (error) {
      console.error('Error:', error);
    }
    alert('Gagal memperbarui data diskon.');
  }
  function updateTabel(daftarDiskon) {
    const tabel = document.getElementById('tabelDiskon');
    tabel.innerHTML = '';
    daftarDiskon.forEach((diskon) => {
      const row = `
        <tr>
          <td>${diskon.id_barang}</td>
          <td>${diskon.nama_barang}</td>
          <td>${diskon.kategori}</td>
          <td>${diskon.harga_awal}</td>
          <td>${diskon.diskon_persen}</td>
          <td>${diskon.harga_setelah_diskon}</td>
          <td>${diskon.stok}</td>
          <td>
            <button onclick="hapusDiskon(${diskon.id_barang})">Hapus</button>
            <button onclick="editDiskon(${diskon.id_barang}, diskon)">Edit</button>
          </td>
        </tr>
      `;
      tabel.innerHTML += row;
    });
  }
  