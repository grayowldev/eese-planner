import {SubTask} from "./subTask";

export interface Task {
  id?: any,
  title?: string,
  description?: string,
  status?: 'Completed' | 'Todo' | 'In-progress' | 'completed' | 'todo' | 'in-progress',
  priority?: 'Critical' | 'High' | 'Medium' | 'Low' | 'Trivial',
  subtasks?: SubTask[]
  startDate?: Date,
  dueDate?: Date
  tags?: string[]

}
