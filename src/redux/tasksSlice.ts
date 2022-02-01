import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { getKeyByValue, sort } from '../utils';
import { RootState } from './store';

export enum ETaskSorting {
  label = 'По названию',
  status = 'По состоянию',
  priority = 'По важности',
}

export enum EPriority {
  high = 0,
  medium = 1,
  low = 2,
  none = 3,
}

export type TSorting = {
  sorting: ETaskSorting;
  direction: 1 | -1;
};

export type TTask = {
  id: string;
  title: string;
  completed: boolean;
  archived?: boolean;
  priority?: boolean;
  created?: string;
  deadline?: string;
  spended?: string;
};

interface ITasksSlice {
  tasks: TTask[];
  sorting: TSorting;
}

const initialState: ITasksSlice = {
  tasks: [],
  sorting: {
    sorting: ETaskSorting.label,
    direction: 1,
  },
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Действия с задачами
    addTask(state, action: PayloadAction<TTask>) {
      const task: TTask = {
        ...action.payload,
        created: moment().format('DD.MM.YYYY HH:mm:ss'),
      };

      state.tasks = [...state.tasks, task];
    },
    editTask(state, action: PayloadAction<TTask>) {
      const task = action.payload;
      state.tasks = state.tasks.map((t) => (t.id === task.id ? task : t));
    },
    archiveTask(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.tasks = state.tasks.map((t) =>
        t.id === id ? { ...t, archived: !t.archived } : t,
      );
    },
    deleteTask(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },

    // Действия с сортировкой
    changeTaskSorting(state, action: PayloadAction<TSorting>) {
      const { sorting, direction } = action.payload;
      state.sorting = { sorting, direction };
    },
  },
});

export const { addTask, archiveTask, deleteTask, editTask, changeTaskSorting } =
  tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
