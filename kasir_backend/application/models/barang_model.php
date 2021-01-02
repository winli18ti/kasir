<?php

if(!defined('BASEPATH'))    exit('No direct script access allowed');

class Barang_model extends CI_Model
{
    private $table = 'barang';
    private $id = 'id_barang';
    private $order = 'ASC';

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

    function update_stok($id, $data)
    {
        $this->db->where($this->id, $id);
        if($data['stok_barang']>0)
        {
            $this->db->set('stok_barang', sprintf('stok_barang+%d',$data['stok_barang']), FALSE);
        }
        else
        {
            $data['stok_barang'] *= -1;
            $this->db->set('stok_barang', sprintf('stok_barang-%d',$data['stok_barang']), FALSE);
        }
        $this->db->update($this->table);
    }
    
    function delete($id)
    {
        $this->db->where($this->id, $id);
        $this->db->delete($this->table);
    }

}

?>