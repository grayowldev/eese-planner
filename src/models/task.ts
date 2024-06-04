import {SubTask} from "./subTask";

export interface Task {
  id?: any,
  title?: string,
  status?: 'completed' | 'todo' | 'in-progress',
  priority?: 'A' | 'B' | 'C' | 'D' | 'E',
  subtasks?: SubTask[]

}
