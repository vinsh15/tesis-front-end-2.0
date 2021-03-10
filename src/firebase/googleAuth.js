import * as firebase from 'firebase';
import { postLogin } from "../api/login/login";

var provider = new firebase.default.auth.GoogleAuthProvider();

/**
 * Autenticación con Google
 * @param {Function} setUser almacenar el usuario en la variable global
 */
const googleAuth = async (setUser) => {
    try {
        const result = await firebase.default.auth().signInWithPopup(provider)
        if(result) {
            const user = result.user;
            const response = await postLogin(user, setUser);
            return response;
        }
    }
    catch(error) {  
        return error;
    }
}

export { googleAuth };