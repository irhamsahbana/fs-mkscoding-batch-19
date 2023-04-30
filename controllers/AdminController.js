const models = require('../models/index');

class AdminController {
  static async contactList(req, res) {
    if (!req.session.isLoggedIn) {
      return res.redirect('/login');
    }

    try {
      const contactList = await models.getContactList();
      const data = {
        contactList: contactList,
      };

      res.render('pages_admin/contacts.ejs', data);
    } catch(error) {
      res.send(error);
    }
  }

  static async deleteContact(req, res) {
    const id = req.params.id;

    try {
      await models.deleteContact(id);
      res.redirect('/admin/contact-list');
    } catch (error) {
      res.send(error);
    }
  }

  static async editContact(req, res) {
    const id = req.params.id;

    try {
      const contactFromDB = await models.getContactById(id);
      const data = {
        contact: contactFromDB,
      };

      res.render('pages_admin/contact_edit.ejs', data);
    } catch (error) {
      res.send(error);
    }
  }

  static async updateContact(req, res) {
    const id = req.params.id;
    const { name, email, message } = req.body;

    const data = {
      nama: name,
      email: email,
      pesan: message,
    };

    try {
      await models.updateContact(id, data);
      res.redirect('/admin/contact-list');
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = AdminController;