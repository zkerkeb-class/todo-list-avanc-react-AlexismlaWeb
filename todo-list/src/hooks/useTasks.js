import { useState } from 'react';

function useTasks () {
    const [state, setState] = useState({
        taches: [
            { id: 1, title: 'Faire la vaisselle', fait: false },
            { id: 2, title: 'Sortir le chien', fait: true },
            { id: 3, title: 'Faire les courses', fait: false },
        ],
    });

    const addTask = (task) => {
        setState({
            ...state, // Conserver le reste de l'état
            taches: [...state.taches, task], // Mettre à jour la liste des tâches
        });
    };

    const supprimerTache = (taskId) => {
        const nouvellesTaches = state.taches.filter(task => task.id !== taskId);
        setState({
            ...state, // Conserver le reste de l'état
            taches: nouvellesTaches, // Mettre à jour la liste des tâches
        });
    };

    const updateTask = (updatedTask) => {
        const updatedTaches = state.taches.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        );
        setState({
            ...state, // Conserver le reste de l'état
            taches: updatedTaches, // Mettre à jour la liste des tâches
        });
    };

    return {
        state,
        addTask,
        setState,
        updateTask,
        supprimerTache,
    };
}

export default useTasks;
