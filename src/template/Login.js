import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'

const namaTabel = 'user';

class Login extends Component {

    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            show: false,
            message: {},
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
        
        const apiUrl = `http://localhost/kasir/kasir_backend/index.php/${namaTabel}/find_by_other/`;

        fetch(apiUrl, {
            method: 'POST',
			header: {
				'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result)
                    if(result.username)
                    {
                        sessionStorage.setItem('level',result.level)
                        sessionStorage.setItem('id_user',result.id_user)
                        sessionStorage.setItem('nama_user',result.nama_user)
                        this.setState({
                            show: true,
                            message: "Berhasil login"
                        })
                    }
                    else
                    {
                        this.setState({
                            show_alert: true
                        })
                    }
                })
            .catch((error) => this.setState({
                show: true,
                message: error
            }))
    }

    afterSubmit(){
        return window.location.href = `/`;
    }

    render() {
        return (
            <div className="one">
                <header>
                    <h1>Website Kasir</h1>
                </header>
                <Container>
                    <h1>Login</h1>

                    <Alert show={this.state.show_alert} variant="warning">
                        Username atau Password salah
                    </Alert>

                    <Form onSubmit={this.handleSubmit}>
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
                            <Col sm={{offset: 2}}>
                                <Button type="submit">Login</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
                <footer>
                    Copyright &copy; {new Date().getFullYear()} Kasir
                </footer>

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
            </div>
        )
    }
}

export default Login;