<?php
App::uses('AppController', 'Controller');

class TasksController extends AppController {
// app/Controller/AppController.php
  //...
  public $name = 'Tasks';
  public $uses = array('Task', 'TaskLists');

  public function index(){
    $this->layout = 'ajax';
    if(isset($_REQUEST['bucket_id'])){
      $matches = $this->Task->find('all', array(
        'conditions' => array(
          'Task.bucket_id' => $_REQUEST['bucket_id'])
      ));
    }else{
      $matches = $this->Task->find('all');
    }
    $data = array();
    foreach($matches as $array){
      if($array['Task']['user_id'] == $this->Auth->user('id')){
        array_push($data, $array['Task']);
      }
    }
    $this->set('data', $data);
    $this->render('json_data_echo');

  }
  //GET
  public function view($id = null){
    $this->layout = 'ajax';
    $matches =$this->Task->findByTaskId($id);
    $this->set('data', $matches['Task'] );
    $this->render('json_data_echo');
  }
  //POST
  public function add(){
    $this->layout = 'ajax';
    $this->Task->create($this->request->data);
    $this->set('data', $this->Task->findByTaskId($this->Task->getInsertID()));
    $this->render('json_data_echo');
  }
  //PUT or POST
  public function edit($id = null){
    $this->layout = 'ajax';
    $this->Task->save($this->request->data);
    $this->set('data', $this->Task->findByTaskId($id));
    $this->render('json_data_echo');
  }
  //DELETE
  public function delete($id = null){
    $this->layout = 'ajax';
    $this->set('data', $this->Task->delete($id));
    $this->render('json_data_echo');

  }

  public function get_id($id = null){
    $this->layout = 'ajax';
    $matches = $this->Task->findByTaskId($id);
    $this->set('data', array('bucket_id' => $matches['Bucket']['bucket_id']));
    $this->render('json_data_echo');
  }

}
