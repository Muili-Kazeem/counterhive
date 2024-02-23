export interface IBoard {
  name: string;
  title: string;
  tasks: ITask[];
}

export interface ITask {
  id: string | number;
  name: string;
  description: string;
  dueDate?: Date;
  category: string;
}
