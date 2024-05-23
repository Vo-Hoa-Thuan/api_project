const db = require('../config/database');

const Phong = {
  insertPhong: (phong, callback) => {
    const sqlString = 'INSERT INTO phong SET ?';
    db.query(sqlString, phong, (err, res) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, { id: res.insertId, ...phong });
    });
  },

  xoaPhongById: (maPhong, callback) => {
    const sqlString = 'DELETE FROM Phong WHERE ma_phong = ?';
    db.query(sqlString, maPhong, (err, res) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, `Xóa phòng ID = ${maPhong} thành công`);
    });
  },

  updatePhong: (phong, callback) => {
    const sqlString = 'UPDATE Phong SET ten_phong = ?, dien_tich = ?, gia_thue = ?, so_nguoi_o = ? WHERE ma_phong = ?';
    db.query(sqlString, [phong.ten_phong, phong.dien_tich, phong.gia_thue, phong.so_nguoi_o, phong.ma_phong], (err, res) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, `Cập nhật phòng ID = ${phong.ma_phong} thành công`);
    });
  },

  updateTrangThaiPhongThanhDangO: (maPhong, callback) => {
    const sqlString = 'UPDATE Phong SET trang_thai_phong = 1 WHERE ma_phong = ?';
    db.query(sqlString, maPhong, (err, res) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, `Cập nhật trạng thái phòng ID = ${maPhong} thành công`);
    });
  },

  updateTrangThaiPhongThanhDaO: (maPhong, callback) => {
    const sqlString = 'UPDATE Phong SET trang_thai_phong = 0 WHERE ma_phong = ?';
    db.query(sqlString, maPhong, (err, res) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, `Cập nhật trạng thái phòng ID = ${maPhong} thành công`);
    });
  },

  getPhongById: (id, callback) => {
    const sqlString = 'SELECT * FROM Phong WHERE ma_phong = ?';
    db.query(sqlString, id, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    });
  },

  getAll: (callback) => {
    const sqlString = 'SELECT * FROM Phong';
    db.query(sqlString, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    });
  },

  getAllInPhongByMaKhu: (maKhu, callback) => {
    const sqlString = 'SELECT * FROM Phong WHERE ma_khu = ?';
    db.query(sqlString, maKhu, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    });
  },

  getAllInPhongByTenKhuTro: (tenKhuTro, callback) => {
    const sqlString = `
      SELECT * FROM Phong 
      JOIN KhuTro ON KhuTro.ma_khu_tro = Phong.ma_khu 
      WHERE KhuTro.ten_khu_tro = ?
    `;
    db.query(sqlString, tenKhuTro, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    });
  },

  getTenPhongById: (id, callback) => {
    const sqlString = 'SELECT ten_phong FROM Phong WHERE ma_phong = ?';
    db.query(sqlString, id, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      const tenPhong = result.length > 0 ? result[0].ten_phong : null;
      callback(null, tenPhong);
    });
  },

  getPhongChuaCoHopDong: (maKhu, callback) => {
    const sqlString = `
      SELECT DISTINCT * FROM Phong
      WHERE ma_phong NOT IN (
        SELECT ma_phong FROM HopDong WHERE hieu_luc_hop_dong = 1
      ) AND ma_khu = ?
    `;
    db.query(sqlString, maKhu, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    });
  },

  getAllInPhongDaOMaKhu: (maKhu, callback) => {
    const sqlString = `
      SELECT * FROM Phong 
      JOIN NguoiDung ON Phong.ma_phong = NguoiDung.ma_phong 
      WHERE ma_khu = ? AND NguoiDung.trang_thai_o = 1
    `;
    db.query(sqlString, maKhu, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    });
  },

  demSoPhong: (maKhu, callback) => {
    const sqlString = 'SELECT COUNT(ma_phong) AS SoPhong FROM Phong WHERE ma_khu = ?';
    db.query(sqlString, maKhu, (err, results) => {
      if (err) {
        callback(err);
        return;
      }
      const soPhong = results.length > 0 ? results[0].SoPhong : 0;
      callback(null, soPhong);
    });
  }
};

module.exports = Phong;