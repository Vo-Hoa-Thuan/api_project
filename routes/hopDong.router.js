module.exports = function(router) {
    const hopDongController = require("../controllers/hopDong.controller");

    router.get("/hopDong/:maKhu", hopDongController.getAllHopDongByMaKhu);
    router.post("/hopDong", hopDongController.insert);
    router.get("/hopDong/:id", hopDongController.getById);
    router.delete("/hopDong/:id", hopDongController.delete);
    router.put("/hopDong/:id", hopDongController.update);
    router.get("/hopDong/:id/tenNguoiDung", hopDongController.getTenNguoiDungByIDHopDong);
    router.get("/hopDong/hanCon/:maKhu/", hopDongController.getHopDongConHanByMaKhu);
    router.get("/hopDong/hanHet/:maKhu/", hopDongController.getHopDongHetHanByMaKhu);
};
