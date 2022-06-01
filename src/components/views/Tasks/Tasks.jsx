import Header from '../../Header/Header';
import './Tasks.styles.css';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import useResize from '../../../hooks/useResize';
import Card from '../../Card/Card';
import TaskForm from '../../TaskForm/TaskForm';
import { useState, useEffect } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import debounce from "lodash.debounce";
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, deleteTask, editTaskStatus } from '../../../store/actions/tasksActions';

export default function Tasks() {
  // manage list state
  const [ list, setList ] = useState(null);
  // manage list to render state
  const [ renderList, setRenderList ] = useState(null);
  // manage list filter by author state
  const [ tasksFromWho, setTasksFromWho ] = useState("ALL");
  // manage search state (debounce)
  const [ search, SetSearch ] = useState("");
  // screen width checker hook
  const { isPhone } = useResize();
  const dispatch = useDispatch();
  
  // import redux states
  const { loading, error, tasks } = useSelector(state => {
    return state.tasksReducer;
  })

  // Whenever tasksFromWho changes, Redux updates its tasks calling the API
  useEffect(() => {
    dispatch(getTasks(tasksFromWho === "ME" ? "me" : ""))
  },[dispatch, tasksFromWho])

  // Whenever tasks from Redux changes state update list and renderlList
  useEffect(() => {
    if (tasks?.length) {
      setList(tasks)
      setRenderList(tasks)
      return
    }
      setList([])
      setRenderList([])
  },[tasks])
  
  // Whenever search value changes, list is filtered and RenderList updated
  useEffect(() => {
    if (search) {
      setRenderList(
        list.filter(data => data.title.startsWith(search))
      )
    } else {
      setRenderList(list)
    }
  },[search])

  // delete task dispatch for Redux
  const handleDelete = id => {dispatch(deleteTask(id))}

  // edit task dispatch for Redux
  const handleEditCardStatus = data => dispatch(editTaskStatus(data))

  if (error) return <div>Hubo un error </div>

  // Component renders list of ALL cards
  const renderAllCards = () => {
    return renderList?.map(data => 
      (<Card
        key={data._id} 
        data={data} 
        deleteCard={handleDelete} 
        editCardStatus={handleEditCardStatus}
      />))
  }

  // Component renders list of cards in columns depending of its progress state
  const renderColumnCards = (text) => {
    return renderList
      ?.filter(data => data.status === text)
      .map(data => (
         <Card 
          key={data._id} 
          data={data} 
          deleteCard={handleDelete}
          editCardStatus={handleEditCardStatus}
          />))
  }

  // filters list by importance value and updates RenderList
  const handleChangeImportance = event => {
    if (event.currentTarget.value === "ALL") {
      setRenderList(list);
      return
    }
    setRenderList(list.filter(data => data.importance === event.currentTarget.value))
  }

  // Debounce for searching task by name
  const handleSearch = debounce(event => {
    SetSearch(event?.target?.value)
  }, 1000);

  return (
    <>
      <Header/>
      <main id="tasks">
        <TaskForm />
        <section className='wrapper_list'>
          <div className="list-header">
            <h2>Mis tareas</h2>
          </div>
          <div className="filters">
            {/* radio buttons filter tasks by author */}
            <FormControl>
              <RadioGroup
                row
                aira-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(event) => setTasksFromWho(event.currentTarget.value)}
              >
                <FormControlLabel
                  value="ALL"
                  control={
                    <Radio
                      sx={{
                        color: 'rgba(0, 0, 0, 0.6)',
                        '&.Mui-checked': {
                          color: '#FF452B',
                        },
                      }}
                    />
                  }
                  label="Todas"
                  />
                <FormControlLabel
                  value="ME"
                  control={
                    <Radio
                      sx={{
                        color: 'rgba(0, 0, 0, 0.6)',
                        '&.Mui-checked': {
                          color: '#FF452B',
                        },
                      }}
                    />
                  }
                  label="Mis Tareas"
                  />
              </RadioGroup>
            </FormControl>
            <div className="inputsWrapper">
              <div className="search">
                <input 
                  type="text" 
                  placeholder="Seleccionar por título..." 
                  onChange={handleSearch}
                />
              </div>
              <select name="importance" onChange={handleChangeImportance}>
                <option value="">Seleccionar una prioridad</option>
                <option value="ALL">Todas</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>
          {isPhone ? (
            !renderList?.length ? (
              <div>No hay tareas creadas</div>
              ) : loading ? (
                <>
                <Skeleton height={90}/>
                <Skeleton height={90}/>
                <Skeleton height={90}/>
                </>
              ) : (
                <div className="list phone">
                  {renderAllCards()}
                </div>
              )
          ) : (
            <>
              {!renderList?.length ? (
                <div>No hay tareas creadas</div>
                ) : loading ? 
                <Skeleton height={90} /> : (
                  <>
                    <div className="list_group">
                      <div className="list">
                        <h4>Nuevas</h4>
                          {renderColumnCards("NEW")}
                      </div>
                      <div className="list">
                        <h4>En proceso</h4>
                          {renderColumnCards("IN PROGRESS")}
                      </div>
                      <div className="list">
                        <h4>Finalizadas</h4>
                        {renderColumnCards("FINISHED")}
                      </div>
                    </div>
                  </>
                )} 
            </>
          )}
        </section>
      </main>
    </>
  );
}
