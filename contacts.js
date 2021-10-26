const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");
console.log(contactsPath);

const readData = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
};

function listContacts() {
  return readData();
}

const getContactById = async (contactId) => {
  const contacts = await readData();
  const result = contacts.filter(
    (contact) => String(contact.id) === String(contactId)
  );
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await readData();
  const newList = contacts.filter(
    (contact) => String(contact.id) !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));

  contacts.length === newList.length
    ? console.log(` Contact with id ${contactId} not found`)
    : console.log(`Contact with id ${contactId} was deleted`);

  console.table(newList);
};

const addContact = async (name, email, phone) => {
  const contacts = await readData();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
