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
let id = "";
let verifikasi = "";

const level = sessionStorage.getItem("level");

class UpdateUser extends Component {
    
    constructor(props){
        super(props)
        id = this.props.match.params.id;
        //ganti sesuai props
        this.state = {
            id_user: id,
            username: "",
            lama: "",
            password: "",
            repeat: "",
            nama_user: "",
            show: false,
            message: "",
            show_alert: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount()
    {
        const apiUrl = `http://localhost/kasir/kasir_backend/index.php/${namaTabel}/find_by_id/${id}`;

        fetch(apiUrl)
            .then((res) => res.json())
            .then((result) => {
                this.setState(result)
                verifikasi = this.state.password
                this.setState({
                    password: ""
                })
                console.log(this.state)
            })
            .catch((error) => this.setState({
                show: true,
                message: error
            }))
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.lama !== verifikasi)
        {
            return this.setState({
                show_alert: true,
                message: "Password lama salah"
            })
        }        

        if(this.state.password !== this.state.repeat)
        {
            return this.setState({
                show_alert: true,
                message: "Password tidak sama"
            })
        }
        
        const apiUrl = `http://localhost/kasir/kasir_backend/index.php/${namaTabel}/update_action/`;

        console.log(this.state)
        fetch(apiUrl, {
            method: 'POST',
			header: {
				'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_user: this.state.id_user,
                username: this.state.username,
                password: this.state.password,
                repeat: this.state.repeat,
                nama_user: this.state.nama_user
            })
        })
            .then((res) => res.json())
            .then(
                (result) => this.setState({
                        show: true,
                        message: "Data berhasil diupdate"
                    }))
            .catch((error) => this.setState({
                    show: true,
                    message: error
                }))
    }

    afterSubmit(){
        if(level === "Manajer"){
            return window.location.href = `/table_${namaTabel}`;
        }
        if(level === "Karyawan"){
            return window.location.href = '/create_penjualan';
        }
    }

    render() {
        return (
            <React.Fragment>
                <Aside/>
                <Header/>
                <div className="content">
                    <h1>Update User</h1>
                    <Alert show={this.state.show_alert} variant="warning">
                        {this.state.message}
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
                            <Form.Label column sm={2}>Password Lama</Form.Label>
                            <Col>
                                <Form.Control
                                    type="password"
                                    name="lama"
                                    value={this.state.lama}
                                    placeholder="Password Lama"
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
                            <Col sm={{offset: 2}}>
                                <Button type="submit">Update User</Button>
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

export default UpdateUser;