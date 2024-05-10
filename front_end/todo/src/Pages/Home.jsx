import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { authAxios } from '../auth/api';
const Home = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v/todos/');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleCreateTodo = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/v/todos/', {
                title: newTodo
            });
            setTodos([...todos, response.data]);
            setNewTodo('');
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    const handleEditTodo = async (id, updatedTodo) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/v/todos/${id}/`, updatedTodo);
            setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
            // setEditTodoId(null);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/v/todos/${id}/`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="p-4 border rounded-md">
                <h2 className="text-lg font-semibold mb-4">Todo List</h2>
                <ul className="space-y-2">
                    {todos.map(todo => (
                        <li key={todo.id} className="flex justify-between items-center">
                            {editTodoId === todo.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={todo.title}
                                        onChange={(e) => handleEditTodo(todo.id, { title: e.target.value })}
                                        className="border rounded-md py-1 px-2 mr-2"
                                    />
                                    <button className="bg-gray-200 py-1 px-2 rounded-md" onClick={() => setEditTodoId(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <div className='flex justify-between w-full'>

                                        <span className="mr-2 text-white">{todo.title}</span>
                                        <div>
                                            <button className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2" onClick={() => setEditTodoId(todo.id)}>Edit</button>
                                            <button className="bg-red-500 text-white py-1 px-2 rounded-md" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                        </div>
                                    </div>


                                </>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="mt-4">
                    <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} className="border rounded-md py-1 px-2 mr-2" />
                    <button onClick={handleCreateTodo} className="bg-green-500 text-white py-1 px-2 rounded-md">Add Todo</button>
                </div>
                <div className='w-full flex items-center justify-center mt-2'>

                <button className='w-26 h- bg-yellow-400 p-2 rounded-md' onClick={()=>authAxios.post('/cusom_logout')}>logout</button>
                </div>
            </div>
        </div>

    );
};

export default Home;
