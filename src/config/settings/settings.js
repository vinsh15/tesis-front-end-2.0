const settings = {
    staging: {
        apiUrl: "https://tesis-backend-final.herokuapp.com",
    },
    production: {
        apiUrl: "https://tesis-back-end.herokuapp.com/"
    }
}

const getCurrentSettings = (flag) => {
    if(flag) return settings.staging;
    return settings.production;
}

export default getCurrentSettings(true);