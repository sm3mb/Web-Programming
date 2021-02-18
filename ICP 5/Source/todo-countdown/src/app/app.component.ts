import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-countdown';
  selectedDate: any;
  enteredTask: string = '';
  todoList: any[] = [];

  addTask() {
    let obj = {
      name: this.enteredTask,
      status: false
    }
    this.todoList.push(obj);
    this.enteredTask = '';
  }

  removeTask(index: number) {
    this.todoList.splice(index, 1);
  }

  markComplete(index: number) {
    console.log('Double Click@@@@@');
    this.todoList[index].status = true;
  }
}
