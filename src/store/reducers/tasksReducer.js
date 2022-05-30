import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from '../types';

// Initial state of Tasks is declared
const initialState = {
  loading: false,
  tasks: [],
  error: "",
  reset: false,
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
      }

    case TASKS_FAILURE:
      return {
        loading: false,
        error: action.payload,
        tasks: [],
      }

    // case 'TASKS_RESET':
    //   return {
    //     ...state,
    //     reset: true,
    //   }
    default:
      return state
  }
}