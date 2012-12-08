<?php
  echo $this->Html->script('backbone/main');
  echo $this->Html->script('backbone/timetracker');
?>
<script type="text/template" id="bucket-item-template">
  <div class = "bucket_div">
    <a href = "#buckets/<%= bucket_id %>" class = "bucket-choice"><%= bucket_name %></a>
  </div>
</script>

<script type="text/template" id="task-item-template">
  <div class = "tasks_div">
  <a href = "#tasks/<%= task_id %>" class = "task-choice"><%= task_name %></a>
  </div>
</script>

<script type="text/template" id="new-task-list-item-header-template">
  <div class = 'time-div'>
    <label>Task Title :</label> <input type="text" id ="new_task_title"/><BR>
    <label>Add time : </label><input type = "text" id = "new_task_time" name = "new_time"/><a href ="#add_time/<%= task_id %>" id ="add_time" name = "add_time">+</a>
  </div>
  <div class = 'task-list'>
    <input type = "text" class = "new_task_desc"/>
  </div>
</script>

<script type="text/template" id="task-list-item-header-template">
  <div class = 'time-div'>
  <label>Task Title :</label> <%= task_name %> <BR>
  <label>Accumulated Time:</label><%= task_time %><BR>
  <label>Add time : </label><input type = "text" id = "new_time" name = "new_time"/><a href ="#add_time/<%= task_id %>" id ="add_time" name = "add_time">+</a>
   <div class = "column-header">Task Details</div>
  </div>
</script>

<script type="text/template" id="task-list-item-template">
  <div class="view">
    <label class = "label"><%= task_desc %></label>
    <a class="destroy"></a>
  </div>
  <input class="edit" type="text" value="<%= task_desc %>" />
</script>

<div class = 'data-column'>
  <div class = "column-header">Bucket List</div>
  <div id ="bucket_div"></div>
</div>
<div class = 'data-column'>
  <div class = "column-header">Task List</div>
  <div id ="tasks_div"></div>
  <div id ="new_task">
    <div class = "tasks_div">
    <a href ="#new_task">New Task</a>
    </div>
  </div>
</div>

<div class = 'info-column'>
<div class = "column-header">Task</div>
  <div id = "item_div">
  <div id ="item_header"></div>
  <div id ="item_list"></div>
</div>