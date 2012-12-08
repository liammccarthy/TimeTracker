<?php
App::uses('AppController', 'Controller');

class BucketsController extends AppController {
// app/Controller/AppController.php
  //...
  public $name = 'Buckets';
  public $uses = array('Bucket', 'Company');
  //GET
  public function index(){
    $this->layout = 'ajax';
    $matches = $this->Bucket->find('all');
    $data = array();
    foreach($matches as $array){
      array_push($data, $array['Bucket']);
    }
    $this->set('data', $data);
    $this->render('json_data_echo');

  }

  //GET
  public function view($id = null){
    $this->layout = 'ajax';
    $this->set('data', $this->Bucket->findByBucketId($id));
    $this->render('json_data_echo');
  }
  //POST
  public function add(){
    $this->layout = 'ajax';
    $this->Bucket->create($this->request->data);
    $this->set('data', $this->Bucket->findByBucketId($this->Bucket->getInsertID()));
    $this->render('json_data_echo');
  }
  //PUT or POST
  public function edit($id = null){
    $this->layout = 'ajax';
    $this->Bucket->save($this->request->data);
    $this->set('data', $this->Bucket->findByBucketId($id));
    $this->render('json_data_echo');
  }
  //DELETE
  public function delete($id = null){
    $this->layout = 'ajax';
    $this->set('data', $this->Bucket->delete($id));
    $this->render('json_data_echo');

  }

}
