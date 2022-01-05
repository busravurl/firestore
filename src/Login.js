import React, {useState} from 'react';
import { SafeAreaView,StyleSheet, Dimensions, View, Text, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import Input from './components/Input/Input';
import Button from './components/Button/Button';

//import messaging from '@react-native-firebase/messaging';
import {showMessage} from 'react-native-flash-message';

import authErrorMessageParser from './utils/authErrorMessageParser';


const initialFormValues = {
    usermail: '',
    password: '',
};

const Login = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    function handleSignUp() {
        navigation.navigate('SignPage');
    }

    function handleSubmit() {
        navigation.navigate('Firestore');
    }

    async function handleFormSubmit(formValues) {
        try {
            setLoading(true);
            await auth().signInWithEmailAndPassword(
                formValues.usermail, 
                formValues.password,
            );
            setLoading(false);
        
        } catch (error) {
            showMessage({
                message: authErrorMessageParser(error.code),
                type: 'danger',
            });
            setLoading(false);
        }
       
    }

    return (
        <SafeAreaView style={styles.container}>
            
            
            <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
                {({values, handleChange}) =>(
                    <>
                        <Input 
                            value={values.usermail}
                            onType={handleChange('usermail')}
                            placeholder="e-postanızı giriniz.."
                        />
                        <Input 
                            onType={handleChange('password')}
                            value={values.password}
                            placeholder="şifrenizi giriniz.."
                        />
                        <Button text="giriş yap" onPress={handleSubmit}  />
                    </>
                )}
            </Formik>
            
            <Button text="kayıt ol" color="green" onPress={handleSignUp}/>
        </SafeAreaView>
    );
};

export default Login;

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    
    body_container: {
        flex: 1,
    },
    header: {
        color: 'green',
        margin: 5,
        fontSize: Platform.OS === 'android' ? 120 : 160,
    },
});