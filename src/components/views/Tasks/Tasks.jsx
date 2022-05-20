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
  const [ list, setList ] = useState(null);
  const [ renderList, setRenderList ] = useState(null);
  const [ tasksFromWho, setTasksFromWho ] = useState("ALL");
  const [ search, SetSearch ] = useState("");
  const { isPhone } = useResize();
  const dispatch = useDispatch();
  
  const { loading, error, tasks } = useSelector(state => {
    return state.tasksReducer;
  })

  useEffect(() => {
    dispatch(getTasks(tasksFromWho === "ME" ? "me" : ""))
  },[tasksFromWho])

  useEffect(() => {
    if (tasks?.length) {
      setList(tasks)
      setRenderList(tasks)
      return
    }
      setList([])
      setRenderList([])
  },[tasks])
  
  useEffect(() => {
    if (search) {
      setRenderList(
        list.filter(data => data.title.startsWith(search))
      )
    } else {
      setRenderList(list)
    }
  },[search])

  const handleDelete = id => {dispatch(deleteTask(id))}

  const handleEditCardStatus = data => dispatch(editTaskStatus(data))

  if (error) return <div>Hubo un error </div>

  const renderAllCards = () => {
    return renderList?.map(data => 
      (<Card
        key={data._id} 
        data={data} 
        deleteCard={handleDelete} 
        editCardStatus={handleEditCardStatus}
      />))
  }

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

  const handleChangeImportance = event => {
    if (event.currentTarget.value === "ALL") {
      setRenderList(list);
      return
    }
    setRenderList(list.filter(data => data.importance === event.currentTarget.value))
  }

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
            <div className="list_group">
              {!renderList?.length ? (
                <div>No hay tareas creadas</div>
                ) : loading ? <Skeleton height={90}/> : (
                  <>
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
                  </>
                )} 
            </div>
          )}
        </section>
      </main>
    </>
  );
}
