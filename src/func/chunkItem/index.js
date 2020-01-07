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

    const modify = (doc, parentData) => map[doc.id] = Object.assign(doc.data(), parentData);
    const remove = (doc) => map[doc.id] = undefined;

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

    const fetchData = (ref, parentData) => {
        ref.onSnapshot(snap => {
            let changes = snap.docChanges();
            changes.forEach(change => {
                if (change.type === "added" || change.type === "modified") modify(change.doc, parentData);
                if (change.type === "removed") remove(change.doc);
            })
            update()
        });
    }
    const fetchRepeatObjs = (source, parentData) => {
        const ref = db
            .collection("calendars")
            .doc(source)
            .collection("activityIndex")
            .where("repeat", "==", true);
        fetchData(ref, parentData);
    }
    const fetchSingleObjs = (source, parentData) => {
        const ref = db
            .collection("calendars")
            .doc(source)
            .collection("activityIndex")
            .where("zipcode", ">=", startZipcode)
            .where("zipcode", "<=", endZipcode);

        fetchData(ref, parentData);
    }
    const getChildRefs = (type, children, id) => {
        switch (type) {
            case 'single':
                return [id]
            case 'parent':
                return children
            default:
                return []
        }
    }
    const fetchSources = (source) => {
        const ref = db
            .collection("calendars")
            .doc(source)

        ref.get().then(snap => {
            const { type, children, theme } = snap.data();
            getChildRefs(type, children, snap.id).forEach((source) => {
                fetchRepeatObjs(source, { parentTheme: theme, parentId: snap.id });
                fetchSingleObjs(source, { parentTheme: theme, parentId: snap.id });
            })
        })
    }
    const newChunk = () => {
        console.log("start chunk")
        map = {}
        // dispatch({ type: 'change', id, content: [] })
        let obj = {};
        obj[id] = [];
        setRender(prev => ({ ...prev, ...obj }))
        sources && sources.forEach(source => fetchSources(source));
    }


});

