import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

import Aside from "./../template/Aside";
import Header from "./../template/Header";
import Footer from "./../template/Footer";

const namaTabel = "barang";

class CreateBarang extends Component {

    constructor(){
        super()
        this.state = {
            nama_barang: "",
            harga_jual: "",
            harga_beli: "",
            stok_barang: "",
            show: false,
            message: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    afterSubmit(){
        return window.location.href=`/table_${namaTabel}`;
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
                nama_barang: this.state.nama_barang,
                harga_jual: this.state.harga_jual,
                harga_beli: this.state.harga_beli,
                stok_barang: this.state.stok_barang
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

    render() {
        return (
            <React.Fragment>
                <Aside/>
                <Header/>
                <div className="content">
                    <h1>Buat Barang Baru</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Label column sm={2}>Nama Barang</Form.Label>
                            <Col>
                                <Form.Control
                                    type="text" 
                                    name="nama_barang"
                                    value={this.state.nama_barang}
                                    placeholder="Nama Barang"
                                    onChange={this.handleChange}
                                    required/>
                            </Col>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Label column sm={2}>Harga Jual</Form.Label>
                            <Col>
                                <Form.Control
                                    type="number" 
                                    name="harga_jual"
                                    value={this.state.harga_jual}
                                    placeholder="Harga Jual"
                                    onChange={this.handleChange}
                                    required/>
                            </Col>
                        </Form.Row>
                            
                        <Form.Row>
                            <Form.Label column sm={2}>Harga Beli</Form.Label>
                            <Col>
                                <Form.Control 
                                    type="number" 
                                    name="harga_beli"
                                    value={this.state.harga_beli}
                                    placeholder="Harga Beli"
                                    onChange={this.handleChange}
                                    required/>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Form.Label column sm={2}>Stok Barang</Form.Label>
                            <Col>
                                <Form.Control
                                    type="number" 
                                    name="stok_barang"
                                    value={this.state.stok_barang}
                                    placeholder="Stok Barang"
                                    onChange={this.handleChange}
                                    required/>
                            </Col>
                        </Form.Row>
                            
                        <Form.Row>
                            <Col sm = {{offset: 2}}>
                                <Button type="submit">Buat Barang</Button>
                            </Col>
                        </Form.Row>
                            
                    </Form>
                </div>
                <Footer/>

                <Modal show={this.state.show}>
                    <Modal.Header closeButton>
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

export default CreateBarang;