import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todos.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  todos = signal<Todo[]>([
    { id: this.generateId(), name: 'Task 1', completed: false },
    { id: this.generateId(), name: 'Task 2', completed: true },
    { id: this.generateId(), name: 'Task 3', completed: false },
  ]);

  newTodoCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  addTodo() {
    const controller = this.newTodoCtrl;
    const newValue = controller.value.trim();
    if (newValue) {
      const newTodo = {
        name: newValue,
        completed: false,
        id: this.generateId(),
      };

      this.todos.update((todos) => [...todos, newTodo]);
      this.newTodoCtrl.setValue('');
    } else {
      alert('Please enter a task');
      controller.setValue('');
    }
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

  incompleteTodos() {
    const leftTodos = this.todos().filter((task) => !task.completed)?.length;

    return leftTodos;
  }
}
