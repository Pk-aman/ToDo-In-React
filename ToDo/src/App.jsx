import { useState } from 'react'
import './App.css'
import { TodoProvider } from './context/TodoContext'
import { useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  //todo is not msg heare todo is object with whole todo details in arrays
  const [todos, setTodos] = useState([])

  //todo : string msg
  const addTodo = (todo) => {
    // const ctodo = {
    //   id: Data.now(),
    //   todo: todo,
    // }
    // setTodos((prevTodo) => [ctodo, ...prevTodo])
    
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  
  }

  const updataTodo = (id, todo) => {
    setTodos((prev) => prev.map((eachtodo) => (eachtodo.id == id ? todo : eachtodo)))

    // prev.map((eachVal) => {
    //   if(eachVal.id === id){
    //     //do Something
    //   }
    //   else {
    //     //dp something
    //   }
    // })
  }


  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))

  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((eachprev) => eachprev.id === id ? {...eachprev, completed: !eachprev.completed} : eachprev ))
  }

  useEffect(() => {
    
    const storeTodos = JSON.parse(localStorage.getItem("todos"))

    if(storeTodos && storeTodos.length > 0) {
      setTodos(storeTodos)
    }

    console.log(typeof [1,2,3])
  }, []) 

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    console.log(todos)
  }, [todos])
  
  

  return (
    <TodoProvider value={{todos, updataTodo, addTodo, removeTodo, toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
                {/* Todo form goes here */} 
                <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
                {
                  todos.map((todo) => (
                    <div key={todo.id} className='w-full'>
                      <TodoItem todo={todo}/>
                    </div>
                  ))
                }
            </div>
        </div>
    </div>    
    </TodoProvider>
  )
}

export default App
