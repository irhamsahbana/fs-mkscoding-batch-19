const route = require('express').Router();

const PublicController = require('./controllers/PublicController');
const AdminController = require('./controllers/AdminController');
// admin
route.get('/admin/contact-list', AdminController.contactList);
route.post('/admin/contact-list/:id/delete', AdminController.deleteContact);
route.get('/admin/contact-list/:id/edit', AdminController.editContact);
route.post('/admin/contact-list/:id/edit', AdminController.updateContact);
// end admin

// public
route.get('/', PublicController.home);
route.get('/about', PublicController.about);
route.get('/contact', PublicController.contact);
route.post('/contact', PublicController.saveContact);

route.get('/admin-dashboard', PublicController.adminDashboard);
// end public

module.exports = route;