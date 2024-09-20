import React from 'react'; 
import DrawerNavigator from './route'; 
import store from './store'; 
import { Provider } from 'react-redux';
 
const App=()=> 
{ 
return( 
    <Provider store={store}> 
        <DrawerNavigator/> 
    </Provider> 
); 
} 
export default App;