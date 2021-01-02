import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

//npm install react-router-dom
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";

import CreateUser from "./create/CreateUser";
import CreateSupplier from "./create/CreateSupplier";
import CreateBarang from "./create/CreateBarang";
import CreatePembelian from "./create/CreatePembelian";
import CreatePenjualan from "./create/CreatePenjualan";

import TableUser from "./table/TableUser";
import TableSupplier from "./table/TableSupplier";
import TableBarang from "./table/TableBarang";
import TablePembelian from "./table/TablePembelian";
import TablePenjualan from "./table/TablePenjualan";

import UpdateUser from "./update/UpdateUser";
import UpdateSupplier from "./update/UpdateSupplier";
import UpdateBarang from "./update/UpdateBarang";

import Login from "./template/Login";
import Logout from "./template/Logout";
import Main from "./template/Main";
import Forbidden from './template/Forbidden';

function App(){
  const level = sessionStorage.getItem('level')

  if(!level)
  {
    return(
      <Router>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/login" exact component={Login}/>
          <Route component={Forbidden}/>
        </Switch>
      </Router>
    )
  }

  if(level === "Manajer")
  {
    return(
      <Router>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/logout" exact component={Logout}/>
  
          <Route path="/create_user" exact component={CreateUser}/>
          <Route path="/create_barang" exact component={CreateBarang}/>
          <Route path="/create_supplier" exact component={CreateSupplier}/>
          <Route path="/create_pembelian/:id" exact component={CreatePembelian}/>
          <Route path="/create_penjualan" exact component={CreatePenjualan}/>
  
          <Route path="/table_user" exact component={TableUser}/>
          <Route path="/table_barang" exact component={TableBarang}/>
          <Route path="/table_supplier" exact component={TableSupplier}/>
          <Route path="/table_pembelian" exact component={TablePembelian}/>
          <Route path="/table_penjualan" exact component={TablePenjualan}/>
  
          <Route path="/update_user/:id" exact component={UpdateUser}/>
          <Route path="/update_barang/:id" exact component={UpdateBarang}/>
          <Route path="/update_supplier/:id" exact component={UpdateSupplier}/>
  
          <Route component={Forbidden}/>
        </Switch>
      </Router>
    )
  }

  if(level === "Karyawan")
  {
    return(
      <Router>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/logout" exact component={Logout}/>

          <Route path="/create_penjualan" exact component={CreatePenjualan}/>
          <Route path="/table_barang" exact component={TableBarang}/>
  
          <Route path="/update_user/:id" exact component={UpdateUser}/>
  
          <Route component={Forbidden}/>
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
