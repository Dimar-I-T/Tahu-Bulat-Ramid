import React, { useEffect, useState } from 'react';
import '../App.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [ulasanSemua, setUlasanSemua] = useState([]);
    const [valUlasan, setValUlasan] = useState("");
    const [indeks, setIndeks] = useState(0);
    const [isi, setIsi] = useState([0, 0, 0, 0, 0]);
    const [bisa, setBisa] = useState(5);
    const [jumlahBintang, setJumlahBintang] = useState(0);
  
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
      e.preventDefault();
      if (jumlahBintang > 0 && valUlasan.trim().length > 0){
        setBisa(1);
        setIsi([0, 0, 0, 0, 0]);
        axios.post("http://localhost:5001/api/user/add-ulasan", {ulasan: valUlasan, bintang: jumlahBintang}).then((response) => {
          const resp = JSON.stringify(response.data.success, null, 2)
          if (resp != false){
            setValUlasan("");
          }else {
            alert("tidak bisa");
            navigate('/');
          }
        }).catch((err) => {
          alert(err);
        });
  
        axios.post("http://localhost:5001/api/ulasan/add-ulasan", {ulasan: valUlasan, bintang: jumlahBintang}).then((response) => {
          const resp = JSON.stringify(response.data.success, null, 2)
          if (resp != false){
            setValUlasan("");
          }else {
            alert("tidak bisa");
            navigate('/');
          }
        }).catch((err) => {
          alert(err);
        });
      }else{
        if (jumlahBintang == 0 && valUlasan.trim().length == 0){
          setBisa(2);
        }else{
          if (jumlahBintang == 0 && valUlasan.trim().length > 0){
            setBisa(0)
          }
    
          if (jumlahBintang > 0 && valUlasan.trim().length == 0){
            setBisa(3);
          }
        }
      }
    }
  
    useEffect(() => {
      axios.get("http://localhost:5001/api/user/get-my-info").then(result => {
        const resp = JSON.stringify(result.data.success, null, 2)
        if (resp != false){
          setData(result.data.data);
        }else if (resp == false){
          alert(resp);
          navigate('/');
        }
      })
  
      axios.get("http://localhost:5001/api/ulasan/get-all-ulasan").then(result => {
        const resp = JSON.stringify(result.data.success, null, 2)
        if (resp != false){
          setUlasanSemua(result.data.data);
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
  
    const setUlasan = event => {
      const newVal = event.target.value;
      setValUlasan(newVal);
    }
  
    const navToReg = () => {
      navigate('/register');
    }
  
    // const buttons = Array.from({ length: 5 }, (_, i) => {
    //   const ml = 52 + i * 6.6;
    //   return (
    //     <button
    //       key={i}
    //       onClick={() => isiIndeks(i + 1)}
    //       className={`absolute bg-contain bg-no-repeat opacity-[90%] hover:opacity-[100%] ml-[${ml}vw] mt-[43vw] bg-star${isi[i]} h-[5.6vw] w-[5.6vw]`}
    //     ></button>
    //   );
    // });
  
    const isiIndeks = (index) => {
      let jumlah = 0;
      const newIsi = [0, 0, 0, 0, 0];
      for (let x = 0; x < index; x++){
        newIsi[x] = 1;
        jumlah++;
      }
  
      setJumlahBintang(jumlah);
      setIsi(newIsi);
    };
  
    const navToLog = () => {
      navigate('/login');
    }
  
    const navToUlasan = () => {
      navigate('/ulasan')
    }
  
    const navToPesan = () => {
      navigate('/pesan')
    }
  
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
           onClick = {navToUlasan}
           className = "fixed z-10 opacity-[80%] hover:opacity-[100%] font-inconsolata text-[2vw] text-[white] bg-transparent top-[0.5vw] right-[18vw] w-[10vw] h-[4vw]">
            Ulasan
        </button>
        <button
           onClick = {navToPesan}
           className = "fixed z-10 opacity-[80%] hover:opacity-[100%] font-inconsolata text-[2vw] text-[white] bg-transparent top-[0.5vw] right-[29vw] w-[10vw] h-[4vw]">
            Pesan
        </button>
        <div className="relative bg-transparent object-center left-1/2 transform -translate-x-1/2 h-[25vw] w-[90vw] top-[10vw]">
          <div class="absolute bg-cover ml-[18vw] mr-[1vw] bg-no-repeat bg-tbr_full w-[17vw] h-[15vw]"></div>
          <div className="relative bg-transparent object-center left-[15vw] h-[10vw] w-[73vw] top-[2vw]">
            <h2 className="absolute font-inconsolata text-center left-1/2 transform -translate-x-1/2 font-semibold text-[#171E27] text-[4vw]">
              Selamat Datang, <span className="text-[#F4DF00] text-stroke-3"> {data?.username}!</span>
            </h2>
          </div>
          <button
            onClick = {navToPesan}
            className = "absolute rounded-[2vw] border-[0.3vw] border-[black] opacity-[80%] hover:opacity-[100%] font-inconsolata text-[3vw] font-bold text-[black] bg-[#F4DF00] left-1/2 transform -translate-x-1/2 bottom-0 w-[35vw] h-[7vw]">
              Buat Pesanan
          </button>
        </div>
  
        <div className="relative rounded-[2vw] bg-transparent object-center left-1/2 transform -translate-x-1/2 h-[60vw] w-[90vw] top-[23vw]">
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
          <button onClick={() => isiIndeks(1)} className={`absolute bg-contain bg-no-repeat opacity-[90%] hover:opacity-[100%] ml-[52vw] mt-[35vw] bg-star${isi[0]} h-[5.6vw] w-[5.6vw]`}></button>
          <button onClick={() => isiIndeks(2)} className={`absolute bg-contain bg-no-repeat opacity-[90%] hover:opacity-[100%] ml-[58.6vw] mt-[35vw] bg-star${isi[1]} h-[5.6vw] w-[5.6vw]`}></button>
          <button onClick={() => isiIndeks(3)} className={`absolute bg-contain bg-no-repeat opacity-[90%] hover:opacity-[100%] ml-[65.2vw] mt-[35vw] bg-star${isi[2]} h-[5.6vw] w-[5.6vw]`}></button>
          <button onClick={() => isiIndeks(4)} className={`absolute bg-contain bg-no-repeat opacity-[90%] hover:opacity-[100%] ml-[71.8vw] mt-[35vw] bg-star${isi[3]} h-[5.6vw] w-[5.6vw]`}></button>
          <button onClick={() => isiIndeks(5)} className={`absolute bg-contain bg-no-repeat opacity-[90%] hover:opacity-[100%] ml-[78.4vw] mt-[35vw] bg-star${isi[4]} h-[5.6vw] w-[5.6vw]`}></button>
          {/* <>{buttons}</> */}
          <form onSubmit={handleSubmit}>
            <textarea 
              onChange={setUlasan} 
              placeholder="Tulis ulasanmu di sini" 
              value={valUlasan} 
              className="absolute px-[1.5vw] py-[1vw] ml-[5vw] border-[0.2vw] border-[black] mt-[35vw] w-[45vw] h-[20vw] rounded-[2vw] font-inconsolata text-[2vw] focus:outline-none resize-none"
            />
            <button type="submit" className="absolute rounded-[2vw] border-[0.3vw] border-[black] opacity-[80%] hover:opacity-[100%] font-inconsolata text-[3vw] font-bold text-[black] bg-[#F4DF00] ml-[52vw] mt-[42vw] w-[32vw] h-[8vw]"> Kirim Ulasan </button>
  
            {bisa == 0 && <h1 className="absolute font-inconsolata text-[red] text-[1.5vw] ml-[52vw] mt-[51vw]">
              Berikan rating setidaknya 1 bintang!
            </h1>}
  
            {bisa == 1 && <h1 className="absolute font-inconsolata text-[green] text-[1.5vw] ml-[52vw] mt-[51vw]">
              Ulasan berhasil dikirim
            </h1>}
  
            {bisa == 2 && <h1 className="absolute font-inconsolata text-[red] text-[1.5vw] ml-[52vw] mt-[51vw]">
              Berikan ulasan dan rating setidaknya 1 bintang!
            </h1>}
  
            {bisa == 3 && <h1 className="absolute font-inconsolata text-[red] text-[1.5vw] ml-[52vw] mt-[51vw]">
              Isi ulasanmu!
            </h1>}
          </form>
        </div>
      </div>
    );
  }
  