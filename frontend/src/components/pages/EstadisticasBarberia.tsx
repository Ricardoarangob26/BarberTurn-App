import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  DollarSign, 
  Scissors, 
  XCircle, 
  Calendar, 
  UserX,
  Star,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  Trophy,
  MessageSquare,
  Percent,
  BarChart3,
  PieChart,
  Users,
  Clock,
  ChevronDown,
  FileText,
  FileSpreadsheet
} from 'lucide-react';

type FilterPeriod = 'today' | 'yesterday' | 'week' | 'month' | 'year';

interface StatCard {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  color: string;
}

interface BarberLeaderboard {
  id: number;
  name: string;
  avatar: string;
  appointments: number;
  rating: number;
  revenue: number;
  tips: number;
}

interface Review {
  id: number;
  clientName: string;
  clientAvatar: string;
  barberName: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

const EstadisticasBarberia: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<FilterPeriod>('month');
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Mock data - En produccion vendria del backend
  const statsData: Record<FilterPeriod, {
    revenue: number;
    services: number;
    cancellations: number;
    rescheduled: number;
    noShows: number;
    avgRating: number;
    totalReviews: number;
    tipsPercentage: number;
    tipsTotal: number;
  }> = {
    today: {
      revenue: 450000,
      services: 12,
      cancellations: 1,
      rescheduled: 2,
      noShows: 0,
      avgRating: 4.8,
      totalReviews: 8,
      tipsPercentage: 15,
      tipsTotal: 67500,
    },
    yesterday: {
      revenue: 520000,
      services: 15,
      cancellations: 2,
      rescheduled: 1,
      noShows: 1,
      avgRating: 4.6,
      totalReviews: 12,
      tipsPercentage: 12,
      tipsTotal: 62400,
    },
    week: {
      revenue: 3200000,
      services: 89,
      cancellations: 8,
      rescheduled: 12,
      noShows: 3,
      avgRating: 4.7,
      totalReviews: 65,
      tipsPercentage: 14,
      tipsTotal: 448000,
    },
    month: {
      revenue: 12500000,
      services: 342,
      cancellations: 28,
      rescheduled: 45,
      noShows: 12,
      avgRating: 4.7,
      totalReviews: 248,
      tipsPercentage: 13,
      tipsTotal: 1625000,
    },
    year: {
      revenue: 145000000,
      services: 4120,
      cancellations: 312,
      rescheduled: 520,
      noShows: 145,
      avgRating: 4.6,
      totalReviews: 2890,
      tipsPercentage: 12,
      tipsTotal: 17400000,
    },
  };

  const currentStats = statsData[selectedPeriod];

  const barberLeaderboard: BarberLeaderboard[] = [
    {
      id: 1,
      name: 'Carlos Martinez',
      avatar: 'https://i.pravatar.cc/150?img=11',
      appointments: 98,
      rating: 4.9,
      revenue: 3800000,
      tips: 520000,
    },
    {
      id: 2,
      name: 'Juan Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=12',
      appointments: 87,
      rating: 4.8,
      revenue: 3200000,
      tips: 410000,
    },
    {
      id: 3,
      name: 'Miguel Santos',
      avatar: 'https://i.pravatar.cc/150?img=13',
      appointments: 76,
      rating: 4.7,
      revenue: 2900000,
      tips: 380000,
    },
    {
      id: 4,
      name: 'Pedro Gomez',
      avatar: 'https://i.pravatar.cc/150?img=14',
      appointments: 65,
      rating: 4.6,
      revenue: 2400000,
      tips: 290000,
    },
    {
      id: 5,
      name: 'Luis Hernandez',
      avatar: 'https://i.pravatar.cc/150?img=15',
      appointments: 54,
      rating: 4.5,
      revenue: 2100000,
      tips: 250000,
    },
  ];

  const recentReviews: Review[] = [
    {
      id: 1,
      clientName: 'Roberto Silva',
      clientAvatar: 'https://i.pravatar.cc/150?img=33',
      barberName: 'Carlos Martinez',
      rating: 5,
      comment: 'Excelente corte, muy profesional y atento a los detalles. Sin duda volvere.',
      date: '2024-01-15',
      service: 'Corte + Barba',
    },
    {
      id: 2,
      clientName: 'Andres Mejia',
      clientAvatar: 'https://i.pravatar.cc/150?img=34',
      barberName: 'Juan Rodriguez',
      rating: 4,
      comment: 'Buen servicio, aunque tuve que esperar un poco mas de lo esperado.',
      date: '2024-01-14',
      service: 'Corte Clasico',
    },
    {
      id: 3,
      clientName: 'Felipe Torres',
      clientAvatar: 'https://i.pravatar.cc/150?img=35',
      barberName: 'Miguel Santos',
      rating: 5,
      comment: 'Increible experiencia, el mejor fade que me han hecho.',
      date: '2024-01-14',
      service: 'Fade Premium',
    },
    {
      id: 4,
      clientName: 'Diego Ramirez',
      clientAvatar: 'https://i.pravatar.cc/150?img=36',
      barberName: 'Carlos Martinez',
      rating: 5,
      comment: 'Siempre confiable, excelente atencion y resultado perfecto.',
      date: '2024-01-13',
      service: 'Corte + Cejas',
    },
  ];

