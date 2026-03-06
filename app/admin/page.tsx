'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Tus llaves de conexión directa
  const SUPABASE_URL = 'https://evgumejfkpyktezdodah.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_TVkTKUFKX5Bladdqb1flVQ_29NYsD56';

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/servicios`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setServicios(data);
      setCargando(false);
    });
  }, []);

  const actualizarPrecio = async (id: string, nuevoPrecio: string) => {
    alert("Guardando nuevo precio...");
    await fetch(`${SUPABASE_URL}/rest/v1/servicios?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ precio: parseFloat(nuevoPrecio) })
    });
    alert("¡Precio actualizado con éxito!");
  };

  if (cargando) return <div className="p-10 text-center font-bold text-xl">Cargando panel de Bárbara...</div>;

  return (
    <div className="p-5 max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Panel de Control</h1>
      {servicios.map((srv: any) => (
        <div key={srv.id} className="border-2 border-gray-100 p-5 mb-4 rounded-xl shadow-md bg-white">
          <h2 className="font-semibold text-xl mb-1">{srv.nombre}</h2>
          <p className="text-gray-500 text-sm mb-4">Duración: {srv.duracion}</p>
          <div className="flex gap-3">
            <input
              type="number"
              defaultValue={srv.precio}
              id={`precio-${srv.id}`}
              className="border-2 border-gray-200 p-2 rounded-lg w-full text-lg font-medium"
            />
            <button
              onClick={() => {
                const val = (document.getElementById(`precio-${srv.id}`) as HTMLInputElement).value;
                actualizarPrecio(srv.id, val);
              }}
              className="bg-black text-white px-5 py-2 rounded-lg font-semibold shadow-sm active:scale-95 transition-transform"
            >
              Guardar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
