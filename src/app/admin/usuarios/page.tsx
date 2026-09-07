'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Shield, Plus, Check, UserCheck } from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPERVISOR' | 'VENDEDOR';
  isActive: boolean;
}

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<AdminUser[]>([
    { id: '1', name: 'Adan Adellan', email: 'adan@celularhd.com', role: 'ADMIN', isActive: true },
    { id: '2', name: 'Wilmer', email: 'wilmer@celularhd.com', role: 'ADMIN', isActive: true },
    { id: '3', name: 'Asesor Comercial HD', email: 'vendedor@celularhd.com', role: 'VENDEDOR', isActive: true },
  ]);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'ADMIN' | 'SUPERVISOR' | 'VENDEDOR'>('VENDEDOR');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newUser: AdminUser = {
      id: Date.now().toString(),
      name: newName,
      email: newEmail,
      role: newRole,
      isActive: true,
    };

    setUsers([...users, newUser]);
    setNewName('');
    setNewEmail('');
  };

  const handleRoleChange = (userId: string, role: 'ADMIN' | 'SUPERVISOR' | 'VENDEDOR') => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role } : u)));
  };

  const handleToggleActive = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u)));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition mb-3">
          <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Gestión de Usuarios y Roles
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Administra el acceso para Adan, Wilmer y asesores de venta (Roles: ADMIN, SUPERVISOR, VENDEDOR)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Users List */}
        <div className="lg:col-span-8 space-y-3">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800">
            Usuarios Registrados ({users.length})
          </h2>

          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{user.name}</span>
                    <span className={'px-2 py-0.5 rounded text-[10px] font-black border ' + (user.role === 'ADMIN' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20')}>
                      {user.role}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{user.email}</div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                    className="py-1.5 px-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-500"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPERVISOR">SUPERVISOR</option>
                    <option value="VENDEDOR">VENDEDOR</option>
                  </select>

                  <button
                    onClick={() => handleToggleActive(user.id)}
                    className={'px-3 py-1.5 rounded-xl text-xs font-bold transition ' + (user.isActive ? 'bg-slate-800 text-emerald-400 hover:bg-slate-700' : 'bg-red-950/40 text-red-400 border border-red-800/40')}
                  >
                    {user.isActive ? 'Activo' : 'Inactivo'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create User Form */}
        <div className="lg:col-span-4">
          <form
            onSubmit={handleCreateUser}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl"
          >
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-400" /> Crear Usuario
            </h3>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Nombre</label>
              <input
                type="text"
                required
                placeholder="Nombre del usuario"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Correo Electrónico</label>
              <input
                type="email"
                required
                placeholder="correo@celularhd.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Rol Asignado</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-500"
              >
                <option value="VENDEDOR">VENDEDOR (Atención y Cotizaciones)</option>
                <option value="SUPERVISOR">SUPERVISOR (Control de catálogo)</option>
                <option value="ADMIN">ADMIN (Acceso Total)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition cursor-pointer mt-2"
            >
              Guardar Usuario
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
