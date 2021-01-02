import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import Aside from "./../template/Aside";
import Header from "./../template/Header";
import Footer from "./../template/Footer";

const namaTabel = "barang";
const level = sessionStorage.getItem("level");

const Tambahbarang = () => {
    if(level === "Manajer"){
        return (<Link to={`/create_${namaTabel}`}><Button>Tambah Barang</Button></Link>)
    }
}

const Aksi = () => {
    if(level === "Manajer"){
        return (<td>Level</td>)
    }
}

const Aksiisi = (d) => {
    if(level === "Manajer"){
        return (
            <td>
                <Link to={`/update_${namaTabel}/${d.id_barang}`}>
                    <Button variant="secondary">Update</Button>
                </Link>
                <Link to={`/create_pembelian/${d.id_barang}`}>
                    <Button>Beli</Button>
                </Link>
                <Button variant="danger" onClick={() => this.delete(d.id_barang)}>Delete</Button>
            </td>
        )
    }
}

class TableBarang extends Component {

    constructor(){
        super()
        this.state = {
            data: [],
            cari: "",
            show_alert: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCari = this.handleCari.bind(this)
    }

    componentDidMount(){
        const apiUrl = `http://localhost/kasir/kasir_backend/index.php/${namaTabel}`;

        fetch(apiUrl)
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        data: result
                    });
                },
                (error) => {
                    this.setState({error});
                }
            );
    }

    delete(id){
        const apiUrl = `http://localhost/kasir/kasir_backend/index.php/${namaTabel}/delete_action/${id}`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    window.location.reload()
                },
                (error) => {
                    this.setState({error});
                }
            );
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        });
    }

    handleCari(event){
        event.preventDefault();
        const apiUrl = `http://localhost/kasir/kasir_backend/index.php/${namaTabel}/find_by_other_like/`;

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
                    data: result
                })
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
            .catch((error) => this.setState({error}))
    }

    render() {
        const {error, data} = this.state;

        if(error){
            return(<div className="content">Error: {error.message}</div>);
        }
        return (
            <React.Fragment>
                <Aside/>
                <Header/>
                <div className="content">
                    <h1>Table Barang</h1>
                    {Tambahbarang()}
                    <div>
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
                    </div>

                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <td>Id Barang</td>
                                <td>Nama Barang</td>
                                <td>Harga Jual</td>
                                <td>Harga Beli</td>
                                <td>Stok Barang</td>
                                <td>Create Time</td>
                                {Aksi()}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(d => (
                                <tr key={d.id_barang}>
                                    <td>{d.id_barang}</td>
                                    <td>{d.nama_barang}</td>
                                    <td>Rp {d.harga_jual}</td>
                                    <td>Rp {d.harga_beli}</td>
                                    <td>{d.stok_barang}</td>
                                    <td>{d.create_time}</td>
                                    {Aksiisi(d)}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                
                <Footer/>
            </React.Fragment>
        )
    }
}

export default TableBarang;