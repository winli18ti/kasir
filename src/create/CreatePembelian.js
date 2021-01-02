import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

import Aside from "./../template/Aside";
import Header from "./../template/Header";
import Footer from "./../template/Footer";

const namaTabel = "pembelian";
let id, data_barang = {}, data_supplier = [];

class CreatePembelian extends Component {

    constructor(props) {
        super(props)
        id = this.props.match.params.id
        this.state = {
            nama_barang: "",
            jumlah_barang: "",
            total_harga: 0,
            id_supplier: "",
            id_barang: id,
            show: false,
            message: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const apiUrl1 = `http://localhost/kasir/kasir_backend/index.php/barang/find_by_id/${id}`;
        const apiUrl2 = `http://localhost/kasir/kasir_backend/index.php/supplier/`;

        fetch(apiUrl1)
            .then((res) => res.json())
            .then((result) => {
                data_barang = result
                this.setState({
                    nama_barang: data_barang.nama_barang
                })
            })
            .catch((error) => this.setState({
                show: true,
                message: error
            }))

        fetch(apiUrl2)
            .then((res) => res.json())
            .then((result) => {
                data_supplier = result
                this.setState({
                    id_supplier: data_supplier[0].id_supplier
                })
            })
            .catch((error) => this.setState({
                show: true,
                message: error
            }))
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
        if (name === "jumlah_barang") {
            this.setState({
                total_harga: value * data_barang.harga_beli
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const apiUrl1 = `http://localhost/kasir/kasir_backend/index.php/barang/update_stok/`;
        const apiUrl2 = `http://localhost/kasir/kasir_backend/index.php/${namaTabel}/create_action/`;

        fetch(apiUrl1, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_barang: this.state.id_barang,
                stok_barang: this.state.jumlah_barang
            })
        })

        fetch(apiUrl2, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nama_barang: this.state.nama_barang,
                jumlah_barang: this.state.jumlah_barang,
                total_harga: this.state.total_harga,
                id_supplier: this.state.id_supplier,
                id_barang: this.state.id_barang
            })
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        show: true,
                        message: "Pembelian berhasil"
                    })
                })
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
                <Header />
                <Aside />
                <div className="content">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Label column sm={2}>Nama Barang</Form.Label>
                            <Col>
                                <Form.Control type="text"
                                    value={this.state.nama_barang}
                                    required
                                    disabled />
                            </Col>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Label column sm={2}>Harga Satuan Barang</Form.Label>
                            <Col>
                                <Form.Control plaintext readOnly value={`Rp ${data_barang.harga_beli}`}/>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Form.Label column sm={2}>Stok Barang Sekarang</Form.Label>
                            <Col>
                                <Form.Control plaintext readOnly value={data_barang.stok_barang}/>
                            </Col>
                        </Form.Row>
                            
                        <Form.Row>
                            <Form.Label column sm={2}>Jumlah Barang</Form.Label>
                            <Col>
                                <Form.Control type="number"
                                    name="jumlah_barang"
                                    value={this.state.jumlah_barang}
                                    min="0"
                                    onChange={this.handleChange}
                                    required />
                            </Col>
                        </Form.Row>
                            
                        <Form.Row>
                            <Form.Label column sm={2}>Total Harga</Form.Label>
                            <Col>
                                <Form.Control plaintext readOnly value={`Rp ${this.state.jumlah_barang * data_barang.harga_beli}`}/>
                            </Col>
                        </Form.Row>
                                
                        <Form.Row>
                            <Form.Label column sm={2}>Supplier</Form.Label>
                            <Col>
                                <Form.Control as="select"
                                    name="id_supplier"
                                    value={this.state.id_supplier}
                                    onChange={this.handleChange}
                                >
                                {
                                    data_supplier.map((d) =>
                                        (<option key={d.id_supplier} value={d.id_supplier}>
                                            {d.nama_supplier}
                                        </option>))
                                }
                                </Form.Control>
                            </Col>
                        </Form.Row>
                                
                        <Form.Row>
                            <Col sm={{offset: 2}}>
                                <Button type="submit">Beli</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>
                <Footer />

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

export default CreatePembelian;