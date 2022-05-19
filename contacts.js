const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const parsedContacts = await parseContacts();
        console.table(parsedContacts);
    } catch (error) {
        console.log(error);
    }
    
}

async function parseContacts() {
       try {
        const contacts = await fs.readFile(contactsPath, 'utf8');
        const parsedContacts = JSON.parse(contacts);
        return parsedContacts;
    } catch (error) {
        console.log(error);
    }
 }

async function getContactById(contactId) {
     try {
        const parsedContacts = await parseContacts();
        const selectedContact = await parsedContacts.find(contact => contact.id == contactId);
        console.log(`contact with id: ${contactId}`, selectedContact ? selectedContact : '| is not found');
    } catch (error) {
        console.log(error);
    }
}

async function removeContact(contactId) {
    try {
        const parsedContacts = await parseContacts();
        const newContacts = parsedContacts.filter(contact => contact.id != contactId);
        const data = await fs.writeFile(contactsPath, JSON.stringify(newContacts));
        console.log(`contact with id: ${contactId} was removed`);
        return;
    } catch (error) {
        console.log(error);
    }
}

async function addContact(name, email, phone) {
      try {
          const parsedContacts = await parseContacts();
          const newContact = { id: nanoid(), name, email, phone }
        parsedContacts.push(newContact);
          const data = await fs.writeFile(contactsPath, JSON.stringify(parsedContacts));
          console.log('new contact was added successfully');
          return;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    listContacts, getContactById, removeContact, addContact
}