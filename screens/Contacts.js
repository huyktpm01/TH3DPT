import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'; 
import { fetchContacts } from '../utils/api';
import ContactListItem from '../component/ContactListItem';
import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } from '../store'; 
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const keyExtractor = ({ phone }) => phone;

const Contacts = ({ navigation }) => { 
    const { contacts, loading, error } = useSelector((state) => state); 
    const dispatch = useDispatch(); 

    // Load data
    useEffect(() => { 
        dispatch(fetchContactsLoading()); 
        fetchContacts()
            .then((contacts) => dispatch(fetchContactsSuccess(contacts)))
            .catch(() => dispatch(fetchContactsError()));
    }, []); 

    // Sort contacts
    const contactsSorted = contacts.slice().sort((a, b) => a.name.localeCompare(b.name));

    const saveContact = async (newContact) => {
        try {
            const storedContacts = await AsyncStorage.getItem('recentContacts');
            let contacts = storedContacts ? JSON.parse(storedContacts) : [];
            contacts.push(newContact);
            await AsyncStorage.setItem('recentContacts', JSON.stringify(contacts));
        } catch (error) {
            console.error('Error saving contact:', error);
        }
    };

    const handleContactPress = (contact) => {
        const callDuration = 5; // Example duration in minutes
        const callTime = new Date().getTime(); // Current timestamp

        const contactWithDetails = {
            ...contact,
            callDuration,
            callTime,
        };

        saveContact(contactWithDetails);
        navigation.navigate("Profile", { contact });
    };

    const renderContact = ({ item }) => { 
        const { name, avatar, phone } = item; 
        return (
            <ContactListItem  
                name={name}  
                avatar={avatar}  
                phone={phone}   
                onPress={() => handleContactPress(item)}
            />
        );
    }; 

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator color="#3498DB" size="large" />
                    <Text style={styles.loadingText}>Loading contacts...</Text>
                </View>
            )}
            {error && <Text style={styles.errorText}>Failed to load contacts. Please try again.</Text>} 
            {!loading && !error && (
                <FlatList
                    data={contactsSorted}
                    keyExtractor={keyExtractor}
                    renderItem={renderContact}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB', // Soft background color
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#607D8B', // Calm grey-blue for loading text
    },
    errorText: {
        fontSize: 16,
        color: '#E74C3C', // Red color for error message
        textAlign: 'center',
        marginTop: 20,
    },
    listContainer: {
        paddingBottom: 20, // Ensures smooth scrolling
    },
});

export default Contacts;
