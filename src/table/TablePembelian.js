import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'

import Aside from "./../template/Aside";
import Header from "./../template/Header";
import Footer from "./../template/Footer";

const namaTabel = "pembelian";

class TablePembelian extends Component {

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
            return(<div className="content">Error: {error.message}</div>);
        }
        return (
            <React.Fragment>
                <Aside/>
                <Header/>
                <div className="content">
                    <h1>Table Pembelian</h1>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <td>Id Pembelian</td>
                                <td>Nama Barang</td>
                                <td>Jumlah Barang</td>
                                <td>Total Harga</td>
                                <td>Id Supplier</td>
                                <td>Id Barang</td>
                                <td>Create Time</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(d => (
                                    <tr key={d.id_pembelian}>
                                        <td>{d.id_pembelian}</td>
                                        <td>{d.nama_barang}</td>
                                        <td>{d.jumlah_barang}</td>
                                        <td>Rp {d.total_harga}</td>
                                        <td>{d.id_supplier}</td>
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

export default TablePembelian;