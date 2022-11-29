import { Task } from "../Task";

export interface ITaskState {
  tasks: Task[]
}

export interface ITaskGetter { }
export interface ITaskAction { 
  addCloneTask
}