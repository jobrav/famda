import React, { useEffect } from "react";

import * as firebase from "firebase";
import buildCalendar from "../buildCalendar";

export const Chunk = React.memo(({ startZipcode, endZipcode, sources, query, setRender }) => {
    const db = firebase.firestore();
    const id = `${startZipcode}${endZipcode}`;
    let map = {}; // render

    useEffect(() => {
        newChunk()
    }, [sources])
    const update = () => {
        sortFetch().then(docs => {

            // dispatch({ type: 'change', id, content: docs })
            let obj = {};
            obj[id] = docs;
            setRender(prev => ({ ...prev, ...obj }))
        })
    }

    const modify = (doc) => {
        map[doc.id] = doc.data()
    }
    const remove = (doc) => {
        map[doc.id] = undefined;
    }

    const sortFetch = () => {
        return new Promise(resolve => {
            let docsArr = Object.values(map);
            buildCalendar(docsArr, startZipcode, endZipcode).then(bucket => {
                let sortedList = bucket.sort((a, b) =>
                    a.zipcode > b.zipcode ? 1 : b.zipcode > a.zipcode ? -1 : 0
                );
                resolve(sortedList)
            })
        })
    }

    const fetchData = (ref) => {
        ref.onSnapshot(snap => {
            let changes = snap.docChanges();
            changes.forEach(change => {
                if (change.type === "added" || change.type === "modified") modify(change.doc);
                if (change.type === "removed") remove(change.doc);
            })
            update()
        });
    }
    const fetchRepeatObjs = (source) => {
        const ref = db
            .collection("calendars")
            .doc(source)
            .collection("activityIndex")
            .where("repeat", "==", true);
        fetchData(ref);
    }
    const fetchSingleObjs = (source) => {
        const ref = db
            .collection("calendars")
            .doc(source)
            .collection("activityIndex")
            .where("zipcode", ">=", startZipcode)
            .where("zipcode", "<=", endZipcode);

        fetchData(ref);
    }
    const newChunk = () => {
        console.log("start chunk")
        map = {}
        // dispatch({ type: 'change', id, content: [] })
        let obj = {};
        obj[id] = [];
        setRender(prev => ({ ...prev, ...obj }))
        sources.forEach((source, Gindex, Garr) => {
            if (!query || query.repeat) fetchRepeatObjs(source);
            if (!query || query.single) fetchSingleObjs(source);
        })
    }


});

