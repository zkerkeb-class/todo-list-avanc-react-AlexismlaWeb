import React, { useState, useMemo, useEffect } from 'react';
import useTasks from '../hooks/useTasks';
import '../TachesList.css';
function TacheList() {
    const { state, addTask, setState, updateTask, supprimerTache } = useTasks([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('toutes');

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const parsedTasks = JSON.parse(savedTasks);
            setState({ taches: parsedTasks });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state.taches));
    }, [state.taches]);

    const handleAddTask = () => {
        const task = {
            id: Date.now(),
            title: newTask,
            fait: false,
        };
        addTask(task);
        setNewTask('');
    };

    const handleToggleTaskCompletion = (taskId) => {
        const taskToUpdate = state.taches.find(task => task.id === taskId);
        if (taskToUpdate) {
            updateTask({
                ...taskToUpdate,
                fait: !taskToUpdate.fait,
            });
        }
    };

    const handleDeleteTask = (taskId) => {
        supprimerTache(taskId);
    };

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'terminees':
                return state.taches.filter(task => task.fait);
            case 'nonTerminees':
                return state.taches.filter(task => !task.fait);
            default: // 'toutes'
                return state.taches;
        }
    }, [state.taches, filter]);

    return (
        <div className="tache-list">
            <h1 className="title">Ma Todo List</h1>
            <div>
                <div className="filter-buttons">
                    <button className="filter-button" onClick={() => setFilter('toutes')}>Toutes</button>
                    <button className="filter-button" onClick={() => setFilter('terminees')}>Terminées</button>
                    <button className="filter-button" onClick={() => setFilter('nonTerminees')}>Non Terminées</button>
                </div>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Ajouter une nouvelle tâche"
                    className="task-input"
                />
                <button className="add-button" onClick={handleAddTask}>Ajouter</button>
            </div>
            <ul className="task-list">
                {filteredTasks.length > 0 ? filteredTasks.map(task => (
                    <li key={task.id} className="task-item">
                        <span
                            className={`task-title ${task.fait ? 'completed' : ''}`}
                        >
                            {task.title}
                        </span>
                        <button className="action-button" onClick={() => handleToggleTaskCompletion(task.id)}>
                            {task.fait ? 'Annuler' : 'Terminer'}
                        </button>
                        <button className="action-button delete-button" onClick={() => handleDeleteTask(task.id)}>Supprimer</button>
                    </li>
                )) : <li>Aucune tâche</li>}
            </ul>
        </div>
    );
}

export default TacheList;
