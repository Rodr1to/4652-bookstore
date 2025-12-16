import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { LibroAPI } from '../types/Estructuras';

const AdminLibrosPage: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
   
  const [libros, setLibros] = useState<LibroAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
   
  const initialForm = {
    id: 0,
    isbn: '',
    titulo: '',
    autor: '',
    editorial: '',
    precio: '',
    stock: 0,
    id_categoria: 1,
    sinopsis: '',
    fecha_publicacion: new Date().toISOString().split('T')[0],
    url_portada: ''
  };
   
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      cargarLibros();
    }
  }, [isAuthenticated]);

  const cargarLibros = async () => {
    setLoading(true);
    try {
      // URL de Node.js (Traemos 100 libros para el admin)
      const response = await fetch('https://rodvalverde.alwaysdata.net/api/libros?filas_pagina=100');
      const data = await response.json();
      setLibros(data.libros);
    } catch (error) {
      console.error("Error cargando libros", error);
    } finally {
      setLoading(false);
    }
  };

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // URL de Node.js (mismo endpoint, cambia el método)
    const url = 'https://rodvalverde.alwaysdata.net/api/libros';
    const method = modoEdicion ? 'PUT' : 'POST';

    await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' }, // Header JSON OBLIGATORIO
      body: JSON.stringify(form)
    });
    
    setModalOpen(false);
    cargarLibros(); 
  };

  const eliminarLibro = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este libro de la base de datos?')) {
      await fetch('https://rodvalverde.alwaysdata.net/api/libros', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      cargarLibros();
    }
  };

  const abrirModalEditar = (libro: LibroAPI) => {
    setForm({ ...libro, precio: libro.precio.toString() });
    setModoEdicion(true);
    setModalOpen(true);
  };

  const abrirModalCrear = () => {
    setForm(initialForm);
    setModoEdicion(false);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-jakarta p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-brand-dark">Panel de Administración</h1>
                <p className="text-gray-600">Bienvenido, <strong>{user?.nombres}</strong></p>
            </div>
            <div className="flex gap-4">
                <button onClick={abrirModalCrear} className="bg-brand-green text-white px-6 py-2 rounded-lg shadow hover:bg-opacity-90 font-bold transition-all">
                    + Nuevo Libro
                </button>
                <button onClick={logout} className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-opacity-90 font-bold transition-all">
                    Cerrar Sesión
                </button>
            </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-xl rounded-lg border border-gray-200">
            <table className="min-w-full">
                <thead className="bg-brand-light-gray border-b">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-brand-dark">ID</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-brand-dark">Título</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-brand-dark">Autor</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-brand-dark">Precio</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-brand-dark">Stock</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-brand-dark">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {loading ? (
                        [...Array(5)].map((_, i) => (
                            <tr key={i} className="animate-pulse">
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-8"></div></td>
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
                                <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-24"></div></td>
                            </tr>
                        ))
                    ) : (
                        libros.map((libro) => (
                            <tr key={libro.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-900">{libro.id}</td>
                                <td className="px-6 py-4 text-sm font-bold text-brand-dark">{libro.titulo}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{libro.autor}</td>
                                <td className="px-6 py-4 text-sm text-brand-green font-bold">S/ {libro.precio}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{libro.stock}</td>
                                <td className="px-6 py-4 text-sm flex gap-3">
                                    <button onClick={() => abrirModalEditar(libro)} className="text-blue-600 hover:text-blue-800 font-semibold">Editar</button>
                                    <button onClick={() => eliminarLibro(libro.id)} className="text-red-500 hover:text-red-700 font-semibold">Eliminar</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>

        {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
                <div className="bg-white p-8 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-brand-dark border-b pb-2">
                        {modoEdicion ? 'Editar Libro' : 'Nuevo Libro'}
                    </h2>
                    <form onSubmit={manejarSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="border p-3 rounded focus:ring-2 focus:ring-brand-green outline-none" placeholder="ISBN" value={form.isbn} onChange={e => setForm({...form, isbn: e.target.value})} required />
                        <input className="border p-3 rounded focus:ring-2 focus:ring-brand-green outline-none" placeholder="Título" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} required />
                        <input className="border p-3 rounded focus:ring-2 focus:ring-brand-green outline-none" placeholder="Autor" value={form.autor} onChange={e => setForm({...form, autor: e.target.value})} required />
                        <input className="border p-3 rounded focus:ring-2 focus:ring-brand-green outline-none" placeholder="Editorial" value={form.editorial} onChange={e => setForm({...form, editorial: e.target.value})} />
                        
                        <div>
                            <label className="text-xs text-gray-500">Precio</label>
                            <input className="w-full border p-3 rounded focus:ring-2 focus:ring-brand-green outline-none" type="number" step="0.01" placeholder="Precio" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} required />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Stock</label>
                            <input className="w-full border p-3 rounded focus:ring-2 focus:ring-brand-green outline-none" type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: parseInt(e.target.value)})} required />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="text-xs text-gray-500">Categoría (1-8)</label>
                            <input className="w-full border p-3 rounded focus:ring-2 focus:ring-brand-green outline-none" type="number" placeholder="ID Categoría" value={form.id_categoria} onChange={e => setForm({...form, id_categoria: parseInt(e.target.value)})} required />
                        </div>
                        
                        <textarea className="border p-3 rounded col-span-1 md:col-span-2 focus:ring-2 focus:ring-brand-green outline-none" placeholder="Sinopsis" rows={3} value={form.sinopsis} onChange={e => setForm({...form, sinopsis: e.target.value})} />
                        
                        <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-2 bg-gray-300 text-gray-700 rounded font-bold hover:bg-gray-400 transition-colors">Cancelar</button>
                            <button type="submit" className="px-6 py-2 bg-brand-dark text-white rounded font-bold hover:bg-opacity-90 transition-colors">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminLibrosPage;