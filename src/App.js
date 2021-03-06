import './App.css';
import React, { Component, components } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing : null
    }
  }
  componentDidMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }
  onGeneData = () => {
    var tasks = [
      {
        id: this.geneID(),
        name: 'Học lập trình',
        status: true
      },
      {
        id: this.geneID(),
        name: 'Đi bơi',
        status: false
      },
      {
        id: this.geneID(),
        name: 'Chạy thể dục',
        status: true
      }
    ];

    this.setState(
      {
        tasks: tasks
      }
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  geneID() {
    return this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4();
  }

  onToggleForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    })
  }
  onCloseForm = () =>{
     this.setState({
        isDisplayForm : false 
     })
  }
  // van giu da ta 
  onSubmit = (data) =>{
    var {tasks } = this.state; // var tasks = this.state.tasks
    if(data.id === '')
    {
      data.id = this.geneID();
      tasks.push(data);
    }
    else
    {
      var index = this.findIndex(data.id);
      tasks[index] =data;
    }
    this.setState({
       tasks :tasks
    });
    localStorage.setItem('tasks' ,JSON.stringify(tasks));
  }

  onUpdateStatus = (id) =>{
    var {tasks} = this.state;
    var index  = this.findIndex(id);
    if(index !=-1)
    {
        tasks[index].status = ! tasks[index].status;
        this.setState (
          {
             tasks :tasks
          }
        )
    }
    localStorage.setItem('tasks' , JSON.stringify(tasks));
  }
  findIndex =(id) =>{
    var {tasks} = this.state ;
    var result  = -1 ;
    tasks.forEach((task, index) =>{
        if (task.id  === id)
        {
            result =index;
        }
    })
    return result;
  }
  DeleteTask =(id) =>{
     var {tasks} = this.state;
     var index  = this.findIndex(id);
     console.log(index);
     if(index  != -1)
     {
         tasks.splice(index , 1);
         this.setState(
           {
             tasks :tasks
           }
         )
     }
     localStorage.setItem('tasks' , JSON.stringify(tasks));
     this.onCloseForm();
  }
  OnUpdate = (id) =>{
      // tim task và luu vao editing
      var {tasks} = this.state;
      var index = this.findIndex(id);
      var taskEditing = tasks[index];
      this.setState({
        taskEditing : taskEditing
      });
      this.onShowForm();
  }
  onShowForm = () =>{
      this.setState(
        {
          isDisplayForm : true
        }
      ) 
  }
  render() {
    var tasks = this.state.tasks;
    var isDisplayForm = this.state.isDisplayForm;
    var taskEditing = this.state.taskEditing;
    var elemTaskForm = isDisplayForm ? <TaskForm
    task ={taskEditing}
    onSubmit ={this.onSubmit}
    onClick={this.onCloseForm}/> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            {elemTaskForm}
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            <button type="button" className="btn btn-primary"
              onClick={this.onGeneData}
            >Genedatas
            </button>
            <div className="row mt-15">
              <Control></Control>
            </div>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList tasks={tasks}  
                 onUpdateStatus  = {this.onUpdateStatus}
                 DeleteTask = {this.DeleteTask}
                 OnUpdate = {this.OnUpdate} 
                 ></TaskList>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
