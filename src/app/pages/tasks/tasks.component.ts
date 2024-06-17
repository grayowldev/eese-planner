import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {NgForOf, NgIf} from "@angular/common";
import {TaskCardComponent} from "../../ui/task-card/task-card.component";
import {Task} from "../../../models/task";
import {TaskService} from "../../services/task.service";
import {DetailPanelComponent} from "../../ui/detail-panel/detail-panel.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
    imports: [
        Button,
        FormsModule,
        InputTextModule,
        NgForOf,
        TaskCardComponent,
        DetailPanelComponent,
        NgIf
    ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  newTask: string = '';
  tasks: Task[] = [];
  priority: Task["priority"] = 'Medium';
  selectedTask: Task = {};
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
  addTask() {
    const task: Task = {};
    task.title = this.newTask;
    task.status = 'Todo';
    task.priority = 'Medium';
    task.subtasks = [];
    this.taskService.addTask(task)
    this.newTask = ''
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
          return finalPriority
      });
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
