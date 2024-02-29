import React, { useState } from 'react'

const AppBody = () => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [taskComplete, setTaskComplete] = useState(false);

  const [isUpdatingTask, setIsUpdatingTask] = useState({status: false, index: null});

  const handleAddTask = () => {
    if(task.length!==0 && date.length!==0){

      if(isUpdatingTask.status && isUpdatingTask.index!==null){
        const updatedTask = {task:task, date:date, taskComplete: taskComplete};
        setTaskList([...taskList.slice(0,isUpdatingTask.index), updatedTask,  ...taskList.slice(isUpdatingTask.index+1)]);
        setIsUpdatingTask({status: false, index: null});
      }

      else{
        const newtask = {task: task, date: date, taskComplete: false};
        setTaskList([...taskList, newtask]);
        console.log(taskList);
        
      }
        setTask('');
        setDate('');
    
    }

    return;
  }


  //deleting task
  const handleDeleteTask = (index) => {
    console.log('delete was clicked')
    const newTaskList = taskList.filter((task, i) => i!== index);
    setTaskList(newTaskList);
  }


  return (
    <div className='appBody'>
      <div className="inputArea">
        <div className="inputField">
          <input type="text" placeholder="Enter a new task" onChange={(e) => setTask(e.target.value)} value={task} />
        </div>
        <div className="dateInput">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        {
          isUpdatingTask.status?(
          <button onClick={handleAddTask}>Update task #{isUpdatingTask.index}</button>)
          :
          (<button onClick={handleAddTask}>Add task</button>)
        }
      </div>
    {
        taskList.length>0&&(
            <div className="taskList">
                <table>
                    <thead>
                    <tr>
                        <th id='tsk-clm taskIndex'>#</th> 
                        <th id='tsk-clm taskTodo'>Task</th>
                        <th id='tsk-clm taskdeadline'>Date</th>
                        <th id='tsk-clm taskdeadline'>Status</th>
                        <th id='tsk-clm taskAction'>Actions</th>
                    </tr>
                    </thead>

                    {  taskList.map((item, index) => (
                    <tbody>
                        <tr>
                            <td id='tsk-clm'>{index}</td>
                            <td id='tsk-clm'>{item.task}</td> 
                            <td id='tsk-clm'>{item.date}</td>
                            <td>
                              <span>Completed</span><input type="checkbox" name="taskComplete" id="taskComplets" onChange={(e)=>{
                                setTaskList([...taskList.slice(0,index), {task: item.task, date: item.date, taskComplete: e.target.checked},  ...taskList.slice(index+1)]);
                                setTaskComplete(e.target.checked)
                                }} 
                                value={taskList[index].taskComplete}/>
                            </td>
                            <td id='tsk-clm'>
                                <button id='edit' onDoubleClick={()=>{
                                  setDate('')  
                                  setTask('')
                                  setIsUpdatingTask({status: false, index: null})}
                                } 
                                  onClick={()=>{
                                  setIsUpdatingTask({status: true, index: index});
                                   console.log('Edit was clicked for item', item)
                                   setDate(item.date)
                                   setTask(item.task)
                                 
                                }
                                  }>Edit</button>
                                <button id='delete' onClick={()=>handleDeleteTask(index)}>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                        )
                    )}
                </table>
            </div>
        )
    }
    </div>
  );
}


export default AppBody