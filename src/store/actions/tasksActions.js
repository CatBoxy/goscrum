import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE, TASKS_CREATED } from '../types';

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

// first action to dispatch in every req
export const tasksRequest = () => ({
  type: TASKS_REQUEST,
})

// if everything goes ok dispatch this action
// recieves data from a req, returns type and data as payload
export const tasksSuccess = data => ({
  type: TASKS_SUCCESS,
  payload: data,
})

export const tasksCreated = () => ({
  type: TASKS_CREATED,
})

// if error in req, dispatch this action
// returns error in payload
export const taskFailure = error => ({
  type: TASKS_FAILURE,
  payload: error,
})

export const getTasks = path => dispatch => {
  dispatch(tasksRequest())
  fetch(`${API_ENDPOINT}task/${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("token")
    },
  })
    .then(response => response.json())
    .then(data => dispatch(tasksSuccess(data.result)))
    .catch(error => dispatch(taskFailure(error)))
}

export const deleteTask = id => dispatch => {
  dispatch(tasksRequest())
  fetch(`${API_ENDPOINT}task/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("token")
    },
  })
    .then(response => response.json())
    .then(() => dispatch(getTasks("")))
    .catch(error => dispatch(taskFailure(error)))
}

export const editTaskStatus = data => dispatch => {
  const statusArray = ["NEW", "IN PROGRESS", "FINISHED"]

  const newStatusIndex = 
    statusArray.indexOf(data.status) > 1 
      ? 0 
      : statusArray.indexOf(data.status) + 1

  dispatch(tasksRequest())
  fetch(`${API_ENDPOINT}task/${data._id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({
      task: {
        title: data.title,
        importance: data.importance,
        status: statusArray[newStatusIndex],
        description: data.description,
      }
    })
  })
    .then(response => response.json())
    .then(() => dispatch(getTasks("")))
    .catch(error => dispatch(taskFailure(error)))
}

export const createTask = data => dispatch => {
  dispatch(tasksRequest())
  fetch(`${API_ENDPOINT}task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({ task: {...data} })
    })
    .then(response => response.json())
    .then(() => dispatch(tasksCreated()))
    .then(() => dispatch(getTasks("")))
    .catch(error => dispatch(taskFailure(error)))
}