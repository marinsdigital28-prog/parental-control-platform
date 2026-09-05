'use client'

import { useState } from 'react'
import {
  Shield,
  Smartphone,
  Clock,
  MapPin,
  Bell,
  Users,
  Settings,
  LogOut,
  Plus,
  Battery,
  Wifi,
  WifiOff,
  ChevronRight,
  Lock,
  Eye,
} from 'lucide-react'

const mockDevices = [
  {
    id: '1',
    name: 'Celular do João',
    status: 'online' as const,
    battery: 74,
    usageToday: '2h 37min',
    model: 'Samsung Galaxy A54',
    lastSync: 'há 2 min',
  },
  {
    id: '2',
    name: 'Tablet da Maria',
    status: 'offline' as const,
    battery: 23,
    usageToday: '1h 12min',
    model: 'Lenovo Tab M10',
    lastSync: 'há 3 horas',
  },
]

export default function HomePage() {
  const [view, setView] = useState<'landing' | 'login' | 'dashboard'>('landing')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (view === 'landing') {
    return (
      <div className="min-h-screen">
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900">Guardian</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setView('login')} className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2">Entrar</button>
              <button onClick={() => setView('login')} className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Criar conta</button>
            </div>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
            <Lock className="w-3.5 h-3.5" /> Transparente · Seguro · LGPD
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Controle parental simples, transparente e seguro
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
            Acompanhe o uso de dispositivos da família, defina limites de tempo e receba alertas — sem espiar, sem spyware, só com APIs oficiais do Android.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setView('login')} className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">Começar agora</button>
            <button onClick={() => setView('dashboard')} className="bg-white text-slate-700 font-semibold px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition">Ver demo do painel</button>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: 'Tempo de uso real', desc: 'Estatísticas oficiais do Android. Sem dados inventados.' },
              { icon: MapPin, title: 'Localização autorizada', desc: 'Só com permissão explícita. Transparência total.' },
              { icon: Bell, title: 'Alertas inteligentes', desc: 'Bateria baixa, limite atingido, solicitações de app.' },
              { icon: Smartphone, title: 'Pareamento seguro', desc: 'Código temporário + QR. Uso único e com expiração.' },
              { icon: Eye, title: 'Sem spyware', desc: 'Nada de keylogger, câmera oculta ou leitura de mensagens.' },
              { icon: Users, title: 'Famílias', desc: 'Vários responsáveis e vários dispositivos sob o mesmo teto.' },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
          Guardian · Controle parental transparente · 2026
        </footer>
      </div>
    )
  }

  if (view === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Entrar no Guardian</h1>
            <p className="text-slate-600 mt-1">Acesse o painel do responsável</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Senha</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <button onClick={() => setView('dashboard')} className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition">Entrar</button>
            <p className="text-center text-sm text-slate-500">Demo — qualquer e-mail/senha funciona por enquanto</p>
          </div>
          <button onClick={() => setView('landing')} className="mt-6 w-full text-sm text-slate-500 hover:text-slate-700">← Voltar</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center gap-2 px-5 border-b border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-900">Guardian</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {[
            { icon: Smartphone, label: 'Dispositivos', active: true },
            { icon: Clock, label: 'Tempo de uso' },
            { icon: MapPin, label: 'Localização' },
            { icon: Bell, label: 'Alertas' },
            { icon: Users, label: 'Família' },
            { icon: Settings, label: 'Configurações' },
          ].map((item) => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
              item.active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
            }`}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-200">
          <button onClick={() => setView('landing')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div>
            <h1 className="font-semibold text-slate-900">Olá, Responsável</h1>
            <p className="text-xs text-slate-500">Família Silva</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-3.5 py-2 rounded-xl hover:bg-blue-700 transition">
            <Plus className="w-4 h-4" /> Adicionar dispositivo
          </button>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Online', value: '1', color: 'text-emerald-600' },
              { label: 'Offline', value: '1', color: 'text-slate-500' },
              { label: 'Uso hoje', value: '3h 49min', color: 'text-blue-600' },
              { label: 'Alertas', value: '2', color: 'text-amber-600' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{s.label}</p>
                <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-semibold text-slate-900 mb-4">Dispositivos</h2>
          <div className="space-y-3">
            {mockDevices.map((device) => (
              <div key={device.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 hover:shadow-md transition cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900 truncate">{device.name}</h3>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      device.status === 'online' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {device.status === 'online' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                      {device.status === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{device.model} · Uso hoje: {device.usageToday}</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Battery className="w-4 h-4" />{device.battery}%</span>
                  <span>{device.lastSync}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition" />
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
            <strong>Modo demonstração.</strong> Os dados acima são de exemplo. Quando o backend estiver conectado, os dispositivos reais aparecerão aqui.
          </div>
        </div>
      </main>
    </div>
  )
}
