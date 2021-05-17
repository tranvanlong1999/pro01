import React, { Component } from 'react';

class Taskitem extends Component {
    

    onUpdateStatus =() =>{
        this.props.onUpdateStatus(this.props.task.id);
    }
    DeleteTask = () =>{
        this.props.DeleteTask(this.props.task.id);
    }
    OnUpdate = () =>{
        this.props.OnUpdate(this.props.task.id);
    }
    render() {
        var {task ,index} = this.props;
        return (
            <tr>
                <td>{index +1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span
                    className={task.status === true ? 'label label-success' : 'label label-danger'}
                    onClick ={this.onUpdateStatus}
                    >
                        {task.status === true ? 'kich hoat' : 'ẩn'}
                       
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" class="btn btn-warning"
                        onClick = {this.OnUpdate}
                    >
                        <span className="fa fa-pencil mr-5"></span>Sửa
                                      </button>
                                      &nbsp;
                                      <button type="button" class="btn btn-danger"
                                        onClick={this.DeleteTask}
                                      >
                        <span className="fa fa-trash mr-5"></span>Xóa
                                      </button>
                </td>
            </tr>
        );
    }
}
export default Taskitem;