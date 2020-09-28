import React from 'react';

import './ListItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ListItem(props){
    const items = Array.from(props.items);
    const listitem = items.map(item => {
        return <div className="list" key={item.key}>
            <p>
                <input type="text" 
                id={ item.text } 
                value={ item.text }
                onChange={
                    (e) => {
                        props.setUpdate(e.target.value, item.key);
                    }
                } />
                <span>
                    <FontAwesomeIcon className="faicon" 
                    icon='trash'
                    onClick={() => props.deleteItem(item.key)} />
                </span>
            </p>
        </div>
    });

    return (
    <div>{ listitem }</div>
    );
}

export default ListItem;