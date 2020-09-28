import React from 'react';

import './ListItem.css';


function ListItem(props){
    const items = Array.from(props.items);
    const listitem = items.map(item => {
        return <div className="list" key="item.key">
            <p>{ item.text }</p>
        </div>
    });

    return (
    <div>{ listitem }</div>
    );
}

export default ListItem;