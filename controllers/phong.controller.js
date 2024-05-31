const Phong = require('../models/phong.Model');

module.exports = {
  insertPhong: (req, res) => {
    const phong = req.body;
    Phong.insertPhong(phong, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the Phong.',
        });
      } else {
        res.send({ message: 'Phòng đã được thêm thành công', data: result });
      }
    });
  },

  xoaPhongById:
  (req, res) => {
    const maPhong = req.params.maPhong;
    Phong.xoaPhongById(maPhong, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while deleting the Phong.',
        });
      } else {
        res.send({ message: 'Phòng đã được xóa thành công' });
      }
    });
  },

  updatePhong: (req, res) => {
    const maPhong = req.params.maPhong;
    const phong = req.body;
    phong.ma_phong = maPhong;
    Phong.updatePhong(phong, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while updating the Phong.',
        });
      } else {
        res.send({ message: 'Phòng đã được cập nhật thành công' });
      }
    });
  },
  

  updateTrangThaiPhongThanhDangO: (req, res) => {
    const maPhong = req.params.maPhong;
    Phong.updateTrangThaiPhongThanhDangO(maPhong, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while updating the room status to Đang Ở.',
        });
      } else {
        res.send({ message: 'Trạng thái phòng đã được cập nhật thành đang ở' });
      }
    });
  },

  updateTrangThaiPhongThanhDaO: (req, res) => {
    const maPhong = req.params.maPhong;
    Phong.updateTrangThaiPhongThanhDaO(maPhong, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while updating the room status to Đã Ở.',
        });
      } else {
        res.send({ message: 'Trạng thái phòng đã được cập nhật thành đã ở' });
      }
    });
  },

  getAllInPhongByMaKhu: (req, res) => {
    const maKhu = req.params.maKhu;
    Phong.getAllInPhongByMaKhu(maKhu, (err, results) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving Phong by MaKhu.',
        });
      } else {
        if (results.length > 0) {
          res.send(results);
        } else {
          res.status(404).send({
            message: 'No Phong found for the specified MaKhu.',
          });
        }
      }
    });
},


  getAllInPhongByTenKhuTro: (req, res) => {
    const tenKhuTro = req.params.tenKhuTro;
    Phong.getAllInPhongByTenKhuTro(tenKhuTro, (err, results) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving Phong by TenKhuTro.',
        });
      } else {
        res.send(results);
      }
    });
  },

  getPhongById: (req, res) => {
    const id = req.params.id;
    Phong.getPhongById(id, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the Phong.',
        });
      } else {
        res.send(result);
      }
    });
  },

  getTenPhongById: (req, res) => {
    const id = req.params.id;
    Phong.getTenPhongById(id, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the TenPhong.',
        });
      } else {
        // Kiểm tra xem result có phải là một chuỗi hợp lệ không
        if (typeof result === 'string') {
          res.json({ ten_phong: result }); // Gửi lại tên phòng dưới dạng JSON
        } else {
          res.status(500).send({
            message: 'Invalid response from getTenPhongById function.'
          });
        }
      }
    });
  },


  getPhongChuaCoHopDong: (req, res) => {
    const maKhu = req.params.maKhu;
    Phong.getPhongChuaCoHopDong(maKhu, (err, results) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving Phong Chua Co Hop Dong.',
        });
      } else {
        res.send(results);
      }
    });
  },

  getAllInPhongDaOMaKhu: (req, res) => {
    const maKhu = req.params.maKhu;
    Phong.getAllInPhongDaOMaKhu(maKhu, (err, results) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving Phong Da O by MaKhu.',
        });
      } else {
        res.send(results);
      }
    });
  },

  demSoPhong: (req, res) => {
    const maKhu = req.params.maKhu;
    Phong.demSoPhong(maKhu, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while counting the Phong.',
        });
      } else {
        res.send({ soPhong: result });
      }
    });
  },

  getAllPhong: (req, res) => {
    Phong.getAll((err, results) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving all Phong.',
        });
      } else {
        res.send(results);
      }
    });
  },

  updateSoLuongPhongByMaKhu: (req, res) => {
    const maKhu = req.params.maKhu;
    Phong.updateSoLuongPhongByMaKhu(maKhu, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while updating the number of rooms for the Khu.',
        });
      } else {
        res.send({ message: result });
      }
    });
  },

  deleteHopDongIfPhongMaZero: (req, res) => {
    const maPhong = req.params.maPhong;
    Phong.deleteHopDongIfPhongMaZero(maPhong, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while deleting hopdong.',
        });
      } else {
        res.send({ message: result });
      }
    });
  }

};
