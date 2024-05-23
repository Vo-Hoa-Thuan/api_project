const AdminModel = require('../models/adminModel');

module.exports = {
  insertAdmin: (req, res) => {
    const admin = req.body;
    AdminModel.insertAdmin(admin, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the Admin.',
        });
      } else {
        res.status(201).send(result);
      }
    });
  },

  updateAdmin: (req, res) => {
    const admin = req.body;
    const username = req.params.username;
    AdminModel.updateAdmin(admin, username, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while updating the Admin.',
        });
      } else {
        res.send(result);
      }
    });
  },

  getAllInAdmin: (req, res) => {
    AdminModel.getAllInAdmin((err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving Admins.',
        });
      } else {
        res.send(result);
      }
    });
  },

  checkLogin: (req, res) => {
    const { username, password } = req.body;
    AdminModel.checkLogin(username, password, (err, valid) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while checking login.',
        });
      } else {
        res.send({ valid });
      }
    });
  },

  getAdmin: (req, res) => {
    const { username } = req.params;
    AdminModel.getAdmin(username, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the Admin.',
        });
      } else if (result) {
        res.send(result);
      } else {
        res.status(404).send('Admin not found');
      }
    });
  }
};