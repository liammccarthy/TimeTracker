<?php
class Task extends AppModel {
  public $primaryKey = 'task_id';
  public $belongsTo = array(
    'Bucket' => array(
      'className'    => 'Bucket',
      'foreignKey'   => 'bucket_id'
    ),
    'User' => array(
      'className'    => 'User',
      'foreignKey'   => 'user_id'
    )
  );
  public $hasMany = array(
    'TaskLists' => array(
      'className'  => 'TaskLists',
      'order'      => 'TaskLists.task_list_id DESC'
    )
  );
}
?>