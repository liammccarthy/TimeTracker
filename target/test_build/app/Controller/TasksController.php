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
 /* public function new_task($bucket_id){
    $this->layout = 'ajax';

    );
    $this->Task->create($array);
    $matches =  $this->Task->findByTaskId($this->Task->getInsertID());
    $this->set('data',$matches['Task']);
    $this->render('json_data_echo');
  }*/
  //GET
  public function get_ajax_data($data){
    return json_decode($data, true);
  }
  public function view($id = null){
    $this->layout = 'ajax';
    $matches =$this->Task->findByTaskId($id);
    $this->set('data', $matches['Task'] );
    $this->render('json_data_echo');
  }
  //POST
  public function add(){
    $this->layout = 'ajax';
    $ajax_data = $this->get_ajax_data($this->request->input());
    $insert_data = array(
        'bucket_id' => $ajax_data['bucket_id'],
        'user_id'   => $this->Auth->user('id'),
        'task_time' => 0.0,
        'task_name' => ''
      );
    $this->Task->create();
    if($this->Task->save($insert_data)){
      $matches = $this->Task->findByTaskId($this->Task->getInsertID());
      $matches = $matches['Task'];
    }else{
      $matches = $ajax_data;
      $matches['status'] = 'failure';
    }
    $this->set('data', $matches);
    $this->render('json_data_echo');
  }
  //PUT or POST
  public function edit($id = null){
    $this->layout = 'ajax';
    $insert_data = $this->get_ajax_data($this->request->input());
    if($this->Task->save($insert_data)){
      $return_data = $this->Task->findByTaskId($id);
      $this->set('data', $return_data['Task']);
    }else{
      $data = array();
      $data['status'] = 'NOPE';
      $this->set('data',$data);
    }
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
