import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  welcome = 'jai papa';
  tasks = signal([
    { name: 'Task 1', completed: false },
    { name: 'Task 2', completed: true },
    { name: 'Task 3', completed: false },
  ]);
  name = 'Jose Luis 😈';
  edad = 30;

  holaSignal = signal('jelow Joselin pinguin');

  isDisabled = false;

  img = 'https://www.w3schools.com/howto/img_avatar.png';

  person = {
    name: 'Jose Luis',
    age: 30,
  };

  clickHandler() {
    alert('hola!');
  }

  changeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.holaSignal.set(newValue);
  }

  keyDownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}

//es posible querer que el template no tenga acceso a las variables