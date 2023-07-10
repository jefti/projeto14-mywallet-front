import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import apiAuth from "../services/apiAuth";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"",email:"" ,password:"", confirmpassword:""});
  
  function handleForm(e){
    const value = e.target.name;
    switch(value){
      case "name":
        setForm({...form,name:e.target.value.toString()});
        break;
      case "email":
        setForm({...form,email:e.target.value.toString()});
        break;
      case "password":
        setForm({...form,password:e.target.value.toString()});
        break;
      case "confirmpassword":
        setForm({...form,confirmpassword:e.target.value.toString()});
        break;
    }
  }


  function handleSignUp(e){
    e.preventDefault();
    if(form.password === form.confirmpassword){
      const obj = {name: form.name, email: form.email, password: form.password};
      apiAuth.signup(obj)
        .then((res)=>{
          console.log(res.data);
          navigate("/");
        })
        .catch((err)=>{
          console.log(err.response);
          alert(err.response.data);
        });
    }else {
      alert("Senha de confirmação incorreta!");
    } 
  }


  return (
    <SingUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />

        <input
          name="name" 
          placeholder="Nome" 
          type="text"
          required
          value= {form.name}
          onChange={handleForm} 
        />
        <input 
          name="email"
          placeholder="E-mail" 
          type="email" 
          required
          value= {form.email}
          onChange={handleForm}
        />
        <input
          name="password" 
          placeholder="Senha" 
          type="password" 
          autocomplete="new-password"
          required
          value= {form.password}
          onChange={handleForm} 
        />
        <input
          name="confirmpassword"  
          placeholder="Confirme a senha" 
          type="password"
          autocomplete="new-password"
          required
          value= {form.confirmpassword}
          onChange={handleForm} 
        />

        <button>Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
