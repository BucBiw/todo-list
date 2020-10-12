import firebase from 'firebase';
export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        });
    }
}

export const signInWithFacebook = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        var provider = new firebase.auth.FacebookAuthProvider();

        provider.addScope('email');

        firebase.auth().signInWithPopup(provider).then(function (result) {
            var displayName = result.user.displayName.split(' ')
            console.log("result:", result);
            return firestore.collection('users').doc(result.user.uid).set({
                firstName: displayName[0],
                lastName: displayName[1],
                initials: displayName[0][0] + displayName[1][0]
            }).then(() => {
                dispatch({ type: 'LOGIN_SUCCESS' });
            });
        }).catch(function (error) {
            console.log('facebookAuthErr: ', error);
            dispatch({ type: 'LOGIN_ERROR', error });
        });
    }
}

export const signOut = () => {
    return (dispatch, getstate, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' });
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password,
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            });
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}