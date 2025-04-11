'use client'
import Image from "next/image"
import { useEffect, useState } from "react"

export default function DashboardHeader() {
  const [userName, setUserName] = useState("Cargando...")
  const [userId, setUserId] = useState(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("access_token")
        if (!token) {
          throw new Error("No token found in localStorage.")
        }

        const response = await fetch("http://localhost:8000/api/user-info/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUserName(data.username)
          setUserId(data.id)
          console.log("User ID:", data.id)
        } else {
          setUserName("Error al obtener usuario")
        }
      } catch {
        setUserName("Error al conectar con el servidor")
      }
    }

    fetchUserInfo()
  }, []) // Este useEffect se ejecuta cuando el componente se monta

  useEffect(() => {
    const fetchUserImage = async () => {
      if (!userId) return; // No hacer la solicitud si no se tiene el userId
    
      try {
        const token = localStorage.getItem("access_token")
        if (!token) {
          throw new Error("No token found in localStorage.")
        }
    
        const response = await fetch(`http://localhost:8000/api/users/${userId}/profile_image/`, {
          method: "GET",  
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
    
        if (response.ok) {
          const data = await response.json()
          const absoluteUrl = `http://localhost:8000${data.profile_image_url}`;
          
          setProfileImageUrl(absoluteUrl);
        } else {
          setProfileImageUrl(null)  // Si no hay imagen, lo dejamos en null
        }
      } catch {
        setProfileImageUrl(null)  // Si hay error, dejamos la imagen como null
      }
    }
    

    fetchUserImage()
  }, [userId]) // Se ejecuta cuando el userId cambia

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-black">
          Hola, {userName}
        </h1>
        <p className="text-lg text-gray-500 mt-1">
          Te damos la bienvenida a tu panel de análisis inteligente.
        </p>
      </div>
      <Image
        src={profileImageUrl || "/favicon.ico"}  
        alt="Perfil del usuario"
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
    </div>
  )
}
