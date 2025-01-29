const { daftarDiskon } = require("../handlers");

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
      const response = await fetch('http://localhost:1900/api/diskon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diskon),
      });
  
      if (!response.ok) {
        throw new Error('Gagal menambahkan diskon');
      }
  
      const newDiskon = await response.json();
      daftarDiskon.push(newDiskon);
      updateTabel(daftarDiskon);
    } catch (error) {
      console.error('Error:', error);
    }
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
      alert('Gagal menghapus data.');
    }
  }
  // async function editDiskon(id, diskon) {
  //   try {
  //     diskon.harga_setelah_diskon = (diskon.harga_awal * (1 - diskon.diskon_persen / 100)).toFixed(2);
  
  //     const response = await fetch(`/api/diskon/${id}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(diskon),
  //     });
  
  //     if (response.ok) {
  //       ambilDiskon();
  //       return;
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  //   alert('Gagal memperbarui data.');
  // }

//   function updateTabel(dataBarang) {
//     bodiTabel.innerHTML = ''; 
//     dataBarang.forEach((barang) => {
//         const hargaSetelahDiskon = barang.harga_awal * (1 - barang.diskon_persen / 100);
//         const baris = document.createElement('tr');
//         baris.innerHTML = `
//             <td>${barang.id_barang}</td> 
//             <td>${barang.nama_barang}</td>
//             <td>${barang.kategori}</td>
//             <td>Rp ${parseFloat(barang.harga_awal).toLocaleString()}</td>
//             <td>${parseFloat(barang.diskon_persen).toFixed(2)}%</td>
//             <td>Rp ${hargaSetelahDiskon.toLocaleString()}</td>
//             <td>${barang.stok}</td>
//             <td>
//                 <button onclick="hapusBarang(${barang.id_barang})">Hapus</button>
//             </td>
//         `;
//         bodiTabel.appendChild(baris);
//     });
// }

  // function updateTabel(daftarDiskon) {
  //   const tabel = document.getElementById('tabelDiskon');
  //   tabel.innerHTML = '';
  //   daftarDiskon.forEach((diskon) => {
  //     const row = `
  //       <tr>
  //         <td>${diskon.id_barang}</td>
  //         <td>${diskon.nama_barang}</td>
  //         <td>${diskon.kategori}</td>
  //         <td>${diskon.harga_awal}</td>
  //         <td>${diskon.diskon_persen}</td>
  //         <td>${diskon.harga_setelah_diskon}</td>
  //         <td>${diskon.stok}</td>
  //         <td>
  //           <button onclick="hapusDiskon(${diskon.id_barang})">Hapus</button>
  //           <button onclick="editDiskon(${diskon.id_barang}, diskon)">Edit</button>
  //         </td>
  //       </tr>
  //     `;
  //     tabel.innerHTML += row;
  //   });
  // }
  