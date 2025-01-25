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
        <div className="fixed z-10 bg-[#5D625F] w-screen md:h-[5vw] h-[9vw]">
        </div>
        <div className="fixed z-10 bg-cover left-[3vw] bg-tbr_singkat top-0 bg-right bg-no-repeat w-[9vw] h-[9vw] md:w-[5vw] md:h-[5vw]"></div>
        <button
           onClick = {navToReg}
           className = "fixed z-10 md:border-[0.2vw] border-[0.3vw] border-[#F4DF00] opacity-[80%] hover:opacity-[100%] font-inconsolata text-[3vw] md:text-[2vw] text-[#F4DF00] bg-transparent top-[1vw] md:top-[0.5vw] right-[5vw] w-[14vw] h-[7vw] md:w-[10vw] md:h-[4vw]">
            Sign Up
        </button>
        <button
           onClick = {navToLog}
           className = "fixed z-10 opacity-[80%] hover:opacity-[100%] font-inconsolata text-[3vw] md:text-[2vw] text-[#F4DF00] bg-transparent top-[1vw] md:top-[0.5vw] right-[21vw] md:right-[17vw] w-[14vw] h-[7vw] md:w-[10vw] md:h-[4vw]">
            Login
        </button>
        <div className='relative bg-transparent w-[95vw] h-[55vw] md:w-[52vw] md:h-[35vw] left-[1vw] top-[63vw] md:left-[38vw] md:top-[10vw]'>
          <h1 className="absolute font-inconsolata font-bold text-center top-0 right-0  text-[#171E27] md:mr-[2vw] mr-[6vw] text-[6.5vw] md:text-[4vw]">
            Tahu Bulat:<br></br>
            Bulat, Gurih, Mantap!
          </h1>
          <h2 className="absolute font-inconsolata right-0 font-light text-center mt-[21vw] md:mt-[13vw] text-[#171E27] max-sm:mr-[1vw] text-[3.8vw] md:text-[2vw]">
            Nikmati kelezatan tahu bulat yang selalu bulat, <br></br>
            gurih, renyah di luar, dan lembut di dalam.
          </h2>
          <button
           onClick = {navToReg}
           className = "absolute rounded-[4vw] md:rounded-[2vw] border-[0.3vw] border-[black] opacity-[80%] hover:opacity-[100%] font-inconsolata text-[4vw] md:text-[3vw] font-bold text-[black] bg-[#F4DF00] right-0 mr-[24vw] md:mr-[6vw] mt-[36vw] md:mt-[22vw] w-[45vw] h-[17vw] md:w-[35vw] md:h-[7vw]">
            Pesan Sekarang!
        </button>
        </div>
        <div class="absolute bg-cover top-[8vw] md:top-[5vw] left-1/2 transform -translate-x-1/2 md:left-[20vw] md:right-0 bg-no-repeat bg-tbr_full w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw]"></div>
        <div className='absolute top-[129vw] rounded-[2vw] md:top-[50vw] h-[10vw] w-[45vw] left-[50vw] transform -translate-x-1/2 md:bg-transparent bg-[black] opacity-[10%] md:h-[5vw] md:w-[50vw]'></div>
        <div className='absolute top-[130vw] md:top-[50vw] h-[10vw] w-[50vw] left-1/2 transform -translate-x-1/2 bg-transparent md:h-[5vw] md:w-[50vw]'>
          <h1 className="absolute font-inconsolata ml-[7vw] md:ml-[10vw] font-semibold text-center text-[#171E27] text-[5vw] md:text-[4vw]">
            Rating: 
          </h1>
          <div className='absolute bg-contain bg-no-repeat ml-[26vw] md:ml-[25vw] bg-star1 w-[5vw] h-[5vw] md:w-[4vw] md:h-[4vw] mt-[1vw]'></div>
          <h1 className="absolute font-inconsolata ml-[32vw] md:ml-[30.6vw] font-semibold text-stroke-4 text-center text-[#F4DF00] text-[5vw] md:text-[4vw]">
            {ratingMean}
          </h1>
        </div>
        <div className="relative rounded-[2vw] bg-transparent object-center left-1/2 transform -translate-x-1/2 h-[55vw] md:h-[50vw] w-[90vw] top-[96vw] md:top-[36vw]">
          <h2 className="absolute font-inconsolata left-1/2 transform -translate-x-1/2 text-[#171E27] text-[5vw] max-sm:mt-[-2vw] md:text-[3.5vw]">
            Gambar
          </h2> 
          {indeksGambar == 0 && <div className={`absolute bg-contain bg-no-repeat left-1/2 transform -translate-x-1/2 w-[50vw] md:w-[30vw] h-[35vw] md:h-[20vw] bg-tahu0 mt-[11.5vw] md:mt-[10.5vw] rounded z-40`}>
          </div>}
          {indeksGambar == 1 && <div className={`absolute bg-contain bg-no-repeat left-1/2 transform -translate-x-1/2 w-[50vw] md:w-[30vw] h-[35vw] md:h-[20vw] bg-tahu1 mt-[11.5vw] md:mt-[10.5vw] rounded z-40`}>
          </div>}
          {indeksGambar == 2 && <div className={`absolute bg-contain bg-no-repeat left-1/2 transform -translate-x-1/2 w-[50vw] md:w-[30vw] h-[35vw] md:h-[20vw] bg-tahu2 mt-[11.5vw] md:mt-[10.5vw] rounded z-40`}>
          </div>}
          <button onClick={mundurGambar} className="absolute bg-[#808276] w-[7vw] h-[7vw] md:w-[5vw] md:h-[5vw] opacity-[50%] hover:opacity-[60%] left-[8vw] md:left-[7vw] mt-[23vw] md:mt-[17vw] rounded-full z-10">
            <p className="text-[3vw] font-bold mt-[-0.5vw] mr-[0.2vw]">{"<"}</p>
          </button>
          <button onClick={majuGambar} className="absolute bg-[#808276] w-[7vw] h-[7vw] md:w-[5vw] md:h-[5vw] opacity-[50%] hover:opacity-[60%] left-[75vw] md:left-[78vw] mt-[23vw] md:mt-[17vw] rounded-full z-10">
            <p className="text-[3vw] font-bold mt-[-0.5vw] mr-[0.2vw]">{">"}</p>
          </button>
          <div className="absolute rounded-[2vw] bg-black opacity-[20%] left-1/2 transform -translate-x-1/2 h-[40vw] md:h-[27vw] w-[80vw] mt-[6vw]">
          </div>
        </div>
        <div className="relative rounded-[2vw] bg-transparent object-center left-1/2 transform -translate-x-1/2 h-[65vw] md:h-[50vw] w-[90vw] top-[98vw] md:top-[28vw]">
          <h2 className="absolute font-inconsolata left-1/2 transform -translate-x-1/2 text-[#171E27] text-[5vw] max-sm:mt-[-2vw] md:text-[3.5vw]">
            Ulasan
          </h2>
          <h2 className="absolute font-inconsolata text-[#171E27] text-[5vw] md:text-[3.5vw] ml-[19vw] mt-[10vw] md:mt-[8vw]">
            {ulasanSemua[indeks]?.ulasan[0][0]}
          </h2>
          <div className={`absolute bg-contain bg-no-repeat bg-b${ulasanSemua[indeks]?.bintang} w-[36vw] h-[4.5vw] md:w-[35vw] md:h-[3.5vw] ml-[19vw] mt-[17vw] md:mt-[13vw]`}>
          </div>
          <div class="absolute font-light px-[4vw] py-0 md:py-[1vw] font-inconsolata scroll-container left-1/2 transform -translate-x-1/2 text-[3vw] md:text-[2vw] w-[60vw] h-[13vw] selection:overflow-x-hidden overflow-y-scroll bg-transparent mt-[22vw] md:mt-[16vw] rounded z-40">
            "<span>{ulasanSemua[indeks]?.ulasan[0][1]}</span>"
          </div>
          <button onClick={mundur} className="absolute bg-[#808276] w-[7vw] h-[7vw] md:w-[5vw] md:h-[5vw] opacity-[50%] hover:opacity-[60%] left-[8vw] md:left-[7vw] mt-[23vw] md:mt-[17vw] rounded-full z-10">
            <p className="text-[3vw] font-bold mt-[-0.5vw] mr-[0.2vw]">{"<"}</p>
          </button>
          <button onClick={maju} className="absolute bg-[#808276] w-[7vw] h-[7vw] md:w-[5vw] md:h-[5vw] opacity-[50%] hover:opacity-[60%] left-[75vw] md:left-[78vw] mt-[23vw] md:mt-[17vw] rounded-full z-10">
            <p className="text-[3vw] font-bold mt-[-0.5vw] mr-[0.2vw]">{">"}</p>
          </button>
          <div className="absolute rounded-[2vw] bg-black opacity-[20%] left-1/2 transform -translate-x-1/2 h-[40vw] md:h-[27vw] w-[80vw] mt-[6vw]">
          </div>
          <button onClick={navToReg} className="absolute rounded-[2vw] left-1/2 transform -translate-x-1/2 border-[0.3vw] border-[black] opacity-[80%] hover:opacity-[100%] font-inconsolata text-[3.5vw] md:text-[3vw] font-bold text-[black] bg-[#F4DF00] mt-[50vw] md:mt-[37vw] w-[34vw] h-[10vw] md:w-[32vw] md:h-[8vw]"> Buat Ulasan </button>
        </div>
      </div>
    );
}