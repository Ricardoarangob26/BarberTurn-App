import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scissors, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Star,
  ChevronRight,
  Image,
  Video,
  Megaphone,
  UserCheck,
  XCircle,
  CheckCircle,
  AlertCircle,
  Eye,
  Menu,
  X
} from 'lucide-react';

// Datos de ejemplo
const statsData = {
  ingresos: { valor: '$4,580', cambio: '+12.5%', positivo: true },
  citas: { valor: '127', cambio: '+8%', positivo: true },
  clientes: { valor: '89', cambio: '+15%', positivo: true },
  valoracion: { valor: '4.8', cambio: '+0.2', positivo: true },
};

const citasRecientes = [
  { id: 1, cliente: 'Carlos Mendez', servicio: 'Corte + Barba', barbero: 'Juan Perez', hora: '10:00 AM', estado: 'confirmada' },
  { id: 2, cliente: 'Miguel Torres', servicio: 'Corte Clasico', barbero: 'Pedro Gomez', hora: '10:30 AM', estado: 'pendiente' },
  { id: 3, cliente: 'Roberto Silva', servicio: 'Barba Completa', barbero: 'Juan Perez', hora: '11:00 AM', estado: 'confirmada' },
  { id: 4, cliente: 'Luis Ramirez', servicio: 'Corte Degradado', barbero: 'Carlos Ruiz', hora: '11:30 AM', estado: 'cancelada' },
  { id: 5, cliente: 'Andres Garcia', servicio: 'Corte + Cejas', barbero: 'Pedro Gomez', hora: '12:00 PM', estado: 'confirmada' },
];

const barberosActivos = [
  { id: 1, nombre: 'Juan Perez', citasHoy: 8, rating: 4.9, estado: 'disponible', avatar: 'JP' },
  { id: 2, nombre: 'Pedro Gomez', citasHoy: 6, rating: 4.7, estado: 'ocupado', avatar: 'PG' },
  { id: 3, nombre: 'Carlos Ruiz', citasHoy: 5, rating: 4.8, estado: 'disponible', avatar: 'CR' },
];

const notificaciones = [
  { id: 1, tipo: 'cita', mensaje: 'Nueva cita agendada por Carlos Mendez', tiempo: '5 min' },
  { id: 2, tipo: 'resena', mensaje: 'Miguel Torres dejo una resena de 5 estrellas', tiempo: '15 min' },
  { id: 3, tipo: 'cancelacion', mensaje: 'Luis Ramirez cancelo su cita', tiempo: '30 min' },
];

