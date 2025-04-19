// React Hooks
import { useEffect, useState, useRef  } from 'react'

import './style.css'
import api from '../../services/api'

function Home() {

const [users, setUsers] = useState([])

const inputName = useRef()
const inputAge = useRef()
const inputEmail = useRef()

async function getUsers(){
   const usersFromApi = await api.get('/usuarios');

   setUsers(usersFromApi.data); 
   
}
async function createUsers(){

    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    });

    getUsers();
 
  
}
async function deleteUsers(id){
   await api.delete(`/usuarios/${id}`)

   getUsers()

}

useEffect(()=>{

  getUsers()

})

  return (
    
      <div className='container'>
          <form>
            <h1>Cadastro de Usuários</h1>
            <input name='nome' type='text' placeholder='Nome' ref={inputName}/>
            <input name='idade' type='number'placeholder='Idade' ref={inputAge}/>
            <input name='email' type='email'placeholder='Email'ref={inputEmail}/>
            <button type='button' onClick={createUsers}>Cadastrar</button>
          </form>

          {users.map( (user) => (

                  <div className='card'>
                  <div>
                    <p>Nome: <span>{user.name}</span></p>
                    <p>Idade:<span>{user.age}</span></p>
                    <p>Email:<span>{user.email}</span></p>
                  </div>
                  <button onClick={()=> deleteUsers(user.id)}>X</button>
                  </div>

          ))}

        
      </div>

     
      
  )
}

export default Home
