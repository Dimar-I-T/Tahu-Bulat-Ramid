import React, { useEffect, useState } from 'react';
import '../App.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Ulasan() {
    const navigate = useNavigate();
    const [indeks, setIndeks] = useState(0);
    const [ulasanSemua, setUlasanSemua] = useState([]);
  
    axios.defaults.withCredentials = true;
    useEffect(() => {
      axios.get("https://tahu-bulat-ramid-app.vercel.app/api/ulasan/get-all-ulasan").then(result => {
        const resp = JSON.stringify(result.data.success, null, 2)
        if (resp != false){
          setUlasanSemua(result.data.data);
        }else if (resp == false){
          alert(resp);
          navigate('/');
        }
      })
    }, []);
  
    const navToHome = () => {
      navigate('/home');
    }
  
    const navToLog = () => {
      navigate('/login');
    }
  
    const navToPesan = () => {
      navigate('/pesan');
    }
  
    const ulasans = Array.from({ length: ulasanSemua.length }, (_, i) => {
      let mtt = 6 + i * 28;
      return (
        <div key={i} className={`absolute bg-transparent left-1/2 transform -translate-x-1/2 h-[28vw] w-[80vw]`} style={{ marginTop: `${mtt}vw` }}>
            <div className="absolute rounded-[2vw] bg-black opacity-[20%] left-1/2 transform -translate-x-1/2 h-[27vw] w-[80vw]">
            </div>
            <h2 className="absolute font-inconsolata text-[#171E27] text-[3.5vw] ml-[14vw] mt-[2vw]">
                {ulasanSemua[i]?.ulasan[0][0]}
            </h2>
            <div className={`absolute bg-contain bg-no-repeat bg-b${ulasanSemua[i]?.bintang} w-[35vw] h-[3.5vw] ml-[14vw] mt-[7vw]`}>
            </div>
            <div class="absolute font-light px-[4vw] py-[1vw] font-inconsolata scroll-container left-1/2 transform -translate-x-1/2 text-[2vw] w-[60vw] h-[13vw] selection:overflow-x-hidden overflow-y-scroll bg-transparent mt-[11vw] rounded z-40">
              "<span>{ulasanSemua[i]?.ulasan[0][1]}</span>"
            </div>
        </div>
      );
    });
  
    return (
      <div className="bg-no-repeat min-h-screen min-w-screen bg-center bg-cover bg-[#C5C8B5]">
        <div className="fixed z-10 bg-[#5D625F] w-screen h-[5vw]">
        </div>
        <div className="fixed z-10 bg-cover left-[3vw] bg-tbr_singkat top-0 bg-right bg-no-repeat w-[5vw] h-[5vw]"></div>
        <button
           onClick = {navToLog}
           className = "fixed z-10 border-[0.2vw] border-[#F4DF00] opacity-[80%] hover:opacity-[100%] font-inconsolata text-[2vw] text-[#F4DF00] bg-transparent top-[0.5vw] right-[5vw] w-[10vw] h-[4vw]">
            Log Out
        </button>
        <button
           onClick = {navToHome}
           className = "fixed z-10 opacity-[80%] hover:opacity-[100%] font-inconsolata text-[2vw] text-[white] bg-transparent top-[0.5vw] right-[18vw] w-[10vw] h-[4vw]">
            Beranda
        </button>
        <button
           onClick = {navToPesan}
           className = "fixed z-10 opacity-[80%] hover:opacity-[100%] font-inconsolata text-[2vw] text-[white] bg-transparent top-[0.5vw] right-[29vw] w-[10vw] h-[4vw]">
            Pesan
        </button>
        <>{ulasans}</>
      </div>
    );
  }
  