import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import Login from './Login';
import Sign from './Sign';
import Firestore from './Firestore';

const Stack = createNativeStackNavigator();

export default () => {

    

  

    const AuthStack = () => {
         return(
            <Stack.Navigator screenOptions={{headerShown: false}}>
                
                <Stack.Screen name="LoginPage" component={Login} />
                <Stack.Screen name="SignPage" component={Sign} /> 
            </Stack.Navigator>
       );
    };

    return(
       <NavigationContainer>
            <Stack.Navigator >
                   <Stack.Screen name="AuthStack" component={AuthStack} options={{headerShown: false}}/>
                    <Stack.Screen
                        name="Firestore"
                        component={Firestore}
                        />
            </Stack.Navigator>
            
        </NavigationContainer>
    );
};