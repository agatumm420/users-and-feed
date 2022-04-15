
import { initializeApp } from 'firebase/app';
import { getDatabase ,ref, set, onValue, update, remove} from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import uniqid from 'uniqid';

const firebaseConfig = {
    apiKey: "AIzaSyBplvYp_D7fC49itIIylNINcxPfL_lke3A",
    authDomain: "projekt-up.firebaseapp.com",
    databaseURL: "https://projekt-up-default-rtdb.firebaseio.com",
    projectId: "projekt-up",
    storageBucket: "projekt-up.appspot.com",
    messagingSenderId: "607338087775",
    appId: "1:607338087775:web:3f6370c5c768dd272622ea",
    measurementId: "G-H58N6LNZZE"
  };
  const app = initializeApp(firebaseConfig);
  
  const analytics = getAnalytics(app);
  console.log(analytics);
const db = getDatabase(app);;
// var ref_users = db.ref("users");
// ref_users.once("value", (snapshot)=> {
//     snapshot.forEach((data) => {
//         console.log('The ' + data.key + ' dinosaur\'s score is ' + data.val());
//       });
    
// });
//var ref_feed=db.ref("feed");
const Error=(error)=>{
  console.log(error);
}
const FeedFactory=(feed_id, feed_txt, user_id)=>{
    return{
        feed_id:feed_id,
        feed_txt:feed_txt,
        user_id:user_id
    }
 }
async function login(userdata){
    let email=" ";
    let name=" ";
    let password=" ";
    let username="";
    let user_id="";
   let logged_in=false;
    const Ref = ref(db, 'users/' );
    onValue(Ref, (snapshot) => {
        snapshot.forEach((data)=>{
            if(userdata.username===data.val().username){
                if(userdata.password===data.val().password){
                    console.log(`You're logged in`);
                    logged_in=true;
                    email=data.val().email;
                    name=data.val().name;
                    password=data.val().password;
                    username=data.val().username;
                    user_id=data.val().user_id;
                }
            }
          })
      });

     if(logged_in==true){
        return {
            email:email,
            name:name,
            password:password,
            username:username,
            user_id:user_id
          }
     } 
     else{
         Error("You're log in data is incorrect");
     } 

           
        

      
  
}
async function signup(userdata){
    const newPostKey =uniqid();
    //const userRef=ref_users.child('users');
    const Ref = ref(db, 'users/' );
    onValue(Ref, (snapshot) => {
        snapshot.forEach((data)=>{
            if(userdata.username===data.val().username){
                  Error("This username is taken!");
            }
            if(userdata.email===data.val().email){
                Error("This email has already been registered");
            }
          })
    });
    const postData = {
        email:userdata.email,
        name:userdata.name,
        password:userdata.password,
        user_id:newPostKey,
        username:userdata.username
      };
      const updates = {};
      
      updates['/users/' + newPostKey] = postData;
      update(ref(db), updates);
    return {
        username:userdata.username,
        password:userdata.password,
        name:userdata.name,
        email:userdata.email,
        user_id:newPostKey,
    } 
}
async function feed(userdata){
    const  feed_arr=[];
    const Ref = ref(db, 'feed/' );
    console.log(userdata.user_id);
    onValue(Ref, (snapshot) => {
        snapshot.forEach((data)=>{
            if(userdata.user_id===data.val().user_id){
                let obj=FeedFactory(data.val().feed_id, data.val().feed_txt, data.val().user_id);
                feed_arr.push(obj);
            }
          })
    });
 
    return feed_arr;
}
async function feedUpdate(userdata){
    const newPostKey =uniqid();
    const postData = {
        feed_txt:userdata.feed,
        feed_id:newPostKey,
        user_id: userdata.user_id,
      };
      const updates = {};
    
      updates['/feed/' + newPostKey] = postData;
      update(ref(db), updates);

    //const feedRef=ref_users.child('feed');
    // ref_feed.on("value", (snapshot)=>{
    //     snapshot.forEach((data)=>{

    //     })
    // })

    return {
        feed_txt:userdata.feed,
        feed_id:newPostKey,
        user_id: userdata.user_id,
    }
}
async function feedDelete(userdata){
    const postRef = ref(db, `/feed/${userdata.feed_id}`);
    remove(postRef);
    return {
        feed_txt:userdata.feed,
        feed_id:userdata.user_id,
        user_id: userdata.user_id,
    }
}
async function Manager(type, userdata){
    let ready=false;
    
    if(type=='signup'){
         let result=await signup(userdata);
         return result;
    
    }
    if(type=='login'){
        let result= await login(userdata);
       return result;
       
    
    }
    if(type=='feed'){
       let result= await feed(userdata);
       return result;
    }
    if(type=='feedUpdate'){
       let result= await feedUpdate(userdata);
       return result;
    }
    if(type=='feedDelete'){
        let result= await feedDelete(userdata);
        return result;
    }
    
}
export default Manager;