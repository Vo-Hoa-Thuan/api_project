module.exports = function (router) {
  const phongController = require("../controllers/phong.controller");
  router.post('/phong', phongController.insertPhong);
  router.delete('/phong/:maPhong', phongController.xoaPhongById);
  router.put('/phong/:maPhong', phongController.updatePhong);
  router.put('/phong/:maPhong/dang-o', phongController.updateTrangThaiPhongThanhDangO);
  router.put('/phong/:maPhong/da-o', phongController.updateTrangThaiPhongThanhDaO);
  router.get('/phong/ma-khu/:maKhu', phongController.getAllInPhongByMaKhu);
  router.get('/phong/ten-khu-tro/:tenKhuTro', phongController.getAllInPhongByTenKhuTro);
  router.get('/phong/:id', phongController.getPhongById);
  router.get('/phong/:id/ten', phongController.getTenPhongById);
  router.get('/phong/chua-co-hop-dong/:maKhu', phongController.getPhongChuaCoHopDong);
  router.get('/phong/da-o/:maKhu', phongController.getAllInPhongDaOMaKhu);
  router.get('/phong/all', phongController.getAllPhong);
  router.get('/phong/dem/:maKhu', phongController.demSoPhong);
};
