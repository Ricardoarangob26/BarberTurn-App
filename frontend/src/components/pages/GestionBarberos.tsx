import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  UserPlus, 
  Search, 
  MoreVertical,
  Check,
  X,
  Clock,
  Calendar,
  Star,
  Trash2,
  Eye,
  Filter,
  Mail,
  Phone,
  Settings,
  BarChart3
} from 'lucide-react';

interface Barbero {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  especialidad: string;
  estado: 'activo' | 'pendiente' | 'inactivo';
  calificacion: number;
  citasCompletadas: number;
  fechaIngreso: string;
  avatar: string;
}

interface SolicitudAgenda {
  id: number;
  barberoId: number;
  barberoNombre: string;
  tipo: 'vacaciones' | 'cambio_horario' | 'dia_libre' | 'permiso';
  fechaInicio: string;
  fechaFin: string;
  motivo: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  fechaSolicitud: string;
}

const GestionBarberos: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'barberos' | 'solicitudes' | 'pendientes'>('barberos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBarbero, setSelectedBarbero] = useState<Barbero | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  // Datos de ejemplo
  const [barberos, setBarberos] = useState<Barbero[]>([
    {
      id: 1,
      nombre: 'Carlos Martinez',
      email: 'carlos@email.com',
      telefono: '+57 300 123 4567',
      especialidad: 'Cortes clasicos y degradados',
      estado: 'activo',
      calificacion: 4.8,
      citasCompletadas: 245,
      fechaIngreso: '2023-06-15',
      avatar: 'CM'
    },
    {
      id: 2,
      nombre: 'Miguel Rodriguez',
      email: 'miguel@email.com',
      telefono: '+57 301 234 5678',
      especialidad: 'Barbas y afeitado',
      estado: 'activo',
      calificacion: 4.9,
      citasCompletadas: 312,
      fechaIngreso: '2023-03-20',
      avatar: 'MR'
    },
    {
      id: 3,
      nombre: 'Andres Lopez',
      email: 'andres@email.com',
      telefono: '+57 302 345 6789',
      especialidad: 'Cortes modernos',
      estado: 'pendiente',
      calificacion: 0,
      citasCompletadas: 0,
      fechaIngreso: '2024-01-10',
      avatar: 'AL'
    },
    {
      id: 4,
      nombre: 'Juan Perez',
      email: 'juan@email.com',
      telefono: '+57 303 456 7890',
      especialidad: 'Todo tipo de cortes',
      estado: 'inactivo',
      calificacion: 4.5,
      citasCompletadas: 89,
      fechaIngreso: '2023-09-01',
      avatar: 'JP'
    }
  ]);

  const [solicitudes, setSolicitudes] = useState<SolicitudAgenda[]>([
    {
      id: 1,
      barberoId: 1,
      barberoNombre: 'Carlos Martinez',
      tipo: 'vacaciones',
      fechaInicio: '2024-02-15',
      fechaFin: '2024-02-22',
      motivo: 'Vacaciones familiares programadas',
      estado: 'pendiente',
      fechaSolicitud: '2024-01-20'
    },
    {
      id: 2,
      barberoId: 2,
      barberoNombre: 'Miguel Rodriguez',
      tipo: 'cambio_horario',
      fechaInicio: '2024-02-01',
      fechaFin: '2024-02-28',
      motivo: 'Necesito entrar una hora mas tarde por estudios',
      estado: 'pendiente',
      fechaSolicitud: '2024-01-25'
    },
    {
      id: 3,
      barberoId: 1,
      barberoNombre: 'Carlos Martinez',
      tipo: 'dia_libre',
      fechaInicio: '2024-01-30',
      fechaFin: '2024-01-30',
      motivo: 'Cita medica',
      estado: 'aprobada',
      fechaSolicitud: '2024-01-15'
    }
  ]);

  const [newBarbero, setNewBarbero] = useState({
    nombre: '',
    email: '',
    telefono: '',
    especialidad: ''
  });

  const filteredBarberos = barberos.filter(b => 
    b.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const barberosPendientes = barberos.filter(b => b.estado === 'pendiente');
  const solicitudesPendientes = solicitudes.filter(s => s.estado === 'pendiente');

  const handleAceptarBarbero = (id: number) => {
    setBarberos(prev => prev.map(b => 
      b.id === id ? { ...b, estado: 'activo' as const } : b
    ));
  };

  const handleRechazarBarbero = (id: number) => {
    setBarberos(prev => prev.filter(b => b.id !== id));
  };

  const handleEliminarBarbero = (id: number) => {
    setBarberos(prev => prev.filter(b => b.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleAprobarSolicitud = (id: number) => {
    setSolicitudes(prev => prev.map(s => 
      s.id === id ? { ...s, estado: 'aprobada' as const } : s
    ));
  };

  const handleRechazarSolicitud = (id: number) => {
    setSolicitudes(prev => prev.map(s => 
      s.id === id ? { ...s, estado: 'rechazada' as const } : s
    ));
  };

  const handleAddBarbero = () => {
    if (newBarbero.nombre && newBarbero.email) {
      const nuevo: Barbero = {
        id: Date.now(),
        ...newBarbero,
        estado: 'activo',
        calificacion: 0,
        citasCompletadas: 0,
        fechaIngreso: new Date().toISOString().split('T')[0],
        avatar: newBarbero.nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      };
      setBarberos(prev => [...prev, nuevo]);
      setNewBarbero({ nombre: '', email: '', telefono: '', especialidad: '' });
      setShowAddModal(false);
    }
  };

  const getTipoSolicitudLabel = (tipo: string) => {
    const tipos: { [key: string]: string } = {
      'vacaciones': 'Vacaciones',
      'cambio_horario': 'Cambio de Horario',
      'dia_libre': 'Dia Libre',
      'permiso': 'Permiso'
    };
    return tipos[tipo] || tipo;
  };

  const getEstadoColor = (estado: string) => {
    const colores: { [key: string]: string } = {
      'activo': '#22c55e',
      'pendiente': '#f59e0b',
      'inactivo': '#6b7280',
      'aprobada': '#22c55e',
      'rechazada': '#ef4444'
    };
    return colores[estado] || '#6b7280';
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <button onClick={() => navigate('/para-barberias')} style={styles.backButton}>
          <ArrowLeft size={20} />
          Volver
        </button>
        <h1 style={styles.headerTitle}>Gestion de Barberos</h1>
        <div style={styles.headerActions}>
          <button onClick={() => navigate('/estadisticas-barberia')} style={styles.statsButton}>
            <BarChart3 size={20} />
            Estadisticas
          </button>
          <button onClick={() => navigate('/configurar-barberia')} style={styles.configButton}>
            <Settings size={20} />
            Configurar Barberia
          </button>
          <button onClick={() => setShowAddModal(true)} style={styles.addButton}>
            <UserPlus size={20} />
            Agregar Barbero
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div style={styles.tabsContainer}>
        <button 
          style={{
            ...styles.tab,
            ...(activeTab === 'barberos' ? styles.tabActive : {})
          }}
          onClick={() => setActiveTab('barberos')}
        >
          <Users size={18} />
          Mis Barberos ({barberos.filter(b => b.estado !== 'pendiente').length})
        </button>
        <button 
          style={{
            ...styles.tab,
            ...(activeTab === 'pendientes' ? styles.tabActive : {})
          }}
          onClick={() => setActiveTab('pendientes')}
        >
          <Clock size={18} />
          Pendientes de Aprobar
          {barberosPendientes.length > 0 && (
            <span style={styles.badge}>{barberosPendientes.length}</span>
          )}
        </button>
        <button 
          style={{
            ...styles.tab,
            ...(activeTab === 'solicitudes' ? styles.tabActive : {})
          }}
          onClick={() => setActiveTab('solicitudes')}
        >
          <Calendar size={18} />
          Solicitudes de Agenda
          {solicitudesPendientes.length > 0 && (
            <span style={styles.badge}>{solicitudesPendientes.length}</span>
          )}
        </button>
      </div>

      {/* Content */}
      <main style={styles.main}>
        {/* Search Bar */}
        {activeTab === 'barberos' && (
          <div style={styles.searchContainer}>
            <div style={styles.searchBox}>
              <Search size={20} color="rgba(255,255,255,0.5)" />
              <input
                type="text"
                placeholder="Buscar barberos por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <button style={styles.filterButton}>
              <Filter size={18} />
              Filtrar
            </button>
          </div>
        )}

        {/* Barberos List */}
        {activeTab === 'barberos' && (
          <div style={styles.barberosGrid}>
            {filteredBarberos.filter(b => b.estado !== 'pendiente').map(barbero => (
              <div key={barbero.id} style={styles.barberoCard}>
                <div style={styles.barberoHeader}>
                  <div style={styles.avatarContainer}>
                    <div style={{
                      ...styles.avatar,
                      backgroundColor: barbero.estado === 'activo' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(107, 114, 128, 0.2)'
                    }}>
                      {barbero.avatar}
                    </div>
                    <span style={{
                      ...styles.statusDot,
                      backgroundColor: getEstadoColor(barbero.estado)
                    }} />
                  </div>
                  <div style={styles.barberoInfo}>
                    <h3 style={styles.barberoNombre}>{barbero.nombre}</h3>
                    <p style={styles.barberoEspecialidad}>{barbero.especialidad}</p>
                  </div>
                  <button 
                    style={styles.moreButton}
                    onClick={() => setSelectedBarbero(selectedBarbero?.id === barbero.id ? null : barbero)}
                  >
                    <MoreVertical size={20} />
                  </button>
                  {selectedBarbero?.id === barbero.id && (
                    <div style={styles.dropdown}>
                      <button style={styles.dropdownItem}>
                        <Eye size={16} /> Ver perfil
                      </button>
                      <button 
                        style={{...styles.dropdownItem, color: '#ef4444'}}
                        onClick={() => setShowDeleteConfirm(barbero.id)}
                      >
                        <Trash2 size={16} /> Eliminar
                      </button>
                    </div>
                  )}
                </div>

                <div style={styles.barberoStats}>
                  <div style={styles.statBox}>
                    <Star size={16} color="#f59e0b" />
                    <span>{barbero.calificacion || '-'}</span>
                  </div>
                  <div style={styles.statBox}>
                    <Calendar size={16} color="#3b82f6" />
                    <span>{barbero.citasCompletadas} citas</span>
                  </div>
                </div>

                <div style={styles.barberoContact}>
                  <div style={styles.contactItem}>
                    <Mail size={14} color="rgba(255,255,255,0.5)" />
                    <span>{barbero.email}</span>
                  </div>
                  <div style={styles.contactItem}>
                    <Phone size={14} color="rgba(255,255,255,0.5)" />
                    <span>{barbero.telefono}</span>
                  </div>
                </div>

                <div style={styles.cardFooter}>
                  <span style={{
                    ...styles.estadoBadge,
                    backgroundColor: `${getEstadoColor(barbero.estado)}20`,
                    color: getEstadoColor(barbero.estado)
                  }}>
                    {barbero.estado.charAt(0).toUpperCase() + barbero.estado.slice(1)}
                  </span>
                  <span style={styles.fechaIngreso}>
                    Desde {new Date(barbero.fechaIngreso).toLocaleDateString()}
                  </span>
                </div>

                {/* Delete Confirmation */}
                {showDeleteConfirm === barbero.id && (
                  <div style={styles.confirmOverlay}>
                    <div style={styles.confirmBox}>
                      <p>Eliminar a {barbero.nombre}?</p>
                      <div style={styles.confirmButtons}>
                        <button 
                          style={styles.confirmCancel}
                          onClick={() => setShowDeleteConfirm(null)}
                        >
                          Cancelar
                        </button>
                        <button 
                          style={styles.confirmDelete}
                          onClick={() => handleEliminarBarbero(barbero.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pendientes de Aprobar */}
        {activeTab === 'pendientes' && (
          <div style={styles.pendientesContainer}>
            {barberosPendientes.length === 0 ? (
              <div style={styles.emptyState}>
                <Users size={48} color="rgba(255,255,255,0.3)" />
                <p>No hay barberos pendientes de aprobacion</p>
              </div>
            ) : (
              barberosPendientes.map(barbero => (
                <div key={barbero.id} style={styles.pendienteCard}>
                  <div style={styles.pendienteInfo}>
                    <div style={styles.avatar}>{barbero.avatar}</div>
                    <div>
                      <h3 style={styles.barberoNombre}>{barbero.nombre}</h3>
                      <p style={styles.barberoEspecialidad}>{barbero.especialidad}</p>
                      <div style={styles.contactItem}>
                        <Mail size={14} color="rgba(255,255,255,0.5)" />
                        <span>{barbero.email}</span>
                      </div>
                      <div style={styles.contactItem}>
                        <Phone size={14} color="rgba(255,255,255,0.5)" />
                        <span>{barbero.telefono}</span>
                      </div>
                    </div>
                  </div>
                  <div style={styles.pendienteActions}>
                    <button 
                      style={styles.acceptButton}
                      onClick={() => handleAceptarBarbero(barbero.id)}
                    >
                      <Check size={18} />
                      Aceptar
                    </button>
                    <button 
                      style={styles.rejectButton}
                      onClick={() => handleRechazarBarbero(barbero.id)}
                    >
                      <X size={18} />
                      Rechazar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Solicitudes de Agenda */}
        {activeTab === 'solicitudes' && (
          <div style={styles.solicitudesContainer}>
            {solicitudes.length === 0 ? (
              <div style={styles.emptyState}>
                <Calendar size={48} color="rgba(255,255,255,0.3)" />
                <p>No hay solicitudes de agenda</p>
              </div>
            ) : (
              solicitudes.map(solicitud => (
                <div key={solicitud.id} style={styles.solicitudCard}>
                  <div style={styles.solicitudHeader}>
                    <div>
                      <span style={{
                        ...styles.tipoSolicitud,
                        backgroundColor: solicitud.tipo === 'vacaciones' ? 'rgba(59, 130, 246, 0.2)' : 
                                        solicitud.tipo === 'dia_libre' ? 'rgba(245, 158, 11, 0.2)' :
                                        'rgba(139, 92, 246, 0.2)',
                        color: solicitud.tipo === 'vacaciones' ? '#3b82f6' : 
                               solicitud.tipo === 'dia_libre' ? '#f59e0b' :
                               '#8b5cf6'
                      }}>
                        {getTipoSolicitudLabel(solicitud.tipo)}
                      </span>
                      <h3 style={styles.solicitudBarbero}>{solicitud.barberoNombre}</h3>
                    </div>
                    <span style={{
                      ...styles.estadoBadge,
                      backgroundColor: `${getEstadoColor(solicitud.estado)}20`,
                      color: getEstadoColor(solicitud.estado)
                    }}>
                      {solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)}
                    </span>
                  </div>

                  <div style={styles.solicitudFechas}>
                    <Calendar size={16} color="rgba(255,255,255,0.5)" />
                    <span>
                      {new Date(solicitud.fechaInicio).toLocaleDateString()} 
                      {solicitud.fechaInicio !== solicitud.fechaFin && 
                        ` - ${new Date(solicitud.fechaFin).toLocaleDateString()}`
                      }
                    </span>
                  </div>

                  <p style={styles.solicitudMotivo}>{solicitud.motivo}</p>

                  <div style={styles.solicitudFooter}>
                    <span style={styles.fechaSolicitud}>
                      Solicitado el {new Date(solicitud.fechaSolicitud).toLocaleDateString()}
                    </span>
                    {solicitud.estado === 'pendiente' && (
                      <div style={styles.solicitudActions}>
                        <button 
                          style={styles.acceptButtonSmall}
                          onClick={() => handleAprobarSolicitud(solicitud.id)}
                        >
                          <Check size={16} />
                          Aprobar
                        </button>
                        <button 
                          style={styles.rejectButtonSmall}
                          onClick={() => handleRechazarSolicitud(solicitud.id)}
                        >
                          <X size={16} />
                          Rechazar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Modal Agregar Barbero */}
      {showAddModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Agregar Nuevo Barbero</h2>
              <button onClick={() => setShowAddModal(false)} style={styles.closeModal}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.modalContent}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nombre completo</label>
                <input
                  type="text"
                  value={newBarbero.nombre}
                  onChange={(e) => setNewBarbero({...newBarbero, nombre: e.target.value})}
                  style={styles.input}
                  placeholder="Ej: Carlos Martinez"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  value={newBarbero.email}
                  onChange={(e) => setNewBarbero({...newBarbero, email: e.target.value})}
                  style={styles.input}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Telefono</label>
                <input
                  type="tel"
                  value={newBarbero.telefono}
                  onChange={(e) => setNewBarbero({...newBarbero, telefono: e.target.value})}
                  style={styles.input}
                  placeholder="+57 300 123 4567"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Especialidad</label>
                <input
                  type="text"
                  value={newBarbero.especialidad}
                  onChange={(e) => setNewBarbero({...newBarbero, especialidad: e.target.value})}
                  style={styles.input}
                  placeholder="Ej: Cortes clasicos y degradados"
                />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button onClick={() => setShowAddModal(false)} style={styles.cancelButton}>
                Cancelar
              </button>
              <button onClick={handleAddBarbero} style={styles.saveButton}>
                <UserPlus size={18} />
                Agregar Barbero
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: 'white',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  configButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1rem',
    backgroundColor: 'transparent',
    border: '1px solid #4b5563',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s',
  },
  statsButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1rem',
    backgroundColor: '#22c55e',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    transition: 'all 0.2s',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.2rem',
    backgroundColor: '#f59e0b',
    color: '#111',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  tabsContainer: {
    display: 'flex',
    gap: '0.5rem',
    padding: '1rem 2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    flexWrap: 'wrap' as const,
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
  },
  tabActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    color: '#f59e0b',
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  badge: {
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '0.15rem 0.5rem',
    borderRadius: '10px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
  main: {
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  searchContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap' as const,
  },
  searchBox: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    minWidth: '250px',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'white',
    fontSize: '1rem',
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  barberosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '1.5rem',
  },
  barberoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '1.5rem',
    position: 'relative' as const,
  },
  barberoHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '1rem',
    position: 'relative' as const,
  },
  avatarContainer: {
    position: 'relative' as const,
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: '#f59e0b',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  statusDot: {
    position: 'absolute' as const,
    bottom: '-2px',
    right: '-2px',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    border: '2px solid #0a0a0a',
  },
  barberoInfo: {
    flex: 1,
  },
  barberoNombre: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  barberoEspecialidad: {
    margin: '0.25rem 0 0',
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  moreButton: {
    padding: '0.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    borderRadius: '8px',
  },
  dropdown: {
    position: 'absolute' as const,
    top: '100%',
    right: 0,
    backgroundColor: '#1a1a1a',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    zIndex: 10,
    minWidth: '150px',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
    textAlign: 'left' as const,
  },
  barberoStats: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  statBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    fontSize: '0.9rem',
  },
  barberoContact: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  estadoBadge: {
    padding: '0.3rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  fechaIngreso: {
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  confirmOverlay: {
    position: 'absolute' as const,
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBox: {
    textAlign: 'center' as const,
  },
  confirmButtons: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  confirmCancel: {
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  confirmDelete: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  pendientesContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 2rem',
    gap: '1rem',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  pendienteCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '12px',
    gap: '1rem',
    flexWrap: 'wrap' as const,
  },
  pendienteInfo: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  pendienteActions: {
    display: 'flex',
    gap: '0.75rem',
  },
  acceptButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.25rem',
    backgroundColor: '#22c55e',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  rejectButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.25rem',
    backgroundColor: 'transparent',
    color: '#ef4444',
    border: '1px solid #ef4444',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  solicitudesContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  solicitudCard: {
    padding: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
  },
  solicitudHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
    flexWrap: 'wrap' as const,
    gap: '0.5rem',
  },
  tipoSolicitud: {
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '500',
    display: 'inline-block',
    marginBottom: '0.5rem',
  },
  solicitudBarbero: {
    margin: 0,
    fontSize: '1.1rem',
  },
  solicitudFechas: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.9rem',
  },
  solicitudMotivo: {
    margin: '0 0 1rem',
    padding: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 1.5,
  },
  solicitudFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '1rem',
  },
  fechaSolicitud: {
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  solicitudActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  acceptButtonSmall: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#22c55e',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  rejectButtonSmall: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    color: '#ef4444',
    border: '1px solid #ef4444',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  modalOverlay: {
    position: 'fixed' as const,
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  modal: {
    backgroundColor: '#1a1a1a',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.25rem',
  },
  closeModal: {
    padding: '0.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
  },
  modalContent: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.25rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  input: {
    padding: '0.75rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    padding: '1.5rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  cancelButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#f59e0b',
    color: '#111',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default GestionBarberos;
