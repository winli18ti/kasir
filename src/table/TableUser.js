import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import Aside from "./../template/Aside";
import Header from "./../template/Header";
import Footer from "./../template/Footer";

const namaTabel = "user";

class TableUser extends Component {

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
                    <h1>Table User</h1>
                    <Link to={`/create_${namaTabel}`}><Button>Tambah User</Button></Link>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <td>Id User</td>
                                <td>Nama User</td>
                                <td>Username</td>
                                <td>Password</td>
                                <td>Level</td>
                                <td>Create Time</td>
                                <td>Aksi</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(d => (
                                <tr key={d.id_user}>
                                    <td>{d.id_user}</td>
                                    <td>{d.nama_user}</td>
                                    <td>{d.username}</td>
                                    <td>{d.password}</td>
                                    <td>{d.level}</td>
                                    <td>{d.create_time}</td>
                                    <td>
                                        <Link to={`/update_${namaTabel}/${d.id_user}`}>
                                            <Button variant="secondary">Update</Button>
                                        </Link>
                                        <Button variant="danger" onClick={() => this.delete(d.id_user)}>Delete</Button>
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

export default TableUser;

