import axios from "axios";
import jwt from "jwt-encode";

/**
 * Obtener todos los proyectos de un usuario
 * @param {String} user Objeto con la información del usuario
 * @param {Function} setUser almacenar el usuario en la variable global
 * @returns {JSON} proyectos del usuario o error
 */
const postLogin = async (user, setUser) => {
    const userInfo = {
        userid: user.uid,
        name: user.displayName
    }
    const token = jwt(userInfo, 'secret');
    try {
        const response = await axios.post("/login/", {
            token: token
        })
        setUserLocally(user, setUser);
        return response.data;
    }
    catch(error) {
        return "Error";
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

export {
    postLogin,
}