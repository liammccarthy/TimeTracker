<?php
class TaskList extends AppModel {
  public $primaryKey = 'task_list_id';
  public $belongsTo = array('Task' => array(
  'className' => 'Task',
  'foreignKey' => 'task_id'
));
}
?>