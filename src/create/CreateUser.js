import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'

import Aside from "./../template/Aside";
import Header from "./../template/Header";
import Footer from "./../template/Footer";

const namaTabel = "user";

class CreateUser extends Component {

    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            repeat: "",
            nama_user: "",
            level: "Karyawan",
            show: false,
            message: "",
            show_alert: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.password !== this.state.repeat)
        {
            return this.setState({
                show_alert: true
            })
        }
        
        const apiUrl = `http://localhost/kasir/kasir_backend/index.php/${namaTabel}/create_action/`;

        fetch(apiUrl, {
            method: 'POST',
			header: {
				'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                repeat: this.state.repeat,
                nama_user: this.state.nama_user,
                level: this.state.level
            })
        })
            .then((res) => res.json())
            .then(
                (result) => this.setState({
                    show: true,
                    message: "Data berhasil ditambah"
                }))
            .catch((error) => this.setState({
                show: true,
                message: error
            }))
    }

    afterSubmit(){
        return window.location.href = `/table_${namaTabel}`;
    }

    render() {
        return (
            <React.Fragment>
                <Aside/>
                <Header/>
                <div className="content">
                    <h1>Buat User Baru</h1>

                    <Alert show={this.state.show_alert} variant="warning">
                        Password tidak sama
                    </Alert>

                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Label column sm={2}>Nama User</Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    name="nama_user"
                                    value={this.state.nama_user}
                                    placeholder="Nama User"
                                    onChange={this.handleChange}
                                    required/>
                            </Col>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Label column sm={2}>Username</Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={this.state.username}
                                    placeholder="Username"
                                    onChange={this.handleChange}
                                    required/>
                            </Col>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Label column sm={2}>Password</Form.Label>
                            <Col>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    required/>
                            </Col>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Label column sm={2}>Ulangi Password</Form.Label>
                            <Col>
                                <Form.Control
                                    type="password"
                                    name="repeat"
                                    value={this.state.repeat}
                                    placeholder="Ulangi Password"
                                    onChange={this.handleChange}
                                    required/>
                            </Col>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Label column sm={2}>Level</Form.Label>
                            <Col>
                                <Form.Control as="select"
                                    name="level"
                                    value={this.state.level}
                                    onChange={this.handleChange}
                                >
                                <option value="Karyawan">Karyawan</option>
                                <option value="Manajer">Manajer</option>
                            </Form.Control>
                            </Col>
                        </Form.Row>
                        
                        <Form.Row>
                            <Col sm={{offset: 2}}>
                                <Button type="submit">Buat User</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>
                <Footer/>

                <Modal show={this.state.show}>
                    <Modal.Header>
                        Notifikasi
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.message}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.afterSubmit}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

export default CreateUser;