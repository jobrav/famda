import React, { useEffect, useState } from "react";
import { useRouteMatch, useParams } from "react-router-dom";
import ItemList from "../itemList"

function Docs({ route }) {
  let { url } = useRouteMatch();
  console.log(useParams())
  return (
    <div className="" id="docsWindow" style={{ height: "100vh" }}>
      <ItemList items={[{ title: 'MLA Rooster', active: true, icon: true }, { title: 'VisValk', icon: true }, { title: 'Nederlandse Feestdagen', icon: true }]}></ItemList>
      <ItemList items={[{ title: 'Huiswerk', icon: true }, { title: 'Studiewijzer', active: true, icon: true }]}></ItemList>
      <ItemList items={[{ title: 'Nederlands' }, { title: 'Wiskunde' }, { title: 'Bedrijfseconomie' }, { title: 'Engels' }, { title: 'Scheikunde' }, { title: 'Natuurkunde' }, { title: 'PWS' }, { title: 'Lichamelijk opvoeding' }]}></ItemList>
    </div>
  );
}

export default Docs;
