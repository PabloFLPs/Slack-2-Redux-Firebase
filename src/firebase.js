// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCb8tFyUEJfNniOxdgevJloGlE7P2MTRes",
    authDomain: "slack-clone-redux-firebase.firebaseapp.com",
    projectId: "slack-clone-redux-firebase",
    storageBucket: "slack-clone-redux-firebase.appspot.com",
    messagingSenderId: "565316896433",
    appId: "1:565316896433:web:f2771346d5e2f43ab54490",
    measurementId: "G-KCS76LYW9V"
}

const firebase = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }
