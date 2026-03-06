'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [servicios, setServicios] = useState([]);
  const [config, setConfig] = useState({ whatsapp: '', instagram: '' });
  const [cargando, setCargando] = useState(true);

  const SUPABASE_URL = 'https://evgumejfkpyktezdodah.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_TVkTKUFKX5Bladdqb1flVQ_29NYsD56';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Traer Servicios
        const resSrv = await fetch(`${SUPABASE_URL}/rest/v1/servicios`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
        });
        const dataSrv = await resSrv.json();
        setServicios(dataSrv.sort((a: any, b: any) => a.id - b.id));

        // Traer Configuración (WhatsApp e Instagram)
        const resCfg = await fetch(`${SUPABASE_URL}/rest/v1/configuracion?id=eq.1`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
        });
        const dataCfg = await resCfg.json();
        if (dataCfg[0]) setConfig(dataCfg[0]);
        
        setCargando(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const guardarConfig = async () => {
    alert("Actualizando datos de contacto...");
    const wsp = (document.getElementById('wsp-input') as HTMLInputElement).value;
    const ig = (document.getElementById('ig-input') as HTMLInputElement).value;
    
    await fetch(`${SUPABASE_URL}/rest/v1/configuracion?id=eq.1`, {
      method: 'PATCH',
      headers: { 
        apikey: SUPABASE_KEY, 
        Authorization: `Bearer ${SUPABASE_KEY}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ whatsapp: wsp, instagram: ig })
    });
    alert("¡Contacto actualizado con éxito!");
  };

  const actualizarServicio = async (id: string, nuevoPrecio: string, nuevaDuracion: string) => {
    alert("Guardando cambios en el masaje...");
    await fetch(`${SUPABASE_URL}/rest/v1/servicios?id=eq.${id}`, {
      method: 'PATCH',
      headers: { 
        apikey: SUPABASE_KEY, 
        Authorization: `Bearer ${SUPABASE_KEY}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ 
        precio: parseFloat(nuevoPrecio), 
        duracion: nuevaDuracion 
      })
    });
    alert("¡Servicio actualizado!");
  };

  if (cargando) return <div className="
