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
    const sqlString = 'DELETE FROM phong WHERE ma_phong = ?';
    db.query(sqlString, maPhong, (err, res) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, `Xóa phòng ID = ${maPhong} thành công`);
    });
  },

  updatePhong: (phong, callback) => {
    const sqlString = 'UPDATE phong SET ten_phong = ?, dien_tich = ?, gia_thue = ?, so_nguoi_o = ? WHERE ma_phong = ?';
    db.query(sqlString, [phong.ten_phong, phong.dien_tich, phong.gia_thue, phong.so_nguoi_o, phong.ma_phong], (err, res) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, `Cập nhật phòng ID = ${phong.ma_phong} thành công`);
    });
  },

  updateTrangThaiPhongThanhDangO: (maPhong, callback) => {
    const sqlString = 'UPDATE phong SET trang_thai_phong = 1 WHERE ma_phong = ?';
    db.query(sqlString, maPhong, (err, res) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, `Cập nhật trạng thái phòng ID = ${maPhong} thành công`);
    });
  },

  updateTrangThaiPhongThanhDaO: (maPhong, callback) => {
    const sqlString = 'UPDATE phong SET trang_thai_phong = 0 WHERE ma_phong = ?';
    db.query(sqlString, maPhong, (err, res) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, `Cập nhật trạng thái phòng ID = ${maPhong} thành công`);
    });
  },

  getPhongById: (id, callback) => {
    const sqlString = 'SELECT * FROM phong WHERE ma_phong = ?';
    db.query(sqlString, id, (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        if (results.length > 0) {
            const phong = results[0]; // Lấy phần tử đầu tiên của mảng kết quả
            callback(null, phong); // Trả về phòng dưới dạng đối tượng JSON
        } else {
            // Trả về null nếu không có phòng nào được tìm thấy với mã phòng cụ thể
            callback(null, null);
        }
    });
}
,

  getAll: (callback) => {
    const sqlString = 'SELECT * FROM phong';
    db.query(sqlString, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    });
  },

  getAllInPhongByMaKhu: (maKhu, callback) => {
    const sqlString = 'SELECT * FROM phong WHERE ma_khu_tro = ?';
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
      SELECT * FROM phong 
      JOIN KhuTro ON KhuTro.ma_khu_tro = phong.ma_khu_tro 
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
  const sqlString = 'SELECT ten_phong FROM phong WHERE ma_phong = ?';
  db.query(sqlString, id, (err, result) => {
      if (err) {  
          callback(err);
          return;
      }
      const tenPhong = result.length > 0 ? result[0].ten_phong : null;

      const response = tenPhong;
      callback(null, response);
  });
},


  getPhongChuaCoHopDong: (maKhu, callback) => {
    const sqlString = `
      SELECT DISTINCT * FROM phong
      WHERE ma_phong NOT IN (
        SELECT ma_phong FROM HopDong WHERE hieu_luc_hop_dong = 1
      ) AND ma_khu_tro = ?
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
      SELECT * FROM phong 
      JOIN NguoiDung ON Phong.ma_phong = NguoiDung.ma_phong 
      WHERE ma_khu_tro = ? AND NguoiDung.trang_thai_o = 1
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
    const sqlString = 'SELECT COUNT(ma_phong) AS SoPhong FROM phong WHERE ma_khu_tro = ?';
    db.query(sqlString, maKhu, (err, results) => {
      if (err) {
        callback(err);
        return;
      }
      const soPhong = results.length > 0 ? results[0].SoPhong : 0;
      callback(null, soPhong);
    });
  },

updateSoLuongPhongByMaKhu: (maKhu, callback) => {
  const sqlString = `
    UPDATE KhuTro
    SET so_luong_phong = (
      SELECT COUNT(ma_phong)
      FROM phong
      WHERE ma_khu_tro = ?
    )
    WHERE ma_khu_tro = ?
  `;
  db.query(sqlString, [maKhu, maKhu], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, `Cập nhật số lượng phòng cho khu có mã ${maKhu} thành công`);
  });
  },

  deleteHopDongIfPhongMaZero: (maPhong, callback) => {
    // First, check if the maPhong in the phong table is 0
    const checkPhongQuery = 'SELECT * FROM phong WHERE ma_phong = ? AND trang_thai_phong	 = 0';
    db.query(checkPhongQuery, maPhong, (err, results) => {
      if (err) {
        callback(err);
        return;
      }

      if (results.length > 0) {
        // If trang_thai_phong	 is 0, delete all records in hopdong with the same ma_phong
        const deleteHopDongQuery = 'DELETE FROM hopdong WHERE ma_phong = ?';
        db.query(deleteHopDongQuery, maPhong, (err, res) => {
          if (err) {
            callback(err);
            return;
          }
          callback(null, `Deleted all hopdong with ma_phong = ${maPhong}`);
        });
      } else {
        callback(null, `No phong with ma_phong = ${maPhong} and trang_thai_phong = 0 found`);
      }
    });
  }

}; 

module.exports = Phong;
