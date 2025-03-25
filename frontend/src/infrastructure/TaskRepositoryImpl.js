// infrastructure/TaskRepositoryImpl.js
import { Task } from '../domain/entities/Task';

export class TaskRepositoryImpl {
    async getTasks() {
        // Lógica para obtener tareas de la API
        const response = await fetch('/api/tasks');
        const data = await response.json();
        return data.map((task) => new Task(task.id, task.title, task.completed));
    }

    async createTask(task) {
        // Lógica para crear una tarea en la API
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
        });
        
    }
    
}
