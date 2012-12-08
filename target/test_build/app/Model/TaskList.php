<?php
class TaskList extends AppModel {
  public $primaryKey = 'task_list_id';
  public $belongsTo = 'Task';
}
?>