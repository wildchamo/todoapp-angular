import { Component, computed, signal } from '@angular/core';
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

  filter = signal<'all' | 'completed' | 'pending'>('all');

  todoByFilter = computed(() => {
    const filter = this.filter();
    const todos = this.todos();

    if (filter === 'pending') {
      return todos.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return todos.filter((task) => task.completed);
    }

    return todos;
  });

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

  updateTodoEditingMode(id: number) {
    this.todos.update((prevState) => {
      return prevState.map((todo) => {
        if (todo.id === id && !todo.completed) {
          return {
            ...todo,
            editing: true,
          };
        } else {
          return { ...todo, editing: false };
        }
      });
    });
  }

  editTodo(id: number, e: Event) {
    const event = e.target as HTMLInputElement;
    const newValue = event.value.trim();

    if (!newValue) {
      return;
    } else {
      this.todos.update((prevState) => {
        return prevState.map((todo) => {
          if (todo.id === id && !todo.completed) {
            return {
              ...todo,
              editing: false,
              name: newValue,
            };
          } else {
            return { ...todo };
          }
        });
      });
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

  changeFilter(filter: 'all' | 'completed' | 'pending') {
    this.filter.set(filter);
  }
}
