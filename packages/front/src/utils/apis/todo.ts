import { AxiosRequestConfig } from 'axios';
import useSWR from 'swr';

import { useCallback } from 'react';

import {
  requestDelete,
  requestGet,
  requestPost,
  requestPut,
} from 'utils/apis/axios';

import {
  Todo,
  TodoArchiveRequest,
  TodoChangeOrderRequest,
  TodoCreateRequest,
  TodoFinishRequest,
  TodoUndoRequest,
  TodoUpdateRequest,
} from 'types/todo';

interface TodoGetOptions {
  finished?: boolean;
  archived?: boolean;
}

type TodoResponse = Omit<Todo, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

const convertTodoResponse = (data: TodoResponse): Todo => ({
  ...data,
  createdAt: new Date(data.createdAt),
  updatedAt: new Date(data.updatedAt),
});

export const getTodos = async (
  endpoint: string,
  options: AxiosRequestConfig<TodoGetOptions>,
) => {
  const { data } = await requestGet<TodoResponse[]>(endpoint, options);
  return data.map(convertTodoResponse);
};

export const useAllTodos = (options?: TodoGetOptions) => {
  const { data, error, mutate } = useSWR(
    [
      '/todos',
      {
        params: {
          ...options,
        },
      },
    ],
    getTodos,
  );

  const refetchAllTodos = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    todos: data,
    error,
    isLoading: !data && !error,
    refetchAllTodos,
  };
};

export const createTodo = async (todo: TodoCreateRequest): Promise<Todo> => {
  const { data } = await requestPost<TodoResponse, TodoCreateRequest>(
    '/todos',
    todo,
  );
  return convertTodoResponse(data);
};

export const updateTodo = async (
  todoId: number,
  todo: TodoUpdateRequest,
): Promise<Todo> => {
  const { data } = await requestPut<TodoResponse, TodoCreateRequest>(
    `/todos/${todoId}`,
    todo,
  );
  return convertTodoResponse(data);
};

export const finishTodo = async (todoId: number): Promise<Todo> => {
  const { data } = await requestPut<TodoResponse, TodoFinishRequest>(
    `/todos/finish`,
    {
      id: todoId,
    },
  );
  return convertTodoResponse(data);
};

export const archiveTodo = async (todoId: number): Promise<Todo> => {
  const { data } = await requestPut<TodoResponse, TodoArchiveRequest>(
    `/todos/archive`,
    {
      id: todoId,
    },
  );
  return convertTodoResponse(data);
};

export const undoTodo = async (todoId: number): Promise<Todo> => {
  const { data } = await requestPut<TodoResponse, TodoUndoRequest>(
    `/todos/undo`,
    {
      id: todoId,
    },
  );
  return convertTodoResponse(data);
};

export const deleteTodo = async (todoId: number) => {
  await requestDelete(`/todos/${todoId}`);
};

export const changeTodoOrder = async (request: TodoChangeOrderRequest) => {
  const { data } = await requestPut<string, TodoChangeOrderRequest>(
    '/todos/change_order',
    request,
  );
  return data;
};
