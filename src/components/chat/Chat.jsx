import {useEffect, useRef, useState} from "react";
import "./chat.css"
import EmojiPicker from "emoji-picker-react"
import {
    doc,
    onSnapshot,

} from "firebase/firestore";
import {db} from "../../lib/firebase"
const Chat = () => 
{
    const [chat,setChat]=useState();
    const [open,setOpen]=useState(false);
    const [text,setText]=useState("");
    const [img,setImg]=useState({
      file:null,
      url:"",
    });
    const {currentUser}=useUserStore();
    const {chatId,userId,isCurrentUserBlocked,isReceiverBlocked}=useChatStore();
    const endRef=useRef(null)

    useEffect(() => {
     endRef.current?.scrollIntoView({behaviour:"smooth"});
    },[]);
    useEffect(()=>{
      const unSub=onSnapshot(
          doc(db,"chats",chatId),
          (res)=>{
          setChat(res.data());
        });

    return()=>{
        unSub();
    };
 },[chatId]);
 console.log(chat);

  const handleEmoji=(e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
    };
  const handleSend=async()=>{
    if(text==="") return;
    let imgUrl=null;
    try{

    if(img.file){
        imgUrl=await upload(img.file);
    }
     await updatedDoc(doc(db,"chats",chatId),{
        message:arrayUnion({
            senderId:currentUser.id,
            text,
            createdAt:new Date(),
        }),
      });
      const userIDs=[currentUser.id,user.id];
      
      userIDs.forEach(async(id)=>{
      const userChatsRef=doc(db,"userChats",id);
      const userChatsSnapshot=await getDoc(userChatsRef);
    
       if(userChatsSnapshot.exists()){
        const userChatsData=userChatsSnapshot.data()
        const chatIndex =userChatsData.chats.findIndex((c)=>c.chatId===chatId);

        
        userChatsData.chats[chatIndex].lastMessage=text
        userChatsData.chats[chatIndex].isSeen=
        id===currentUser.id?true:false;
        userChatsData.chats[chatIndex].updatedAt=Date.now();
        
         await updateDoc(userChatsRef,{
            chats:userChatsData.chats,

         });
        }
    });
    
    }catch(err){
     console.log(err);
    }

};
    return(
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src={user?.avatar||"./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{user?.username}</span>
                        <p>lorem ipsum dolor,sit amet.</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                <div className="message">
            
                    <div className="texts">
                    <img src="https://images.pexels.com/photos/4043324/pexels-photo-4043324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    
                        <p>is sapiente corrupti, pariatur maxime ab 
                            quasi dolorem alias? Dolore similique 
                            suscipit neque cumque?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>is sapiente corrupti, pariatur maxime ab 
                            quasi dolorem alias? Dolore similique 
                            suscipit neque cumque?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>is sapiente corrupti, pariatur maxime ab 
                            quasi dolorem alias? Dolore similique 
                            suscipit neque cumque?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>is sapiente corrupti, pariatur maxime ab 
                            quasi dolorem alias? Dolore similique 
                            suscipit neque cumque?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>is sapiente corrupti, pariatur maxime ab 
                            quasi dolorem alias? Dolore similique 
                            suscipit neque cumque?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div classname="center">
                { chat?.message?.map((message)=>(
                <div className={message.senderId===currentUser.id?"message own":"message"} key={message?.createAt}>
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        {message.img && <img
                            src={message.img}
                            alt=""
                        />}
                        <p>
                            {message.text}
                        </p>
                        {/*<span>{message}</span>*/}
                    </div>
                </div>
                ))}
                {img.url && (
                    <div className="message own">
                    <div className="texts">
                       <img src={img.url} alt="" /> 
                    </div>
                </div>
                )}
                <div ref={endRef}></div>
            </div>
            
            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera,png" alt="" />
                    <img src="./mic.png" alt="" />
                    
                </div>
                <input 
                type="text" 
                placeholder={(
                    isCurrentUserBlocked||isReceiverBlocked)
                    ?" You cannotType a message..."
                    :"Type a message..."
                }  
                value={text}
                onChange={(e)=>setText(e.target.value)}
                disabled={isCurrentUserBlocked||isReceiverBlocked}

                />
                <div className="emoji">
                <img 
                    src="./emoji.png" 
                    alt=""
                    onClick={()=>setOpen((prev)=> !prev)} 
                />
                <div className="picker">
                  <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                </div>
            </div>
                <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked|| isReceiverBlocked}>
                    Send</button>
            </div>
        </div>
    
    );
};
export default Chat;