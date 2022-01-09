/**
 * @format
 */

import {AppRegistry,LogBox} from 'react-native';
import  Router from './src/Router';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import 'react-native-get-random-values';
import React, { useEffect, useState } from 'react';


LogBox.ignoreAllLogs();

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        //console.log('PostmanData: ', remoteMessage.data);
        await AsyncStorage.setItem('data', JSON.stringify({
        name: remoteMessage.data.name,
        age: remoteMessage.data.age
        }))
        //console.log('PostmanData: ', remoteMessage.data);
    })

    

    messaging().onNotificationOpenedApp(async(remoteMessage) => {
      
      if(Platform.OS === 'android'){
        console.log('PostmanData: ', remoteMessage.data);
        await AsyncStorage.setItem('data', JSON.stringify({
          name: remoteMessage.data.name,
          age: remoteMessage.data.age
        }))
        }
        
    })


    messaging().getInitialNotification()
    .then(async(remoteMessage) => {
      console.log('PostmanData: ', remoteMessage);
  })
        
   



AppRegistry.registerComponent(appName, () => Router);
