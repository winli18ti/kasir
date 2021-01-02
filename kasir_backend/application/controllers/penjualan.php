<?php

defined('BASEPATH')OR exit('No direct script access allowed');

//require APPPATH.'/libraries/REST_Controller.php';
//use Restserver\Libraries\REST_Controller;

class Penjualan extends CI_Controller
{
    private $model;
    private $id = 'id_penjualan';

    function __construct()
    {
        parent::__construct();
        $this->load->model('Penjualan_model');
        $this->model = $this->Penjualan_model;
    }

    public function index()
    {
        header("Access-Control-Allow-Origin: *");
        $data = $this->model->get_all();
        $this->output->set_content_type('application/json')->set_output(json_encode($data));
    }

    public function find_by_id($id)
    {
        header("Access-Control-Allow-Origin: *");
        $data = $this->model->get_by_id($id);
        $this->output->set_content_type('application/json')->set_output(json_encode($data));
    }

    public function find_by_other()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        
        $formdata = json_decode(file_get_contents('php://input'), true);
        
        if(!empty($formdata))
        {
            $data = $this->model->get_by_other($formdata);

            if($data)   $response = $data;
            else
            {
                $response = array(
                    'status' => 'error',
                    'message' => 'Data tidak ditemukan'
                );
            }
        }
        else    $response = array('status' => 'error');

        $this->output->set_content_type('application/json')->set_output(json_encode($response));
    }

    //mencari data menggunakan atribut selain id
    public function find_by_other_like()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        
        $formdata = json_decode(file_get_contents('php://input'), true);
        
        if(!empty($formdata))
        {
            $data = $this->model->get_by_other_like($formdata);

            if($data)   $response = $data;
            else
            {
                $response = array(
                    'status' => 'error',
                    'message' => 'Data tidak ditemukan'
                );
            }
        }
        else    $response = array('status' => 'error');

        $this->output->set_content_type('application/json')->set_output(json_encode($response));
    }

    public function create_action()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        
        $formdata = json_decode(file_get_contents('php://input'), true);
        
        if(!empty($formdata))
        {
            $this->model->insert($formdata);

            $response = array(
                'status' => 'success',
                'message' => 'Data berhasil ditambahkan'
            );
        }
        else    $response = array('status' => 'error');

        $this->output->set_content_type('application/json')->set_output(json_encode($response));
    }

    public function update_action()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
    
        $formdata = json_decode(file_get_contents('php://input'), true);
        
        if(!empty($formdata))
        {
            $id_data = $formdata[$this->id];
            unset($formdata[$this->id]);
            
            $this->model->update($id_data, $formdata);
        
            $response = array(
                'status' => 'success',
                'message' => 'Data berhasil diupdate'
            );
        }
        else    $response = array('status' => 'error');

        $this->output->set_content_type('application/json')->set_output(json_encode($response));
    }

    public function delete_action($id)
    {
        header("Access-Control-Allow-Origin: *");
        $this->model->delete($id);
        
        $response = array(
            'status' => 'success',
            'message' => 'Data berhasil dihapus'
        );

        $this->output->set_content_type('application/json')->set_output(json_encode($response));
    }
}

?>