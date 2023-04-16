const route = require('express').Router();
const models = require('./models/index');

// admin
route.get('/admin/contact-list', async function(req, res) {
  try {
    const contactList = await models.getContactList();
    const data = {
      contactList: contactList,
    };

    res.render('pages_admin/contacts.ejs', data);
  } catch(error) {
    res.send(error);
  }
});

route.post('/admin/contact-list/:id/delete', async function(req, res) {
  const id = req.params.id;

  try {
    await models.deleteContact(id);
    res.redirect('/admin/contact-list');
  } catch (error) {
    res.send(error);
  }
});

route.get('/admin/contact-list/:id/edit', async function(req, res) {
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
});

route.post('/admin/contact-list/:id/edit', async function(req, res) {
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
});
// end admin

// public
route.get('/', async function(req, res) {
  res.render('pages/home.ejs');
});

route.get('/about', async function(req, res) {
  res.send('About Page');
});

route.get('/contact', async function(req, res) {
  res.render('pages/contact.ejs');
});

route.get('/admin-dashboard', async function(req, res) {
  res.render('pages_admin/dashboard.ejs');
});

route.post('/contact', async function(req, res) {

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
});
// end public

module.exports = route;