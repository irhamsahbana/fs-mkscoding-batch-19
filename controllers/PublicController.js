const models = require('../models/index');

class PublicController {

  static async home(req, res) {
    res.render('pages/home.ejs');
  }

  static async about(req, res) {
    res.send('About Page');
  }

  static async contact(req, res) {
    res.render('pages/contact.ejs');
  }

  static async saveContact(req, res) {
    const { name, email, message } = req.body;

    const data = {
      nama: name,
      email: email,
      pesan: message,
    };

    try {
      await models.addContact(data);

      res.redirect('/contact');
    } catch (error) {
      res.send(error);
    }
  }

  static async adminDashboard(req, res) {
    res.render('pages_admin/dashboard.ejs');
  }
}

module.exports = PublicController;