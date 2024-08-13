import React from 'react'
import Todo from './components/Todo'
import BgImage from './assets/bg-todo.jpg'

const BgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}

const App = () => {
  return (
    <div style={BgStyle} className='relative overflow-x-hidden grid py-4  h-screen'>
      <div className='bg-black opacity-80 absolute inset-0'></div>
        <Todo />
    </div>
  )
}

export default App