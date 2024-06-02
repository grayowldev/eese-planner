import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../../models/task";
import {TaskService} from "../../services/task.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'task-card',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent implements OnInit{
  isChecked = false;
  icon: "check_box_outline_blank" | "check_box" = 'check_box_outline_blank';
  @Input() task: Task = {};

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    if (this.task.status == 'completed') {
      this.isChecked = true;
      this.icon = 'check_box';
    } else {
      this.isChecked = false;
      this.icon = 'check_box_outline_blank';
    }
  }

  onTaskChecked(event: any) {
    console.log(event)
    this.isChecked = !this.isChecked;
    this.icon = this.isChecked ? 'check_box' : 'check_box_outline_blank';
    this.updateTask(this.isChecked)
  }
  updateTask(isChecked: boolean) {
    this.task.status = isChecked ? 'completed' : 'todo';
    this.taskService.updateTask(this.task)
  }
  removeTask() {
    console.log('remove clicked')
    this.taskService.removeTask(this.task.id)
  }
}