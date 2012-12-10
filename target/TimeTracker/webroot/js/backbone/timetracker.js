//Backbone.emulateHTTP = true;
var CURRENT_BUCKET;

$().ready(function(){

  window.Bucket = Backbone.Model.extend({
    initialize: function(){
      console.log("created Model Bucket");

    },
    urlRoot: "",
    idAttribute: "bucket_id",
    url: function () {
      var base = '/buckets/';
      if ( this.get("bucket_id") ) {
        base =  base + encodeURIComponent(this.id);
      }
      return base;

    },
    get_id: function () {
      return this.get("bucket_id");
    }
  });
  window.Buckets = Backbone.Collection.extend({
    initialize: function(){
      console.log("created Collection Bucket")
    },
    model: Bucket,
    url: "/buckets/"

  });
  window.Task = Backbone.Model.extend({
    initialize: function(){
      console.log("created Model Task");

    },
    urlRoot: "",
    idAttribute: "task_id",
    url: function () {
      var base = '/tasks/';
      if ( this.get("task_id") ) {
        base =  base + encodeURIComponent(this.id);
      }
      return base;
    },
    get_id: function () {
      return this.get("task_id");
    }
  });
  window.Tasks = Backbone.Collection.extend({
    initialize: function(){
      console.log("created Collection Tasks")
    },
    model: Task,
    url: "/tasks/"

  });

  window.TaskList = Backbone.Model.extend({
    initialize: function(){
      console.log("created Model TaskList");
    },
    urlRoot: "",
    idAttribute: "task_list_id",
    url: function () {
      var base = '/task_lists/';
      if ( this.get("task_list_id") ) {
        base =  base + encodeURIComponent(this.id);
      }
      return base;
    },
    get_id: function () {
      return this.get("task_list_id");
    }
  });

  window.TaskLists = Backbone.Collection.extend({
    initialize: function(){
      console.log("created Collection TasksLists")
    },
    model: TaskList,
    url: "/task_lists/"

  });


  window.BucketListView = Backbone.View.extend({
    el: $('#bucket_div'),
    initialize: function(){

      this.model.bind('reset', this.render, this);
      this.model.bind('change', this.render, this);
      this.model.bind('add', this.appendNewBucket, this);
    },
    appendNewBucket: function( bucket){
      this.$el.append(new BucketListItemView({model: bucket}).render());
    },
    render: function(){
      this.clear();
      console.log("BucketListView render");
      _.each(this.model.models, function(bucket){
        this.$el.append(new BucketListItemView({model: bucket}).render())
      }, this);
    },
    clear:function(){
      this.$el.html('');
    }

  });

  window.BucketListItemView = Backbone.View.extend({
    tagName : 'div',
    initialize: function(){
      this.template = _.template($('#bucket-item-template').html());
      this.model.bind('change', this.render(), this);
      this.model.bind('destroy', this.close(), this);
    },
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this.el;
    },
    events: {
      "click .bucket_div" : "selectBucket"
    },
    selectBucket:function(){
      app.navigate('buckets/'+this.model.get("bucket_id"), true);
    }
  });

  window.TaskSelectionView = Backbone.View.extend({
    el: $('#tasks_div'),
    initialize: function(){
      this.model.bind('reset', this.render, this);
      this.model.bind('add', this.appendNewTask, this);
    },
    appendNewTask: function( task){
      this.$el.append(new TaskSelectionItemView({model: task}).render());
    },
    render: function(){
      this.$el.html('');
      _.each(this.model.models, function(task){
        this.$el.append(new TaskSelectionItemView({model: task}).render())
      }, this);
      return this.el;
    }
  });
  window.AppView = Backbone.View.extend({
    el: $('#app'),
    initialize: function(){
      console.log("AppView is created");
    },events:{
      'click .new_tasks_div' : 'newTask'
    },
    newTask:function(event){
      event.preventDefault();
      app.newTask();
    }
  });

  window.TaskSelectionItemView = Backbone.View.extend({
    tagName : 'div',
    initialize: function(){
      this.template = _.template($('#task-item-template').html());
      this.model.bind('change', this.render(), this);
      this.model.bind('destroy', this.close(), this);
    },
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this.el;
    },
    events:{
      "click .tasks_div" : "selectTask"
    },
    selectTask : function(){
      app.navigate('tasks/'+this.model.get("task_id"), true);
    }
  });
  window.ItemView = Backbone.View.extend({
    el: $('#item_header'),
    initialize: function(){
      this.template = _.template($('#task-list-item-header-template').html());
      this.model.bind('reset', this.render, this);
      this.model.bind('change', this.render, this);
    },
    render: function(){
      console.log("render: ItemView");
        this.$el.html(this.template(this.model.toJSON()));
        if(this.model.get('task_name') === ""){
          this.$el.addClass("editing");
        }
    },
    clear_item: function(){
      this.$el.html('');
    },
    events: {
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "closeEdit",
      "keypress .new_time" : "updateTime"
    },
    edit: function(){
      console.log("edit_label called: ItemView");
      $("#task_name_field").addClass("editing");

    },
    clear: function(){
      console.log("clear called: ItemView");
      this.model.clear();
    },
    updateOnEnter: function(e){
      console.log("updateOnEnter called: ItemView");
      if (e.keyCode == 13) this.closeEdit(e);
    },
    closeEdit: function(e){
      console.log("closeEdit called : ItemView");
      var value = e.target.value;
      if (!value) this.clear();
      this.model.save({task_id : $('#task_id').val(), task_name: value});
      $("#task_name_field").removeClass("editing");
      app.showTaskList(CURRENT_BUCKET);
      this.render();

    },
    updateTime: function(e){
      if (e.keyCode == 13){
        var value = parseFloat(e.target.value);
        var accumulated = parseFloat(this.model.get('task_time'));
        var time = value + accumulated;
        this.model.save({task_id : $('#task_id').val(), task_time : time}, {
          success:function(){
            app.ItemView.render();
          }
        });
        if (!value) this.clear();
      }

    }
  });
  window.ItemListView = Backbone.View.extend({
    el: $('#item_list'),
    initialize: function(){
      this.model.bind('reset', this.render, this);
      this.model.bind('change', this.render(), this);

      this.model.bind('add', this.appendNewItem(), this);
    },
    appendNewItem: function( taskLists){
      this.$el.append(new ItemListViewItem({model: taskLists}).render());
    },
    clear_list: function(){
      this.$el.html('');
    },
    render: function(){
      this.$el.html('');
      _.each(this.model.models, function(taskLists){
        this.appendNewItem(taskLists);
      }, this);
      this.$el
      return this.el;
    }
  });

  window.ItemListViewItem = Backbone.View.extend({
    tagName : 'li',
    initialize: function(){
      this.template = _.template($('#task-list-item-template').html());
      this.model.bind('change', this.render(), this);
      this.model.bind('destroy', this.close(), this);
    },
    events: {
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "closeEdit"
    },
    edit: function(){
      console.log("edit_label called: ItemListViewItem");
      this.$el.addClass("editing");
    },
    clear: function(){
      console.log("clear called: ItemListViewItem");
      this.model.clear();
    },
    updateOnEnter: function(e){
      console.log("updateOnEnter called: ItemListViewItem");
      if (e.keyCode == 13) this.closeEdit(e);
    },
    closeEdit: function(e){
      console.log("closeEdit called : ItemListViewItem");
      var value = e.target.value;
      if (!value) this.clear();
      this.model.save({task_desc: value});
      this.$el.removeClass("editing");
      this.render();
    },
    render: function(){
      if(this.model != undefined){
        console.log("render called : ItemListViewItem");
        this.$el.html(this.template(this.model.toJSON()));
        return this.el;
      }
    }
  });

  window.AppRouter = Backbone.Router.extend({
    routes: {
      ""			: "list",
      "buckets/:id" : "showTaskList",
      "tasks/:id" : "showTask"
    },
    initialize:function(){
      this.AppView = new AppView();
    },
    showTask: function(id){
      console.log("showTask called : AppRouter")

      this.loadBucketInfo(id);
      this.task = new Task({task_id : id});
      this.task.fetch();
      this.ItemView = new ItemView({model :   this.task});
      this.taskLists = new TaskLists();
      this.taskLists.fetch({ data: $.param({ task_id: id}) });
      this.ItemListView = new ItemListView({model: this.taskLists });
    },
    list: function() {
      console.log('list Called : AppRouter');
      this.buckets = new Buckets();
      this.BucketListView = new BucketListView({model: this.buckets});
      this.buckets.fetch();
    },
   showTaskList: function(id, save){
      CURRENT_BUCKET = id;
      console.log("showTaskList called : AppRouter");
      this.list();
      if(!save){
        $('#item_header').html('');
        $('#item_list').html('');
      }
      this.tasks = new Tasks();
      this.TaskSelectionView = new TaskSelectionView({model: this.tasks});
      this.tasks.fetch({ data: $.param({ bucket_id: id}) });
    },
    showView: function (selector, view) {
      console.log("showView Called");
      if (this.currentView) this.currentView.close();

      $(selector).html(view.render());
      this.currentView = view;

      return view;
    },
    newTask : function(task){
      console.log("newTask called");
       var task = new Task({bucket_id: CURRENT_BUCKET});
       task.save({}, {
        success: function(){
          console.log(task.toJSON());
          app.navigate('tasks/'+task.get('task_id'), true);
        }
      });
      return false;
    },
    loadBucketInfo: function(id){
      console.log("loadBucketInfo called with " + id + " : AppRouter");
      $.ajax({
        url: '/tasks/get_id/'+id,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
          console.log("Loading all previous information");
          app.showTaskList(data.bucket_id, true);
        },
        error:function(){
            console.log("error");
        }
      });
    }
  });

  var app = new AppRouter();
  Backbone.history.start();

});