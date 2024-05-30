module.exports = function (router) {
    const nguoiDungController = require("../controllers/nguoidung.controller");

    
    router.get("/nguoidung", nguoiDungController.getAll);
    router.post("/nguoidung", nguoiDungController.insert);
    // router.get("/nguoidung/:ma_nguoi_dung", nguoiDungController.getById);
    router.delete("/nguoidung/:ma_nguoi_dung", nguoiDungController.delete);
    router.put("/nguoidung/:ma_nguoi_dung", nguoiDungController.update);
    // router.get("/nguoidung/:tenphong", nguoiDungController.getAllByTenPhong);
    router.get("/nguoidung/:maKhu", nguoiDungController.getAllByMaKhu);
    router.get("/nguoidung/maPhong", nguoiDungController.getNguoiDungByMaPhong);
    // router.get("/nguoidung/:maPhong/tennguoidung1", nguoiDungController.getTenNguoiDungByMaPhong1);
    // router.get("/nguoidung/trangthaichodat", nguoiDungController.getNguoiDungByTrangThai);
    // router.get("/nguoidung/:maPhong/tennguoidung", nguoiDungController.getTenNguoiDungByMaPhong);
    // router.get("/nguoidung/:maPhong/songuoidung", nguoiDungController.getSoNguoiDungByMaPhong);
    router.get("/nguoidung/:maPhong/soNguoiO", nguoiDungController.getSoNguoiOByMaPhong);
    router.get("/nguoidung/:maPhong/listnguoidung", nguoiDungController.getListNguoiDungByMaPhong);
    // router.get("/nguoidung/:maPhong/listtrangthaihddung", nguoiDungController.getListTrangThaiHDDungByMaPhong);
    router.get("/nguoidung/dang-o/:maKhu", nguoiDungController.getAllInNguoiDangOByMaKhu);
    router.get("/nguoidung/da-o/:maKhu", nguoiDungController.getAllInNguoiDaOByMaKhu);
    router.get("/nguoidung/:maPhong/tennguoidango", nguoiDungController.getTenNguoiDangOByMaPhong);
    // router.get("/nguoidung/:maPhong/tennguoidao", nguoiDungController.getTenNguoiDaOByMaPhong);
    router.get("/nguoidung/:maPhong/manguoidango", nguoiDungController.getMaNguoiDangOByMaPhong);
    router.put("/nguoidung/:maPhong/updatetrangthaidao", nguoiDungController.updateTrangThaiNguoiDungThanhDaO);
};