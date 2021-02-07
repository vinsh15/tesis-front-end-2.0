import * as firebase from 'firebase';

var provider = new firebase.default.auth.GoogleAuthProvider();

/**
 * Autenticación con Google
 * @param {Function} setUser almacenar el usuario en la variable global
 */
const googleAuth = async (setUser) => {
    await firebase.default.auth().signInWithPopup(provider)
    .then(result => {
        if(result){
            localStorage.setItem('user', JSON.stringify(result.user));
            setUser(result.user);
        }
    })
}

export default(googleAuth);