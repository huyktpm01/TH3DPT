import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchContacts } from '../utility/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Footer from './Footer';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const getContacts = async () => {
            const data = await fetchContacts();
            setContacts(data);
            setLoading(false);
        };
        getContacts();
    }, []);

    if (loading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    const handlePress = (profile) => {
        navigation.navigate('ProfileDetail', { profile });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item)}>
            {item.avatar ? (
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
            ) : (
                <View style={styles.avatar} />
            )}
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.phone}>{item.phone}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECEFF1', // Softer background color for a calm appearance
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#607D8B', // Light grey-blue for loading text
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', // White background for contrast with the outer container
        padding: 16,
        marginVertical: 8,
        borderRadius: 12, // More rounded corners for a modern look
        shadowColor: '#000', 
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3, // Subtle shadow for depth
    },
    avatar: {
        width: 60, // Slightly larger avatar for emphasis
        height: 60,
        borderRadius: 30, // Circular avatar
        backgroundColor: '#CFD8DC', // Light grey background if no image
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#37474F', // Darker grey for the name
    },
    phone: {
        fontSize: 14,
        color: '#78909C', // Softer grey-blue for phone numbers
        marginTop: 4,
    },
    list: {
        paddingBottom: 20, // Extra padding at the bottom for better scrolling
    },
});

export default ContactList;
