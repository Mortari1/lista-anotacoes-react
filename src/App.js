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

  const marcarConcluida = (id,opt)=>{
    let novasTarefas = tarefas.filter((val)=>{
     
      if(val.id === id){
        val.finalizada = opt;
        
      }
      
      return val;
    })

    setTarefas(novasTarefas);
    window.localStorage.setItem('tarefas',JSON.stringify(novasTarefas));
  }

  
  const [modal, setModal] = useState(false);
  //abre a modal para adicionar tarefas
  const abrirModal = () => {
    setModal(!modal);
  }

  const deletarTarefa = (id) =>{
   let pegarTarefas = tarefas.filter((val)=>{
    if(val.id !== id){
      
      return val;
    }
   })

   setTarefas(pegarTarefas);
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
                <div className='tarefaSingle'>
                  <p onClick={()=>marcarConcluida(val.id,true)}>{val.tarefa}</p>
                  <span onClick={()=>deletarTarefa(val.id)}>(X)</span>
                </div>
              );
            }else{
              return(
                <div className='tarefaSingle'>
                  <p onClick={()=>marcarConcluida(val.id,false)} style={{textDecoration:'line-through'}}>{val.tarefa}</p>
                  <span onClick={()=>deletarTarefa(val.id)}>(X)</span>
                </div>
              );
            }
          })
        }
      </div>
    </div>
  );
}

export default App;
