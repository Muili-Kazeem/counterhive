import { Injectable } from '@angular/core';
import { IBoard, ITask } from '../utils/models/board';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  state: IBoard[] = [
    {
      name: "open",
      title: "Open",
      tasks: [
        { id: 1, name: "Open Card 1", description: "Thise card is just open for now", category: "open" },
        { id: 2, name: "Open Card 2", description: "Thise card is just open for now", category: "open" },
        { id: 3, name: "Open Card 3", description: "Thise card is just open for now", category: "open" }
      ]
    },
    {
      name: "pending",
      title: "Pending",
      tasks: [
        { id: 1, name: "Pending Card 1 ", description: "Thise card is just pending for now", category: "pending" },
        { id: 2, name: "Pending Card 2", description: "Thise card is just pending for now", category: "pending" },
        { id: 3, name: "Pending Card 3", description: "Thise card is just pending for now", category: "pending" }
      ]
    },
    {
      name: "progress",
      title: "In Progress",
      tasks: [
        { id: 1, name: "Progress Card 2", description: "Thise card is just in progress for now", category: "progress" },
        { id: 2, name: "Progress Card 1", description: "Thise card is just in progress for now", category: "progress" },
        { id: 3, name: "Progress Card 3", description: "Thise card is just in progress for now", category: "progress" }
      ]
    },
    {
      name: "complete",
      title: "Completed",
      tasks: [
        { id: 1, name: "Completed Card 3 ", description: "Thise card is just completed for now", category: "complete" },
        { id: 2, name: "Completed Card 2", description: "Thise card is just completed for now", category: "complete" },
        { id: 3, name: "Completed Card 1", description: "Thise card is just completed for now", category: "complete" }
      ]
    },
  ]

  private stateSubject = new BehaviorSubject<IBoard[]>(this.state);
  state$ = this.stateSubject.asObservable();

  emitStateSubject(board: IBoard[]) {
    this.stateSubject.next(board);
  }

  constructor() { }

  addTask(task: ITask) {

    if (task.id === 0) {
      this.state = this.state.map(column => {
        if (column.name === 'open') {
          task.id = Math.random().toString(36).substring(2, 15);
          column.tasks.push(task);
        }
        return column;
      })
    } else {
      this.state = this.state.map(column => {
        if (column.name === task.category) {
          column.tasks.forEach((element, index) => {
            if(element.id === task.id) {
                column.tasks[index] = task;
            }
        });
        }
        return column;
      })
    }
    console.log(this.state);
    this.emitStateSubject(this.state);
  }
}
