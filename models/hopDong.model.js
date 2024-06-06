const db = require("../config/database");

const HopDong = function(hopDong) {
  // this.ma_hop_dong = hopDong.ma_hop_dong;
  // this.thoi_han = hopDong.thoi_han;
  // this.ngay_o = hopDong.ngay_o;
  // this.ngay_hop_dong = hopDong.ngay_hop_dong;
  // this.ngay_lap_hop_dong = hopDong.ngay_lap_hop_dong;
  // this.anh_hop_dong = hopDong.anh_hop_dong;
  // this.tien_coc = hopDong.tien_coc;
  // this.trang_thai_hop_dong = hopDong.trang_thai_hop_dong;
  // this.hieu_luc_hop_dong = hopDong.hieu_luc_hop_dong;
  // this.ma_phong = hopDong.ma_phong;
  // this.ma_nguoi_dung = hopDong.ma_nguoi_dung;
};

HopDong.CLM_ANH_HOP_DONG = "anh_hop_dong";
HopDong.CLM_HIEU_LUC_HOP_DONG = "hieu_luc_hop_dong";
HopDong.CLM_MA_HOP_DONG = "ma_hop_dong";
HopDong.CLM_MA_NGUOI_DUNG = "ma_nguoi_dung";
HopDong.CLM_MA_PHONG = "ma_phong";
HopDong.CLM_NGAY_HOP_DONG = "ngay_hop_dong";
HopDong.CLM_NGAY_LAP_HOP_DONG = "ngay_lap_hop_dong";
HopDong.CLM_NGAY_O = "ngay_o";
HopDong.CLM_THOI_HAN = "thoi_han";
HopDong.CLM_TIEN_COC = "tien_coc";
HopDong.CLM_TRANG_THAI_HOP_DONG = "trang_thai_hop_dong";
HopDong.TB_NAME = "HopDong";

HopDong.getById = (id, callback) => {
  const sqlString = `SELECT * FROM ${HopDong.TB_NAME} WHERE ${HopDong.CLM_MA_HOP_DONG} = ?`;
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result[0]);
  });
};

HopDong.getAllByMaKhu = (maKhu, callback) => {
  const sqlString = `
    SELECT hd.* 
    FROM ${HopDong.TB_NAME} hd
    JOIN Phong p ON hd.ma_phong = p.ma_phong
    WHERE p.ma_khu_tro = ?`;
  db.query(sqlString, [maKhu], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

HopDong.insert = (hopDong, callback) => {
  const sqlString = `INSERT INTO ${HopDong.TB_NAME} SET ?`;
  db.query(sqlString, hopDong, (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, { id: res.insertId, ...hopDong });
  });
};


HopDong.update = (hopDong, id, callback) => {
  const sqlString = "UPDATE HopDong SET thoi_han = ?, ngay_hop_dong = ?, ngay_o = ? WHERE ma_hop_dong = ?";
  db.query(sqlString, [hopDong.thoi_han, hopDong.ngay_hop_dong, hopDong.ngay_o, id], (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, "Cập nhật hợp đồng id = " + id + " thành công");
  });
};

HopDong.delete = (id, callback) => {
  const sqlString = `DELETE FROM ${HopDong.TB_NAME} WHERE ${HopDong.CLM_MA_HOP_DONG} = ?`;
  db.query(sqlString, id, (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, `Xóa hợp đồng id = ${id} thành công`);
  });
};
HopDong.getTenNguoiDungByIDHopDong = (id, callback) => {
  const sqlString = `
    SELECT ho_ten_nguoi_dung 
    FROM HopDong
    JOIN NguoiDung ON NguoiDung.ma_nguoi_dung = HopDong.ma_nguoi_dung 
    WHERE HopDong.ma_hop_dong = ?
  `;
  db.query(sqlString, id, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (result.length > 0) {
      const tenNguoiDung = { ho_ten_nguoi_dung: result[0].ho_ten_nguoi_dung };
      callback(null, tenNguoiDung); // Trả về đối tượng có cấu trúc mong muốn
    } else {
      callback(null, null); // Không có kết quả
    }
  });
};
HopDong.getHopDongConHanByMaKhu = (maKhu, callback) => {
  const sqlString = `
    SELECT HopDong.* FROM HopDong
    JOIN Phong ON HopDong.ma_phong = Phong.ma_phong
    JOIN KhuTro ON Phong.ma_khu_tro = KhuTro.ma_khu_tro
    WHERE KhuTro.ma_khu_tro = ?
  `;
  db.query(sqlString, [maKhu], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    const hopDongConHan = result.filter(hopDong => {
      const ngayHetHan = new Date(hopDong.ngay_hop_dong);
      return ngayHetHan > new Date();
    });
    callback(null, hopDongConHan);
  });
};

HopDong.getHopDongHetHanByMaKhu = (maKhu, callback) => {
  const sqlString = `
    SELECT HopDong.* FROM HopDong
    JOIN Phong ON HopDong.ma_phong = Phong.ma_phong
    JOIN KhuTro ON Phong.ma_khu_tro = KhuTro.ma_khu_tro
    WHERE KhuTro.ma_khu_tro = ?
  `;
  db.query(sqlString, [maKhu], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    const hopDongHetHan = result.filter(hopDong => {
      const ngayHetHan = new Date(hopDong.ngay_hop_dong);
      return ngayHetHan <= new Date();
    });
    callback(null, hopDongHetHan);
  });
};

module.exports = HopDong;
