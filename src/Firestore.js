import React, {Component, useEffect} from 'react';
import {SafeAreaView, View, Button, Text, TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';





class Firestore extends Component {
    state = {
        users: []
    }

    

    checkApplicationPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
        console.log(authorizationStatus)
        if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        console.log('User has notification permissions enabled.');
        let token = await messaging().getToken()
        console.log('fcm token',token);
        // if(token) {
        //     await store.dispatch(updateFcmToken(token))
        //     console.log('fcm token',token);
        //     if (users.id) {
        //     await store.dispatch(update_user_action(users.id, {token}))
        //     }
        // }
        }  if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        console.log('User has provisional notification permissions.');
        } else {
        checkApplicationPermission()
        console.log('User has notification permissions disabled');
        }
    }


    constructor(props) {
        super(props);
        this.subscriber = 
        firestore()
        .collection("users")
        .onSnapshot(docs => {
             let users = []
             docs.forEach(doc => {
                 users.push(doc.data())
             })
             this.setState({users})
             console.log(users)
        })
       
    }

    getUser = async () => {
        const userDocument= await firestore().collection("users").
        doc('ZhWVTegVBYfAmxHJfz1k').get()
        console.log(userDocument)
    }

    onPostLike = (postId) => {
        const userReference = firestore().doc(`users/$
        {"8heuCL8UaMzF10xpjKJg"}`);

        return firestore().runTransaction(async transaction => {
            const postSnapshot = await transaction.get(userReference);

            if (!postSnapshot.exist) {
                throw 'User does not exist!';
            }

            await transaction.update(userReference, {
                age: postSnapshot.data().age +1,
            });
        });
    }


    massDeleteUsers = async () => {
        const userQuerySnapshot = await firestore()
         .collection( 'users')
         .get();

        
        const batch = firestore().batch();

        userQuerySnapshot.forEach(documentSnapshot => {
            batch.delete(documentSnapshot.ref);
        });

        batch.commit();
    }

    addRandomUser = async () => {
        let name= Math.random().toString(36).substring(7)
        firestore().collection('users').add({
            name,
            age:20
        })
    }

    // const [newName, setNewName] = useState("");
    // const [newAge, setNewAge] = useState(0);

    // const [users, setUsers] = useState([]);
    // const usersCollectionRef = collection(data, "users");

    // const createUser = async () => {
    //     await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    // };

    // const updateUser = async (id, age) => {
    //     const userDoc = doc(data, "users", id);
    //     const newFields = { age: age + 1 };
    //     await updateDoc(userDoc, newFields);
    // };

    // const deleteUser = async (id) => {
    //     const userDoc = doc(db, "users", id);
    //     await deleteDoc(userDoc);
    // };

    // getUsers();
    // }, []);

    render() {
        return(
        <SafeAreaView>
            <View>
                <Button title="Add random user" onPress={this.addRandomUser} />
                {this.state.users.map((user,index) => <View key={index}>
                   <Text>Name: {user.name} {user.age}</Text>
                </View>)}
            </View>
            <View>
                <Button title="delete user" onPress={this.massDeleteUsers} />
                {this.state.users.map((user,index) => <View key={index}>
                   <Text>Name: {user.name} {user.age}</Text>
                </View>)}
            </View>
        </SafeAreaView>

        // <View>
        // <input
        //     placeholder="Name..."
        //     onChange={(event) => {
        //     setNewName(event.target.value);
        //     }}
        // />
        // <input
        //     type="number"
        //     placeholder="Age..."
        //     onChange={(event) => {
        //     setNewAge(event.target.value);
        //     }}
        // />

        // <Button onClick={createUser}> Create User</Button>
        //     {users.map((user) => {
        //         return (
        //         <View>
        //             {" "}
        //             <Text>Name: {user.name}</Text>
        //             <Text>Age: {user.age}</Text>
        //             <Button
        //             onClick={() => {
        //                 updateUser(user.id, user.age);
        //             }}
        //             >
        //             {" "}
        //             Increase Age
        //             </Button>
        //             <Button
        //             onClick={() => {
        //                 deleteUser(user.id);
        //             }}
        //             >
        //             {" "}
        //             Delete User
        //             </Button>
        //         </View>
        //         );
        //     })}
        //     </View>
        // );
        )};
};

export default Firestore;
