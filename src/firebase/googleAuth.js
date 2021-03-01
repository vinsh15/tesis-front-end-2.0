import axios from "axios";
import * as firebase from 'firebase';
import jwt from "jwt-encode";

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
            const response = await getProjects(user, setUser);
            //console.log(response);
            return response;
        }
    }
    catch(error) {  
        return error;
    }
}
/**
 * Establecer el usuario de manera local
 * @param {JSON} user Objeto con la información del usuario
 * @param {Function} setUser almacenar el usuario en la variable global
 */
const setUserLocally = (user, setUser) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
}

/**
 * Obtener todos los proyectos de un usuario
 * @param {String} user Objeto con la información del usuario
 * @param {Function} setUser almacenar el usuario en la variable global
 * @returns {JSON} proyectos del usuario o error
 */
const getProjects = async (user, setUser) => {
    const userInfo = {
        userid: user.uid,
        name: user.displayName
    }
    const token = jwt(userInfo, 'secret');
    try {
        const response = await axios.post("/proyectos/", {
            token: token
        })
        setUserLocally(user, setUser);
        return response.data;
    }
    catch(error) {
        return error;
    }
}

export { googleAuth, getProjects };