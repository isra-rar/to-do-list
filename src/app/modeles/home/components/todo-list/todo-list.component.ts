import { Component, DoCheck, OnInit } from '@angular/core';
import { TaskList } from '../../model/task-list';
import { first, last } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public taskList: Array<TaskList> =  JSON.parse(localStorage.getItem("list") || '[]');

  constructor() { }

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList() {
    const confirme = window.confirm("Você deseja realmente deletar tudo?");
    if (confirme) this.taskList = [];
  }

  public setEmitTaskList(event: string) {
    this.taskList.push({task: event, checked: false})
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirme = window.confirm("Task está vazia, deseja deletar?");
      
      if(confirme) this.deleteItemTaskList(index);
    }
  }

  public setLocalStorage() {
    if (this.taskList) {
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }
}
