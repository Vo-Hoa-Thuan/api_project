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

HopDong.getAll = (callback) => {
  const sqlString = `SELECT * FROM ${HopDong.TB_NAME}`;
  db.query(sqlString, (err, result) => {
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
  const sqlString = `UPDATE ${HopDong.TB_NAME} SET ? WHERE ${HopDong.CLM_MA_HOP_DONG} = ?`;
  db.query(sqlString, [hopDong, id], (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, `Cập nhật hợp đồng id = ${id} thành công`);
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
    SELECT ${NguoiDung.CLM_HO_TEN_NGUOI_DUNG} FROM ${NguoiDung.TB_NAME}
    JOIN ${HopDong.TB_NAME} ON ${NguoiDung.TB_NAME}.${NguoiDung.CLM_MA_NGUOI_DUNG} = ${HopDong.TB_NAME}.${HopDong.CLM_MA_NGUOI_DUNG}
    WHERE ${HopDong.CLM_MA_HOP_DONG} = ?
  `;
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    if (result.length > 0) {
      callback(null, result[0][NguoiDung.CLM_HO_TEN_NGUOI_DUNG]);
    } else {
      callback(null, "null");
    }
  });
};

module.exports = HopDong;
