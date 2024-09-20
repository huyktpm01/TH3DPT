import { createSlice, configureStore } from '@reduxjs/toolkit'; 
  const contactsSlice = createSlice({ 
    name: 'counter', 
    initialState: { 
        contacts: [], 
        loading: false, 
        error: false, 
    }, 
    reducers: { 
        fetchContactsLoading: (state, action) =>  
        { 
            state.loading = true; 
        }, 
        fetchContactsSuccess:  (state, action) =>  
        { 
            state.contacts = action.payload; 
            state.loading = false;
        }, 
        fetchContactsError:  (state, action) =>  
        { 
            state.loading = false;
            state.error = true;
        }, 
    } 
  }) 
 
  export const {fetchContactsLoading, fetchContactsSuccess, fetchContactsError} = 
contactsSlice.actions; 
  export default Store = configureStore({ 
    reducer: contactsSlice.reducer, 
  })