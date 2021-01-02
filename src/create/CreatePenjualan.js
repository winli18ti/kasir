import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Alert from 'react-bootstrap/Alert'

import Aside from "./../template/Aside";
import Header from "./../template/Header";
import Footer from "./../template/Footer";

const namaTabel = "penjualan";

const popover = (
    <Popover>
      <Popover.Content>
        Barang telah ditambah
      </Popover.Content>
    </Popover>
  );

class CreatePenjualan extends Component {

    constructor(){
        super()
        this.state = {
            /*
            nama_barang: "",
            jumlah_barang: "",
            total_harga: "",
            id_user: "",
            id_barang: ""
            */
           data_barang: [],
           cari: "",
           data_penjualan: [],
           jumlah_cart: [],
           total: 0,
           show_cart: false,
           show_alert: false,
           show: false,
           message: "",
           bayar: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeCart = this.handleChangeCart.bind(this)    
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCari = this.handleCari.bind(this)
        this.handleTambah = this.handleTambah.bind(this)
        this.handleHapus = this.handleHapus.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleShow() {
        this.setState({
            show_cart: true
        })
    }

    handleClose() {
        this.setState({
            show_cart: false
        })
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        });
    }

    //pasang session terlebih dahulu
    handleSubmit(event){
        event.preventDefault();
        const apiUrl1 = `http://localhost/kasir/kasir_backend/index.php/barang/update_stok/`;
        const apiUrl2 = `http://localhost/kasir/kasir_backend/index.php/${namaTabel}/create_action/`;
        
        this.state.data_penjualan.map((d) => {
            fetch(apiUrl1, {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_barang: d.id_barang,
                    stok_barang: d.jumlah_barang * -1
                })
            })
            
            fetch(apiUrl2, {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(d)
            })
            return {
                
            }
        })

        this.setState({
            show_cart: false,
            show: true,
            message: "Penjualan berhasil"
        })
    }

    handleCari(event){
        event.preventDefault();
        const apiUrl = `http://localhost/kasir/kasir_backend/index.php/barang/find_by_other_like/`;

        fetch(apiUrl,{
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nama_barang: this.state.cari
            })
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    data_barang: result,
                    jumlah_cart: result.map(() => {
                            return 0
                        })
                    }
                )
                if(result.length < 1){
                    this.setState({
                        show_alert: true
                    })
                }
                else{
                    this.setState({
                        show_alert: false
                    })
                }
            })
            .catch((error) => this.afterSubmit(error))
    }

    handleChangeCart(index){
        return event => {
            const {value} = event.target

            const jumlah_cart_baru = this.state.jumlah_cart.map((item, i) => {
                if(index === i){
                    return value
                }
                else{
                    return item
                }
            })

            this.setState({
                jumlah_cart: jumlah_cart_baru
            })
        }
    }

    handleTambah(index){
        return event => {
            event.preventDefault();

            var baru = {
                nama_barang: this.state.data_barang[index].nama_barang,
                jumlah_barang: this.state.jumlah_cart[index],
                total_harga: this.state.data_barang[index].harga_jual * this.state.jumlah_cart[index],
                id_user: sessionStorage.getItem('id_user'),
                id_barang: this.state.data_barang[index].id_barang
            }

            var flag = false
            var total_harga = 0
            var data_penjualan_baru = this.state.data_penjualan.map((d) => {
                if(d.nama_barang === baru.nama_barang){
                    d.jumlah_barang = baru.jumlah_barang
                    d.total_harga = baru.total_harga
                    flag = true
                }
                total_harga += d.total_harga
                return d
            })
            if(!flag){
                this.setState({
                    data_penjualan: [...this.state.data_penjualan, baru],
                    total: this.state.total + baru.total_harga
                })
            }
            else{
                this.setState({
                    data_penjualan: data_penjualan_baru,
                    total: total_harga
                })
            }
        }
    }

    handleHapus(index){
        return event => {
            event.preventDefault();
            this.setState({
                total: this.state.total - this.state.data_penjualan[index].total_harga
            })
            var baru = this.state.data_penjualan;
            baru.splice(index, 1);
            this.setState({
                data_penjualan: baru
            })
        }
    }

    afterSubmit(){
        return window.location.reload();
    }

    render() {

        return (
            <React.Fragment>
                <Aside/>
                <Header/>

                <div className="content">
                    <Button onClick={this.handleShow}>
                        Lihat Cart
                    </Button>

                    <Form onSubmit={this.handleCari} inline>
                        <Form.Control type="text"
                            name="cari"
                            value={this.state.cari}
                            placeholder="Masukkan Nama Barang"
                            onChange={this.handleChange}
                            />
                        <Button type="submit" variant="info">Cari</Button>
                    </Form>

                    <Alert show={this.state.show_alert} variant="warning">
                        Nama barang tidak ditemukan
                    </Alert>
                    
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <td>Nama Barang</td>
                                <td>Harga Jual</td>
                                <td>Stok Barang</td>
                                <td>Aksi</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data_barang.map((d,index) => (
                                <tr key={d.id_barang}>
                                    <td>{d.nama_barang}</td>
                                    <td>Rp {d.harga_jual}</td>
                                    <td>{d.stok_barang}</td>
                                    <td>
                                        <Form onSubmit={this.handleTambah(index)}>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Control type="number"
                                                        value={this.state.jumlah_cart[index]}
                                                        min="0"
                                                        max={`${d.stok_barang}`}
                                                        onChange={this.handleChangeCart(index)}
                                                        required/>
                                                </Col>
                                                <Col>
                                                    <OverlayTrigger trigger="click" placement="right" rootClose overlay={popover}>
                                                        <Button type="submit">Cart</Button>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Form.Row>
                                        </Form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                <Modal show={this.state.show_cart} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <td>Nama Barang</td>
                                    <td>Jumlah Barang</td>
                                    <td>Total Harga</td>
                                    <td>Aksi</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data_penjualan.map((d,index) => (
                                    <tr key={index}>
                                        <td>{d.nama_barang}</td>
                                        <td>{d.jumlah_barang}</td>
                                        <td>Rp {d.total_harga}</td>
                                        <td>
                                            <Button onClick={this.handleHapus(index)} variant="danger">Hapus</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Form.Label>Total Keseluruhan: Rp {this.state.total}</Form.Label>
                    </Modal.Body>
                    <Modal.Footer>
                        <Form onSubmit={this.handleSubmit} inline>
                            <Form.Label column sm={2}>Bayar</Form.Label>
                            <Form.Control type="number"
                                name="bayar"
                                value={this.state.bayar}
                                min={this.state.total}
                                step="100"
                                onChange={this.handleChange}
                                placeholder="Bayar"
                                required/>
                            <Button variant="secondary" onClick={this.handleClose}>Tutup</Button>
                            <Button type="submit" variant="success">Bayar</Button>
                        </Form>
                    </Modal.Footer>
                </Modal>

                <Footer/>

                <Modal show={this.state.show}>
                    <Modal.Header>
                        Notifikasi
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.message}<br/>
                        Kembalian: Rp {this.state.bayar - this.state.total}
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

export default CreatePenjualan;