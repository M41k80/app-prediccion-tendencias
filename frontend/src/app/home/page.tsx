import React from "react";
import NavBar from "@/components/NavBar";
import FooterHome from "@/components/FooterHome";
import InfoCard from "@/components/InfoCard";

const Home = () => {
  return (
    <div className="bg-white text-black p-8">
      <NavBar />
      <div className='flex mt-12 gap-4'>
        <div className="">
          <div className="font-bold text-[74px]">Sistema de analisis predictivo de tendencias de mercado</div>
          <div className="text-[36px]">
            Descubrí hacia dónde se dirigen los mercados.Usá nuestra herramienta
            para obtener predicciones en tiempo real basadas en inteligencia
            artificial.
          </div>
          <div className="flex justify-between m-9">
            <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded text-[36px]'>Registrarse</button>
            <button className='hover:bg-stone-200 text-black py-2 px-4 rounded text-[36px] border'>Explorar planes</button>
          </div>
        </div>
        <div><img src='https://s3-alpha-sig.figma.com/img/8593/6df1/ecb6f53f485edc6892b4d3baafba41e3?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uKp~GMhuFvyEF8QwZVzJGhJyMBw0F0F1IDGxY7i3K-gq6vlHKj1rv5iSi-9fMcLg2owyCk3wAtRcceVewP34hERzXGTN0BWKkYE9aFa6XLq5hxbQe0ofjrzHUYvh~9wGzAzQYLUR~E7M3C0FD1WSeQ76b3O9no9Anu0LchnH8SDXaaaqaCwtZxWUkHHt1eENwz4-uw9lUIj~0eGYla-N7cJMUnwbfAyj7YkRCqzMe5Eaz0fKz4jtxTH33jSbA9qEuWnxvDN3nRSSqDzTjl9yXv7jmCNMZ50-c4ub1qh26a2-aq9Jl8sh9N~aLFHq7oagEFzh7oHACNZ6rCFvqradBg__'></img></div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="h-32 border rounded-md shadow-sm bg-white">
            Analisis Personalizados
        </div>
        <div className="h-32 border rounded-md shadow-sm bg-white">
            Datos en tiempo real
        </div>
        <div className="h-32 border rounded-md shadow-sm bg-white">
            Comparacion de variables
        </div>
      </div>
      <FooterHome />
    </div>
  );
};

export default Home;
