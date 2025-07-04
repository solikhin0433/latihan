'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('buku', [
      {
        judul: 'Maling Kundang',
        penulis: 'Tes Aja',
        penerbit: 'Gramedia',
        tahun_terbit: 1925,
        isbn: '978-0-7432-7356-5',
        jumlah_halaman: 180,
        deskripsi: 'anak durhaka.',
        kategori_buku_id: 1, // Fiction
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        judul: 'Upin & Ipin',
        penulis: 'kak ros',
        penerbit: 'malaya',
        tahun_terbit: 2011,
        isbn: '978-0-06-231609-7',
        jumlah_halaman: 443,
        deskripsi: 'adik kakak.',
        kategori_buku_id: 2, // Non-Fiction
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        judul: 'ultraman',
        penulis: 'opah',
        penerbit: 'malaya',
        tahun_terbit: 1988,
        isbn: '978-0-553-38016-3',
        jumlah_halaman: 256,
        deskripsi: 'hero penyelamat .',
        kategori_buku_id: 3, // Science
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        judul: 'Clean Code',
        penulis: 'Robert C. Martin',
        penerbit: 'Prentice Hall',
        tahun_terbit: 2008,
        isbn: '978-0-13-235088-4',
        jumlah_halaman: 464,
        deskripsi: 'Panduan untuk menulis kode yang bersih dan mudah dipelihara.',
        kategori_buku_id: 4, // Technology
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        judul: 'Steve Jobs',
        penulis: 'Walter Isaacson',
        penerbit: 'Simon & Schuster',
        tahun_terbit: 2011,
        isbn: '978-1-4516-4853-9',
        jumlah_halaman: 656,
        deskripsi: 'Biografi resmi pendiri Apple Inc.',
        kategori_buku_id: 5, // Biography
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('buku', null, {});
  }
};
