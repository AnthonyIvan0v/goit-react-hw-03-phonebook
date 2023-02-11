import PropTypes from 'prop-types';
import { Component } from 'react';

import styles from './contactsForm.module.css';

class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({ name: '', number: '' });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, number } = this.state;
    return (
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label className={styles.label}>Name : </label>
            <input
              className={styles.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={handleChange}
              value={name}
            />
          </div>
          <div>
            <label className={styles.label}>Number : </label>
            <input
              className={styles.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={handleChange}
              value={number}
            />
          </div>
          <button type="submit" className={styles.button}>
            Add contacts
          </button>
        </form>
      </div>
    );
  }
}

export default ContactsForm;
ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
