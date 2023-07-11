import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import apiAuth from "../services/apiAuth";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";


export default function SignInPage() {
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);
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
    apiAuth.login(form)
      .then((res)=>{
        const {name, email, token} = res.data;
        setUser({name, email, token});
        console.log({name, email, token});
        localStorage.setItem("user", JSON.stringify({name, email, token}));
        navigate("/home")
      })
      .catch((err)=>{
        alert(err.response.data);
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
          data-test="email"
        />

        <input
          name="password"
          type="password" 
          placeholder="Senha"  
          required
          autocomplete="new-password"
          value={form.password}
          onChange={handleForm}
          data-test="password"
        />

        <button type="submit" data-test="sign-in-submit">Entrar</button>
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
