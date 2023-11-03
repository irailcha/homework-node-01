const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');



const contactsPath = path.join(__dirname, './db/contacts.json');
console.log(__dirname)
console.log(contactsPath);


async function listContacts() {
const data=await fs.readFile(contactsPath, 'utf-8');

return JSON.parse(data);

}
  
async  function getContactById(contactId) {

  const contacts = await listContacts();
  const contact =contacts.filter(contact=> contact.id===contactId);
return contact || null;


  }
  
 async function removeContact(contactId) {

 
      const contacts = await listContacts();
      const deletedContact =contacts.filter(contact=> contact.id===contactId);
      return deletedContact || null
  }
  
 async function addContact(name, email, phone) {

    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }

  module.exports = { listContacts, getContactById, removeContact, addContact };