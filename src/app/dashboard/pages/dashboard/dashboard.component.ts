import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../data-access/dashboard.service';
import { Observable } from 'rxjs';
import { IBoard, ITask } from '../../utils/models/board';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  board: Observable<IBoard[]>;
  taskPayload!: ITask;

  constructor(
    private fb: FormBuilder,
    private _dashboard: DashboardService
  ) {
    this.board = _dashboard.state$;
  }

  taskForm!: FormGroup;

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      taskDescription: [''],
      dueDate: ['', Validators.required]
    })
  }

  editTask(item: ITask) {
    this.taskForm.patchValue({
      taskName: item.name,
      taskDescription: item.description,
      dueDate: item.dueDate
    });
  }


  saveTask(task?: ITask) {
    let {valid, value} = this.taskForm;

    if (task?.id) {
      this.taskPayload = {
        id: task.id,
        name: value.taskName,
        description: value.taskDescription,
        dueDate: value.dueDate,
        category: task.category
      };
    } else {
      const payload: ITask = {
        id: 0,
        name: value.taskName,
        description: value.taskDescription,
        dueDate: value.dueDate,
        category: "open",
      }
      this.taskPayload = payload;
    }

    this._dashboard.addTask(this.taskPayload);
  }


  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
