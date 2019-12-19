import React from "react";

const ListItem = props => {
  let caption = `Van ${props.data.by} (${props.data.type})`;
  let name = props.data.name;
  let id = props.data.id;
  // const theme = data.theme;

  const accept = e => {
    props.onChange({ state: true, type: "accept", data: props.data });
  };

  return (
    <div className="listItem" key={id}>
      <div className="subTitle">{name}</div>
      <div className="text">{caption}</div>
      <div className="tools">
        <div className="add" onClick={accept}>
          Toevoegen
        </div>
      </div>
    </div>
  );
};

function ListContainer(props) {
  let data = props.data || [];
  let amount = props.amount || false;

  const onChange = e => {
    props.onChange(e);
  };

  return (
    <div className="listContainer">
      {data.map((e, i) => {
        if (!amount || amount >= i + 1) {
          return <ListItem data={e} onChange={onChange} />;
        }
      })}
    </div>
  );
}

export default ListContainer;
