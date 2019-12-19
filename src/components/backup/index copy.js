import * as firebase from "firebase";
import blabla from "../getDate";
import { resolve } from "path";

export let status = true;
export let orderedList = [];
export let RBucket = [];
export let RTree = { dd: [], ww: {}, mm: {}, yy: {} };
export let GBucket = {};

let repeatFetchCount = 0;
const filterFetch = (data, index) => {
  if (!data.date) {
    RTree.dd.push(index);
  } else if (data.date.wd && !data.date.dd && !data.date.mm) {
    if (!RTree.ww[data.date.wd]) RTree.ww[data.date.wd] = [];
    RTree.ww[data.date.wd] = [...RTree.ww[data.date.wd], index];
  } else if (data.date.dd && !data.date.mm) {
    if (!RTree.mm[data.date.dd]) RTree.mm[data.date.dd] = [];
    RTree.mm[data.date.dd] = [...RTree.mm[data.date.dd], index];
  } else if (data.date.mm) {
    let newcode = toDays(data.zipcode);
    if (!RTree.yy[newcode]) RTree.yy[newcode] = [];
    RTree.yy[newcode] = [...RTree.yy[newcode], index];
  }
  // console.log(RTree);
};

const fetchData = async current => {
  // orderedList = [];
  const db = firebase.firestore();
  const uid = await firebase.auth().currentUser.uid;
  const userData = await db
    .collection("users")
    .doc(uid)
    .get();
  console.log(current);
  const sources = userData.data()["sources"];
  current != null &&
    sources[current].forEach(source => {
      const sourceQuery = db
        .collection("calendars")
        .doc(source)
        .collection("activityIndex")
        .where("zipcode", ">=", 0)
        .limit(10);
      sourceQuery.onSnapshot(querySnapshot => {
        querySnapshot.forEach((doc, index) => {
          const data = doc.data();
          const dataId = data.id;

          if (GBucket[dataId]) editDoc(data, dataId);
          else addDoc(data);

          GBucket[dataId] = data;
        });
      });
    });
};

const addDoc = data => {
  if (data.repeat == false) {
    orderedList = [
      ...orderedList,
      {
        id: data.id,
        zipcode: data.zipcode,
        yy: data.yy,
        dd: data.dd,
        startTime: data.startTime,
        date: data.date
      }
    ];
    orderItems(orderedList);
  } else {
    RBucket = [...RBucket, data];
    filterFetch(data, repeatFetchCount);
    repeatFetchCount++;
  } // make hash to fetch arr
};
const editDoc = (data, dataId) => {
  document.querySelectorAll(`[data-key="${dataId}"]`).forEach(obj => {
    // obj.innerHTML = data;
  });
};
const orderItems = unorderedList => {
  unorderedList.sort(function(a, b) {
    return a.zipcode - b.zipcode;
  });
};

const toDays = zipcode =>
  zipcode.toString().substring(0, zipcode.toString().length - 4);

export default fetchData;
