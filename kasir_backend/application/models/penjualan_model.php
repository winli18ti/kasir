<?php

if(!defined('BASEPATH'))    exit('No direct script access allowed');

class Penjualan_model extends CI_Model
{
    private $table = 'penjualan';
    private $id = 'id_penjualan';
    private $order = 'DESC';

    function __construct()
    {
        parent::__construct();
    }

    function get_all()
    {
        $this->db->order_by($this->id, $this->order);
        return $this->db->get($this->table)->result();
    }

    function get_by_id($id)
    {
        $this->db->where($this->id, $id);
        return $this->db->get($this->table)->row();
    }

    function get_by_other($data)
    {
        $this->db->where($data);
        return $this->db->get($this->table)->row();
    }

    //mencari data menggunakan atribut selain id
    function get_by_other_like($data)
    {
        $this->db->like($data);
        return $this->db->get($this->table)->result();
    }

    function insert($data)
    {
        $this->db->insert($this->table, $data);
    }

    function update($id, $data)
    {
        $this->db->where($this->id, $id);
        $this->db->update($this->table, $data);
    }
    
    function delete($id)
    {
        $this->db->where($this->id, $id);
        $this->db->delete($this->table);
    }

}

?>