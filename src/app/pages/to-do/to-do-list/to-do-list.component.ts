import { Component } from '@angular/core';

import { iToDoItem } from './interfaces/to-do-item.interface';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do-list.component.html',
  styleUrls: [ './to-do-list.component.css' ]
})
export class ToDoListComponent {

  toDoItems: iToDoItem[] = [
    {
      title: 'Shopping',
      content: 'Buy Milk',
      createdAt: new Date()
    },
    {
      title: 'Car',
      content: 'Take to MOT',
      createdAt: new Date()
    }
  ];

  toDoItem: iToDoItem = {
    title: '',
    content: '',
    createdAt: null
  };

  onSubmit(): void {

    let item: iToDoItem = 
      {
        title: this.toDoItem.title,
        content: this.toDoItem.content,
        createdAt: new Date()
      };

    this.toDoItems.push(item);

    this.toDoItem.title = '';
    this.toDoItem.content = '';

  }

  deleteToDoItem(item: iToDoItem) {

    this.toDoItems = this.toDoItems.filter(toDoItem => item !== toDoItem);

    // this.toDoItems = this.toDoItems.filter(toDoItem => {

    //   if (item === toDoItem) {
    //     return false;
    //   }

    //   return true;

    //   // if (item.title === toDoItem.title && item.content === toDoItem.content) {
    //   //   return false;
    //   // }

    //   // return true;
    // });
    
  }
}