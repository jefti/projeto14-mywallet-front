import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import apiAuth from "../services/apiAuth";
import { useState } from "react";


export default function SignInPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email:"" ,password:"" });
  
  function handleForm(e){
    if(e.target.name === "email"){
      setForm({email: e.target.value, password: form.password,});
    } else {
      setForm({email: form.email, password: e.target.value.toString()});
    }

  }
  
  function handleLogin(e){
    e.preventDefault();
    console.log(form);
    console.log(apiAuth);
    apiAuth.login(form)
      .then((res)=>{

        console.log(res.data);
        navigate("/home")
      })
      .catch((err)=>{
        console.log(err.response.data.message);
      });
  }

  return (
    <SingInContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />

        <input
          name="email"
          type="email" 
          placeholder="E-mail" 
          required
          value= {form.email}
          onChange={handleForm}
        />

        <input
          name="password"
          type="password" 
          placeholder="Senha"  
          required
          autocomplete="new-password"
          value={form.password}
          onChange={handleForm}
        />

        <button type="submit" >Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
