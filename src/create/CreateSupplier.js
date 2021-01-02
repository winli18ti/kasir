import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

import Aside from "./../template/Aside";
import Header from "./../template/Header";
import Footer from "./../template/Footer";

const namaTabel = "supplier";

class CreateSupplier extends Component {

    constructor(){
        super()
        this.state = {
            nama_supplier: "",
            alamat_supplier: "",
            no_hp: "",
            nama_bank: "",
            no_rekening: "",
            atas_nama: "",
            show: false,
            message: ""
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
        const apiUrl = `http://localhost/kasir/kasir_backend/index.php/${namaTabel}/create_action/`;

        fetch(apiUrl, {
            method: 'POST',
			header: {
				'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nama_supplier: this.state.nama_supplier,
                alamat_supplier: this.state.alamat_supplier,
                no_hp: this.state.no_hp,
                nama_bank: this.state.nama_bank,
                no_rekening: this.state.no_rekening,
                atas_nama: this.state.atas_nama
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
                    <h1>Buat Supplier Baru</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Label column sm={2}>Nama Supplier</Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    name="nama_supplier"
                                    value={this.state.nama_supplier}
                                    placeholder="Nama Supplier"
                                    onChange={this.handleChange}
                                    required/>
                            </Col>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Label column sm={2}>Alamat Supplier</Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    name="alamat_supplier"
                                    value={this.state.alamat_supplier}
                                    placeholder="Alamat Supplier"
                                    onChange={this.handleChange}
                                    required/>
                            </Col>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Label column sm={2}>No HP</Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    name="no_hp"
                                    value={this.state.no_hp}
                                    placeholder="No HP"
                                    onChange={this.handleChange}
                                    required/>
                            </Col>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Label column sm={2}>Nama Bank</Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    name="nama_bank"
                                    value={this.state.nama_bank}
                                    placeholder="Nama Bank"
                                    onChange={this.handleChange}
                                    required/>
                            </Col>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Label column sm={2}>No Rekening</Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    name="no_rekening"
                                    value={this.state.no_rekening}
                                    placeholder="No Rekening"
                                    onChange={this.handleChange}
                                    required/>
                            </Col>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Label column sm={2}>Atas Nama</Form.Label>
                            <Col>
                                <Form.Control
                                    type="text"
                                    name="atas_nama"
                                    value={this.state.atas_nama}
                                    placeholder="Atas Nama"
                                    onChange={this.handleChange}
                                    required/>
                            </Col>
                        </Form.Row>
                        
                        <Form.Row>
                            <Col sm={{offset: 2}}>
                                <Button type="submit">Buat Supplier</Button>
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

export default CreateSupplier;