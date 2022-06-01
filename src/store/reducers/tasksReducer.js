import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE, TASKS_CREATED } from '../types';

// Initial state of Tasks is declared
const initialState = {
  loading: false,
  tasks: [],
  error: "",
  success: false,
};

// tasksReducer manages Tasks state in each action
// each action updates global states
export const tasksReducer = (state = initialState, action) => {
  switch(action.type) {
    case TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      }

    case TASKS_SUCCESS:
      return {
        loading: false,
        error: "",
        tasks: action.payload,
        success: false,
      }

    case TASKS_FAILURE:
      return {
        loading: false,
        error: action.payload,
        tasks: [],
      }

    case TASKS_CREATED:
      return {
        ...state,
        success: true,
      }

    default:
      return state
  }
}