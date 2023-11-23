import { Component } from '@angular/core';

interface TodoItem {
  description: string;
  timestamp: Date;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})  
export class TodoComponent {
  todoList: TodoItem[] = [];

  addTodoItem(description: string): void {
    if (description) {
      this.todoList.push({ description, timestamp: new Date() });
    }
  }

  removeTodoItem(itemToRemove: TodoItem): void {
    this.todoList = this.todoList.filter(item => item !== itemToRemove);
  }


  getElapsedTime(item: TodoItem): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - item.timestamp.getTime()) / 1000);
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
    const hours = Math.floor(minutes / 60);
    return `${hours} hours ago`;
  }
}
