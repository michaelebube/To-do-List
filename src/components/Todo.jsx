import React, { useState, useRef, useEffect } from 'react';
import todoIcon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';
import DatePopUp from './DatePopUp';
import DateFilterPopup from './DateFilterPopup';

const Todo = () => {
  const [todoList, setTodoList] = useState(localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : []);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [newText, setNewText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date
  const [showAddButton, setShowAddButton] = useState(false); // Track Add button visibility
  const [filteredDate, setFilteredDate] = useState(null);

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === '' || !selectedDate) {
      return; // Prevent adding a task without text or date
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      date: selectedDate, // Save selected date to the task
    };

    setTodoList((prevList) => [...prevList, newTodo]);
    inputRef.current.value = '';
    setSelectedDate(null); // Reset date after adding task
    setShowAddButton(false); // Hide Add button after adding
  };

  const deleteTask = (id) => {
    setTodoList((todoList) => todoList.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isComplete: !todo.isComplete,
          };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(todoList));
  }, [todoList]);

  const clearBtn = () => {
    setTodoList([]);
  };

  const openEditPopup = (id, text) => {
    setIsEditing(true);
    setEditTaskId(id);
    setNewText(text);
  };

  const closeEditPopup = () => {
    setIsEditing(false);
    setEditTaskId(null);
    setNewText('');
  };

  const handleEditChange = (e) => {
    setNewText(e.target.value);
  };

  const saveEdit = () => {
    setTodoList((prevList) =>
      prevList.map((task) =>
        task.id === editTaskId ? { ...task, text: newText } : task
      )
    );
    closeEditPopup();
  };

  const groupedTodoList = todoList.reduce((acc, task) => {
    const taskDate = new Date(task.date).toDateString();
    if (!acc[taskDate]) {
      acc[taskDate] = [];
    }
    acc[taskDate].push(task);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedTodoList).sort((a, b) => new Date(a) - new Date(b));

  // Filtered todo list based on the selected date
  const filteredGroupedTodoList = filteredDate
  ? Object.keys(groupedTodoList)
      .filter(date => new Date(date).toDateString() === new Date(filteredDate).toDateString())
      .reduce((acc, date) => {
        if (groupedTodoList[date].length > 0) {  // 
          acc[date] = groupedTodoList[date];     // 
        }
        return acc;
      }, {})
  : groupedTodoList;


  return (
    <>
      <div className='bg-backColor place-self-center w-11/12 max-w-lg flex flex-col px-9 py-4 h-[550px] rounded-xl relative overflow-y-auto overflow-x-hidden'>

        {/* Title */}
        <div className='sticky top-0 z-10 bg-backColor'>
          <div className='relative flex justify-between items-center w-[590px] mt-5'>
            <div className='flex items-center gap-[6px]'>
              <img src={todoIcon} alt="" style={{ width: 25, height: 25 }} />
              <h1 className='text-[26px] font-semibold'>TaskFlow</h1>
            </div>
            <DateFilterPopup
              filteredDate={filteredDate}
              setFilteredDate={setFilteredDate}
            />
          </div>

          {/* Input */}
          <div className='relative w-full mt-4'>
            <input
              ref={inputRef}
              type="text"
              placeholder='Add task'
              className='bg-gray-200 rounded-full w-full h-14 pl-6 pr-[100px] placeholder:text-gray-400'
            />
            {showAddButton && (
              <button
                onClick={add}
                className="absolute top-0 right-0 h-14 px-6 bg-rose-400 text-white rounded-full text-lg"
              >
                ADD +
              </button>
            )}
          </div>

          <div className='mt-2'>
            <DatePopUp
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setShowAddButton={setShowAddButton}
            />
          </div>
        </div>

        {/* Todo List */}
        <div className='mb-5'>
          {sortedDates.map(date => (
            <div key={date} className="mt-4">
              <h2 className="font-semibold text-[15px]">{date}</h2>
              {filteredGroupedTodoList[date] && filteredGroupedTodoList[date].map((item) => (
                <TodoItems
                  key={item.id}
                  text={item.text}
                  id={item.id}
                  isComplete={item.isComplete}
                  deleteTask={deleteTask}
                  toggle={toggle}
                  openEditPopup={() => openEditPopup(item.id, item.text)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Clear Button */}
        <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 rounded-full z-20'>
          <button onClick={clearBtn} className={`text-[16px] bg-rose-400 rounded-full px-4 py-[6px] text-white ${todoList.length === 0 ? 'hidden' : 'block'}`}>
            Clear All
          </button>
        </div>

      </div>

      {/* Edit Popup */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
            <input
              type="text"
              value={newText}
              onChange={handleEditChange}
              className="border p-2 w-full mb-4 rounded-lg"
            />
            <div className="flex gap-2">
              <button onClick={closeEditPopup} className="bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={saveEdit} className="bg-rose-400 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
