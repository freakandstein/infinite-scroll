import React, { useState } from 'react'
import Avatar from './asset/avatar.jpg'
import "./style.css"
import PullToRefresh from 'react-simple-pull-to-refresh'
import ContactLoader from './component/ContactLoader'
import NetworkService from './service/NetworkService'
import { ContactAPI } from './api/contact'
import INetworkRequest from './service/INetworkRequest'

interface ContactProps {
  id: number;
  name: string;
  photo: any;
  phone: string;
}

const App = () => {
  const [contacts, setContacts] = useState<ContactProps[]>([])
  
  const populateContact = async (isLoadMore: Boolean = false) => {
    let listContact: ContactProps[] = []
    // Call API
    const contactParams: INetworkRequest = {
      httpMethod: 'get',
      params: {}
    }

    if (isLoadMore) {
      const response = await NetworkService.instance.request(`http://localhost:3001/${ContactAPI.getContactMore}`, contactParams)
      const newContacts = response.data['contacts'] as ContactProps[]
      newContacts.map((newContact, index) => {
        newContact.photo = Avatar
        listContact.push(newContact);
      })
    } else {
      const response = await NetworkService.instance.request(`http://localhost:3001/${ContactAPI.getContact}`, contactParams)
      const newContacts = response.data['contacts'] as ContactProps[]
      newContacts.map((newContact, index) => {
        newContact.photo = Avatar
        listContact.push(newContact);
      })
    }
    return listContact
  }

  const fetchMore = async () => {
    let listContact: ContactProps[]
    if (contacts.length > 0) {
      listContact = await populateContact(true)
    } else {
      listContact = await populateContact()
    }
    return new Promise(res => {
      res(setContacts([...contacts, ...listContact]))
    })
  }
  const pullRefresh = async () => {
    let listContact: ContactProps[] = await populateContact()
    setContacts([])
    return new Promise(res => {
      res(setContacts([...contacts, ...listContact]))
    })
  }
  return (
    <div className="container">
      <h1 className="title">My Contact List</h1>
      <PullToRefresh
        onRefresh={pullRefresh}
        refreshingContent={(<ContactLoader />)}
        pullingContent=""
        onFetchMore={fetchMore}
        canFetchMore={true}
      >
        <>
          {contacts.map((contact, index) => {
            return (
              <div className="contact-container" key={index}>
                <img src={contact.photo} alt={contact.name} className="avatar" />
                <div className="text-container">
                  <h5 className="name">{contact.name}</h5>
                  <p className="phone">{contact.phone}</p>
                </div>
              </div>
            )
          })}
        </>
      </PullToRefresh>
    </div>
  );
};
export default App;