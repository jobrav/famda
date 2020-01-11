import React, { useEffect, useState } from "react";

import * as firebase from "firebase";
import buildCalendar from "../buildCalendar";

export const Chunk = React.memo(({ startZipcode, endZipcode, sources, query, setRender, finshed }) => {
    const db = firebase.firestore();
    const id = `${startZipcode}${endZipcode}`;
    let map = {}; // render

    const [setupDone, setSetupDone] = useState(false);
    useEffect(() => {
        newChunk()
    }, [sources])
    useEffect(() => {
        finshed(e => e += 1)
    }, [setupDone])

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
        return new Promise(resolve => {
            ref.onSnapshot(snap => {
                let changes = snap.docChanges();
                changes.forEach(change => {
                    if (change.type === "added" || change.type === "modified") modify(change.doc, parentData);
                    if (change.type === "removed") remove(change.doc);
                })
                update()
                resolve(true);
            });
        })
    }
    const fetchRepeatObjs = (source, parentData) => {
        return new Promise(resolve => {
            const ref = db
                .collection("calendars")
                .doc(source)
                .collection("activityIndex")
                .where("repeat", "==", true);

            fetchData(ref, parentData).then(() => resolve(true));
        })
    }
    const fetchSingleObjs = (source, parentData) => {
        return new Promise(resolve => {
            const ref = db
                .collection("calendars")
                .doc(source)
                .collection("activityIndex")
                .where("zipcode", ">=", startZipcode)
                .where("zipcode", "<=", endZipcode);

            fetchData(ref, parentData).then(() => resolve(true));
        })
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
        new Promise(resolve => {
            const ref = db
                .collection("calendars")
                .doc(source)

            ref.get().then(snap => {
                const { type, children, theme } = snap.data();
                const setupFetch = getChildRefs(type, children, snap.id).map((source) => {
                    fetchRepeatObjs(source, { parentTheme: theme, parentId: snap.id });
                    fetchSingleObjs(source, { parentTheme: theme, parentId: snap.id });
                })
                Promise.all(setupFetch).then(() => resolve(true))
            })
        })
    }
    const newChunk = () => {
        console.log("creating new chunk...")
        finshed(0)
        map = {}
        // dispatch({ type: 'change', id, content: [] })
        let obj = {};
        obj[id] = [];
        setRender(prev => ({ ...prev, ...obj }))
        const setupFetch = sources ? sources.map(source => fetchSources(source)) : [];
        Promise.all(setupFetch).then(e => setSetupDone(true))
    }


});

