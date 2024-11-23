import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  todos = signal([
    { name: 'Task 1', completed: false },
    { name: 'Task 2', completed: true },
    { name: 'Task 3', completed: false },
  ]);

  addTodo(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    const newTodoName = eventTarget.value;

    if (!newTodoName) return;

    const newTodo = { name: newTodoName, completed: false };
    this.todos.update((todos) => [...todos, newTodo]);

    eventTarget.value = '';
  }

  deleteTodo(index: number) {
    this.todos.update((todos) =>
      todos.filter((task, position) => position !== index)
    );
  }
}
