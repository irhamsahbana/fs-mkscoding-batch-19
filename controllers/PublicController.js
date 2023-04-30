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

  static async login(req, res) {
    console.log(req.session);
    res.render('pages/login.ejs');
  }

  static async loginAction(req, res) {
    const { username, password } = req.body;

    try {
      const user = await models.login(username, password);

      if (user) {
        // set session
        req.session.user = user;
        req.session.isLoggedIn = true;

        res.redirect('/admin/contact-list');
      } else {
        res.redirect('/login');
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = PublicController;