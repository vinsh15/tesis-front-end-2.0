const settings = {
    staging: {
        apiUrl: "https://tesis-backend-final.herokuapp.com",
    },
    production: {
        //apiUrl: "https://tesis-back-end.herokuapp.com/"
        apiUrl: "http://127.0.0.1:8000/",
    }
}
const getCurrentSettings = (flag) => {
    if(flag) return settings.staging;
    return settings.production;
}

export default getCurrentSettings(false);