import React from "react";

const ItemList = ({ items }) => {
    return (<div className="itemList scrollBody">
        {items.map(e => (
            <a className={`card counter wallItem ${e.active ? 'itemActive' : null}`}>
                {e.icon ? <div className="icon" /> : null}
                <div className="text name">{e.title}</div>
            </a>)
        )}
    </div>)
}
export default ItemList;