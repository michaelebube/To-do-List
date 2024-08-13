import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import deleteIcon from '../assets/delete.png'
import  { FaPencilAlt } from 'react-icons/fa'

const TodoItems = ({text, id, isComplete, deleteTask, toggle, openEditPopup}) => {
  return (
    <div className='flex items-center my-3 gap-2 justify-between'>
        <div onClick={() => {toggle(id)}} className='flex flex-1 items-center cursor-pointer '>
            <img src={isComplete ? tick: not_tick} alt="" className='w-5' />
            <p className='text-slate-700 ml-4 text-[14px]' style={{textDecoration: isComplete ? 'line-through' : 'none', textDecorationColor: isComplete ? 'slategray' : 'none'}}>{text}</p>
        </div>

        <div className='flex gap-4 items-center'>
            <FaPencilAlt onClick={() => openEditPopup(id, text)}  className='text-slate-500 cursor-pointer' />
            <img src={deleteIcon} className='w-4' alt="" onClick={() => {deleteTask(id)}} />
        </div>

    </div>
  )
}

export default TodoItems