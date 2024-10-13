import {getDownloadURL,ref,uploadBytesResumable} from "firebase/storage";
import { storage } from "./firebase";

const upload =async (file)=>{
    const date=new Date()
    const storageRef = ref(storage,'image/$(date + filename');
    const uploadTask = uploadBytesResumable(storageRef, file);

   return new Promise((resolve,reject) => {

     uploadTask.on(
      "state_changed",
    (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
        case 'running':
         console.log('Upload is running');
         break;
        }
      }, 
      (error) => {
    
        switch (error.code) {
         case 'storage/unauthorized':
          break;
          case 'storage/canceled':
           break;
           case 'storage/unknown':
             break;
        }
      }, 
      (error)=>{
        reject("Something went wronng" + error.code)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        resolve(downloadURL)
        });
      }
      );
   });
};

export default upload;