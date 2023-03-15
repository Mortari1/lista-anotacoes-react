import './App.css';
import { useState, useEffect } from 'react';

function App() {
 

  const [tarefas,setTarefas] = useState([
    /*
    {
      id:0,
      tarefa:'Fazer molho branco pro macarrão',
      finalizada: false
    },
    {
      id:1,
      tarefa:'Ir ao mercado',
      finalizada: true
    }*/
  ]);

  const salvarTarefa = () =>{
    //Todo: Salvar a tarefa.
    var tarefa = document.getElementById("content-tarefa");
    
    setTarefas([
      ...tarefas,
      {
        id: new Date().getTime(),
        tarefa: tarefa.value,
        finalizada:false
      }
    ]);

    
    window.localStorage.setItem('tarefas',JSON.stringify([
      ...tarefas,
      {
        id: new Date().getTime(),
        tarefa: tarefa.value,
        finalizada:false
      }
    ]));
    setModal(false);
  }

  const marcarConcluida = (id)=>{
    let novasTrefas = tarefas.filter((val)=>{
     
      if(val.id === id){
        val.finalizada = true;
        
      }
      
      return val;
    })

    setTarefas(novasTrefas);
    window.localStorage.setItem('tarefas',JSON.stringify(novasTrefas));
  }
  const [modal, setModal] = useState(false);
  //abre a modal para adicionar tarefas
  const abrirModal = () => {
    setModal(!modal);
  }

  useEffect(()=>{
    //Fazer uma chamada para API e preencher tarefas
    if(window.localStorage.getItem('tarefas') !== undefined){
      setTarefas(JSON.parse(window.localStorage.getItem('tarefas')));
    }
    
  },[]);
  return (
    <div className="App">
      {
        modal?
        <div className='modal'>
          <div className='modalContent'>
            <h3>Adicionar sua tarefa</h3>
            <input id="content-tarefa" type="text"/>
            <button onClick={()=>salvarTarefa()}>Salvar</button>
          </div>
        </div>
        :
        <div>
          
        </div>
      }
      <div onClick={()=>abrirModal()} className='addTarefa'></div>
      <div className='boxTarefas'>
        <h2>Minhas Tarefas do Dia!</h2>
        {
          tarefas.map((val)=>{
            if(!val.finalizada){
              return(
                <p onClick={()=>marcarConcluida(val.id)}>{val.tarefa}<span></span></p>
              );
            }else{
              return(
                <p onClick={()=>marcarConcluida(val.id)} style={{textDecoration:'line-through'}}>{val.tarefa}<span></span></p>
              );
            }
          })
        }
      </div>
    </div>
  );
}

export default App;
