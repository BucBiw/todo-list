import React from 'react';
import { Col, Row, Form, Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import './ListItem.css';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function ListItem(props){
    const items = Array.from(props.items);
    const [showModal, setShowModal] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState({
        text: '',
        date: new Date(),
        key: ''
    });
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const listitem = items.map(item => {
        return <div className="list" key={item.key}>
            <p>
                { item.text }
                <span>
                    <Row>
                        <Col>
                            <FontAwesomeIcon className="faicon" 
                            icon='plus-square'
                            onClick={ (e) => {
                                e.preventDefault();
                                setCurrentItem({
                                    text: item.text,
                                    date: item.date,
                                    key: item.key
                                });
                                handleShowModal();
                            }} />
                        </Col>
                        <Col>
                            <FontAwesomeIcon className="faicon" 
                            icon='trash'
                            onClick={() => props.deleteItem(item.key)} />
                        </Col>
                    </Row>
                </span>
            </p>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                        <Modal.Title>Change To Do</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>What You Do</Form.Label>
                    <Form.Control type="text" placeholder={currentItem.text}
                    onChange={
                        e => {
                            setCurrentItem({...currentItem, text: e.target.value})
                        }
                    }></Form.Control>
                    <Form.Label>Time To Do</Form.Label>
                    <DatePicker selected={currentItem.date}
                    onChange={
                        e => {
                            setCurrentItem({...currentItem, date: e})
                        }
                    }></DatePicker>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" 
                    onClick={() => {
                        props.setUpdate(currentItem);
                        handleCloseModal();
                    }}>Add</Button>
                    <Button variant="success" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>

            </Modal>
        </div>
    });

    return (
    <div>{ listitem }</div>
    );
}

export default ListItem;