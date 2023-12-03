import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../static/DrfApiFetch.css'


const DrfApiFetch = () => {
  
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState([])
  const [editedTask, setEditedTask] = useState({id:'', title: ''})
  const [id, setId] = useState(1)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tasks/',{
        headers: {
            'Authorization': 'process.env.REACT_APP_API_KEY'
        }
    })
    .then(res => (setTasks(res.data)))
  },[]) // ブラウザが立ち上がった時のみにするには第２引数を[]にする
  
  const getTask = () => {
    axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`,{
        headers: {
            'Authorization': 'process.env.REACT_APP_API_KEY'
        }})
        .then(res => {setSelectedTask(res.data)})
  }
  


  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`,{
        headers: {
            'Authorization': 'process.env.REACT_APP_API_KEY'
        }})
        .then(res=>{setTasks(tasks.filter(task => task.id !== id)); 
            setSelectedTask([]); 
            if (editedTask.id === id) {  /*ここから3行追加*/
            setEditedTask({ id: "", title: "" });
            }
        })
  }

  const newTask = (task) => {
    const data = {
        title: task.title
    }
    axios.post(`http://127.0.0.1:8000/api/tasks/`, data,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'process.env.REACT_APP_API_KEY'
        }})
        .then(res => {setTasks([...tasks, res.data]); setEditedTask({id:'', title:''})}
        )
  }

  const editTask = (task) => {
    
    axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, task,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'process.env.REACT_APP_API_KEY'
        }})
        .then(res => {setTasks(tasks.map(task => (task.id === editedTask.id ? res.data : task)));
            setEditedTask({id:'', title:''});
        })
  }

  const cancelEditTask = () => {
    setEditedTask({id:'', title:''});
  }
  

  const handleInputChange = () => evt => {
    const value = evt.target.value;
    const name = evt.target.name;
    setEditedTask({...editedTask,[name]:value});
  }

  return (
    <div>
        <ul className='task-list'>
            {
              tasks.map(task => <li key={task.id}><input className='done' type="checkbox" />{task.title} {task.id}
              <div>
                <button onClick={()=>setEditedTask(task)}>
                    <i className='fas fa-pen'></i>
                </button>
                <button onClick={()=>deleteTask(task.id)}>
                    <i className='fas fa-trash-alt'></i>
                </button>
              </div>
              
              </li>)
            }
        </ul>

        <div className='input-area'>
          <p>idを入力してください。</p>
          <input type="number" value={id} onChange={evt=>{(setId(evt.target.value))}} />
          <br />
          <button type='button' onClick={()=>{getTask()}}>Get Task</button>
          <div className="get_task_area">
            <h3>{selectedTask.title} {selectedTask.id}</h3>
          </div>
          {/* <button type='button' onClick={()=>{deleteTask()}}>Delete Task</button> */}
            <div>
              <input type="text" name='title' 
              value={editedTask.title}
              onChange={handleInputChange()}
              placeholder='New task ?'
              required/>
              { editedTask.id ?
              (
              <>
              <button onClick={()=>editTask(editedTask)}>Update</button>
              <button onClick={()=>cancelEditTask()}>Cancel</button>
              </> 
              )
              :
              <button onClick={()=>newTask(editedTask)}>Create</button>
              }
            </div>
          
        </div>
    </div>
  )
}

export default DrfApiFetch