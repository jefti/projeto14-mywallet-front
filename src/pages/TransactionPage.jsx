import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import apiTransaction from "../services/apiTransactions";

export default function TransactionsPage() {
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  const [form, setForm] = useState({ description:"", value:0 });
  const {tipo} = useParams();
  function handleRegister(e){
    e.preventDefault();
    if(form.value<=0){
      alert('O valor da transação tem de ser positivo');
      return;
    }
    const obj = {value:form.value, description:form.description, type:tipo};
    apiTransaction.createTransactions(obj,user.token)
      .then((res)=>{
        console.log(res.data);
        navigate("/home");
      })
      .catch( err => alert(err.response));
  }
  
  function handleForm(e){
    const value = e.target.name;
    switch(value){
      case "value":
        setForm({...form,value:Number(e.target.value)});
        break;
      case "description":
        setForm({...form,description:e.target.value.toString()});
        break;
    }
  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={handleRegister}>
        
        <input
          name = "value" 
          placeholder="Valor" 
          type="number"
          step="0.01"
          min="0" 
          required
          value = {form.value}
          onChange={handleForm}
        />
        <input
          name="description" 
          placeholder="Descrição" 
          type="text"
          value={form.description} 
          required
          onChange={handleForm}
        />
        
        <button type="submit" >Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
