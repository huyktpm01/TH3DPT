const BASE_URL = 'https://randomuser.me/api/';

export const fetchContacts = async () => {
    const response = await fetch(`${BASE_URL}?results=100&seed=fullstackio`);
    return response.json();
};

export const fetchUserContact = async () => {
    const response = await fetch(`${BASE_URL}?seed=fullstackio`);
    return response.json();
};

export const fetchRandomContact = async () => {
    const response = await fetch(BASE_URL);
    return response.json();
};
