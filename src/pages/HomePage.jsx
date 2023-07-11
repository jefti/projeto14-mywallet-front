import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import apiTransaction from "../services/apiTransactions";
import apiAuth from "../services/apiAuth";

export default function HomePage() {
  const navigate = useNavigate();
  const [transactions, setTrasactions] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const {user} = useContext(UserContext);
  

  function getTransactionList(){
    apiTransaction.getTransactions(user.token)
      .then((res) => {
        console.log(res.data);
        const transacoes = res.data;
        setTrasactions(transacoes);
        let soma = 0;
        transacoes.forEach(h=>{
          if(h.type === "entrada") soma += h.value;
          else soma-= h.value;
        })
        setSaldo(soma);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response);
      })
  }

  function handleLogout(){
    apiAuth.logout(user.token)
      .then((res)=>{
        localStorage.removeItem("user");
        console.log(res);
        navigate("/")
      })
      .catch((err)=>{alert(err.response.data.message)});
  }
  function handleNavigate(destino){
    navigate(`/nova-transacao/${destino}`)
  }
  useEffect(getTransactionList,[])
  
  
let lista = transactions.map(h =>(
  <ListItemContainer key={h._id}>
    <div>
      <span>{h.data}</span>
      <strong>{h.description}</strong>
    </div>
    <Value color={(h.type==="entrada")?"positivo":"negativo"}>{h.value.toFixed(2)}</Value>
  </ListItemContainer>
));


  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {user.name}</h1>
        <BiExit onClick={handleLogout}/>
      </Header>
      <TransactionsContainer>
        <ul>
         {lista}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={(saldo>0)?"positivo":"negativo"}>{saldo.toFixed(2)}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer >
        <button onClick={()=> handleNavigate("entrada")}>
          <AiOutlinePlusCircle/>
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={()=> handleNavigate("saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>
      
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
  ul{
      overflow-y: auto;
      max-height: 384px;

  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`