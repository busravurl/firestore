import React, {useState} from 'react';
import {SafeAreaView,StyleSheet, Dimensions, Text, View, Image} from 'react-native';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';

import messaging from '@react-native-firebase/messaging';

import authErrorMessageParser from './utils/authErrorMessageParser';

import Input from './components/Input/Input';
import Button from './components/Button/Button';

const initialFormValues = {
    usermail: '',
    password: '',
    repassword: '',
};

const Sign = ({navigation}) => {
    const [loading, setLoading] = useState(false);

    function handleLogin() {
        navigation.goBack();
    }
    
 
    async function handleFormSubmit(formValues) {
        if (formValues.password !== formValues.repassword) {
           messaging({
                message: 'Şifreler uyuşmuyor',
                type: 'danger',
            });
            return;
        }
        try {
            await auth().createUserWithEmailAndPassword(
                formValues.usermail,
                formValues.repassword,
            );
           messaging({
                message: 'Kullanıcı oluşturuldu',
                type: 'success',
            });
            navigation.navigate('Login');
            setLoading(false);
        } catch (error) {

            setLoading(false);
        }
    }

    return(
         <SafeAreaView style={styles.container}>
            
            <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
                {({values, handleChange, handleSubmit}) =>(
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
                            isSecure
                        />
                        <Input 
                            onType={handleChange('repassword')}
                            value={values.repassword}
                            placeholder="şifrenizi tekrar giriniz.."
                            isSecure
                        />
                        <Button text="Kayıt ol" loading={loading} onPress={handleSubmit}/>
                    </>
                )}
            </Formik>
            
            <Button text="Geri" theme="secondary" onPress={handleLogin}/>
        </SafeAreaView>
    );
};


export default Sign;

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
    logo: {
        with: Dimensions.get('window').width * 0.9,
        heigth: Dimensions.get('window').height /3,
        resizeMode: 'contain',
        alignSelf: 'center',
        //tintColor: 'white',
    },
    logo_container: {
        flex: 1,
        justifyContent: 'center',
    },
});