  const serviceBreakdown = [
    { name: 'Corte Clasico', count: 120, percentage: 35, revenue: 3600000 },
    { name: 'Corte + Barba', count: 85, percentage: 25, revenue: 4250000 },
    { name: 'Fade Premium', count: 68, percentage: 20, revenue: 2720000 },
    { name: 'Barba Completa', count: 45, percentage: 13, revenue: 1125000 },
    { name: 'Otros', count: 24, percentage: 7, revenue: 805000 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <span style={{ ...styles.changeIndicator, color: '#22c55e' }}>
          <TrendingUp size={14} />
          +{change}%
        </span>
      );
    } else if (change < 0) {
      return (
        <span style={{ ...styles.changeIndicator, color: '#ef4444' }}>
          <TrendingDown size={14} />
          {change}%
        </span>
      );
    }
    return <span style={{ ...styles.changeIndicator, color: '#9ca3af' }}>0%</span>;
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    // En produccion esto generaria el archivo real
    alert(`Exportando reporte en formato ${format.toUpperCase()}...`);
    setShowExportMenu(false);
  };

  const periodLabels: Record<FilterPeriod, string> = {
    today: 'Hoy',
    yesterday: 'Ayer',
    week: 'Esta Semana',
    month: 'Este Mes',
    year: 'Este Ano',
  };

  const statCards: StatCard[] = [
    {
      title: 'Ingresos Totales',
      value: formatCurrency(currentStats.revenue),
      change: 12,
      changeLabel: 'vs periodo anterior',
      icon: <DollarSign size={24} />,
      color: '#22c55e',
    },
    {
      title: 'Servicios Realizados',
      value: currentStats.services.toString(),
      change: 8,
      changeLabel: 'vs periodo anterior',
      icon: <Scissors size={24} />,
      color: '#3b82f6',
    },
    {
      title: 'Cancelaciones',
      value: currentStats.cancellations.toString(),
      change: -5,
      changeLabel: 'vs periodo anterior',
      icon: <XCircle size={24} />,
      color: '#ef4444',
    },
    {
      title: 'Reagendamientos',
      value: currentStats.rescheduled.toString(),
      change: 3,
      changeLabel: 'vs periodo anterior',
      icon: <Calendar size={24} />,
      color: '#f59e0b',
    },
    {
      title: 'No Shows',
      value: currentStats.noShows.toString(),
      change: -15,
      changeLabel: 'vs periodo anterior',
      icon: <UserX size={24} />,
      color: '#8b5cf6',
    },
    {
      title: 'Propinas',
      value: formatCurrency(currentStats.tipsTotal),
      change: 10,
      changeLabel: `${currentStats.tipsPercentage}% promedio`,
      icon: <Percent size={24} />,
      color: '#ec4899',
    },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => navigate('/gestion-barberos')} style={styles.backButton}>
          <ArrowLeft size={20} />
          Volver
        </button>
        <h1 style={styles.headerTitle}>Estadisticas del Negocio</h1>
        <div style={styles.headerActions}>
          <div style={styles.exportWrapper}>
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)} 
              style={styles.exportButton}
            >
              <Download size={18} />
              Exportar
              <ChevronDown size={16} />
            </button>
            {showExportMenu && (
              <div style={styles.exportMenu}>
                <button onClick={() => handleExport('pdf')} style={styles.exportMenuItem}>
                  <FileText size={16} />
                  Exportar PDF
                </button>
                <button onClick={() => handleExport('excel')} style={styles.exportMenuItem}>
                  <FileSpreadsheet size={16} />
                  Exportar Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Filtros de periodo */}
      <div style={styles.filtersSection}>
        <div style={styles.filterLabel}>
          <Filter size={16} />
          Periodo:
        </div>
        <div style={styles.filterButtons}>
          {(Object.keys(periodLabels) as FilterPeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              style={{
                ...styles.filterButton,
                ...(selectedPeriod === period ? styles.filterButtonActive : {}),
              }}
            >
              {periodLabels[period]}
            </button>
          ))}
        </div>
      </div>

      {/* Tarjetas de estadisticas principales */}
      <div style={styles.statsGrid}>
        {statCards.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={styles.statCardHeader}>
              <div style={{ ...styles.statIcon, backgroundColor: `${stat.color}20` }}>
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              {getChangeIndicator(stat.change)}
            </div>
            <div style={styles.statValue}>{stat.value}</div>
            <div style={styles.statTitle}>{stat.title}</div>
            <div style={styles.statChangeLabel}>{stat.changeLabel}</div>
          </div>
        ))}
      </div>

      {/* Seccion de valoraciones */}
      <div style={styles.ratingsSection}>
        <div style={styles.ratingsSummary}>
          <h2 style={styles.sectionTitle}>
            <Star size={20} color="#f59e0b" />
            Valoraciones
          </h2>
          <div style={styles.ratingOverview}>
            <div style={styles.bigRating}>
              <span style={styles.ratingNumber}>{currentStats.avgRating}</span>
              <div style={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    fill={star <= Math.round(currentStats.avgRating) ? '#f59e0b' : 'transparent'}
                    color="#f59e0b"
                  />
                ))}
              </div>
              <span style={styles.reviewCount}>{currentStats.totalReviews} resenas</span>
            </div>
            <div style={styles.ratingBars}>
              {[5, 4, 3, 2, 1].map((rating) => {
                const percentage = rating === 5 ? 65 : rating === 4 ? 25 : rating === 3 ? 7 : rating === 2 ? 2 : 1;
                return (
                  <div key={rating} style={styles.ratingBarRow}>
                    <span style={styles.ratingBarLabel}>{rating}</span>
                    <Star size={12} fill="#f59e0b" color="#f59e0b" />
                    <div style={styles.ratingBarTrack}>
                      <div style={{ ...styles.ratingBarFill, width: `${percentage}%` }} />
                    </div>
                    <span style={styles.ratingBarPercentage}>{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Seccion de dos columnas: Leaderboard y Resenas */}
      <div style={styles.twoColumnSection}>
        {/* Leaderboard de barberos */}
        <div style={styles.leaderboardSection}>
          <h2 style={styles.sectionTitle}>
            <Trophy size={20} color="#f59e0b" />
            Leaderboard de Barberos
          </h2>
          <div style={styles.leaderboardTabs}>
            <button style={{ ...styles.leaderboardTab, ...styles.leaderboardTabActive }}>
              Por Citas
            </button>
            <button style={styles.leaderboardTab}>Por Valoracion</button>
            <button style={styles.leaderboardTab}>Por Ingresos</button>
          </div>
          <div style={styles.leaderboardList}>
            {barberLeaderboard.map((barber, index) => (
              <div key={barber.id} style={styles.leaderboardItem}>
                <div style={styles.leaderboardRank}>
                  {index < 3 ? (
                    <div style={{
                      ...styles.rankBadge,
                      backgroundColor: index === 0 ? '#f59e0b' : index === 1 ? '#9ca3af' : '#cd7f32',
                    }}>
                      {index + 1}
                    </div>
                  ) : (
                    <span style={styles.rankNumber}>{index + 1}</span>
                  )}
                </div>
                <img src={barber.avatar} alt={barber.name} style={styles.leaderboardAvatar} />
                <div style={styles.leaderboardInfo}>
                  <span style={styles.leaderboardName}>{barber.name}</span>
                  <span style={styles.leaderboardStats}>
                    {barber.appointments} citas | {formatCurrency(barber.revenue)}
                  </span>
                </div>
                <div style={styles.leaderboardRating}>
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  {barber.rating}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resenas recientes */}
        <div style={styles.reviewsSection}>
          <h2 style={styles.sectionTitle}>
            <MessageSquare size={20} color="#3b82f6" />
            Resenas Recientes
          </h2>
          <div style={styles.reviewsList}>
            {recentReviews.map((review) => (
              <div key={review.id} style={styles.reviewCard}>
                <div style={styles.reviewHeader}>
                  <img src={review.clientAvatar} alt={review.clientName} style={styles.reviewAvatar} />
                  <div style={styles.reviewMeta}>
                    <span style={styles.reviewClientName}>{review.clientName}</span>
                    <span style={styles.reviewService}>{review.service} con {review.barberName}</span>
                  </div>
                  <div style={styles.reviewRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        fill={star <= review.rating ? '#f59e0b' : 'transparent'}
                        color="#f59e0b"
                      />
                    ))}
                  </div>
                </div>
                <p style={styles.reviewComment}>{review.comment}</p>
                <span style={styles.reviewDate}>{review.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desglose de servicios */}
      <div style={styles.servicesBreakdown}>
        <h2 style={styles.sectionTitle}>
          <PieChart size={20} color="#8b5cf6" />
          Desglose por Servicio
        </h2>
        <div style={styles.servicesGrid}>
          <div style={styles.servicesChart}>
            {/* Representacion visual simplificada */}
            <div style={styles.donutChart}>
              <div style={styles.donutCenter}>
                <span style={styles.donutTotal}>{currentStats.services}</span>
                <span style={styles.donutLabel}>Total</span>
              </div>
            </div>
            <div style={styles.chartLegend}>
              {serviceBreakdown.map((service, index) => {
                const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#6b7280'];
                return (
                  <div key={index} style={styles.legendItem}>
                    <span style={{ ...styles.legendDot, backgroundColor: colors[index] }} />
                    <span style={styles.legendLabel}>{service.name}</span>
                    <span style={styles.legendPercentage}>{service.percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={styles.servicesTable}>
            <div style={styles.tableHeader}>
              <span style={{ flex: 2 }}>Servicio</span>
              <span style={{ flex: 1, textAlign: 'center' as const }}>Cantidad</span>
              <span style={{ flex: 1, textAlign: 'right' as const }}>Ingresos</span>
            </div>
            {serviceBreakdown.map((service, index) => (
              <div key={index} style={styles.tableRow}>
                <span style={{ flex: 2, fontWeight: 500 }}>{service.name}</span>
                <span style={{ flex: 1, textAlign: 'center' as const, color: '#9ca3af' }}>
                  {service.count}
                </span>
                <span style={{ flex: 1, textAlign: 'right' as const, color: '#22c55e' }}>
                  {formatCurrency(service.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metricas adicionales */}
      <div style={styles.additionalMetrics}>
        <h2 style={styles.sectionTitle}>
          <BarChart3 size={20} color="#3b82f6" />
          Metricas de Rendimiento
        </h2>
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <div style={styles.metricIcon}>
              <Clock size={24} color="#3b82f6" />
            </div>
            <div style={styles.metricInfo}>
              <span style={styles.metricValue}>32 min</span>
              <span style={styles.metricLabel}>Tiempo promedio por servicio</span>
            </div>
          </div>
          <div style={styles.metricCard}>
            <div style={styles.metricIcon}>
              <Users size={24} color="#22c55e" />
            </div>
            <div style={styles.metricInfo}>
              <span style={styles.metricValue}>78%</span>
              <span style={styles.metricLabel}>Tasa de clientes recurrentes</span>
            </div>
          </div>
          <div style={styles.metricCard}>
            <div style={styles.metricIcon}>
              <TrendingUp size={24} color="#f59e0b" />
            </div>
            <div style={styles.metricInfo}>
              <span style={styles.metricValue}>{formatCurrency(currentStats.revenue / currentStats.services)}</span>
              <span style={styles.metricLabel}>Ticket promedio</span>
            </div>
          </div>
          <div style={styles.metricCard}>
            <div style={styles.metricIcon}>
              <Calendar size={24} color="#8b5cf6" />
            </div>
            <div style={styles.metricInfo}>
              <span style={styles.metricValue}>92%</span>
              <span style={styles.metricLabel}>Tasa de ocupacion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#111827',
    color: 'white',
    padding: '1.5rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
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
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  exportWrapper: {
    position: 'relative' as const,
  },
  exportButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1rem',
    backgroundColor: '#f59e0b',
    border: 'none',
    borderRadius: '8px',
    color: '#111',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  exportMenu: {
    position: 'absolute' as const,
    top: '100%',
    right: 0,
    marginTop: '0.5rem',
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
    borderRadius: '8px',
    overflow: 'hidden',
    zIndex: 10,
    minWidth: '160px',
  },
  exportMenuItem: {
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
  filtersSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap' as const,
  },
  filterLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#9ca3af',
    fontSize: '0.9rem',
  },
  filterButtons: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap' as const,
  },
  filterButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
    borderRadius: '8px',
    color: '#9ca3af',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'all 0.2s',
  },
  filterButtonActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
    color: '#111',
    fontWeight: 'bold',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    padding: '1.25rem',
    border: '1px solid #374151',
  },
  statCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  statIcon: {
    padding: '0.75rem',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem',
  },
  statTitle: {
    fontSize: '0.9rem',
    color: '#9ca3af',
    marginBottom: '0.25rem',
  },
  statChangeLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  ratingsSection: {
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2rem',
    border: '1px solid #374151',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    margin: 0,
    marginBottom: '1.25rem',
  },
  ratingsSummary: {},
  ratingOverview: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap' as const,
  },
  bigRating: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '1rem',
  },
  ratingNumber: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  ratingStars: {
    display: 'flex',
    gap: '0.25rem',
    marginBottom: '0.5rem',
  },
  reviewCount: {
    color: '#9ca3af',
    fontSize: '0.9rem',
  },
  ratingBars: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
    minWidth: '200px',
  },
  ratingBarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  ratingBarLabel: {
    width: '1rem',
    textAlign: 'center' as const,
    fontSize: '0.85rem',
    color: '#9ca3af',
  },
  ratingBarTrack: {
    flex: 1,
    height: '8px',
    backgroundColor: '#374151',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#f59e0b',
    borderRadius: '4px',
  },
  ratingBarPercentage: {
    width: '2.5rem',
    textAlign: 'right' as const,
    fontSize: '0.8rem',
    color: '#6b7280',
  },
  twoColumnSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  leaderboardSection: {
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #374151',
  },
  leaderboardTabs: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
    flexWrap: 'wrap' as const,
  },
  leaderboardTab: {
    padding: '0.5rem 0.75rem',
    backgroundColor: 'transparent',
    border: '1px solid #374151',
    borderRadius: '6px',
    color: '#9ca3af',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  leaderboardTabActive: {
    backgroundColor: '#374151',
    color: 'white',
  },
  leaderboardList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  leaderboardItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem',
    backgroundColor: '#111827',
    borderRadius: '8px',
  },
  leaderboardRank: {
    width: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  rankBadge: {
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: '#111',
  },
  rankNumber: {
    color: '#6b7280',
    fontSize: '0.9rem',
  },
  leaderboardAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
  },
  leaderboardInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  leaderboardName: {
    fontWeight: 500,
    fontSize: '0.9rem',
  },
  leaderboardStats: {
    fontSize: '0.75rem',
    color: '#9ca3af',
  },
  leaderboardRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  reviewsSection: {
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #374151',
  },
  reviewsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    maxHeight: '400px',
    overflowY: 'auto' as const,
  },
  reviewCard: {
    padding: '1rem',
    backgroundColor: '#111827',
    borderRadius: '8px',
  },
  reviewHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.75rem',
  },
  reviewAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
  },
  reviewMeta: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  reviewClientName: {
    fontWeight: 500,
    fontSize: '0.9rem',
  },
  reviewService: {
    fontSize: '0.75rem',
    color: '#9ca3af',
  },
  reviewRating: {
    display: 'flex',
    gap: '0.125rem',
  },
  reviewComment: {
    fontSize: '0.85rem',
    color: '#d1d5db',
    margin: 0,
    marginBottom: '0.5rem',
    lineHeight: 1.5,
  },
  reviewDate: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  servicesBreakdown: {
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2rem',
    border: '1px solid #374151',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  servicesChart: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '1.5rem',
  },
  donutChart: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    background: 'conic-gradient(#3b82f6 0deg 126deg, #22c55e 126deg 216deg, #f59e0b 216deg 288deg, #8b5cf6 288deg 335deg, #6b7280 335deg 360deg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutCenter: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#1f2937',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutTotal: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  donutLabel: {
    fontSize: '0.75rem',
    color: '#9ca3af',
  },
  chartLegend: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
    width: '100%',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  legendDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  legendLabel: {
    flex: 1,
    fontSize: '0.85rem',
  },
  legendPercentage: {
    fontSize: '0.85rem',
    color: '#9ca3af',
  },
  servicesTable: {
    flex: 1,
  },
  tableHeader: {
    display: 'flex',
    padding: '0.75rem',
    borderBottom: '1px solid #374151',
    color: '#9ca3af',
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  tableRow: {
    display: 'flex',
    padding: '0.75rem',
    borderBottom: '1px solid #374151',
    fontSize: '0.9rem',
  },
  additionalMetrics: {
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #374151',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem',
  },
  metricCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#111827',
    borderRadius: '8px',
  },
  metricIcon: {
    padding: '0.75rem',
    backgroundColor: '#1f2937',
    borderRadius: '10px',
  },
  metricInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  metricValue: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  metricLabel: {
    fontSize: '0.8rem',
    color: '#9ca3af',
  },
};

export default EstadisticasBarberia;
