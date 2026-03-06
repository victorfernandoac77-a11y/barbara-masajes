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
      // Ordenamos por ID para que siempre aparezcan en el mismo orden
      const serviciosOrdenados = data.sort((a: any, b: any) => a.id.localeCompare(b.id));
      setServicios(serviciosOrdenados);
      setCargando(false);
    });
  }, []);

  const actualizarServicio = async (id: string, nuevoPrecio: string, nuevaDuracion: string) => {
    alert("Guardando cambios...");
    await fetch(`${SUPABASE_URL}/rest/v1/servicios?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ 
        precio: parseFloat(nuevoPrecio),
        duracion: nuevaDuracion 
      })
    });
    alert("¡Actualizado con éxito!");
  };

  if (cargando) return <div className="p-10 text-center font-bold text-xl">Cargando panel de Bárbara...</div>;

  return (
    <div className="p-5 max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Panel de Control</h1>
      {servicios.map((srv: any) => (
        <div key={srv.id} className="border-2 border-gray-100 p-5 mb-5 rounded-xl shadow-md bg-white">
          <h2 className="font-semibold text-xl mb-4 text-rose-600">{srv.nombre}</h2>
          
          <div className="flex flex-col gap-4 mb-5">
            <div>
              <label className="text-sm text-gray-500 font-semibold mb-1 block">Duración (ej: 60 min)</label>
              <input
                type="text"
                defaultValue={srv.duracion}
                id={`duracion-${srv.id}`}
                className="border-2 border-gray-200 p-3 rounded-lg w-full text-lg focus:border-rose-400 outline-none"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-500 font-semibold mb-1 block">Precio ($)</label>
              <input
                type="number"
                defaultValue={srv.precio}
                id={`precio-${srv.id}`}
                className="border-2 border-gray-200 p-3 rounded-lg w-full text-lg font-medium focus:border-rose-400 outline-none"
              />
            </div>
          </div>

          <button
            onClick={() => {
              const valPrecio = (document.getElementById(`precio-${srv.id}`) as HTMLInputElement).value;
              const valDuracion = (document.getElementById(`duracion-${srv.id}`) as HTMLInputElement).value;
              actualizarServicio(srv.id, valPrecio, valDuracion);
            }}
            className="bg-black text-white px-5 py-3 rounded-lg font-bold shadow-sm active:scale-95 transition-transform w-full"
          >
            Guardar Cambios
          </button>
        </div>
      ))}
    </div>
  );
}
