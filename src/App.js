import './App.css';
import { useState } from 'react';
function App() {

  const [tarefas,setTarefas] = useState([]);
  const [modal, setModal] = useState(false);
  return (
    <div className="App">
      <div className='addTarefa'></div>
      <div className='boxTarefas'>
        <h2>Minhas Tarefas do Dia!</h2>
        {
          tarefas.map((val)=>{
            if(val.finalizada){
              return(
                <p>{val.tarefa}</p>
              );
            }else{
              return(
                <p style={{textDecoration:'line-through'}}>{val.tarefa}</p>
              );
            }
          })
        }
      </div>
    </div>
  );
}

export default App;
