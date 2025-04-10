import React from "react";
import Image from "next/image";

const RegisterModal = ({
  handleShowModalRegister,
}: {
  handleShowModalRegister: () => void;
}) => {
  return (
    <div
      className="w-full h-full absolute top-0 backdrop-filter backdrop-brightness-75 backdrop-blur-md flex justify-center items-center"
      onClick={handleShowModalRegister}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg shadow px-16"
      >
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
          onClick={handleShowModalRegister}
        >
             <Image 
                        src="https://www.svgrepo.com/show/521106/close.svg"
                        alt="Close"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      ></Image>
          <span className="sr-only">Close popup</span>
        </button>

        <div className="p-5">
          <h3 className="text-2xl mb-0.5 font-medium"></h3>
          <p className="mb-4 text-sm font-normal text-gray-800"></p>

          <div className="text-center">
            <p className="mb-3 text-2xl font-semibold text-blue-500">
              Crear una cuenta
            </p>
          </div>

          <div className="mt-7 flex justify-center gap-4">
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white p-2 text-sm font-medium outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <Image
                width={100}
                height={100}
                src="https://www.svgrepo.com/show/512321/google-178.svg"
                alt="Google"
                className="h-[18px] w-[18px]"
              />
            </button>

            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white p-2 text-sm font-medium outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <Image
                width={100}
                height={100}
                src="https://www.svgrepo.com/show/512419/linkedin-161.svg"
                alt="Linkedin"
                className="h-[18px] w-[18px] "
              />
            </button>
          </div>
          <p className="mt-5 text-sm leading-4 text-slate-600 mb-6 text-center">
            O usa tu email para registrarte
          </p>

          <form className="w-full">
            <label htmlFor="email" className="sr-only">
              Nombre Completo
            </label>
            <div className="relative flex items-center">
            <Image
                src="https://www.svgrepo.com/show/522440/profile.svg"
                alt="Google"
                width={100}
                height={100}
                className="absolute h-[18px] w-[18px] ml-3 " 
            ></Image>
            <input
              name="fullname"
              type="fullname"
              autoComplete="fullname"
              required
              className="block w-full rounded-lg border border-gray-300 pr-3 pl-10 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              placeholder="Nombre Completo"
            />
            </div>
            <label htmlFor="email" className="sr-only">
              Correo electrónico
            </label>
            <div className="relative flex items-center mt-4">
            <Image
                src="https://www.svgrepo.com/show/521128/email-1.svg"
                alt="Google"
                width={100}
                height={100}
                className="absolute h-[18px] w-[18px] ml-3" 
            ></Image>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-lg border border-gray-300 pr-3 pl-10 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              placeholder="Correo electrónico"
            />
            </div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <div className="relative flex items-center mt-4">
            <Image
                src="https://www.svgrepo.com/show/532323/lock-alt.svg"
                alt="Google"
                width={100}
                height={100}
                className="absolute h-[18px] w-[18px] ml-3" 
            ></Image>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-lg border border-gray-300 pr-3 pl-10 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              placeholder="Contraseña"
            />
            </div>
            <button
              type="submit"
              className="mt-4 mb-3 inline-flex w-full items-center justify-center rounded-lg bg-blue-500 p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
