import { Injectable } from '@angular/core';
import {FirestoreService} from "./firestore.service";
import {Observable} from "rxjs";
import { Task } from '../../models/task';
import {SubTask} from "../../models/subTask";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = []

  constructor(private firestoreService: FirestoreService) { }

  getTasks(): Observable<any[]> {
    return this.firestoreService.getCollectionDataWithIds('tasks')
  }

  addTask(task: Task): void {
    console.log('Adding task!')
    this.tasks.push(task);
    this.firestoreService.addDocumentData('tasks', task)
  }

  updateTask(task: Task) {
    this.firestoreService.updateDocument('tasks', task.id, task)
  }

  removeTask(id: string) {
    console.log('id to remove ', id)
    this.firestoreService.removeDocument('tasks', id)
  }

  addSubtask(selectedTask: Task, subtask: SubTask) {
    console.log('in task service.')
    if (!selectedTask.subtasks) {
      selectedTask.subtasks = []
    }
    selectedTask.subtasks?.push(subtask)
    console.log(selectedTask)
    this.firestoreService.updateDocument('tasks', selectedTask.id, selectedTask)
  }
  updateSubtask() {

  }

  removeSubtask() {

  }
}
