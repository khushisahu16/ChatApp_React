import {updateDoc} from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import "./detail.css"
import {auth} from "./lib/firebase";
import {useUserStore}from "../../lib/userStore";

const Detail=()=>{
    const {chatId,user,isCurrentUserBlocked,isReciverBlocked,changeblock}=useChatStore();
    const {currentUser}=useUserStore();
    
    const handleBlock=async()=>{
        if(!user) return;
        const userDocRef=doc(db,"users",currentUser.id)

        try{
         await updateDoc(userDocRef,{
            blocked:isReciverBlocked? arrayRemove(user.id):arrayUnion(user.id),

         });
         changeBlock()
        }catch(err){
          console.log(err);
          
        }
    };
    return(
        <div className='detail'>
            <div className="user">
              <img src="./avatar.png" alt="" />
              <h2>{user?.avatar||"./avatar.png"}</h2>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="info">
               <div className="option">
                <div className="title">
                    <span>Chat Setting</span>
                    <img src="./arrowUp.png" alt="" />
                </div>
               </div>
               <div className="option">
                <div className="title">
                    <span>Privacy % help</span>
                    <img src="./arrowUp.png" alt="" />
                </div>
               </div>
               <div className="option">
                <div className="title">
                    <span>Shared photos</span>
                    <img src="./arrowDown.png" alt="" />
                </div>

               <div className="photos">
                <div className="photoItem">
                    <div className="photoDetail">
                    <img 
                    src=""
                    alt="" 
                    />
                    <span>photo_2024_2.png</span>
                    </div>
                    <img src="./download.png" alt="" className="icons" />
                </div>
                <div className="photoItems">
                    <div className="photoDetail">
                    <img 
                    src="1"
                    alt="" 
                    />
                    <span>photo_2024_2.png</span>
                    </div>
                    <img src="./download.png" alt="" className="icons" />
                </div>
                <div className="photoItems">
                    <div className="photoDetail">
                    <img 
                    src=""
                    alt="" 
                    />
                    <span>photo_2024_2.png</span>
                    </div>
                    <img src="./download.png" alt="" className="icons"/>
                </div>
                <div className="photoItems">
                    <div className="photoDetail">
                    <img 
                    src=""
                    alt=""
                    />
                    <span>photo_2024_2.png</span>
                    </div>
                    <img src="./download.png" alt="" />
                </div>
               </div>
            </div>
               <div className="option">
                <div className="title">
                    <span>Shared Files</span>
                    <img src="./arrowUp.png" alt="" />
                </div>
               </div>
               <button onClick={handleBlock}>
                 {isCurrentUserBlocked
                  ? "You are Blocked!"
                  : isReciverBlocked
                  ? "User blocked"
                  : "Block User"}
               </button>
               <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
            </div>
        </div>
    
    );
};

export default Detail;