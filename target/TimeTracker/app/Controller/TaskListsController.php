<?php
App::uses('AppController', 'Controller');

class TaskListsController extends AppController {
// app/Controller/AppController.php
  //...
  public $name = 'TaskLists';
  public $uses = array('Task', 'TaskList');

  public function index(){
    $this->layout = 'ajax';
    if(isset($_REQUEST['task_id'])){
      $matches = $this->TaskList->find('all', array(
        'conditions' => array('TaskList.task_id' => $_REQUEST['task_id'])
      ));
    }else{
      $matches = $this->TaskList->find('all');
    }
    $data = array();
    foreach($matches as $array){
      array_push($data, $array['TaskList']);
    }
    $this->set('data', $data);
    $this->render('json_data_echo');

  }
  //GET
  public function view($id = null){
    $this->layout = 'ajax';
    $this->set('data', $this->TaskList->findByTaskListId($id));
    $this->render('json_data_echo');
  }
  //POST
  public function add(){
    $this->layout = 'ajax';
    $this->TaskList->create($this->request->data);
    $this->set('data', $this->TaskList->findByTaskListId($this->TaskList->getInsertID()));
    $this->render('json_data_echo');
  }

  public function get_ajax_data($data){
    return json_decode($data, true);
  }
  //PUT or POST
  public function edit($id = null){
    $this->layout = 'ajax';
    $insert_data = $this->get_ajax_data($this->request->input());
    if($this->TaskList->save($insert_data)){
      $return_data = $this->TaskList->findByTaskListId($id);
      $this->set('data', $return_data['TaskList']);
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
    $this->set('data', $this->TaskList->delete($id));
    $this->render('json_data_echo');

  }

}
