import React from 'react'
import './todos.css'
import { useEffect } from 'react';
import { useState } from 'react'
import { RiDeleteBin2Line } from "react-icons/ri";

    // Get items to LocalStorage
const getLocalItems = ()=>{
    const list = localStorage.getItem('todosList');
    if(list){
        return JSON.parse(localStorage.getItem('todosList')) 
    }else{
        return [];
    }
}
const Todos = () => {
    const [title,setTitle] = useState('')
    const [allTodos,setAllTodos] = useState(getLocalItems())
    const [submitToggle,setSubmitToggle] = useState(true)
    const [isEditItem,setIsEditItem] = useState(null)

    const addTodo = ()=>{
        if(!title){
            alert("Add todo")
        }else if(title && !submitToggle){
            setAllTodos(allTodos.map((e)=>{
                if(e.id===isEditItem){
                    return {...e,title:title}
                }
                return e;
            }))
            setSubmitToggle(true);
            setTitle('')
            setIsEditItem(null)
        }
        else{
            const newTodo = {id: new Date().getTime().toString(),title:title}
            setAllTodos([...allTodos,newTodo])
            setTitle("")
        }
    }

    const removeTodo = (index)=>{
       const newAllTodos =  allTodos.filter((e)=>{
            return index!==e.id;
        })
        setAllTodos(newAllTodos)
    }
    const removeAllTodos = ()=>{
        setAllTodos([])
        
    }
    const editTodo =(id)=>{
        const editItem = allTodos.find((e)=>{
            return e.id===id;
        })
        console.log(editItem)

        setTitle(editItem.title);
        setSubmitToggle(false)
        setIsEditItem(id)
    }
    // Set items to LocalStorage
    useEffect(()=>{
        localStorage.setItem('todosList',JSON.stringify(allTodos))
    },[allTodos]);
  return (
    <>
    <div className='d-flex align-items-center justify-content-center flex-column'>
        <img src="notes.png" width="100" alt="" />
        <h3 className='text-light'>Add your todos list here ✌️</h3>
            <div>
                <input className='input-control' name='title' id='title' onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='✍️ Add item...'/>
                {submitToggle?<button onClick={addTodo} className="mx-0 butn bg-light" type='submit'>➕</button>:
                <button onClick={addTodo} className="mx-0 butn bg-light" type='submit'>Edit</button>}
            </div>
      {
        allTodos.map((element,ind)=>{
            return   (  
            <div className='mt-5 eachItem'>        
            <h3 className='m-20'> <span className='mt-2'>{element.title} </span>
            <span>
                <button className='bg-butn butn mt-0' id={element.id} onClick={()=>removeTodo(element.id)}><RiDeleteBin2Line/></button>
                <button className='bg-butn butn mt-0' id={element.id} onClick={()=>editTodo(element.id)}>Edit</button>
                </span></h3>
            </div>)
        })
        }
      <button className=" mt-4 btn btn-light " onClick={removeAllTodos}>CLEAR ALL</button>
    </div>
    </>
  )
}

export default Todos
// JSON.parse(data) : converts string  data into objects
// JSON.stringify(data): converts object to string