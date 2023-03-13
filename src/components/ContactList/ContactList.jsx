import { deleteContact } from '../../redux/contacts/operations';
import { getContacts, getFilter } from '../../redux/contacts/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  ContactsList,
  ContactsItem,
  DeleteButton,
  Message,
} from './ContactList.styled';

const filterContacts = (items, filter) => {
  return items.filter(contacts =>
    contacts.name.toLowerCase().includes(filter.toLowerCase())
  );
};

export const ContactList = () => {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const visibleContacts = filterContacts(contacts, filter);
  return (
    <ContactsList>
      {visibleContacts.map(contact => (
        <ContactsItem key={contact.id}>
          {`${contact.name} : ${contact.number}`}
          {
            <DeleteButton
              type="button"
              name="delete"
              onClick={() => {
                dispatch(
                  deleteContact(contact.id)
                );
              }}
            >
              delete
            </DeleteButton>
          }
        </ContactsItem>
      ))}
      <Message>
        {contacts.length === 0 && 'You do not have contacts 😯'}
      </Message>
    </ContactsList>
  );
};