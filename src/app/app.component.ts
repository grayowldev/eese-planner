import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ButtonModule} from "primeng/button";
import {TaskCardComponent} from "./ui/task-card/task-card.component";
import {InputTextModule} from "primeng/inputtext";
import {TaskService} from "./services/task.service";
import {Task} from "../models/task";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {SubTask} from "../models/subTask";
import {DetailPanelComponent} from "./ui/detail-panel/detail-panel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, TaskCardComponent, InputTextModule, NgForOf, FormsModule, NgIf, DropdownModule, DetailPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  newTask: string = '';
  priority: Task["priority"] = 'Medium'
  title = 'eese';
  selectedTask: Task = {};
  tasks: Task[] = [];
  priorities:Task['priority'][] = [
    'Critical', 'High', 'Medium', 'Low', 'Trivial']
  detailSidebarVisible = false;
  productsVisible = false;
  subTaskVisible = false;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe((task:any) => {
      this.tasks = task;
      this.sortTasks();
    })
  }
  sortTasks() {
    this.tasks.sort((a,b) => {
      let finalPriority = 0;
      if (
        (a.status === 'Todo' && b.status === 'Completed') || (a.status == null && b.status === 'Completed')) {
        finalPriority -= 2;
        // return -1;
      } else if ((b.status === 'Completed' && a.status === 'Todo') || (b.status === 'Completed' && a.status === null)) {
        finalPriority += 2;
        // return 1;
      } else {
        // if (a.priority === undefined) {
        //   a.priority = 'C';
        // }
        // if (b.priority === undefined) {
        //   b.priority ='C';
        // }
        // if (a.priority < b.priority) {
        //   return -1;
        // } else if (a.priority > b.priority) {
        //   return 1;
        // } else {
        //   return 0;
        // }
      }
      if (a.priority === undefined) {
        a.priority = 'Medium';
      }
      if (b.priority === undefined) {
        b.priority ='Medium';
      }
      if (a.priority < b.priority) {
        finalPriority -= 1;
        // return -1;
      } else if (a.priority > b.priority) {
        finalPriority += 1;
        // return 1;
      }
      // else {
      //
      //   // return 0;
      // }
      return finalPriority
    });
  }
  addTask() {
    const task: Task = {};
    task.title = this.newTask;
    task.status = 'Todo';
    task.priority = 'Medium';
    task.subtasks = [];
    this.taskService.addTask(task)
    this.newTask = ''
  }
  showDetails(task: Task) {
    this.priority = task.priority;
    this.detailSidebarVisible = true;
    this.selectedTask = task;
  }
  hideDetails() {
    this.detailSidebarVisible = false;
  }
}