export default function DashboardBarberiaAdmin() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: <BarChart3 size={20} />, label: 'Dashboard', path: '/dashboard-barberia-admin', active: true },
    { icon: <Calendar size={20} />, label: 'Citas', path: '/citas-barberia' },
    { icon: <Users size={20} />, label: 'Barberos', path: '/gestion-barberos' },
    { icon: <Image size={20} />, label: 'Galeria', path: '/galeria-barberia' },
    { icon: <Megaphone size={20} />, label: 'Promociones', path: '/promociones-barberia' },
    { icon: <TrendingUp size={20} />, label: 'Estadisticas', path: '/estadisticas-barberia' },
    { icon: <Settings size={20} />, label: 'Configuracion', path: '/configurar-barberia' },
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'confirmada': return '#22c55e';
      case 'pendiente': return '#f59e0b';
      case 'cancelada': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getEstadoBarberoColor = (estado: string) => {
    return estado === 'disponible' ? '#22c55e' : '#f59e0b';
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={{
        ...styles.sidebar,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logoWrapper}>
            <Scissors size={24} color="#f59e0b" />
            <span style={styles.logoText}>BarberTurn</span>
          </div>
          <button 
            style={styles.closeSidebarButton}
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div style={styles.barberiaInfo}>
          <div style={styles.barberiaAvatar}>BF</div>
          <div style={styles.barberiaDetails}>
            <span style={styles.barberiaName}>BarbaFina Premium</span>
            <span style={styles.barberiaPlan}>Plan Profesional</span>
          </div>
        </div>

        <nav style={styles.nav}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              style={{
                ...styles.navItem,
                ...(item.active ? styles.navItemActive : {}),
              }}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.active && <div style={styles.activeIndicator} />}
            </button>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <button onClick={() => navigate('/para-barberias')} style={styles.logoutButton}>
            <LogOut size={20} />
            <span>Cerrar Sesion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Top Bar */}
        <header style={styles.topBar}>
          <div style={styles.topBarLeft}>
            <button 
              style={styles.menuButton}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>
            <div style={styles.searchContainer}>
              <Search size={18} color="rgba(255,255,255,0.5)" />
              <input 
                type="text" 
                placeholder="Buscar citas, clientes, barberos..." 
                style={styles.searchInput}
              />
            </div>
          </div>
          
          <div style={styles.topBarRight}>
            <div style={styles.notificationWrapper}>
              <button 
                style={styles.notificationButton}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                <span style={styles.notificationBadge}>3</span>
              </button>
              
              {showNotifications && (
                <div style={styles.notificationDropdown}>
                  <div style={styles.notificationHeader}>
                    <span>Notificaciones</span>
                    <button style={styles.markAllRead}>Marcar todas</button>
                  </div>
                  {notificaciones.map((notif) => (
                    <div key={notif.id} style={styles.notificationItem}>
                      <div style={{
                        ...styles.notificationIcon,
                        backgroundColor: notif.tipo === 'cita' ? 'rgba(34, 197, 94, 0.2)' : 
                                        notif.tipo === 'resena' ? 'rgba(245, 158, 11, 0.2)' : 
                                        'rgba(239, 68, 68, 0.2)',
                      }}>
                        {notif.tipo === 'cita' ? <Calendar size={16} color="#22c55e" /> :
                         notif.tipo === 'resena' ? <Star size={16} color="#f59e0b" /> :
                         <XCircle size={16} color="#ef4444" />}
                      </div>
                      <div style={styles.notificationContent}>
                        <p style={styles.notificationMessage}>{notif.mensaje}</p>
                        <span style={styles.notificationTime}>{notif.tiempo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={styles.userMenu}>
              <div style={styles.userAvatar}>R</div>
              <span style={styles.userName}>Ricardo</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div style={styles.dashboardContent}>
          {/* Welcome Section */}
          <div style={styles.welcomeSection}>
            <div>
              <h1 style={styles.welcomeTitle}>Buenos dias, Ricardo</h1>
              <p style={styles.welcomeSubtitle}>Aqui esta el resumen de tu barberia hoy</p>
            </div>
            <div style={styles.quickActions}>
              <button 
                onClick={() => navigate('/estadisticas-barberia')} 
                style={styles.quickActionButton}
              >
                <BarChart3 size={18} />
                Ver Estadisticas
              </button>
              <button 
                onClick={() => navigate('/configurar-barberia')} 
                style={styles.quickActionButtonOutline}
              >
                <Settings size={18} />
                Configurar
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statHeader}>
                <div style={{...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.15)'}}>
                  <DollarSign size={22} color="#22c55e" />
                </div>
                <div style={{
                  ...styles.statChange,
                  color: statsData.ingresos.positivo ? '#22c55e' : '#ef4444',
                }}>
                  {statsData.ingresos.positivo ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {statsData.ingresos.cambio}
                </div>
              </div>
              <div style={styles.statValue}>{statsData.ingresos.valor}</div>
              <div style={styles.statLabel}>Ingresos Hoy</div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statHeader}>
                <div style={{...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.15)'}}>
                  <Calendar size={22} color="#3b82f6" />
                </div>
                <div style={{
                  ...styles.statChange,
                  color: statsData.citas.positivo ? '#22c55e' : '#ef4444',
                }}>
                  {statsData.citas.positivo ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {statsData.citas.cambio}
                </div>
              </div>
              <div style={styles.statValue}>{statsData.citas.valor}</div>
              <div style={styles.statLabel}>Citas este Mes</div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statHeader}>
                <div style={{...styles.statIcon, backgroundColor: 'rgba(168, 85, 247, 0.15)'}}>
                  <Users size={22} color="#a855f7" />
                </div>
                <div style={{
                  ...styles.statChange,
                  color: statsData.clientes.positivo ? '#22c55e' : '#ef4444',
                }}>
                  {statsData.clientes.positivo ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {statsData.clientes.cambio}
                </div>
              </div>
              <div style={styles.statValue}>{statsData.clientes.valor}</div>
              <div style={styles.statLabel}>Clientes Nuevos</div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statHeader}>
                <div style={{...styles.statIcon, backgroundColor: 'rgba(245, 158, 11, 0.15)'}}>
                  <Star size={22} color="#f59e0b" />
                </div>
                <div style={{
                  ...styles.statChange,
                  color: statsData.valoracion.positivo ? '#22c55e' : '#ef4444',
                }}>
                  {statsData.valoracion.positivo ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {statsData.valoracion.cambio}
                </div>
              </div>
              <div style={styles.statValue}>{statsData.valoracion.valor}</div>
              <div style={styles.statLabel}>Valoracion Promedio</div>
            </div>
          </div>

          {/* Main Grid */}
          <div style={styles.mainGrid}>
            {/* Citas de Hoy */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>
                  <Calendar size={20} color="#f59e0b" />
                  Citas de Hoy
                </h3>
                <button style={styles.viewAllButton}>
                  Ver todas
                  <ChevronRight size={16} />
                </button>
              </div>
              <div style={styles.citasList}>
                {citasRecientes.map((cita) => (
                  <div key={cita.id} style={styles.citaItem}>
                    <div style={styles.citaTime}>
                      <Clock size={14} color="rgba(255,255,255,0.5)" />
                      <span>{cita.hora}</span>
                    </div>
                    <div style={styles.citaInfo}>
                      <span style={styles.citaCliente}>{cita.cliente}</span>
                      <span style={styles.citaServicio}>{cita.servicio} • {cita.barbero}</span>
                    </div>
                    <div style={{
                      ...styles.citaEstado,
                      backgroundColor: `${getEstadoColor(cita.estado)}20`,
                      color: getEstadoColor(cita.estado),
                    }}>
                      {cita.estado === 'confirmada' ? <CheckCircle size={14} /> :
                       cita.estado === 'pendiente' ? <AlertCircle size={14} /> :
                       <XCircle size={14} />}
                      {cita.estado}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Barberos Activos */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>
                  <Users size={20} color="#f59e0b" />
                  Barberos Activos
                </h3>
                <button 
                  onClick={() => navigate('/gestion-barberos')}
                  style={styles.viewAllButton}
                >
                  Gestionar
                  <ChevronRight size={16} />
                </button>
              </div>
              <div style={styles.barberosList}>
                {barberosActivos.map((barbero) => (
                  <div key={barbero.id} style={styles.barberoItem}>
                    <div style={styles.barberoAvatar}>{barbero.avatar}</div>
                    <div style={styles.barberoInfo}>
                      <span style={styles.barberoNombre}>{barbero.nombre}</span>
                      <div style={styles.barberoStats}>
                        <span><Calendar size={12} /> {barbero.citasHoy} citas hoy</span>
                        <span><Star size={12} color="#f59e0b" /> {barbero.rating}</span>
                      </div>
                    </div>
                    <div style={{
                      ...styles.barberoEstado,
                      backgroundColor: `${getEstadoBarberoColor(barbero.estado)}20`,
                      color: getEstadoBarberoColor(barbero.estado),
                    }}>
                      <UserCheck size={14} />
                      {barbero.estado}
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => navigate('/gestion-barberos')}
                style={styles.addBarberoButton}
              >
                + Agregar Barbero
              </button>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div style={styles.quickAccessGrid}>
            <div 
              style={styles.quickAccessCard}
              onClick={() => navigate('/estadisticas-barberia')}
            >
              <div style={{...styles.quickAccessIcon, backgroundColor: 'rgba(34, 197, 94, 0.15)'}}>
                <BarChart3 size={28} color="#22c55e" />
              </div>
              <div style={styles.quickAccessContent}>
                <h4 style={styles.quickAccessTitle}>Estadisticas y Reportes</h4>
                <p style={styles.quickAccessDesc}>Analiza el rendimiento de tu negocio</p>
              </div>
              <ChevronRight size={20} color="rgba(255,255,255,0.5)" />
            </div>

            <div 
              style={styles.quickAccessCard}
              onClick={() => navigate('/configurar-barberia')}
            >
              <div style={{...styles.quickAccessIcon, backgroundColor: 'rgba(245, 158, 11, 0.15)'}}>
                <Settings size={28} color="#f59e0b" />
              </div>
              <div style={styles.quickAccessContent}>
                <h4 style={styles.quickAccessTitle}>Configurar Barberia</h4>
                <p style={styles.quickAccessDesc}>Edita info, servicios, horarios y mas</p>
              </div>
              <ChevronRight size={20} color="rgba(255,255,255,0.5)" />
            </div>

            <div 
              style={styles.quickAccessCard}
              onClick={() => navigate('/gestion-barberos')}
            >
              <div style={{...styles.quickAccessIcon, backgroundColor: 'rgba(59, 130, 246, 0.15)'}}>
                <Users size={28} color="#3b82f6" />
              </div>
              <div style={styles.quickAccessContent}>
                <h4 style={styles.quickAccessTitle}>Gestionar Barberos</h4>
                <p style={styles.quickAccessDesc}>Administra tu equipo de trabajo</p>
              </div>
              <ChevronRight size={20} color="rgba(255,255,255,0.5)" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: 'white',
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#111',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    zIndex: 100,
    transition: 'transform 0.3s ease',
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.25rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'white',
  },
  closeSidebarButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    padding: '0.25rem',
  },
  barberiaInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1.25rem',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    margin: '0.75rem',
    borderRadius: '12px',
  },
  barberiaAvatar: {
    width: '45px',
    height: '45px',
    backgroundColor: '#f59e0b',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#111',
    fontSize: '1rem',
  },
  barberiaDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  barberiaName: {
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  barberiaPlan: {
    fontSize: '0.8rem',
    color: '#f59e0b',
  },
  nav: {
    flex: 1,
    padding: '0.5rem 0.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    textAlign: 'left',
    transition: 'all 0.2s',
    position: 'relative',
    width: '100%',
  },
  navItemActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    color: '#f59e0b',
  },
  activeIndicator: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '3px',
    height: '60%',
    backgroundColor: '#f59e0b',
    borderRadius: '3px 0 0 3px',
  },
  sidebarFooter: {
    padding: '1rem 0.75rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    width: '100%',
  },
  main: {
    flex: 1,
    marginLeft: '260px',
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.5rem',
    backgroundColor: 'rgba(17, 17, 17, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  topBarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  menuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    padding: '0.6rem 1rem',
    width: '350px',
  },
  searchInput: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '0.9rem',
    width: '100%',
    outline: 'none',
  },
  topBarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  notificationWrapper: {
    position: 'relative',
  },
  notificationButton: {
    position: 'relative',
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  notificationBadge: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    width: '16px',
    height: '16px',
    backgroundColor: '#ef4444',
    borderRadius: '50%',
    fontSize: '0.7rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  notificationDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    width: '320px',
    backgroundColor: '#1a1a1a',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    marginTop: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
  },
  notificationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    fontWeight: '600',
  },
  markAllRead: {
    background: 'none',
    border: 'none',
    color: '#f59e0b',
    fontSize: '0.8rem',
    cursor: 'pointer',
  },
  notificationItem: {
    display: 'flex',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    cursor: 'pointer',
  },
  notificationIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: '0.85rem',
    margin: 0,
    marginBottom: '0.25rem',
  },
  notificationTime: {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  userAvatar: {
    width: '36px',
    height: '36px',
    backgroundColor: '#f59e0b',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#111',
  },
  userName: {
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  dashboardContent: {
    padding: '1.5rem',
    overflowY: 'auto',
  },
  welcomeSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  welcomeTitle: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    margin: 0,
  },
  welcomeSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: '0.25rem',
  },
  quickActions: {
    display: 'flex',
    gap: '0.75rem',
  },
  quickActionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.25rem',
    backgroundColor: '#f59e0b',
    color: '#111',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  quickActionButtonOutline: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.25rem',
    backgroundColor: 'transparent',
    color: '#f59e0b',
    border: '1px solid #f59e0b',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '1.25rem',
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  statIcon: {
    width: '45px',
    height: '45px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  statValue: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem',
  },
  statLabel: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '1.25rem',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: 0,
  },
  viewAllButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    background: 'none',
    border: 'none',
    color: '#f59e0b',
    fontSize: '0.85rem',
    cursor: 'pointer',
    fontWeight: '500',
  },
  citasList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  citaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '10px',
  },
  citaTime: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.7)',
    minWidth: '90px',
  },
  citaInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  citaCliente: {
    fontWeight: '500',
    fontSize: '0.95rem',
  },
  citaServicio: {
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  citaEstado: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.35rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  barberosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  barberoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '10px',
  },
  barberoAvatar: {
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    color: '#f59e0b',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  barberoInfo: {
    flex: 1,
  },
  barberoNombre: {
    fontWeight: '500',
    fontSize: '0.95rem',
  },
  barberoStats: {
    display: 'flex',
    gap: '0.75rem',
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: '0.2rem',
  },
  barberoEstado: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.3rem 0.6rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  addBarberoButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'transparent',
    border: '1px dashed rgba(245, 158, 11, 0.5)',
    borderRadius: '10px',
    color: '#f59e0b',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginTop: '0.75rem',
  },
  quickAccessGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  },
  quickAccessCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  quickAccessIcon: {
    width: '55px',
    height: '55px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  quickAccessContent: {
    flex: 1,
  },
  quickAccessTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    margin: '0 0 0.25rem 0',
  },
  quickAccessDesc: {
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0,
  },
};
