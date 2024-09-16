import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import ContactThumbnail from "../../components/ContactThumbnail";
import colors from "../../utils/colors";
import { fetchUserContact } from "../../utils/api";

const User = ({ someFunction = () => {} }) => {
  // Ensure that someFunction is a function
  if (typeof someFunction !== 'function') {
    console.error('Expected someFunction to be a function, but got', typeof someFunction);
  }

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchUserContact()
      .then((users) => {
        console.log(users); // Log users to check their structure
        setUser(users);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
        setError(true);
      });
  }, []); // Empty dependency array to run only once on mount

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && Array.isArray(user) && user.map((item, index) => (
        <ContactThumbnail
          key={index}
          avatar={item.avatar || ''} // Provide default value if avatar is undefined
          name={item.name || 'No Name'}
          phone={item.phone || 'No Phone'}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
});

export default User;
