import {useState} from 'react';
let App=()=>{

  let [data,setdata]=useState({"uid":"","todo":"","topic":"","deadline":""})
  let [task,settask]=useState([])
  let [comp,setcomp]=useState([])
  let [ind,setind]=useState()
  let [f,setf]=useState(true)
let datafun=(e)=>{
setdata({...data,[e.target.name]:e.target.value})

}
let add=()=>{
settask([...task,data])
setdata({"uid":"","todo":"","topic":"","deadline":""})


console.log(task)
}
let del=(id)=>{
task.splice(id,1)
settask([...task])
}
let edit=(id)=>{
  setind(id)
  setf(false)
  setdata(task[id])
  

}
let upd=()=>{
  setf(true)
  task[ind]=data
  settask([...task])
  setdata({"uid":"","todo":"","topic":"","deadline":""})


}
let compdata=(id)=>{
setcomp([...comp,task[id]])
del(id)


}
let undo=(id)=>{

settask([...task,comp[id]])
comp.splice(id,1)
setcomp([...comp])
}

return(
  <div>
  <input type='number' onChange={datafun} name='uid' value={data.uid} placeholder='enter uid'/>
  <input type='text' onChange={datafun} name='todo' value={data.todo} placeholder='enter task'/>
  <input type='text' onChange={datafun} name='topic' value={data.topic} placeholder='enter topic'/>
  <input type='date' onChange={datafun} name='deadline' value={data.deadline} />
  
  {f&& <button onClick={add}>add</button>}
{!f&& <button onClick={upd}>update</button>}

  <div>
<table border={1}>
<thead>
<tr><th>uid</th><th>task</th><th>topic</th><th>deadline</th></tr>
</thead>
<tbody>
{
  task.map((item,index)=>{
    return(
      
      <tr key={index}><td>{item.uid}</td><td>{item.todo}</td><td>{item.topic}</td>
      <td>{item.deadline}</td>
      <td><button onClick={()=>del(index)}>del</button>
      <button onClick={()=>edit(index)}>edit</button></td>
      <button onClick={()=>compdata(index)}>completed</button>
      
      
      </tr>

    )
      })
}
</tbody>
</table>
  </div>
  <br/><br/>
  <div>
  <h2>completed tasks</h2>
  <table border={1}>
  <thead>
<tr><th>uid</th><th>task</th><th>topic</th><th>deadline</th></tr>
</thead>
{
  comp.map((item,index)=>{

    return(
      <tbody>
        <tr><td>{item.uid}</td><td>{item.todo}</td><td>{item.topic}</td>
      <td>{item.deadline}</td><td><button onClick={()=>undo(index)}>undo</button></td></tr>
      
      </tbody>
      
    )
  })
}
  </table>
  </div>
  </div>
)

}
export default App;