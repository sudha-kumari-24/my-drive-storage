
// require firebase Firebase

const Firebase=require('firebase-admin')
const serviceAccount=require('../drive-2b711-firebase-adminsdk-fbsvc-dad49a1af0.json')


Firebase.initializeApp({
    credential:Firebase.credential.cert(serviceAccount),

    //may be below needs to check after buting
    storageBucket:'drive-2b711.appspot.com'

})

//same initialized is send
module.exports = Firebase;