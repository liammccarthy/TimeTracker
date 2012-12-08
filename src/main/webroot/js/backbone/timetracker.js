Backbone.emulateHTTP = true;
var CURRENT_BUCKET;
var CURRENT_TASK;

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
    },
    events:{
      "click .new-task" : "newTask"
    },
    newTask:function(){
      app.navigate('tasks/new', true);
      return false;
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
      "blur .edit"      : "close"
    },
    edit: function(){
      console.log("edit_label called");
      this.$el.addClass("editing");
    },
    clear: function(){
      console.log("clear called");
      this.model.clear();
    },
    updateOnEnter: function(e){
      console.log("updateOnEnter called");
      if (e.keyCode == 13) this.close();
    },
    close: function(){
      console.log("close called");
  /*    var value = this.input.val();
      if (!value) this.clear();
      this.model.save({title: value});*/
      this.$el.removeClass("editing");
    },
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this.el;
    }
  });

  window.AppRouter = Backbone.Router.extend({
    routes: {
      ""			: "list",
      "buckets/:id" : "showTaskList",
      "tasks/:id" : "showTask",
      "tasks/new/" : "newTask"
    },
    showTask: function(id){
      CURRENT_TASK = id;
      console.log("showTask called : AppRouter")

      app.loadBucketInfo(id);
      var task = new Task({task_id : id});
      task.fetch();
      this.ItemView = new ItemView({model : task});
      var taskLists = new TaskLists();
      taskLists.fetch({ data: $.param({ task_id: id}) });
      this.ItemListView = new ItemListView({model: taskLists });
    },
    list: function() {
      console.log('list Called : AppRouter');
      var buckets = new Buckets();
      app.BucketListView = new BucketListView({model: buckets});
      buckets.fetch();
    },
   showTaskList: function(id, save){
      CURRENT_BUCKET = id;
      console.log("showTaskList called : AppRouter");
      app.list();
      if(!save){
        $('#item_header').html('');
        $('#item_list').html('');
      }
      var tasks = new Tasks();
      this.TaskSelectionView = new TaskSelectionView({model: tasks});
      tasks.fetch({ data: $.param({ bucket_id: id}) });
    },
    newTask : function(){
      console.log("newTask called");
      app.showTaskList(CURRENT_BUCKET);

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