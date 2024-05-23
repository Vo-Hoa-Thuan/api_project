module.exports = function(router) {
    const hopDongController = require("../controllers/hopDong.controller");

    router.get("/hopDong", hopDongController.getAll);
    router.post("/hopDong", hopDongController.insert);
    router.get("/hopDong/:id", hopDongController.getById);
    router.delete("/hopDong/:id", hopDongController.delete);
    router.put("/hopDong/:id", hopDongController.update);
};
