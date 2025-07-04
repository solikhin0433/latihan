const { KategoriBuku } = require("../../models");

module.exports = {
     index: async (req, res) => {
        try {
            const response = await KategoriBuku.findAll({
               attributes: ['id', 'namaKategori', 'createdAt', 'updatedAt'],
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
            const response = await KategoriBuku.findByPk(req.params.id, {
                attributes: ['id', 'namaKategori', 'createdAt', 'updatedAt'],
            });
            if (!response) {
                return res.status(404).json({
                    status: "error",
                    message: "Kategori Buku not found",
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
          const {namaKategori} = req.body;
          if (!namaKategori) {
              return res.status(400).json({
                  status: "error",
                  message: "Nama Kategori Buku is required",
              });
          }
          const response = await KategoriBuku.create({
               namaKategori
           });

           return res.status(201).json({
               status: "success",
               message: 'Kategori buku berhasil dibuat',
               data: response
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
               const {id} = req.params;
               const {namaKategori} = req.body;
               const kategoriBuku = await KategoriBuku.findByPk(id);
               if (!kategoriBuku) {
                    return res.status(404).json({
                        status: "error",
                        message: "Kategori Buku not found",
                    });       
               }
               await kategoriBuku.update({
                    namaKategori
               });
               const response = await KategoriBuku.findByPk(id, {
                    attributes: ['id', 'namaKategori', 'createdAt', 'updatedAt'],
               });
               return res.status(200).json({
                    status: "success",
                    message: "Kategori Buku berhasil diperbarui",
                    data: response,
               });

          }catch (err){
               return res.status(500).json({
                    status: "error",
                    message: "Internal Server Error",
                    error: err.message,
               });
            }
          },
          
     destroy: async (req, res) => {
        try {
            const {id} = req.params;
            const kategoriBuku = await KategoriBuku.findByPk(id);
            if (!kategoriBuku) {
                return res.status(404).json({
                    status: "error",
                    message: "Kategori Buku not found",
                });
            }
            await kategoriBuku.destroy();
            return res.status(200).json({
                status: "success",
                message: "Kategori Buku berhasil dihapus",
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