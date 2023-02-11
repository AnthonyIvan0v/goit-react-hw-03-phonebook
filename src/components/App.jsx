import { nanoid } from 'nanoid';
import { Component } from 'react';
import ContactsForm from 'modules/PhoneBook/ContactsForm/ContactsForm';
import ContactsList from 'modules/PhoneBook/ContactList/ContactList';
import Filter from 'modules/PhoneBook/Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (contacts && contacts.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }

  addContact = ({ name, number }) => {
    if (this.isDuplicate(name, number)) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts] };
    });
  };

  isDuplicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const newAddedNumber = number;
    const { contacts } = this.state;
    const contact = contacts.find(({ name, number }) => {
      return name.toLowerCase() === normalizedName && number === newAddedNumber;
    });
    return Boolean(contact);
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContact = contacts.filter(item => item.id !== id);
      return { contacts: newContact };
    });
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  getFiltredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  }
  render() {
    const { addContact, removeContact, handleFilter } = this;
    const items = this.getFiltredContacts();
    const isContacts = Boolean(items.length);
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          color: '#010101',
          flexDirection: 'column',
        }}
      >
        <h1>Phonebook</h1>
        <ContactsForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter handleChange={handleFilter} />
        {isContacts && (
          <ContactsList items={items} removeContact={removeContact} />
        )}
        {!isContacts && <p>No contacts in list</p>}
      </div>
    );
  }
}
export default App;
