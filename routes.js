import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import colors from './utility/colors';

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Contacts"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'tomato' },
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen
                name='Contacts'
                component={Contacts}
                options={{ title: "Contacts" }}
            />
            <Stack.Screen
                name='Profile'
                component={Profile}
                options={({ route }) => {
                    const { contact } = route.params;
                    const { name } = contact;
                    return {
                        title: name.first,
                        headerTintColor: 'white',
                        headerStyle: { backgroundColor: colors.blue },
                    };
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default StackNavigator;
