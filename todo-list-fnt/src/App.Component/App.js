import React from 'react';

import './App.css';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>to do List (App)</h1>
//       </header>
//     </div>
//   );
// }

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      users: {
        username: 'test01',
        items: [],
        currentItem:{
          text: '',
          key: ''
        }
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  handleInput(e){
    this.setState({
      users:{
        currentItem: {
          text: e.target.value,
          key: Date.now()
        }
      }
    });
  }

  addItem(e){
    e.preventDefault();
    const newItem = this.state.users.currentItem;
    console.log(newItem);

    if(newItem.text !== ""){
      const items = [...this.state.users.items, newItem];
      this.setState({
        users: {
          items: newItem,
          currentItem: {
            text: '',
            key: ''
          }
        }
      });
    }
  }

  render(){
    return (
      <header>
        <div className="App">
          <form id="to-do-list-form" onSubmit={this.addItem}>
            <input type="text" placeholder="Add to Search"
            value={this.state.users.currentItem.text}
            onChange={this.handleInput} />
            {/* <button type="submit" id="searchButton">Search</button> */}
            <button type="submit" id="addButton">Add</button>
          </form>
        </div>
      </header>
    );
  }
}

export default App;
