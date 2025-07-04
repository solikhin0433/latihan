const { Buku, KategoriBuku } = require("../../models");

module.exports = {
    index: async (req, res) => {
        try {
            const response = await Buku.findAll({
                attributes: ['id', 'judul', 'penulis', 'penerbit', 'tahunTerbit', 'isbn', 'jumlahHalaman', 'deskripsi', 'kategoriBukuId', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: KategoriBuku,
                        as: 'kategori',
                        attributes: ['id', 'namaKategori']
                    }
                ],
                order: [['createdAt', 'DESC']],
            });
            return res.status(200).json({
                status: "success",
                data: response,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",
                error: error.message,
            });
        }
    },

    show: async (req, res) => {
        try {
            const response = await Buku.findByPk(req.params.id, {
                attributes: ['id', 'judul', 'penulis', 'penerbit', 'tahunTerbit', 'isbn', 'jumlahHalaman', 'deskripsi', 'kategoriBukuId', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: KategoriBuku,
                        as: 'kategori',
                        attributes: ['id', 'namaKategori']
                    }
                ],
            });
            if (!response) {
                return res.status(404).json({
                    status: "error",
                    message: "Buku not found",
                });
            }
            return res.status(200).json({
                status: "success",
                data: response,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",
                error: error.message,
            });
        }
    },

    store: async (req, res) => {
        try {
            const { judul, penulis, penerbit, tahunTerbit, isbn, jumlahHalaman, deskripsi, kategoriBukuId } = req.body;
            
            if (!judul || !penulis || !kategoriBukuId) {
                return res.status(400).json({
                    status: "error",
                    message: "Judul, penulis, dan kategori buku is required",
                });
            }

            // Cek apakah kategori buku exists
            const kategori = await KategoriBuku.findByPk(kategoriBukuId);
            if (!kategori) {
                return res.status(404).json({
                    status: "error",
                    message: "Kategori buku not found",
                });
            }

            const response = await Buku.create({
                judul,
                penulis,
                penerbit,
                tahunTerbit,
                isbn,
                jumlahHalaman,
                deskripsi,
                kategoriBukuId
            });

            // Get created buku with kategori relation
            const bukuWithKategori = await Buku.findByPk(response.id, {
                include: [
                    {
                        model: KategoriBuku,
                        as: 'kategori',
                        attributes: ['id', 'namaKategori']
                    }
                ],
            });

            return res.status(201).json({
                status: "success",
                message: 'Buku berhasil dibuat',
                data: bukuWithKategori
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",
                error: error.message,
            });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { judul, penulis, penerbit, tahunTerbit, isbn, jumlahHalaman, deskripsi, kategoriBukuId } = req.body;
            
            const buku = await Buku.findByPk(id);
            if (!buku) {
                return res.status(404).json({
                    status: "error",
                    message: "Buku not found",
                });
            }

            // Jika kategoriBukuId diubah, cek apakah kategori buku exists
            if (kategoriBukuId) {
                const kategori = await KategoriBuku.findByPk(kategoriBukuId);
                if (!kategori) {
                    return res.status(404).json({
                        status: "error",
                        message: "Kategori buku not found",
                    });
                }
            }

            await buku.update({
                judul,
                penulis,
                penerbit,
                tahunTerbit,
                isbn,
                jumlahHalaman,
                deskripsi,
                kategoriBukuId
            });

            const response = await Buku.findByPk(id, {
                include: [
                    {
                        model: KategoriBuku,
                        as: 'kategori',
                        attributes: ['id', 'namaKategori']
                    }
                ],
            });

            return res.status(200).json({
                status: "success",
                message: "Buku berhasil diperbarui",
                data: response,
            });
        } catch (err) {
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",
                error: err.message,
            });
        }
    },

    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            const buku = await Buku.findByPk(id);
            if (!buku) {
                return res.status(404).json({
                    status: "error",
                    message: "Buku not found",
                });
            }
            await buku.destroy();
            return res.status(200).json({
                status: "success",
                message: "Buku berhasil dihapus",
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }
};