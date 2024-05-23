module.exports = function(router) {
    const adminController = require("../controllers/adminController");
  
    router.post('/admin', adminController.insertAdmin);
    router.put('/admin', adminController.updateAdmin);
    router.get('/admins', adminController.getAllInAdmin);
    router.post('/admin/login', adminController.checkLogin);
    router.get('/admin/:username', adminController.getAdmin);   
  };
