import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Modal, Row, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import nextId from 'react-id-generator';
import axios from 'axios';

import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

import ListItem from './ListItem';
import getCookies from '../getCookies';
import { useHistory } from 'react-router-dom';
import getUser from './getUser';




library.add(faTrash);
library.add(faPlusSquare);

const cookie = getCookies('jwt');
getUser(cookie);


// console.log(user);

function  App() {
  const history = useHistory();
  if (!cookie) {
    history.push('/');
  }

  const [data, setData] = useState();
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    text: '',
    key: nextId(),
    date: new Date()
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const deleteItem = (key) => {
    const filteredItem = items.filter(item => item.key !== key);
    setItems(filteredItem);
  }

  const setUpdate = (changeItem) => {
    const changeItems = items;
    console.log(changeItem);
    changeItems.map(
      item => {
        if (item.key === changeItem.key) {
          item.text = changeItem.text;
          item.date = changeItem.date;
          console.log(typeof (item.date));
        }
      }
    );
    setItems(changeItems);
  }

  return (

    <div className="App">
      {/* <p>#DEBUG {JSON.stringify(currentItem)}</p>
      <p>#DEBUG {JSON.stringify(items)}</p> */}
      <Container>
        <Form>
          <Row md={10}>
            <Col sm={8} xs={2}>
              <Form.Control type="text" placeholder="Search Something"></Form.Control>
            </Col>
            <Col sm={4} xs={2}>
              <Button variant="primary" size="lg"><h6>Search</h6></Button>
              <Button variant="success" size="lg" onClick={handleShowModal}><h6>Add</h6></Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <ListItem items={items.sort((a, b) => b.date - a.date)}
        deleteItem={deleteItem}
        setUpdate={setUpdate} />

      {/* Create Item In To Do List */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add To Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>What You Do: </Form.Label>
            <Form.Control type="text" onChange={e => {
              setCurrentItem({ ...currentItem, text: e.target.value, key: nextId() })
            }}></Form.Control>
            <Form.Label>Time To Do</Form.Label>
            <DatePicker selected={currentItem.date} onChange={
              e => {
                setCurrentItem({ ...currentItem, date: e });
              }
            }></DatePicker>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={e => {
            e.preventDefault();
            setItems([...items, currentItem]);
            setShowModal(false)
          }}>Add Item</Button>
          <Button variant="danger" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
}

export default App;
