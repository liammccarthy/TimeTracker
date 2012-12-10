<?php
  echo $this->Html->script('backbone/main');
  echo $this->Html->script('backbone/timetracker');
?>
<script type="text/template" id="bucket-item-template">
  <div class = "bucket_div">
    <label><%= bucket_name %></label>
  </div>
</script>

<script type="text/template" id="task-item-template">
  <div class = "tasks_div">
  <input type = "hidden" id = "task_list_id" value = "<%= task_id %>"/>
  <label><%= task_name %></label>
  </div>
</script>

<script type="text/template" id="task-list-item-header-template">
  <div id = 'task_info_div'>
    <li id = "task_name_field">
      <input type = "hidden" id = "task_id" value ="<%= task_id %>"/>
      <div class="view">
        <label>Task Title :</label>
        <label class = "label"><%= task_name %></label>
        <a class="destroy"></a>
      </div>
      <input class="edit" type="text" id ="task_title"  value="<%= task_name %>" />
    </li>

  <label>Accumulated Time:</label><input type = "text" disabled="disabled"  class="accumulated_time" value ="<%= task_time %>"/><BR>
  <label>Add time : </label><input type = "text" class = "new_time"/>
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
<div id = "app">
  <div class = 'data-column'>
    <div class = "column-header">Bucket List</div>
    <div id ="bucket_div"></div>
  </div>
  <div class = 'data-column'>
    <div class = "column-header">Task List</div>
    <div id ="tasks_div"></div>
    <div id = "new_task_div" class = "new_tasks_div"><label>New Task</label></div>
  </div>

  <div class = 'info-column'>
  <div class = "column-header">Task</div>
    <div id = "item_div">
    <div id ="item_header"></div>
    <div id ="item_list"></div>
  </div>
</div>