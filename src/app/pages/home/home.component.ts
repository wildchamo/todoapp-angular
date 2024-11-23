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
}
