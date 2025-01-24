import React, { useEffect, useState } from 'react';
import '../App.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const navigate = useNavigate();
    const [valUser, setValueUser] = useState("");
    const [valPass, setValuePass] = useState("");
    const [bisa, setBisa] = useState(1);
  
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post("https://tahu-bulat-ramid-app.vercel.app/api/user/register", {username: valUser, password: valPass}).then((response) => {
        const resp = JSON.stringify(response.data.success, null, 2)
        if (resp == "true"){
          setBisa(1);
          navigate('/home');
        }else {
          setBisa(0);
        }
      }).catch((err) => {
        alert(err);
      });
    }
  
    const navToLog = () => {
      navigate('/login');
    }
  
    const home = () => {
      navigate('/');
    }
  
    const changeUser = event => {
      const newVal = event.target.value;
      setValueUser(newVal);
      console.log(newVal);
    }
    
    const changePass = event => {
      const newVal = event.target.value;
      setValuePass(newVal);
    }
  
    return (
      <div className="bg-cover bg-no-repeat bg-center bg-[#C5C8B5] w-screen h-screen">
        <div className="fixed bg-[#171E27] w-screen md:h-[5vw] h-[9vw] opacity-[60%]">
        </div>
        <button onClick={home} className="fixed bg-cover left-[3vw] top-[1vw] bg-tbr_singkat md:top-0 bg-right bg-no-repeat w-[7vw] h-[7vw] md:w-[5vw] md:h-[5vw]">
        </button>
        <button
           onClick = {navToLog}
           className = "fixed opacity-[80%] hover:opacity-[100%] font-inconsolata text-[3.5vw] md:text-[2vw] text-[#F4DF00] bg-transparent top-[1.5vw] md:top-[0.5vw] right-[5vw] w-[10vw] h-[4vw]">
            Login
        </button>
        <div className="flex justify-center left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 items-center w-[110vw] md:w-[100vw] h-[60vw] md:h-[20vw] relative">
          <div className="relative bg-transparent aspect-[3/2] w-[60vw] max-w-[1100px] max-h-[700px] mt-[5vw] items-center gap-5 rounded-[5vw] opacity-80">
            <h1 className="absolute font-inconsolata font-semibold text-center left-1/2 transform -translate-x-1/2 text-[#171E27] text-[8vw] md:text-[5vw] mt-[-10vw] md:mt-[1.5vw]">
              Sign Up
            </h1>
            <h1 className="absolute font-inconsolata text-[#171E27] text-[5.5vw] md:text-[3vw] ml-[1vw] md:ml-[9vw] top-[5.3vw] md:top-[12vw]">
              username
            </h1>
            {bisa == 0 && <h1 className="absolute font-inconsolata text-[red] text-[2.2vw] md:text-[1.5vw] ml-[28vw] md:ml-[26vw] top-[3vw] md:top-[10vw]">
              username sudah digunakan
            </h1>}
            <h1 className="absolute font-inconsolata text-center text-[#171E27] text-[5.5vw] md:text-[3vw] ml-[1vw] md:ml-[9vw] top-[14.7vw] md:top-[17vw]">
              password
            </h1>
            <form onSubmit={handleSubmit}>
              <input onChange = {changeUser} placeholder="Masukkan username-mu" value = {valUser} class="absolute border-[0.3vw] md:border-[0.2vw] border-[black] ml-[27vw] md:ml-[25vw] top-[6.5vw] md:top-[12.5vw] w-[33vw] h-[6vw] md:w-[25vw] md:h-[3.5vw] px-[1.5vw] md:px-[0.9vw] rounded-[3vw] md:rounded-[2vw] font-inconsolata text-[3vw] md:text-[2vw] focus:outline-none"/>
              <input onChange = {changePass} placeholder="Masukkan password-mu" value = {valPass} class="absolute border-[0.3vw] md:border-[0.2vw] border-[black] ml-[27vw] md:ml-[25vw] top-[16vw] md:top-[17.5vw] w-[33vw] h-[6vw] md:w-[25vw] md:h-[3.5vw] px-[1.5vw] md:px-[0.9vw] rounded-[3vw] md:rounded-[2vw] font-inconsolata text-[3vw] md:text-[2vw] focus:outline-none"
              type="password"/>
              <button type="submit" className="absolute rounded-[3vw] md:rounded-[2vw] border-[0.3vw] border-[black] opacity-[80%] hover:opacity-[100%] font-inconsolata text-[4vw] md:text-[3vw] font-bold text-[black] bg-[#F4DF00] left-1/2 transform -translate-x-1/2 mt-[30vw] md:mt-[27vw] w-[30vw] h-[10vw] md:w-[25vw] md:h-[6vw]"> SIGN UP </button>
            </form>
          </div>
        </div>
      </div>
    );
  }