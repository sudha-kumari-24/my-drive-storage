const multer=require('multer');
const firebaseStorage=require('multer-firebase-storage');


const Firebase=require('./firebase.config');

const serviceAccount=require('../drive-2b711-firebase-adminsdk-fbsvc-dad49a1af0.json')


const storage=firebaseStorage({
    
    credentials:Firebase.credential.cert(serviceAccount),
    //may be below needs to check after buting
    bucketName:'drive-2b711.appspot.com',
    unique:true
})

const upload=multer({
    storage:storage,
    limits:{fileSize: 1024*1024*5} //5 MB
})

module.exports=upload