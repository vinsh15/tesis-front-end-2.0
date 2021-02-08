const settings = {
    staging: {
        apiUrl: "https://prueba-backends.herokuapp.com",
    },
    production: {
        apiUrl: ""
    }
}

const getCurrentSettings = (flag) => {
    if(flag) return settings.staging;
    return settings.production;
}

export default getCurrentSettings(true);