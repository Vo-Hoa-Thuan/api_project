const NguoiDung = require("../models/nguoiDung.model");

module.exports = {
  getAll: (req, res) => {
    NguoiDung.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const ma_nguoi_dung = req.params.ma_nguoi_dung;
    NguoiDung.getById(ma_nguoi_dung, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const nguoiDung = req.body;
    NguoiDung.insert(nguoiDung, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const nguoiDung = req.body;
    const ma_nguoi_dung = req.params.ma_nguoi_dung;
    NguoiDung.update(nguoiDung, ma_nguoi_dung, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const ma_nguoi_dung = req.params.ma_nguoi_dung;
    NguoiDung.delete(ma_nguoi_dung, (result) => {
      res.send(result);
    });
  },

  getAllByTenPhong: (req, res) => {
    const tenPhong = req.query.tenPhong;
    NguoiDung.getAllByTenPhong(tenPhong, (result) => {
      res.send(result);
    });
  },

  getAllByMaKhu: (req, res) => {
    const maKhu = req.query.maKhu;
    NguoiDung.getAllByMaKhu(maKhu, (result) => {
      res.send(result);
    });
  },

  getNguoiDungByMaPhong: (req, res) => {
    const maPhong = req.query.maPhong;
    NguoiDung.getNguoiDungByMaPhong(maPhong, (result) => {
      res.send(result);
    });
  },

  getTenNguoiDungByMaPhong1: (req, res) => {
    const maPhong = req.params.maPhong;
    NguoiDung.getTenNguoiDungByMaPhong(maPhong, (result) => {
      res.send(result);
    });
  },

  getNguoiDungByTrangThai: (req, res) => {
    const trangThai = req.query.trangThai;
    const maPhong = req.query.maPhong;
    NguoiDung.getNguoiDungByTrangThai(trangThai, maPhong, (result) => {
      res.send(result);
    });
  },

  getTenNguoiDungByMaPhong: (req, res) => {
    const maPhong = req.params.maPhong;
    NguoiDung.getTenNguoiDungByMaPhong(maPhong, (result) => {
      res.send(result);
    });
  },

  getSoNguoiDungByMaPhong: (req, res) => {
    const maPhong = req.params.maPhong;
    NguoiDung.getSoNguoiDungByMaPhong(maPhong, (result) => {
      res.send({ soNguoiDung: result });
    });
  },

  getSoNguoiOByMaPhong: (req, res) => {
    const maPhong = req.params.maPhong;
    NguoiDung.getSoNguoiOByMaPhong(maPhong, (result) => {
      res.send({ soNguoiO: result });
    });
  },

  getListNguoiDungByMaPhong: (req, res) => {
    const maPhong = req.params.maPhong;
    NguoiDung.getListNguoiDungByMaPhong(maPhong, (result) => {
      res.send(result);
    });
  },

  getListTrangThaiHDDungByMaPhong: (req, res) => {
    const maPhong = req.params.maPhong;
    NguoiDung.getListTrangThaiHDDungByMaPhong(maPhong, (result) => {
      res.send(result);
    });
  },

  getAllInNguoiDangOByMaKhu: (req, res) => {
    const maKhu = req.params.maKhu;
    NguoiDung.getAllInNguoiDangOByMaKhu(maKhu, (result) => {
      res.send(result);
    });
  },

  getAllInNguoiDaOByMaKhu: (req, res) => {
    const maKhu = req.params.maKhu;
    NguoiDung.getAllInNguoiDaOByMaKhu(maKhu, (result) => {
      res.send(result);
    });
  },

  getTenNguoiDangOByMaPhong: (req, res) => {
    const maPhong = req.params.maPhong;
    NguoiDung.getTenNguoiDangOByMaPhong(maPhong, (result) => {
      res.send(result);
    });
  },

  getTenNguoiDaOByMaPhong: (req, res) => {
    const maPhong = req.params.maPhong;
    NguoiDung.getTenNguoiDaOByMaPhong(maPhong, (result) => {
      res.send(result);
    });
  },

  getMaNguoiDangOByMaPhong: (req, res) => {
    const maPhong = req.params.maPhong;
    NguoiDung.getMaNguoiDangOByMaPhong(maPhong, (result) => {
      res.send(result);
    });
  },

  updateTrangThaiNguoiDungThanhDaO: (req, res) => {
    const maPhong = req.params.maPhong;
    NguoiDung.updateTrangThaiNguoiDungThanhDaO(maPhong, (result) => {
      res.send(result);
    });
  }
};