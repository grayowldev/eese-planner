import { Routes } from '@angular/router';
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {TasksComponent} from "./pages/tasks/tasks.component";

export const routes: Routes = [
  {
    path: '',
    component: TasksComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  }
];
