const { Command } = require("commander");
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

(async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case "get":
        const contactById = await getContactById(id);
        contactById
          ? console.log("Contact found")
          : console.log("Contact not found");
        console.log(contactById);
        break;

      case "add":
        const contact = await addContact(name, email, phone);
        console.log("Add New Contact");
        console.log(contact);
        break;

      case "remove":
        await removeContact(id);

        break;

      default:
        console.warn("Unknown action type!");
    }
  } catch (error) {
    console.error(error.message);
  }
})(argv);
