<?php
class Bucket extends AppModel {
  public $belongsTo = 'Company';
  public $primaryKey = 'bucket_id';
  public $hasMany = array('Task' => array(
                'className'  => 'Task',
                'order'      => 'Task.task_id DESC'
                ));
}
?>