import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../../models/task";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {SubTask} from "../../../models/subTask";
import {TaskService} from "../../services/task.service";
import {InputTextModule} from "primeng/inputtext";
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-detail-panel',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    InputTextModule,
    Button,
    DropdownModule
  ],
  templateUrl: './detail-panel.component.html',
  styleUrl: './detail-panel.component.scss'
})
export class DetailPanelComponent implements OnInit{
  @Input() task: Task = {};

  editTask = {
    newSubtask: '',
    title: this.task.title,
    status: this.task.status,
    startDate: this.task.startDate,
    dueDate: this.task.dueDate,
    priority: this.task.priority
  }
  priorities:Task['priority'][] = [
    'Critical', 'High', 'Medium', 'Low', 'Trivial'
  ]
  statuses: Task['status'][] = [
    'Completed', 'In-progress', 'Todo'
  ]



  newSubtaskMode = false;
  editMode = false;

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {
    this.editTask.title = this.task.title;
  }

  completeSubtask(subtask: SubTask) {
    console.log('subtask completed')
    subtask.status = 'Completed'
    this.task.subtasks = this.task.subtasks?.map(oldSubtask => {
      if (oldSubtask.title === subtask.title) {
        return subtask;
      }
      return oldSubtask
    })

    this.taskService.updateTask(this.task)
  }

  addSubtask() {
    console.log('add subtask clicked.');
    const subtask: SubTask = {
      title: this.editTask.newSubtask,
      status: 'Todo'
    }
    this.editTask.newSubtask = '';
    this.taskService.addSubtask(this.task, subtask);
    this.toggleNewSubtaskInputs();
  }
  toggleNewSubtaskInputs() {
    this.newSubtaskMode = !this.newSubtaskMode;
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  updateTask() {
    this.toggleEditMode();
    if (this.task) {
      this.task.title = this.editTask.title;
    }
    this.taskService.updateTask(this.task)
  }
  updatePriority() {
    console.log('updated priority')
    if (this.task) {
      this.task.priority = this.editTask.priority;
      this.taskService.updateTask(this.task)
    } else {
      console.log('no task selected')
    }
  }
  updateStatus() {
    console.log('updated status')
    if (this.task) {
      this.task.status = this.editTask.status;
      this.taskService.updateTask(this.task)
    } else {
      console.log('no task selected')
    }
  }
  createTaskFromSubtask(subtask: SubTask) {
    console.log('creating new task...')
    const newTask: Task = {
      title: subtask.title,
      status: "Todo"
    }
    this.taskService.addTask(newTask)
  }
  cancelEditTask() {
    this.toggleEditMode();
    this.editTask = {
      newSubtask: '',
      title: this.task.title,
      status: this.task.status,
      startDate: this.task.startDate,
      dueDate: this.task.dueDate,
      priority: this.task.priority
    }
  }
}
