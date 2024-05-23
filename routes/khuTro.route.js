module.exports = function (router) {
    const khuTroController = require("../controllers/khuTro.controller");
    
    router.get("/khutro", khuTroController.getAll);
    router.post("/khutro", khuTroController.insert);
    router.get("/khutro/:id", khuTroController.getById);
    router.delete("/khutro/:id", khuTroController.delete);
    router.put("/khutro/:id", khuTroController.update);
    router.get("/khutro/admin/:username", khuTroController.getAllInKhuTroByAdmin);
    router.get("/khutro/name", khuTroController.getTenKhuTro);
  };