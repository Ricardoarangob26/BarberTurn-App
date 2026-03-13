import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  Save, 
  Plus, 
  X, 
  Store, 
  MapPin, 
  Clock, 
  Scissors,
  Image,
  FileText,
  Phone,
  Mail,
  Globe,
  Instagram,
  Facebook
} from 'lucide-react';

interface Servicio {
  id: string;
  nombre: string;
  precio: number;
  duracion: number;
  descripcion: string;
}

interface HorariosDia {
  abierto: boolean;
  apertura: string;
  cierre: string;
}

interface Horarios {
  [key: string]: HorariosDia;
}

interface FormData {
  nombre: string;
  slogan: string;
  descripcion: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  email: string;
  sitioWeb: string;
  instagram: string;
  facebook: string;
  logo: File | null;
  logoPreview: string;
  fotoPrincipal: File | null;
  fotoPrincipalPreview: string;
  servicios: Servicio[];
  horarios: Horarios;
}

export default function ConfigurarBarberia() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'servicios' | 'horarios' | 'multimedia'>('info');
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    slogan: '',
    descripcion: '',
    direccion: '',
    ciudad: '',
    telefono: '',
    email: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    logo: null,
    logoPreview: '',
    fotoPrincipal: null,
    fotoPrincipalPreview: '',
    servicios: [
      { id: '1', nombre: 'Corte clasico', precio: 15000, duracion: 30, descripcion: 'Corte tradicional con tijera y maquina' },
      { id: '2', nombre: 'Corte + Barba', precio: 25000, duracion: 45, descripcion: 'Corte completo con arreglo de barba' },
    ],
    horarios: {
      lunes: { abierto: true, apertura: '09:00', cierre: '19:00' },
      martes: { abierto: true, apertura: '09:00', cierre: '19:00' },
      miercoles: { abierto: true, apertura: '09:00', cierre: '19:00' },
      jueves: { abierto: true, apertura: '09:00', cierre: '19:00' },
      viernes: { abierto: true, apertura: '09:00', cierre: '20:00' },
      sabado: { abierto: true, apertura: '10:00', cierre: '18:00' },
      domingo: { abierto: false, apertura: '10:00', cierre: '14:00' },
    }
  });

  const [nuevoServicio, setNuevoServicio] = useState<Servicio>({
    id: '',
    nombre: '',
    precio: 0,
    duracion: 30,
    descripcion: ''
  });

  const [showServicioModal, setShowServicioModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo: file,
        logoPreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleFotoPrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        fotoPrincipal: file,
        fotoPrincipalPreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleHorarioChange = (dia: string, campo: 'abierto' | 'apertura' | 'cierre', valor: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      horarios: {
        ...prev.horarios,
        [dia]: {
          ...prev.horarios[dia],
          [campo]: valor
        }
      }
    }));
  };

  const agregarServicio = () => {
    if (nuevoServicio.nombre && nuevoServicio.precio > 0) {
      const servicio = {
        ...nuevoServicio,
        id: Date.now().toString()
      };
      setFormData(prev => ({
        ...prev,
        servicios: [...prev.servicios, servicio]
      }));
      setNuevoServicio({ id: '', nombre: '', precio: 0, duracion: 30, descripcion: '' });
      setShowServicioModal(false);
    }
  };

  const eliminarServicio = (id: string) => {
    setFormData(prev => ({
      ...prev,
      servicios: prev.servicios.filter(s => s.id !== id)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('Configuracion guardada exitosamente');
  };

  const tabs = [
    { id: 'info', label: 'Informacion', icon: Store },
    { id: 'servicios', label: 'Servicios', icon: Scissors },
    { id: 'horarios', label: 'Horarios', icon: Clock },
    { id: 'multimedia', label: 'Multimedia', icon: Image },
  ];

  const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/para-barberias')} style={styles.backButton}>
            <ArrowLeft size={20} />
            Volver
          </button>
          <h1 style={styles.headerTitle}>Configurar Mi Barberia</h1>
          <button 
            onClick={handleSave} 
            style={styles.saveButton}
            disabled={isSaving}
          >
            <Save size={18} />
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div style={styles.tabsContainer}>
        <div style={styles.tabs}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                style={{
                  ...styles.tab,
                  ...(activeTab === tab.id ? styles.tabActive : {})
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <main style={styles.main}>
        {/* Tab: Informacion */}
        {activeTab === 'info' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Informacion General</h2>
            
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Store size={16} />
                  Nombre de la Barberia *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: BarberKing"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FileText size={16} />
                  Slogan
                </label>
                <input
                  type="text"
                  name="slogan"
                  value={formData.slogan}
                  onChange={handleInputChange}
                  placeholder="Ej: Donde el estilo se encuentra con la tradicion"
                  style={styles.input}
                />
              </div>

              <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                <label style={styles.label}>
                  <FileText size={16} />
                  Descripcion
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Describe tu barberia, su historia, especialidades..."
                  style={{...styles.input, minHeight: '100px', resize: 'vertical' as const}}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <MapPin size={16} />
                  Direccion *
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  placeholder="Ej: Calle 123 #45-67"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <MapPin size={16} />
                  Ciudad *
                </label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                  placeholder="Ej: Bogota"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Phone size={16} />
                  Telefono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="Ej: 3001234567"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Mail size={16} />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ej: contacto@mibarberia.com"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Globe size={16} />
                  Sitio Web
                </label>
                <input
                  type="url"
                  name="sitioWeb"
                  value={formData.sitioWeb}
                  onChange={handleInputChange}
                  placeholder="Ej: www.mibarberia.com"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Instagram size={16} />
                  Instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="Ej: @mibarberia"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Facebook size={16} />
                  Facebook
                </label>
                <input
                  type="text"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  placeholder="Ej: /mibarberia"
                  style={styles.input}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab: Servicios */}
        {activeTab === 'servicios' && (
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Servicios Ofrecidos</h2>
              <button onClick={() => setShowServicioModal(true)} style={styles.addButton}>
                <Plus size={18} />
                Agregar Servicio
              </button>
            </div>

            <div style={styles.serviciosGrid}>
              {formData.servicios.map(servicio => (
                <div key={servicio.id} style={styles.servicioCard}>
                  <div style={styles.servicioHeader}>
                    <h3 style={styles.servicioNombre}>{servicio.nombre}</h3>
                    <button 
                      onClick={() => eliminarServicio(servicio.id)}
                      style={styles.deleteButton}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p style={styles.servicioDescripcion}>{servicio.descripcion}</p>
                  <div style={styles.servicioInfo}>
                    <span style={styles.servicioPrecio}>
                      ${servicio.precio.toLocaleString()}
                    </span>
                    <span style={styles.servicioDuracion}>
                      <Clock size={14} />
                      {servicio.duracion} min
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Agregar Servicio */}
            {showServicioModal && (
              <div style={styles.modalOverlay}>
                <div style={styles.modal}>
                  <div style={styles.modalHeader}>
                    <h3 style={styles.modalTitle}>Agregar Nuevo Servicio</h3>
                    <button onClick={() => setShowServicioModal(false)} style={styles.modalClose}>
                      <X size={20} />
                    </button>
                  </div>
                  <div style={styles.modalBody}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Nombre del servicio *</label>
                      <input
                        type="text"
                        value={nuevoServicio.nombre}
                        onChange={(e) => setNuevoServicio(prev => ({ ...prev, nombre: e.target.value }))}
                        placeholder="Ej: Corte degradado"
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.formRow}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Precio *</label>
                        <input
                          type="number"
                          value={nuevoServicio.precio || ''}
                          onChange={(e) => setNuevoServicio(prev => ({ ...prev, precio: Number(e.target.value) }))}
                          placeholder="15000"
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Duracion (min)</label>
                        <input
                          type="number"
                          value={nuevoServicio.duracion}
                          onChange={(e) => setNuevoServicio(prev => ({ ...prev, duracion: Number(e.target.value) }))}
                          placeholder="30"
                          style={styles.input}
                        />
                      </div>
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Descripcion</label>
                      <textarea
                        value={nuevoServicio.descripcion}
                        onChange={(e) => setNuevoServicio(prev => ({ ...prev, descripcion: e.target.value }))}
                        placeholder="Describe el servicio..."
                        style={{...styles.input, minHeight: '80px'}}
                      />
                    </div>
                  </div>
                  <div style={styles.modalFooter}>
                    <button onClick={() => setShowServicioModal(false)} style={styles.cancelButton}>
                      Cancelar
                    </button>
                    <button onClick={agregarServicio} style={styles.confirmButton}>
                      Agregar Servicio
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Horarios */}
        {activeTab === 'horarios' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Horarios de Atencion</h2>
            
            <div style={styles.horariosContainer}>
              {diasSemana.map(dia => (
                <div key={dia} style={styles.horarioRow}>
                  <div style={styles.horarioDia}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.horarios[dia].abierto}
                        onChange={(e) => handleHorarioChange(dia, 'abierto', e.target.checked)}
                        style={styles.checkbox}
                      />
                      <span style={styles.diaText}>{dia.charAt(0).toUpperCase() + dia.slice(1)}</span>
                    </label>
                  </div>
                  
                  {formData.horarios[dia].abierto ? (
                    <div style={styles.horarioInputs}>
                      <div style={styles.horarioInputGroup}>
                        <label style={styles.horarioLabel}>Apertura</label>
                        <input
                          type="time"
                          value={formData.horarios[dia].apertura}
                          onChange={(e) => handleHorarioChange(dia, 'apertura', e.target.value)}
                          style={styles.timeInput}
                        />
                      </div>
                      <span style={styles.horarioSeparator}>-</span>
                      <div style={styles.horarioInputGroup}>
                        <label style={styles.horarioLabel}>Cierre</label>
                        <input
                          type="time"
                          value={formData.horarios[dia].cierre}
                          onChange={(e) => handleHorarioChange(dia, 'cierre', e.target.value)}
                          style={styles.timeInput}
                        />
                      </div>
                    </div>
                  ) : (
                    <span style={styles.cerradoText}>Cerrado</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Multimedia */}
        {activeTab === 'multimedia' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Imagenes y Multimedia</h2>
            
            <div style={styles.multimediaGrid}>
              {/* Logo */}
              <div style={styles.uploadCard}>
                <h3 style={styles.uploadTitle}>Logo de la Barberia</h3>
                <p style={styles.uploadDescription}>
                  Sube el logo de tu barberia. Recomendado: 200x200px, formato PNG o JPG.
                </p>
                <div style={styles.uploadArea}>
                  {formData.logoPreview ? (
                    <div style={styles.previewContainer}>
                      <img 
                        src={formData.logoPreview} 
                        alt="Logo preview" 
                        style={styles.logoPreview}
                      />
                      <button 
                        onClick={() => setFormData(prev => ({ ...prev, logo: null, logoPreview: '' }))}
                        style={styles.removeImageButton}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label style={styles.uploadLabel}>
                      <Upload size={32} color="#f59e0b" />
                      <span>Haz clic para subir</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        style={styles.fileInput}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Foto Principal */}
              <div style={styles.uploadCard}>
                <h3 style={styles.uploadTitle}>Foto Principal</h3>
                <p style={styles.uploadDescription}>
                  Esta imagen se mostrara en tu perfil. Recomendado: 1200x600px.
                </p>
                <div style={{...styles.uploadArea, ...styles.uploadAreaLarge}}>
                  {formData.fotoPrincipalPreview ? (
                    <div style={styles.previewContainer}>
                      <img 
                        src={formData.fotoPrincipalPreview} 
                        alt="Foto principal preview" 
                        style={styles.fotoPrincipalPreview}
                      />
                      <button 
                        onClick={() => setFormData(prev => ({ ...prev, fotoPrincipal: null, fotoPrincipalPreview: '' }))}
                        style={styles.removeImageButton}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label style={styles.uploadLabel}>
                      <Upload size={32} color="#f59e0b" />
                      <span>Haz clic para subir</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFotoPrincipalChange}
                        style={styles.fileInput}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Galeria */}
            <div style={styles.galeriaSection}>
              <h3 style={styles.uploadTitle}>Galeria de Trabajos</h3>
              <p style={styles.uploadDescription}>
                Sube fotos de tus mejores trabajos para mostrar a tus clientes.
              </p>
              <div style={styles.galeriaGrid}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} style={styles.galeriaItem}>
                    <label style={styles.galeriaUpload}>
                      <Plus size={24} color="#6b7280" />
                      <input type="file" accept="image/*" style={styles.fileInput} />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#111827',
    color: 'white',
  },
  header: {
    backgroundColor: '#1f2937',
    borderBottom: '1px solid #374151',
    padding: '1rem 2rem',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    border: '1px solid #374151',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
  saveButton: {
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
    backgroundColor: '#1f2937',
    borderBottom: '1px solid #374151',
    padding: '0 2rem',
  },
  tabs: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: '0.5rem',
    overflowX: 'auto' as const,
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 1.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    fontSize: '0.95rem',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap' as const,
  },
  tabActive: {
    color: '#f59e0b',
    borderBottomColor: '#f59e0b',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  section: {
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    padding: '2rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: 'white',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: '#d1d5db',
    fontWeight: '500',
  },
  input: {
    padding: '0.75rem 1rem',
    backgroundColor: '#374151',
    border: '1px solid #4b5563',
    borderRadius: '8px',
    color: 'white',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1rem',
    backgroundColor: '#f59e0b',
    color: '#111',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  serviciosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem',
  },
  servicioCard: {
    backgroundColor: '#374151',
    borderRadius: '10px',
    padding: '1.25rem',
    border: '1px solid #4b5563',
  },
  servicioHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5rem',
  },
  servicioNombre: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
  },
  deleteButton: {
    padding: '0.25rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  servicioDescripcion: {
    fontSize: '0.85rem',
    color: '#9ca3af',
    marginBottom: '1rem',
  },
  servicioInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicioPrecio: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  servicioDuracion: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.85rem',
    color: '#9ca3af',
  },
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  modal: {
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '500px',
    border: '1px solid #374151',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem',
    borderBottom: '1px solid #374151',
  },
  modalTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    margin: 0,
  },
  modalClose: {
    padding: '0.25rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
  },
  modalBody: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    padding: '1.25rem',
    borderTop: '1px solid #374151',
  },
  cancelButton: {
    padding: '0.6rem 1rem',
    backgroundColor: 'transparent',
    border: '1px solid #4b5563',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  confirmButton: {
    padding: '0.6rem 1rem',
    backgroundColor: '#f59e0b',
    border: 'none',
    borderRadius: '8px',
    color: '#111',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  horariosContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  horarioRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: '#374151',
    borderRadius: '8px',
    flexWrap: 'wrap' as const,
    gap: '1rem',
  },
  horarioDia: {
    minWidth: '150px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    accentColor: '#f59e0b',
    cursor: 'pointer',
  },
  diaText: {
    fontSize: '1rem',
    fontWeight: '500',
  },
  horarioInputs: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  horarioInputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
  },
  horarioLabel: {
    fontSize: '0.75rem',
    color: '#9ca3af',
  },
  timeInput: {
    padding: '0.5rem',
    backgroundColor: '#1f2937',
    border: '1px solid #4b5563',
    borderRadius: '6px',
    color: 'white',
    fontSize: '0.9rem',
  },
  horarioSeparator: {
    color: '#6b7280',
    marginTop: '1rem',
  },
  cerradoText: {
    color: '#ef4444',
    fontStyle: 'italic',
  },
  multimediaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  uploadCard: {
    backgroundColor: '#374151',
    borderRadius: '10px',
    padding: '1.5rem',
  },
  uploadTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: 'white',
  },
  uploadDescription: {
    fontSize: '0.85rem',
    color: '#9ca3af',
    marginBottom: '1rem',
  },
  uploadArea: {
    border: '2px dashed #4b5563',
    borderRadius: '8px',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '150px',
    transition: 'border-color 0.2s',
  },
  uploadAreaLarge: {
    minHeight: '200px',
  },
  uploadLabel: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer',
    color: '#9ca3af',
  },
  fileInput: {
    display: 'none',
  },
  previewContainer: {
    position: 'relative' as const,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPreview: {
    maxWidth: '120px',
    maxHeight: '120px',
    borderRadius: '8px',
    objectFit: 'contain' as const,
  },
  fotoPrincipalPreview: {
    maxWidth: '100%',
    maxHeight: '180px',
    borderRadius: '8px',
    objectFit: 'cover' as const,
  },
  removeImageButton: {
    position: 'absolute' as const,
    top: '-8px',
    right: '-8px',
    padding: '0.25rem',
    backgroundColor: '#ef4444',
    border: 'none',
    borderRadius: '50%',
    color: 'white',
    cursor: 'pointer',
  },
  galeriaSection: {
    backgroundColor: '#374151',
    borderRadius: '10px',
    padding: '1.5rem',
  },
  galeriaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '1rem',
  },
  galeriaItem: {
    aspectRatio: '1',
    backgroundColor: '#1f2937',
    borderRadius: '8px',
    border: '2px dashed #4b5563',
  },
  galeriaUpload: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
};
