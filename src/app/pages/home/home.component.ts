import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todos.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  todos = signal<Todo[]>([
    { id: this.generateId(), name: 'Task 1', completed: false },
    { id: this.generateId(), name: 'Task 2', completed: true },
    { id: this.generateId(), name: 'Task 3', completed: false },
  ]);

  addTodo(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    const newTodoName = eventTarget.value;

    if (!newTodoName) return;

    const newTodo = {
      name: newTodoName,
      completed: false,
      id: this.generateId(),
    };

    this.todos.update((todos) => [...todos, newTodo]);

    eventTarget.value = '';
  }

  deleteTodo(id: number) {
    this.todos.update((todos) => todos.filter((task) => task.id !== id));
  }

  completeTodo(id: number) {
    console.log(id);
    this.todos.update((todos) =>
      todos.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  generateId() {
    return Math.floor(1000 + Math.random() * 9000);
  }
}
