const HopDong = require("../models/hopDong.model");

module.exports = {
  getAllHopDongByMaKhu: (req, res) => {
    const maKhu = req.params.maKhu;
  
    HopDong.getAllByMaKhu(maKhu, (err, result) => {
      if (err) {
        return res.status(500).send({ error: 'An error occurred while retrieving contracts.' });
      }
      res.send(result);
    });
  },
  

  getById: (req, res) => {
    const id = req.params.id;
    HopDong.getById(id, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || `Đã xảy ra lỗi khi lấy hợp đồng có id ${id}.`
        });
      } else {
        res.send(result);
      }
    });
  },

  insert: (req, res) => {
    const hopDong = req.body;
    HopDong.insert(hopDong, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Đã xảy ra lỗi khi chèn hợp đồng."
        });
      } else {
        res.send(result);
      }
    });
  },

  update: (req, res) => {
    const hopDong = req.body;
    const id = req.params.id;
    HopDong.update(hopDong, id, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || `Đã xảy ra lỗi khi cập nhật hợp đồng có id ${id}.`
        });
      } else {
        res.send(result);
      }
    });
  },
   getTenNguoiDungByIDHopDong: (req, res) => {
    const id = req.params.id;
    HopDong.getTenNguoiDungByIDHopDong(id, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || `Đã xảy ra lỗi khi lấy tên người dùng từ hợp đồng có id ${id}.`
        });
      } else {
        res.send(result);
      }
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    HopDong.delete(id, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || `Đã xảy ra lỗi khi xóa hợp đồng có id ${id}.`
        });
      } else {
        res.send(result);
      }
    });
  },
  getHopDongConHanByMaKhu: (req, res) => {
    const maKhu = req.params.maKhu;
    HopDong.getHopDongConHanByMaKhu(maKhu, (err, hopDongs) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Đã xảy ra lỗi khi lấy danh sách hợp đồng."
        });
      } else {
        res.send(hopDongs);
      }
    });
  },

  getHopDongHetHanByMaKhu: (req, res) => {
    const maKhu = req.params.maKhu;
    HopDong.getHopDongHetHanByMaKhu(maKhu, (err, hopDongs) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Đã xảy ra lỗi khi lấy danh sách hợp đồng."
        });
      } else {
        res.send(hopDongs);
      }
    });
  }
};
