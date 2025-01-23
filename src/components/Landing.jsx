import React, { useEffect, useState } from 'react';
import '../App.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Landing() {
    const navigate = useNavigate();
    const [indeks, setIndeks] = useState(0);
    const [indeksGambar, setIndeksGambar] = useState(1);
    const [ulasanSemua, setUlasanSemua] = useState([]);
    const [ratingMean, setRatingMean] = useState(0);
  
    axios.defaults.withCredentials = true;
    useEffect(() => {
      axios.get("https://tahu-bulat-ramid-app.vercel.app/api/ulasan/get-all-ulasan").then(result => {
        const resp = JSON.stringify(result.data.success, null, 2)
        if (resp != false){
          setUlasanSemua(result.data.data);
          let jumlahR = 0;
          for (let x = 0; x < result.data.data.length; x++){
            jumlahR += result.data.data[x]?.bintang;
          }
  
          let mean = jumlahR / result.data.data.length;
          setRatingMean(mean.toFixed(2));
        }else if (resp == false){
          alert(resp);
          navigate('/');
        }
      })
    }, []);
  
    const maju = () => {
      if (indeks < ulasanSemua.length - 1){
        setIndeks(indeks + 1);
      }else{
        setIndeks(0);
      }
    }
  
    const mundur = () => {
      if (indeks > 0){
        setIndeks(indeks - 1);
      }else{
        setIndeks(ulasanSemua.length - 1);
      }
    }
  
    const majuGambar = () => {
      if (indeksGambar < 2){
        setIndeksGambar(indeksGambar + 1);
      }else{
        setIndeksGambar(0);
      }
    }
  
    const mundurGambar = () => {
      if (indeksGambar > 0){
        setIndeksGambar(indeksGambar - 1);
      }else{
        setIndeksGambar(2);
      }
    }
  
    const navToReg = () => {
      navigate('/register');
    }
  
    const navToLog = () => {
      navigate('/login');
    }
  
    return (
      <div className="bg-no-repeat min-h-screen min-w-screen bg-center bg-cover bg-[#C5C8B5]">
        <div className="fixed z-10 bg-[#5D625F] w-screen h-[5vw]">
        </div>
        <div className="fixed z-11 bg-cover left-[3vw] bg-tbr_singkat top-0 bg-right bg-no-repeat w-[5vw] h-[5vw]"></div>
        <button
           onClick = {navToReg}
           className = "fixed z-10 border-[0.2vw] border-[#F4DF00] opacity-[80%] hover:opacity-[100%] font-inconsolata text-[2vw] text-[#F4DF00] bg-transparent top-[0.5vw] right-[5vw] w-[10vw] h-[4vw]">
            Sign Up
        </button>
        <button
           onClick = {navToLog}
           className = "fixed z-10 opacity-[80%] hover:opacity-[100%] font-inconsolata text-[2vw] text-[#F4DF00] bg-transparent top-[0.5vw] right-[17vw] w-[10vw] h-[4vw]">
            Login
        </button>
        <h1 className="absolute font-inconsolata font-bold text-center text-[#171E27] text-[4vw] top-[8vw] right-[11vw]">
          Tahu Bulat:<br></br>
          Bulat, Gurih, Mantap!
        </h1>
        <h2 className="absolute font-inconsolata font-light text-center text-[#171E27] text-[2vw] top-[21vw] right-[9vw]">
          Nikmati kelezatan tahu bulat yang selalu bulat, <br></br>
          gurih, renyah di luar, dan lembut di dalam.
        </h2>
        <div className='absolute top-[47vw] left-1/2 transform -translate-x-1/2 bg-transparent h-[5vw] w-[50vw]'>
          <h1 className="absolute font-inconsolata ml-[10vw] font-semibold text-center text-[#171E27] text-[4vw]">
            Rating: 
          </h1>
          <div className='absolute bg-contain bg-no-repeat ml-[25vw] bg-star1 w-[4vw] h-[4vw] mt-[1vw]'></div>
          <h1 className="absolute font-inconsolata ml-[29.6vw] font-semibold text-stroke-4 text-center text-[#F4DF00] text-[4vw]">
            {ratingMean}
          </h1>
        </div>
        
        <button
           onClick = {navToReg}
           className = "absolute rounded-[2vw] border-[0.3vw] border-[black] opacity-[80%] hover:opacity-[100%] font-inconsolata text-[3vw] font-bold text-[black] bg-[#F4DF00] top-[30vw] right-[15vw] w-[35vw] h-[7vw]">
            Pesan Sekarang!
        </button>
        <div class="absolute bg-cover top-[5vw] left-0 right-0 bg-no-repeat bg-tbr_full w-[40vw] h-[40vw]"></div>
        <div className="relative rounded-[2vw] bg-transparent object-center left-1/2 transform -translate-x-1/2 h-[50vw] w-[90vw] top-[60vw]">
          <h2 className="absolute font-inconsolata left-1/2 transform -translate-x-1/2 text-[#171E27] text-[3.5vw]">
            Gambar
          </h2> 
          {indeksGambar == 0 && <div className={`absolute bg-contain bg-no-repeat left-1/2 transform -translate-x-1/2 w-[30vw] h-[20vw] bg-tahu0 mt-[10.5vw] rounded z-40`}>
          </div>}
          {indeksGambar == 1 && <div className={`absolute bg-contain bg-no-repeat left-1/2 transform -translate-x-1/2 w-[30vw] h-[20vw] bg-tahu1 mt-[10.5vw] rounded z-40`}>
          </div>}
          {indeksGambar == 2 && <div className={`absolute bg-contain bg-no-repeat left-1/2 transform -translate-x-1/2 w-[30vw] h-[20vw] bg-tahu2 mt-[10.5vw] rounded z-40`}>
          </div>}
          <button onClick={mundurGambar} className="absolute bg-[#808276] w-[5vw] h-[5vw] opacity-[50%] hover:opacity-[60%] left-[7vw] mt-[17vw] rounded-xl z-10">
            <p className="text-[3vw] font-bold mt-[-0.5vw] mr-[0.2vw]">{"<"}</p>
          </button>
          <button onClick={majuGambar} className="absolute bg-[#808276] w-[5vw] h-[5vw] opacity-[50%] hover:opacity-[60%] left-[78vw] mt-[17vw] rounded-xl z-10">
            <p className="text-[3vw] font-bold mt-[-0.5vw] mr-[0.2vw]">{">"}</p>
          </button>
          <div className="absolute rounded-[2vw] bg-black opacity-[20%] left-1/2 transform -translate-x-1/2 h-[27vw] w-[80vw] mt-[6vw]">
          </div>
        </div>
        <div className="relative rounded-[2vw] bg-transparent object-center left-1/2 transform -translate-x-1/2 h-[50vw] w-[90vw] top-[52vw]">
          <h2 className="absolute font-inconsolata left-1/2 transform -translate-x-1/2 text-[#171E27] text-[3.5vw]">
            Ulasan
          </h2>
          <h2 className="absolute font-inconsolata text-[#171E27] text-[3.5vw] ml-[19vw] mt-[8vw]">
            {ulasanSemua[indeks]?.ulasan[0][0]}
          </h2>
          <div className={`absolute bg-contain bg-no-repeat bg-b${ulasanSemua[indeks]?.bintang} w-[35vw] h-[3.5vw] ml-[19vw] mt-[13vw]`}>
          </div>
          <div class="absolute font-light px-[4vw] py-[1vw] font-inconsolata scroll-container left-1/2 transform -translate-x-1/2 text-[2vw] w-[60vw] h-[13vw] selection:overflow-x-hidden overflow-y-scroll bg-transparent mt-[16vw] rounded z-40">
            "<span>{ulasanSemua[indeks]?.ulasan[0][1]}</span>"
          </div>
          <button onClick={mundur} className="absolute bg-[#808276] w-[5vw] h-[5vw] opacity-[50%] hover:opacity-[60%] left-[7vw] mt-[17vw] rounded-xl z-10">
            <p className="text-[3vw] font-bold mt-[-0.5vw] mr-[0.2vw]">{"<"}</p>
          </button>
          <button onClick={maju} className="absolute bg-[#808276] w-[5vw] h-[5vw] opacity-[50%] hover:opacity-[60%] left-[78vw] mt-[17vw] rounded-xl z-10">
            <p className="text-[3vw] font-bold mt-[-0.5vw] mr-[0.2vw]">{">"}</p>
          </button>
          <div className="absolute rounded-[2vw] bg-black opacity-[20%] left-1/2 transform -translate-x-1/2 h-[27vw] w-[80vw] mt-[6vw]">
          </div>
          <button onClick={navToReg} className="absolute rounded-[2vw] left-1/2 transform -translate-x-1/2 border-[0.3vw] border-[black] opacity-[80%] hover:opacity-[100%] font-inconsolata text-[3vw] font-bold text-[black] bg-[#F4DF00] mt-[37vw] w-[32vw] h-[8vw]"> Buat Ulasan </button>
        </div>
      </div>
    );
}