/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useState, useEffect, useContext, memo } from 'react'
import { PermissionsAndroid, View, Pressable, ActivityIndicator } from "react-native";
import * as RootNavigation from '../Navigations/RootNavigation'
// import SectionListContacts from 'react-native-sectionlist-contacts'
// import { ContactsSectionList } from "react-native-contacts-sectionlist";
import SectionListContacts from './contacts/SectionListContacts'

import Contacts from "react-native-contacts";
import { Texto } from './Texto';
import { ItemUser } from './ItemUser';
import { ContactsContext } from '../Context/Contacts.Context';
import { useAPI } from '../Hooks/useAPI';
import { DataContext } from '../Context/Datos.Context';
import Colors from './Colors';
export const ContactsM = memo(({ params, home, type, searchContact = [] }) => {
  const { state: stateContext = [], setState: setStateContext,contactsM, setContactsM } = useContext(ContactsContext)
  const Context = useContext(DataContext)
  const [phoneNumbers, setPhoneNumbers] = useState()

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    contacts: []
  })
  useEffect(() => {
    if (loading === false && state.contacts.length > 0) {
      setStateContext(state)
    }
  }, [loading])


  const API = useAPI();

  function setContacts(contacts, state) {
    setState({ ...state, contacts })
    setTimeout(() => {
      setLoading(state)  
    }, 100);
    
  }

  useEffect(() => {
    let isSubscribed = true;
    try {
      if (!stateContext?.contacts) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            'title': 'Contacts',
            'message': 'This app would like to view your contacts.',
            'buttonPositive': 'Please accept bare mortal'
          }
        ).then(async () => {
          await Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
              // alert('')
            } else {
              // contacts
              let phone_contacts = []
              for (let i = 0; i < contacts.length; i++) {
                for (let n = 0; n < contacts[i].phoneNumbers.length; n++) {
                  contacts[i].phoneNumbers.map((item, i) => {
                    let phone = item.number.replace(/-/g, '')
                    phone = phone.replace(/ /g, '')
                    phone = phone.toString().replace('(', '').replace(')', '')
                    if (phone.length > 4) {
                      if (phone.toString().substring(0, 1) === "+") {
                        phone_contacts.push(`${phone}`)
                      } else {
                        let Nacionalizar = `+56${phone}`
                        phone_contacts.push(`${Nacionalizar}`)
                      }
                    }
                  })
                }
              }
                API.PostAPI.checkContacts({ phone_contacts: phone_contacts })  
              setContacts(contacts, true)
            }
          })

        })
      }
    } catch (error) {
      console.log(error, 'error')
    }
    return () => (isSubscribed = false);
  }, [])

  const _renderHeader = (props) => {
    return (<View style={{ backgroundColor: 'transparent', paddginRight: 10, marginRight: 2 }}>
      <Texto>
        {props.key}
      </Texto>
    </View>)
  }

  const _renderItem = (item, index, section) => {

    const data = { ...item, name: item.displayName ? item.displayName : `${item.first_name}${item.last_name}`, match: item.match ? item.match : item.displayName ? false : true, type: 'Contact' }
    return (
      <Pressable onPress={() => {
        if (data.uuid) {
          type && RootNavigation.navigate(type, {
            data: data,
            type: type,
            params: params
          })
        } else alert('Este usuario no tiene cuenta deseas invitarlo')
      }}>
        <View style={{ height: 48.75, backgroundColor: 'transparent', minHeight: 0 }}>
          <ItemUser data={data} Enter />
        </View>
      </Pressable>
    )
  }
  function AllPhoneNumbers(contacts, guardar) {
    const phoneNum = []
    for (let i = 0; i < contacts.length; i++) {
      for (let n = 0; n < contacts[i].phoneNumbers.length; n++) {
        let phone = contacts[i].phoneNumbers[n].number.replace(/-/g, '')
        phone = phone.replace(/ /g, '')
        phone = phone.toString().replace('(', '').replace(')', '')
        if (phone.length > 4) {
          if (phone.toString().substring(0, 1) === "+") {
            phoneNum.push({ ...contacts[i], NumberPhone: phone });
          } else {
            phoneNum.push({ ...contacts[i], NumberPhone: `+56${phone}` });
          }
        }
      }
    }
    const truephoneNumbers = phoneNum.reduce((acc, phone) => {
      return { ...acc, [phone.NumberPhone]: phone };
    }, {});
    const phones = []
    for (var key in truephoneNumbers) {
      phones.push(truephoneNumbers[key])
    }
    setPhoneNumbers(phones)
    const [matchingPhones, unmatchingPhones] = phones.reduce((r, o) => {
      const match = Context.contactsMatch.find(({ phone }) => phone === o.NumberPhone)
      if (match) r[0].push({ ...o, match: true, uuid: match.uuid })
      else r[1].push({ ...o, match: false })
      return r
    }, [[], []])
    console.log(matchingPhones,'matchingPhones')
    if(JSON.stringify(matchingPhones)!=="[]"){
      setContactsM(matchingPhones)
    }
    
    // const AllContacts = unmatchingPhones.concat(matchingPhones)
    setContacts(unmatchingPhones, false)
  }


  useEffect(() => {
    const contacts = state.contacts
    if (Context.contactsMatch) {
      AllPhoneNumbers(contacts)

    } else {
      setContacts(contacts, false)
    }
  }, [Context.contactsMatch])
  return (<View style={{ flex: 1 }}>
    {
      loading === true ?
        (
          <View style={{
            flex: 1,
            flexDirection: 'column',
            alignContent: "center",
            justifyContent: "center"
          }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) :
        stateContext?.contacts && stateContext.contacts && <React.Fragment>
          <Texto style={{ fontWeight: '300', lineHeight: 70, letterSpacing: 0.828029 }} typeFamily="latoLightItalic" colorLabel={Colors.midnightblue} size={20}>ALL<Texto colorLabel={Colors.midnightblue} style={{ fontWeight: '900', letterSpacing: 0.828029 }} Bold size={20}>PAY</Texto></Texto>
          <SectionListContacts
          sectionListData={contactsM}
          initialNumToRender={contactsM.length}
          otherAlphabet="#"
          showAlphabet={false}
          renderHeader={_renderHeader}
          renderItem={_renderItem}
          SectionListClickCallback={(item, index) => {
            console.log('---SectionListClickCallback--:', item, index)
          }}
        />
        <Texto colorLabel={Colors.midnightblue} style={{ letterSpacing: 0.828029 }}>Contactos</Texto>
          <SectionListContacts
            sectionListData={
              home ?
                searchContact.length > 0 ? searchContact :
                  Context.contactsMatch
                :
                searchContact.length > 0 ? searchContact : stateContext.contacts}
            initialNumToRender={
              home ?
                Context.contactsMatch.length
                :
                searchContact.length > 0 ? searchContact.length : stateContext.contacts.length}
            otherAlphabet="#"
            showAlphabet={false}
            renderHeader={_renderHeader}
            renderItem={_renderItem}
            SectionListClickCallback={(item, index) => {
              console.log('---SectionListClickCallback--:', item, index)
            }}
          />
        </React.Fragment>}
  </View>)
})