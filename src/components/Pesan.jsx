import React, { useEffect, useState } from 'react';
import '../App.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Pesan() {
    const navigate = useNavigate();
    const [jumlahT, setJumlahT] = useState(1);
    const [isValid, setIsValid] = useState(true);
    const [zero, setZero] = useState(0);
    const [pilihanBumbu, setPilihanBumbu] = useState([0, 0, 0]); // indeks 0, 1, 2 untuk pedas, asin, bbq
    const [alamat, setAlamat] = useState("");
    const [harga, setHarga] = useState("Rp1.000")
    const [selesai, setSelesai] = useState(0);
    const [data, setData] = useState([]);
    const [bumbu, setBumbu] = useState("Original");
    const [id, setId] = useState("");
    const konv = {0: " + Pedas", 1: " + Asin", 2: " + BBQ"}
  
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
      e.preventDefault();
      if (alamat.trim().length > 0 && isValid == 1 && zero == 0){
        axios.post("https://tahu-bulat-ramid-app.vercel.app/api/pesanan/add-pesanan", {jumlah: jumlahT, bumbu: pilihanBumbu, alamat: alamat}).then((response) => {
          const resp = JSON.stringify(response.data.success, null, 2)
          if (resp != false){
            setId(response.data.id);
            let hasil = "";
            for (let x = 0; x < 3; x++){
              if (pilihanBumbu[x] == 1){
                hasil += konv[x];
              }
            }
  
            if (hasil.length > 0){
              setBumbu(hasil.substring(3));
            }
  
            setSelesai(1);
          }else {
            alert("tidak bisa");
            navigate('/');
          }
        }).catch((err) => {
          alert(err);
        });
      }
    }
  
    useEffect(() => {
      axios.get("https://tahu-bulat-ramid-app.vercel.app/api/user/get-my-info").then(result => {
        const resp = JSON.stringify(result.data.success, null, 2)
        if (resp != false){
          setData(result.data.data);
        }else if (resp == false){
          alert(resp);
          navigate('/');
        }
      })
  
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
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      if (value > 0){
        let harga_raw = value * 1000;
        let harga_raw_s = harga_raw.toString();
        let hasil_kebalik = "";
        let k = 0;
        for (let x = harga_raw_s.length - 1; x >= 0; x--){
          hasil_kebalik += harga_raw_s[x];
          if ((k + 1) % 3 == 0 && x > 0){
            hasil_kebalik += '.';
          }
  
          k++;
        }
  
        let hasil = "Rp";
        for (let x = hasil_kebalik.length - 1; x >= 0; x--){
          hasil += hasil_kebalik[x];
        }
  
        setHarga(hasil);
      }
  
      if (/^\d*$/.test(value)) {
        setJumlahT(value);
        if (value.length > 1 && value[0] == '0'){
          setIsValid(false);
        }else{
          setIsValid(true);
        }
  
        if (value == 0){
          setZero(1);
        }else{
          setZero(0);
        }
      } else {
        setIsValid(false);
      }
    };
  
    const navToLog = () => {
      navigate('/login');
    }
  
    const navToUlasan = () => {
      navigate('/ulasan')
    }
  
    const navToHome = () => {
      navigate('/home')
    }
  
    const jumlahTahu = () => {
      navigate('/home')
    }
  
    const Cek1 = () => {
      const pilihan = [0, 0, 0];
      for (let x = 0; x < 3; x++){
        pilihan[x] = pilihanBumbu[x]
      }
  
      pilihan[0] = !pilihan[0];
      setPilihanBumbu(pilihan);
    }
  
    const Cek2 = () => {
      const pilihan = [0, 0, 0];
      for (let x = 0; x < 3; x++){
        pilihan[x] = pilihanBumbu[x]
      }
  
      pilihan[1] = !pilihan[1];
      setPilihanBumbu(pilihan);
    }
  
    const Cek3 = () => {
      const pilihan = [0, 0, 0];
      for (let x = 0; x < 3; x++){
        pilihan[x] = pilihanBumbu[x]
      }
  
      pilihan[2] = !pilihan[2];
      setPilihanBumbu(pilihan);
    }
  
    const Alamat = event => {
      const newVal = event.target.value;
      setAlamat(newVal);
    }
  
    const CopyKeWa = () => {
      const tempTextarea = document.createElement('textarea');
      tempTextarea.value = 
      `
Pesanan Tahu Bulat
Untuk: ${data?.username} (id: ${id})
Jumlah: ${jumlahT}
Bumbu: ${bumbu}
Alamat: ${alamat}
Total harga: ${harga}
      `;
      document.body.appendChild(tempTextarea);
      tempTextarea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextarea);
      const url = `https://wa.me/+6281295605212`;
      window.open(url, '_blank');
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
           onClick = {navToHome}
           className = "fixed z-10 opacity-[80%] hover:opacity-[100%] font-inconsolata text-[2vw] text-[white] bg-transparent top-[0.5vw] right-[29vw] w-[10vw] h-[4vw]">
            Beranda
        </button>
        {selesai == 0 && <div className="relative bg-transparent object-center left-1/2 transform -translate-x-1/2 h-[15vw] w-[90vw] top-[5vw]">
          <div class="absolute bg-cover ml-[18vw] mr-[1vw] bg-no-repeat bg-tbr_full w-[17vw] h-[15vw]"></div>
          <div className="relative bg-transparent object-center left-[15vw] h-[10vw] w-[73vw] top-[2vw]">
            <h2 className="absolute font-inconsolata text-center left-1/2 transform -translate-x-1/2 font-semibold text-[#171E27] mt-[3vw] ml-[1vw] text-[4vw]">
              Pesan Tahu Bulat
            </h2>
          </div>
        </div>}
  
        {selesai == 0 && <div className="relative rounded-[2vw] bg-transparent object-center left-1/2 transform -translate-x-1/2 h-[65vw] w-[90vw] top-[7.5vw]">
            <h1 className="absolute font-inconsolata text-[#171E27] text-[3vw] ml-[22vw]">
              Jumlah
            </h1>
            <h1 className="absolute font-inconsolata text-[#171E27] text-[3vw] mt-[7vw] ml-[22vw]">
              Bumbu
            </h1>
            <h1 className="absolute font-inconsolata text-[#171E27] font-light text-[2.5vw] mt-[7.5vw] ml-[40vw]">
              pedas
            </h1>
            <h1 className="absolute font-inconsolata text-[#171E27] font-light text-[2.5vw] mt-[12.5vw] ml-[40vw]">
              asin
            </h1>
            <h1 className="absolute font-inconsolata text-[#171E27] font-light text-[2.5vw] mt-[17.5vw] ml-[40vw]">
              bbq
            </h1>
            <h1 className="absolute font-inconsolata text-[#171E27] text-[3vw] ml-[22vw] mt-[24vw]">
              Alamat
            </h1>
            <h1 className="absolute font-inconsolata text-[#171E27] text-[3vw] ml-[22vw] mt-[45vw]">
              Total harga: <span> {harga} </span> 
            </h1>
            <button onClick={Cek1} className={`absolute bg-contain bg-no-repeat mt-[7.5vw] ml-[35vw] ${pilihanBumbu[0] ? "bg-cek1" : "bg-cek0"} h-[4vw] w-[4vw] z-5`}></button>
            <button onClick={Cek2} className={`absolute bg-contain bg-no-repeat mt-[12.5vw] ml-[35vw] ${pilihanBumbu[1] ? "bg-cek1" : "bg-cek0"}  h-[4vw] w-[4vw] z-5`}></button>
            <button onClick={Cek3} className={`absolute bg-contain bg-no-repeat mt-[17.5vw] ml-[35vw] ${pilihanBumbu[2] ? "bg-cek1" : "bg-cek0"}  h-[4vw] w-[4vw] z-5`}></button>
            {isValid == 0 && <h1 className="absolute font-inconsolata text-[red] text-[1.5vw] ml-[42vw] mt-[1vw]">
              Masukkan banyak tahu bulatnya dalam bentuk angka yang valid!
            </h1>}
            {zero == 1 && isValid == 1 && <h1 className="absolute font-inconsolata text-[red] text-[1.5vw] ml-[42vw] mt-[1vw]">
              Jumlah tidak boleh 0
            </h1>}
            {(zero == 1 || isValid == 0) && alamat.trim().length > 0 && <h1 className="absolute font-inconsolata left-1/2 transform -translate-x-1/2 text-[red] text-[2vw] mt-[59vw]">
              Jumlah belum valid!
            </h1>}
            {((zero == 0 && isValid == 1) && alamat.trim().length == 0) && <h1 className="absolute font-inconsolata left-1/2 transform -translate-x-1/2 text-[red] text-[2vw] mt-[59vw]">
              Isi alamatmu!
            </h1>}
            {((zero == 1 || isValid == 0) && alamat.trim().length == 0) && <h1 className="absolute font-inconsolata left-1/2 transform -translate-x-1/2 text-[red] text-[2vw] mt-[59vw]">
              Isi alamatmu dan jumlah yang valid!
            </h1>}
            <form onSubmit={handleSubmit}>
              <input onChange = {handleInputChange} placeholder="0" value = {jumlahT} className={`absolute border-[0.2vw] ${isValid && !zero ? "border-black" : "border-red-500"} text-center ml-[35vw] w-[6vw] h-[3.5vw] mt-[0.5vw] px-[0.9vw] rounded-[0.5vw] font-inconsolata text-[2vw] focus:outline-none`}/>
              <textarea 
                onChange={Alamat} 
                placeholder="Tulis alamatmu di sini
(cth: Jl. Skibidi E No. 969, RT 69, RW 69, Kel. Ohio, Kec. Mango, Kota Sigma)" 
                value={alamat} 
                className={`absolute px-[1.5vw] py-[1vw] ml-[22vw] mt-[30vw] border-[0.2vw] ${alamat.trim().length == 0 ? "border-[red]" : "border-[black]"} w-[45vw] h-[13vw] rounded-[2vw] font-inconsolata text-[2vw] focus:outline-none resize-none`}
              />
              <button type="submit" className="absolute rounded-[2vw] border-[0.3vw] border-[black] opacity-[80%] hover:opacity-[100%] font-inconsolata text-[3vw] font-bold text-[black] bg-[#F4DF00] left-1/2 transform -translate-x-1/2 mt-[52vw] w-[25vw] h-[6vw]"> PESAN </button>
            </form>
        </div>}
  
        {selesai == 1 &&
          <div className='absolute bg-no-repeat h-screen min-w-screen left-1/2 transform -translate-x-1/2 bg-center bg-cover bg-transparent'>
            <div class="absolute font-light px-[4vw] py-[1vw] font-inconsolata scroll-container left-1/2 transform -translate-x-1/2 text-[2vw] w-[80vw] h-[38vw] selection:overflow-x-hidden overflow-y-scroll mt-[5vw] bg-transparent rounded z-40">
              <h2 className="absolute font-inconsolata text-center left-1/2 transform -translate-x-1/2 text-[#171E27] text-[4vw]">
                Pesanan Berhasil!
              </h2>
              <h3 className='absolute mt-[28vw] ml-[8vw] font-light font-inconsolata text-[1vw]'>
                Note: Tekan tombol Copy dan pesan akan tercopy secara otomatis
              </h3>
            </div>
            <div className='absolute left-1/2 transform -translate-x-1/2 text-[2vw] w-[60vw] h-[20.5vw] bg-[black] opacity-[20%] mt-[13vw] rounded-[2vw] z-30'></div>
            <div class="absolute font-light px-[4vw] font-inconsolata scroll-container left-1/2 transform -translate-x-1/2 text-[2vw] w-[60vw] h-[18vw] selection:overflow-x-hidden overflow-y-scroll bg-transparent mt-[14vw] rounded z-40">
                  Pesanan Tahu Bulat <br></br>
                  Untuk: {data?.username} (id: {id}) <br></br>
                  Jumlah: {jumlahT} <br></br>
                  Bumbu: {bumbu} <br></br>
                  Alamat: {alamat} <br></br>
                  Total harga: {harga} <br></br>
            </div>
            <button onClick={CopyKeWa} className="absolute rounded-[2vw] border-[0.3vw] border-[black] opacity-[90%] hover:opacity-[100%] font-inconsolata text-[3vw] font-bold text-[black] bg-[#F4DF00] left-1/2 transform -translate-x-1/2 mt-[38vw] w-[25vw] z-50 h-[6vw]"> 
              COPY + &nbsp; &nbsp;
            </button>
            <button onClick={CopyKeWa} className='absolute bg-contain bg-no-repeat mt-[39vw] w-[4vw] h-[4vw] ml-[3vw] z-50 bg-wa'></button>
          </div>
        }
      </div>
    );
  }