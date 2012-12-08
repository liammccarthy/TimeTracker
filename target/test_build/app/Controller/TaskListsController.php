<?php
App::uses('AppController', 'Controller');

class TaskListsController extends AppController {
// app/Controller/AppController.php
  //...
  public $name = 'TaskLists';
  public $uses = array('Task', 'TaskLists');

  public function index(){
    $this->layout = 'ajax';
    if(isset($_REQUEST['task_id'])){
      $matches = $this->TaskLists->find('all', array(
        'conditions' => array('TaskLists.task_id' => $_REQUEST['task_id'])
      ));
    }else{
      $matches = $this->TaskLists->find('all');
    }
    $data = array();
    foreach($matches as $array){
      array_push($data, $array['TaskLists']);
    }
    $this->set('data', $data);
    $this->render('json_data_echo');

  }
  //GET
  public function view($id = null){
    $this->layout = 'ajax';
    $this->set('data', $this->TaskLists->findByTaskListId($id));
    $this->render('json_data_echo');
  }
  //POST
  public function add(){
    $this->layout = 'ajax';
    $this->TaskLists->create($this->request->data);
    $this->set('data', $this->TaskLists->findByTaskListId($this->TaskLists->getInsertID()));
    $this->render('json_data_echo');
  }
  //PUT or POST
  public function edit($id = null){
    $this->layout = 'ajax';
    $this->TaskLists->save($this->request->data);
    $this->set('data', $this->TaskLists->findByTaskListId($id));
    $this->render('json_data_echo');
  }
  //DELETE
  public function delete($id = null){
    $this->layout = 'ajax';
    $this->set('data', $this->TaskLists->delete($id));
    $this->render('json_data_echo');

  }

}
