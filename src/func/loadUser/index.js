import * as firebase from "firebase";

export let userdata = () => userBucket;
let userBucket = {};
const loadUser = user => {
  const db = firebase.firestore();
  return new Promise(resolve => {
    db.collection("users")
      .doc(user.uid)
      .onSnapshot(data => {
        let doc = data.data();
        userBucket = doc;
        resolve(userBucket);
      });
  });
};
export default loadUser;
