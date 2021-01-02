import React from "react";
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'

const level = sessionStorage.getItem('level')
const nama_user = sessionStorage.getItem('nama_user')
const id_user = sessionStorage.getItem('id_user')

function Menu(){
    if(level === "Manajer"){
        return (
            <Nav className="flex-column">
                <Nav.Item><Link to="/table_user">Table User</Link></Nav.Item>
                <Nav.Item><Link to="/table_supplier">Table Supplier</Link></Nav.Item>
                <Nav.Item><Link to="/table_barang">Table Barang</Link></Nav.Item>
                <Nav.Item><Link to="/table_pembelian">Table Pembelian</Link></Nav.Item>
                <Nav.Item><Link to="/table_penjualan">Table Penjualan</Link></Nav.Item>
                <Nav.Item><Link to="/create_penjualan">Jual</Link></Nav.Item>
            </Nav>
        )
    }
    if(level === "Karyawan"){
        return (
            <Nav className="flex-column">
                <Nav.Item><Link to={`/update_user/${id_user}`}>Ubah Profil</Link></Nav.Item>
                <Nav.Item><Link to="/table_barang">Table Barang</Link></Nav.Item>
                <Nav.Item><Link to="/create_penjualan">Jual</Link></Nav.Item>
            </Nav>
        )
    }
}

function Aside(){
    return(
        <aside className="sidebar">
            <h4>Menu</h4>
            <Nav className="flex-column">
                <Nav.Item>Nama: {nama_user}</Nav.Item>
                <Nav.Item>Level: {level}</Nav.Item>
            </Nav>
            <Menu/>
        </aside>
    );
}

export default Aside;