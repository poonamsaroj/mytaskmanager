import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Build portfolio website', category: 'Work', completed: false },
    { id: 2, title: 'Buy groceries', category: 'Personal', completed: true },
  ]);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('Work');
  const [filter, setFilter] = useState('All');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        title: input, 
        category, 
        completed: false 
      }]);
      setInput('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEdit = (id, title) => {
    setEditId(id);
    setEditText(title);
  };

  const saveEdit = (id) => {
    if (editText.trim()) {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, title: editText } : task
      ));
    }
    setEditId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Manager</h1>
          <p className="text-gray-600">Organize your daily tasks efficiently</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.active}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Add Task Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Shopping</option>
            </select>
            <button
              onClick={addTask}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"
            >
              <Plus size={20} />
              Add
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {['All', 'Active', 'Completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No tasks found</p>
              <p className="text-sm">Add a task to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map(task => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 transition ${
                    task.completed
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                      task.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    {task.completed && <Check size={16} className="text-white" />}
                  </button>

                  {editId === task.id ? (
                    <>
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit(task.id)}
                        className="flex-1 px-3 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button
                        onClick={() => saveEdit(task.id)}
                        className="text-green-600 hover:text-green-700 p-1"
                      >
                        <Check size={20} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <X size={20} />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {task.title}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.category === 'Work' ? 'bg-blue-100 text-blue-700' :
                          task.category === 'Personal' ? 'bg-purple-100 text-purple-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {task.category}
                        </span>
                      </div>
                      <button
                        onClick={() => startEdit(task.id, task.title)}
                        className="text-blue-600 hover:text-blue-700 p-1"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}