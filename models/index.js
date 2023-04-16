const db = require('../connection.js');

const contactListCollection = db.collection('contactList');

async function addContact(data) {
  const docRef = await contactListCollection.add(data);
  return docRef.id;
}

async function getContactList() {
  const snapshot = await contactListCollection.get();

  const contactList = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    data.id = doc.id;
    contactList.push(data);
  })

  return contactList;
}

async function deleteContact(id) {
  const docRef = await contactListCollection.doc(id).delete();

  return docRef.id;
}

async function getContactById(id) {
  const docRef = await contactListCollection.doc(id).get();

  let data = docRef.data();
  data.id = docRef.id;

  return data;
}

async function updateContact(id, data) {
  const docRef = await contactListCollection.doc(id).update(data);

  return docRef.id;
}

module.exports = {
  addContact,
  getContactList,
  deleteContact,
  getContactById,
  updateContact
};