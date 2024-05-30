const db = require('../config/database');


const NguoiDung = (nguoiDung) => {
  this.ma_nguoi_dung = nguoiDung.ma_nguoi_dung;
  this.ho_ten_nguoi_dung = nguoiDung.ho_ten_nguoi_dung;
  this.cccd = nguoiDung.cccd;
  this.nam_sinh = nguoiDung.nam_sinh;
  this.que_quan = nguoiDung.que_quan;
  this.sdt_nguoi_dung = nguoiDung.sdt_nguoi_dung;
  this.trang_thai_chu_hop_dong = nguoiDung.trang_thai_chu_hop_dong;
  this.trang_thai_o = nguoiDung.trang_thai_o;
  this.ma_phong = nguoiDung.ma_phong;
};

// NguoiDung.getById = (ma_nguoi_dung, callback) => {
//   const sqlString = "SELECT * FROM NguoiDung WHERE ma_nguoi_dung = ?";
//   db.query(sqlString, ma_nguoi_dung, (err, result) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(result);
//   });
// };

NguoiDung.getAll = (callback) => {
  const sqlString = "SELECT * FROM NguoiDung";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

NguoiDung.insert = (nguoiDung, callBack) => {
  const sqlString = "INSERT INTO NguoiDung SET ?";
  db.query(sqlString, nguoiDung, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ ma_nguoi_dung: res.insertId, ...nguoiDung });
  });
};

NguoiDung.update = (nguoiDung, ma_nguoi_dung, callBack) => {
  const sqlString = "UPDATE NguoiDung SET ? WHERE ma_nguoi_dung = ?";
  db.query(sqlString, [nguoiDung, ma_nguoi_dung], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật người dùng mã = " + ma_nguoi_dung + " thành công");
  });
};

NguoiDung.delete = (ma_nguoi_dung, callBack) => {
  db.query(`DELETE FROM NguoiDung WHERE ma_nguoi_dung = ?`, ma_nguoi_dung, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa người dùng mã = " + ma_nguoi_dung + " thành công");
  });
};
NguoiDung.deleteByRoomId = (ma_phong, callBack) => {
  const sqlString = "DELETE FROM NguoiDung WHERE ma_phong = ?";
  db.query(sqlString, ma_phong, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("Xóa tất cả người dùng trong phòng có mã = " + ma_phong + " thành công");
  });
};
// NguoiDung.getAllByTenPhong = (tenPhong, callback) => {
//   const sqlString = `
//     SELECT *
//     FROM NguoiDung
//     JOIN Phong ON NguoiDung.ma_phong = Phong.ma_phong
//     WHERE Phong.ten_phong = ?
//   `;
//   db.query(sqlString, tenPhong, (err, result) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(result);
//   });
// };

// NguoiDung.getAllByMaKhu = (maKhu, callback) => {
//   const sqlString = `
//     SELECT *
//     FROM NguoiDung
//     JOIN Phong ON NguoiDung.ma_phong = Phong.ma_phong
//     JOIN KhuTro ON Phong.ma_khu_tro = KhuTro.ma_khu_tro
//     WHERE KhuTro.ma_khu_tro = ?
//   `;
//   db.query(sqlString, maKhu, (err, result) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(result);
//   });
// };

// NguoiDung.getAllByTenPhong = (tenPhong, callback) => {
//   const sqlString = `
//     SELECT *
//     FROM NguoiDung
//     JOIN Phong ON NguoiDung.ma_phong = Phong.ma_phong
//     WHERE Phong.ten_phong = ?
//   `;
//   db.query(sqlString, tenPhong, (err, result) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(result);
//   });
// };

