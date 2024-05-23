const KhuTro = require('../models/khuTro.model');

module.exports = {
  getAll: (req, res) => {
    KhuTro.getAll((err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving KhuTro.',
        });
      } else {
        res.send(result);
      }
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    KhuTro.getById(id, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the KhuTro.',
        });
      } else {
        res.send(result);
      }
    });
  },

  insert: (req, res) => {
    const khuTro = req.body;
    KhuTro.insert(khuTro, (err, result) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the KhuTro.',
            });
        } else {
            console.log('Inserted KhuTro result:', result); // Thêm log ở đây để kiểm tra result
            // Trả về chỉ ID của khu trọ
            res.send({ id: result.ma_khu_tro });
        }
    });
},

  

  update: (req, res) => {
    const khuTro = req.body;
    const id = req.params.id;
    KhuTro.update(khuTro, id, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while updating the KhuTro.',
        });
      } else {
        res.send(result);
      }
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    KhuTro.delete(id, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while deleting the KhuTro.',
        });
      } else {
        res.send(result);
      }
    });
  },

  getAllInKhuTroByAdmin: (req, res) => {
    const username = req.params.username;
    KhuTro.getAllInKhuTroByAdmin(username, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the KhuTro by admin.',
        });
      } else {
        res.send(result);
      }
    });
  },

  getTenKhuTro: (req, res) => {
    KhuTro.getTenKhuTro((err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the names of KhuTro.',
        });
      } else {
        res.send(result);
      }
    });
  }
};