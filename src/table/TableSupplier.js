import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import Aside from "./../template/Aside";
import Header from "./../template/Header";
import Footer from "./../template/Footer";

const namaTabel = "supplier";

class TableSupplier extends Component {

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
                    <h1>Table Supplier</h1>
                    <Link to={`/create_${namaTabel}`}><Button>Tambah Supplier</Button></Link>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <td>Id Supplier</td>
                                <td>Nama Supplier</td>
                                <td>Alamat Supplier</td>
                                <td>No HP</td>
                                <td>Nama Bank</td>
                                <td>No Rekening</td>
                                <td>Atas Nama</td>
                                <td>Create Time</td>
                                <td>Aksi</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(d => (
                                    <tr key={d.id_supplier}>
                                        <td>{d.id_supplier}</td>
                                        <td>{d.nama_supplier}</td>
                                        <td>{d.alamat_supplier}</td>
                                        <td>{d.no_hp}</td>
                                        <td>{d.nama_bank}</td>
                                        <td>{d.no_rekening}</td>
                                        <td>{d.atas_nama}</td>
                                        <td>{d.create_time}</td>
                                        <td>
                                            <Link to={`/update_${namaTabel}/${d.id_supplier}`}>
                                                <Button variant="secondary">Update</Button>
                                            </Link>
                                            <Button variant="danger" onClick={() => this.delete(d.id_supplier)}>Delete</Button>
                                        </td>
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

export default TableSupplier;