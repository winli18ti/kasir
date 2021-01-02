import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

import Aside from "./../template/Aside";
import Header from "./../template/Header";
import Footer from "./../template/Footer";

const namaTabel = "penjualan";

class TablePenjualan extends Component {

    constructor(){
        super()
        this.state = {
            data: []
        }
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

    render() {
        const {error, data} = this.state;

        if(error){
            return(<Container>Error: {error.message}</Container>);
        }
        return (
            <React.Fragment>
                <Aside/>
                <Header/>
                <div className="content">
                    <h1>Table Penjualan</h1>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <td>Id Penjualan</td>
                                <td>Nama Barang</td>
                                <td>Jumlah Barang</td>
                                <td>Total Harga</td>
                                <td>Id User</td>
                                <td>Id Barang</td>
                                <td>Create Time</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(d => (
                                    <tr key={d.id_penjualan}>
                                        <td>{d.id_penjualan}</td>
                                        <td>{d.nama_barang}</td>
                                        <td>{d.jumlah_barang}</td>
                                        <td>Rp {d.total_harga}</td>
                                        <td>{d.id_user}</td>
                                        <td>{d.id_barang}</td>
                                        <td>{d.create_time}</td>
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

export default TablePenjualan;