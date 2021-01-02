import { Component } from 'react'

class Main extends Component {
    render() {
        const level = sessionStorage.getItem('level');
        if(!level)
        {
            return(
                window.location.href="http://localhost:3000/login"
            );
        }
        if(level==='Manajer')
        {
            return(
                window.location.href="http://localhost:3000/table_user"
            );
        }
        if(level==='Karyawan')
        {
            return(
                window.location.href="http://localhost:3000/create_penjualan"
            );
        }
    }
}

export default Main;