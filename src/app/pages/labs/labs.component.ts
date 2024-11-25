import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-labs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  constructor() {
    this.colorCtrl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  welcome = 'jai papa';
  tasks = signal([
    { name: 'Task 1', completed: false },
    { name: 'Task 2', completed: true },
    { name: 'Task 3', completed: false },
  ]);
  name = 'Jose Luis 😈';
  edad = 30;

  colorCtrl = new FormControl();
  witdhCtrl = new FormControl(50, {
    nonNullable: true,
  });
  nameCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(5)],
  });

  holaSignal = signal('jelow Joselin pinguin');

  isDisabled = false;

  img = 'https://www.w3schools.com/howto/img_avatar.png';

  person = signal({
    name: 'Jose Luis',
    age: 30,
  });

  clickHandler() {
    alert('hola!');
  }

  changeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((prevState) => ({ ...prevState, name: newValue }));
    this.holaSignal.set(newValue);
  }

  keyDownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}

//es posible querer que el template no tenga acceso a las variables
