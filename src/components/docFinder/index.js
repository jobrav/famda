import React, { useContext } from 'react';
import { DocRefContext } from "../../contexts";


const DocFinder = React.memo(() => {
    const { docRef, setDocRef } = useContext(DocRefContext)
    const move = i => setDocRef(prev => [...prev.splice(0, i + 1)]);
    return <div>{docRef.map((e, i) => <a onClick={() => move(i)}>{` ${e} >`}</a>)}</div>
})
export default DocFinder;