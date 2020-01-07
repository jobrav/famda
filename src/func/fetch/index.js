import * as firebase from "firebase";
import { chunkBorder, updateChunk } from "../autoLoader";
import { getGroupSources } from "../../App";
import { concatChunks } from "../../components/default/agendaWindow/index";

export let docdata = () => fulldoc;
let fulldoc = {};
export let essdoc = [];
const fetch = (sources, minView, maxView, menu) => {
  // console.log("called");
  // clear cache
  essdoc = [];

  return new Promise((resolve, reject) => {
    const db = firebase.firestore();
    sources.forEach((source, Gindex, Garr) => {
      // fetch repeats
      getRepeat(db, source).then(docs => buildCache(docs));

      // fetch activities
      getActivities(db, source, minView, maxView).then(docs => {
        buildCache(docs);

        //check if fetching is done
        if (Gindex === Garr.length - 1) resolve({ fulldoc, essdoc });
      });
    });
  });
};

export const getRepeat = (db, source) => {
  return new Promise(resolve => {
    const ref = db
      .collection("calendars")
      .doc(source)
      .collection("activityIndex")
      .where("repeat", "==", true);

    fetchData(ref).then(docs => resolve(docs));
  });
};

export const getActivities = (db, source, minView, maxView) => {
  return new Promise(resolve => {
    const min = new Date(minView).setHours(0, 0, 0, 0);
    const max = new Date(maxView).setHours(0, 0, 0, 0);
    const ref = db
      .collection("calendars")
      .doc(source)
      .collection("activityIndex")
      .where("zipcode", ">=", min)
      .where("zipcode", "<", max);

    fetchData(ref).then(docs => {
      resolve(docs);
    });
  });
};

const fetchData = ref => {
  return new Promise(resolve => {
    ref.onSnapshot(snap => {
      let bucket = [];
      snap.forEach(doc => (bucket = [...bucket, doc]));
      resolve(bucket);
      let changes = snap.docChanges();
      changes.forEach(change => {
        if (change.type === "modified") update(change.doc);
      });
    });
  });
};

const buildCache = docs => {
  docs.forEach(doc => {
    let data = doc.data();
    data["id"] = doc.id;
    fulldoc[data.id] = data;

    let essentials = {
      date: data.date,
      id: data.id,
      zipcode: data.zipcode || null,
      zipcodeEnd: data.zipcodeEnd || null,
      time: data.time
    };
    const update = filterEss(doc);
    if (update != -1) {
      // updateChunk(sources, minView, maxView)
      essdoc[update] = essentials;
    } else essdoc = [...essdoc, essentials];
  });
};

const update = change => {
  const doc = change.data();
  fulldoc[change.id] = doc;
  const cn = filterChunkBorder(doc);
  const chunkStart = chunkBorder[cn].minView;
  const chunkEnd = chunkBorder[cn].maxView;
  const groupSources = getGroupSources();
  console.log("update");
  updateChunk(groupSources, chunkStart, chunkEnd).then(_ => concatChunks());
};

const filterEss = doc => {
  return essdoc.findIndex(elm => elm.id == doc.id);
};
const filterChunkBorder = doc => {
  return chunkBorder.findIndex(
    elm => elm.minView < doc.zipcode && elm.maxView > doc.zipcode
  );
};

export default fetch;