NguoiDung.getAllByMaKhu = (maKhu, callback) => {
  const sqlString = `
    SELECT *
    FROM NguoiDung
    JOIN Phong ON NguoiDung.ma_phong = Phong.ma_phong
    JOIN KhuTro ON Phong.ma_khu_tro = KhuTro.ma_khu_tro
    WHERE KhuTro.ma_khu_tro = ?
  `;
  db.query(sqlString, maKhu, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

NguoiDung.getNguoiDungByMaPhong = (maPhong, callback) => {
  const sqlString = `
    SELECT *
    FROM NguoiDung
    WHERE ma_phong = ? AND trang_thai_o = 1
  `;
  db.query(sqlString, [maPhong], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

// NguoiDung.getTenNguoiDungByMaPhong1 = (maPhong, callback) => {
//   const sqlString = `
//     SELECT *
//     FROM NguoiDung
//     WHERE ma_phong = ?
//     LIMIT 1
//   `;
//   db.query(sqlString, [maPhong], (err, result) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(result[0] || null);
//   });
// };

// NguoiDung.getNguoiDungByTrangThai = (trangThai, maPhong, callback) => {
//   const sqlString = `
//     SELECT NguoiDung.ho_ten_nguoi_dung
//     FROM HopDong
//     JOIN NguoiDung ON HopDong.ma_nguoi_dung = NguoiDung.ma_nguoi_dung
//     WHERE HopDong.ma_phong = ? AND NguoiDung.trang_thai_chu_hop_dong = ?
//     LIMIT 1
//   `;
//   db.query(sqlString, [maPhong, trangThai], (err, result) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(result[0]?.ho_ten_nguoi_dung || "null");
//   });
// };

// NguoiDung.getTenNguoiDungByMaPhong = (maPhong, callback) => {
//   const sqlString = `
//     SELECT NguoiDung.ho_ten_nguoi_dung
//     FROM NguoiDung
//     JOIN HopDong ON NguoiDung.ma_nguoi_dung = HopDong.ma_nguoi_dung
//     JOIN Phong ON HopDong.ma_phong = Phong.ma_phong
//     WHERE NguoiDung.ma_phong = ?
//     LIMIT 1
//   `;
//   db.query(sqlString, [maPhong], (err, result) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(result[0]?.ho_ten_nguoi_dung || "null");
//   });
// };

// NguoiDung.getSoNguoiDungByMaPhong = (maPhong, callback) => {
//   const sqlString = `
//     SELECT COUNT(NguoiDung.ma_nguoi_dung)
//     FROM NguoiDung
//     WHERE NguoiDung.ma_phong = ?
//   `;
//   db.query(sqlString, [maPhong], (err, result) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(result[0]["COUNT(NguoiDung.ma_nguoi_dung)"]);
//   });
// };

NguoiDung.getSoNguoiOByMaPhong = (maPhong, callback) => {
  const sqlString = `
    SELECT Phong.so_nguoi_o
    FROM Phong
    WHERE Phong.ma_phong = ?
  `;
  db.query(sqlString, [maPhong], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result[0]?.so_nguoi_o || 0);
  });
};

NguoiDung.getListNguoiDungByMaPhong = (maPhong, callback) => {
  const sqlString = `
    SELECT *
    FROM NguoiDung
    WHERE NguoiDung.ma_phong = ? AND NguoiDung.trang_thai_o = 1
  `;
  db.query(sqlString, [maPhong], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

// NguoiDung.getListTrangThaiHDDungByMaPhong = (maPhong, callback) => {
//   const sqlString = `
//     SELECT NguoiDung.*
//     FROM NguoiDung
//     JOIN HopDong ON NguoiDung.ma_nguoi_dung = HopDong.ma_nguoi_dung
//     JOIN Phong ON HopDong.ma_phong = Phong.ma_phong
//     WHERE NguoiDung.ma_phong = ?
//   `;
//   db.query(sqlString, [maPhong], (err, result) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(result);
//   });
// };

// NguoiDung.getAllInNguoiDangOByMaKhu = (maKhu, callback) => {
//   const sqlString = `
//     SELECT *
//     FROM NguoiDung
//     JOIN Phong ON NguoiDung.ma_phong = Phong.ma_phong
//     JOIN KhuTro ON Phong.ma_khu = KhuTro.ma_khu_tro
//     WHERE KhuTro.ma_khu_tro = ? AND NguoiDung.trang_thai_o = 1
//   `;

//   db.query(sqlString, [maKhu], (err, results) => {
//     if (err) {
//       return callback(err, null);
//     }
//     callback(null, results);
//   });
// };

NguoiDung.getAllInNguoiDangOByMaKhu = (maKhu, callback) => {
  const sqlString = `
    SELECT *
    FROM NguoiDung
    JOIN Phong ON NguoiDung.ma_phong = Phong.ma_phong
    JOIN KhuTro ON Phong.ma_khu_tro = KhuTro.ma_khu_tro
    WHERE KhuTro.ma_khu_tro = ? AND NguoiDung.trang_thai_o = 1
  `;

  db.query(sqlString, [maKhu], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

NguoiDung.getAllInNguoiDaOByMaKhu = (maKhu, callback) => {
  const sqlString = `
    SELECT *
    FROM NguoiDung
    JOIN Phong ON NguoiDung.ma_phong = Phong.ma_phong
    JOIN KhuTro ON Phong.ma_khu_tro = KhuTro.ma_khu_tro
    WHERE KhuTro.ma_khu_tro = ? AND NguoiDung.trang_thai_o = 0
  `;
  db.query(sqlString, [maKhu], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

NguoiDung.getTenNguoiDangOByMaPhong = (maPhong, callback) => {
  const sqlString = `
    SELECT NguoiDung.ho_ten_nguoi_dung
    FROM NguoiDung
    JOIN HopDong ON NguoiDung.ma_nguoi_dung = HopDong.ma_nguoi_dung
    JOIN Phong ON HopDong.ma_phong = Phong.ma_phong
    WHERE NguoiDung.ma_phong = ? AND NguoiDung.trang_thai_o = 1
    LIMIT 1
  `;
  db.query(sqlString, [maPhong], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result[0]?.ho_ten_nguoi_dung || "null");
  });
};

// NguoiDung.getTenNguoiDaOByMaPhong = (maPhong, callback) => {
//   const sqlString = `
//     SELECT NguoiDung.ho_ten_nguoi_dung
//     FROM NguoiDung
//     JOIN HopDong ON NguoiDung.ma_nguoi_dung = HopDong.ma_nguoi_dung
//     JOIN Phong ON HopDong.ma_phong = Phong.ma_phong
//     WHERE NguoiDung.ma_phong = ? AND NguoiDung.trang_thai_o = 0
//     LIMIT 1
//   `;
//   db.query(sqlString, [maPhong], (err, result) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(result[0]?.ho_ten_nguoi_dung || "null");
//   });
// };

NguoiDung.getMaNguoiDangOByMaPhong = (maPhong, callback) => {
  const sqlString = `
    SELECT NguoiDung.ma_nguoi_dung
    FROM NguoiDung
    JOIN HopDong ON NguoiDung.ma_nguoi_dung = HopDong.ma_nguoi_dung
    JOIN Phong ON HopDong.ma_phong = Phong.ma_phong
    WHERE NguoiDung.ma_phong = ? AND NguoiDung.trang_thai_o = 1
    LIMIT 1
  `;
  db.query(sqlString, [maPhong], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result[0]?.ma_nguoi_dung || "null");
  });
};

NguoiDung.updateTrangThaiNguoiDungThanhDaO = (maPhong, callback) => {
  const sqlString = `
    UPDATE NguoiDung
    SET trang_thai_o = 0
    WHERE ma_phong = ?
  `;
  db.query(sqlString, [maPhong], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(`Cập nhật trạng thái người dùng thành 'Đã ở' cho phòng ${maPhong} thành công`);
  });
};


module.exports = NguoiDung;
