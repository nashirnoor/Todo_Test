import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            setEditTodoId(null);
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <h2>Todo List</h2>
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            {editTodoId === todo.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={todo.title}
                                        onChange={(e) => handleEditTodo(todo.id, { title: e.target.value })}
                                    />
                                    <button onClick={() => setEditTodoId(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    {todo.title}
                                    <button onClick={() => setEditTodoId(todo.id)}>Edit</button>
                                    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                <button onClick={handleCreateTodo}>Add Todo</button>
            </div>
        </div>
    );
};

export default Home;
