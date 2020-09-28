import React from 'react';

import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import ListItem from './ListItem';

const users = {
  username: 'test01',
  items: []
}

library.add(faTrash);

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      username: 'test01',
      items: [],
      currentItem:{
        text: '',
        key: ''
      }
    }
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);

    if(newItem.text !== ''){
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          text: '',
          key: ''
        }
      });
      users.items.push(newItem);
      users.items.forEach(element => {
        console.log('item: ' + element.text);
      });
    }
  }

  deleteItem(key){
    const filteredItems = this.state.items.filter(item => item.key !== key);
    this.setState({
      items: filteredItems
    });
    users.items = filteredItems;
    users.items.forEach(element => {
      console.log('item: ' + element.text);
    });
  }

  handleInput(e){
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now()
      }
    });
  }

  render(){
    return (
      <header>
        <div className="App">
          <form id="to-do-list-form" onSubmit={this.addItem}>
            <input type="text" placeholder="Add to Search"
            value={this.state.currentItem.text}
            onChange={this.handleInput} />
            <button type="submit" id="searchButton">Search</button>
            <button type="submit" id="addButton">Add</button>
          </form>
          <ListItem items={this.state.items}
          deleteItem = {this.deleteItem}></ListItem>
        </div>
      </header>
    );
  }
}

export default App;
