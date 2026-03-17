package com.Aplication.Services;

import com.Aplication.modelo.Barberia;
import com.Aplication.modelo.Barbero;
import com.Aplication.modelo.Horarios;
import com.Aplication.modelo.Servicio;
import com.Aplication.modelodto.BarberiaDTO;
import com.Aplication.modelodto.EstadisticasDTO;
import com.Aplication.modelodto.HorariosDTO;
import com.Aplication.repository.BarberiaRepository;
import com.Aplication.repository.BarberoRepository;
import com.Aplication.repository.HorariosRepository;
import com.Aplication.repository.ServicioRepository;
import com.Aplication.repository.TurnoRepository;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class BarberiaService {

    @Autowired
    private BarberiaRepository barberiaRepository;

    @Autowired
    private HorariosRepository horariosRepository;

    @Autowired
    private BarberoRepository barberoRepository;

    @Autowired
    private ServicioRepository servicioRepository;

    @Autowired
    private TurnoRepository turnoRepository;

    // ── CRUD Barbería ────────────────────────────────────────────────────────

    @Transactional
    public Barberia crear(Barberia barberia) {
        barberia.setFechaCreacion(LocalDateTime.now());
        barberia.setFechaActualizacion(LocalDateTime.now());
        return barberiaRepository.save(barberia);
    }

    public Optional<Barberia> findById(Long id) {
        return barberiaRepository.findById(id);
    }

    public Optional<Barberia> findByNombre(String nombre) {
        return barberiaRepository.findByNombre(nombre);
    }

    public List<Barberia> findByCiudad(String ciudad) {
        return barberiaRepository.findByCiudad(ciudad);
    }

    public List<Barberia> findAll() {
        return barberiaRepository.findAll();
    }

    @Transactional
    public Barberia actualizar(Long id, Barberia datosActualizados) {
        return barberiaRepository.findById(id).map(barberia -> {
            if (datosActualizados.getNombre() != null) {
                barberia.setNombre(datosActualizados.getNombre());
            }
            if (datosActualizados.getSlogan() != null) {
                barberia.setSlogan(datosActualizados.getSlogan());
            }
            if (datosActualizados.getDescripcion() != null) {
                barberia.setDescripcion(datosActualizados.getDescripcion());
            }
            if (datosActualizados.getDireccion() != null) {
                barberia.setDireccion(datosActualizados.getDireccion());
            }
            if (datosActualizados.getCiudad() != null) {
                barberia.setCiudad(datosActualizados.getCiudad());
            }
            if (datosActualizados.getTelefono() != null) {
                barberia.setTelefono(datosActualizados.getTelefono());
            }
            if (datosActualizados.getEmail() != null) {
                barberia.setEmail(datosActualizados.getEmail());
            }
            if (datosActualizados.getSitioWeb() != null) {
                barberia.setSitioWeb(datosActualizados.getSitioWeb());
            }
            if (datosActualizados.getInstagram() != null) {
                barberia.setInstagram(datosActualizados.getInstagram());
            }
            if (datosActualizados.getFacebook() != null) {
                barberia.setFacebook(datosActualizados.getFacebook());
            }
            barberia.setFechaActualizacion(LocalDateTime.now());
            return barberiaRepository.save(barberia);
        }).orElseThrow(() -> new RuntimeException("Barbería no encontrada con id: " + id));
    }

    @Transactional
    public void eliminar(Long id) {
        barberiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada con id: " + id));
        barberiaRepository.deleteById(id);
    }

    // ── Horarios ─────────────────────────────────────────────────────────────

    @Transactional
    public Barberia guardarHorarios(Long barberiaId, Horarios horarios) {
        Barberia barberia = barberiaRepository.findById(barberiaId)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada con id: " + barberiaId));

        if (barberia.getHorarios() != null) {
            Horarios existente = barberia.getHorarios();
            copiarCamposHorarios(horarios, existente);
            horariosRepository.save(existente);
        } else {
            Horarios savedHorarios = horariosRepository.save(horarios);
            barberia.setHorarios(savedHorarios);
        }
        barberia.setFechaActualizacion(LocalDateTime.now());
        return barberiaRepository.save(barberia);
    }

    public Optional<Horarios> obtenerHorarios(Long barberiaId) {
        return barberiaRepository.findById(barberiaId)
                .map(Barberia::getHorarios);
    }

    private void copiarCamposHorarios(Horarios origen, Horarios destino) {
        destino.setLunesAbierto(origen.getLunesAbierto());
        destino.setLunesApertura(origen.getLunesApertura());
        destino.setLunesCierre(origen.getLunesCierre());
        destino.setMartesAbierto(origen.getMartesAbierto());
        destino.setMartesApertura(origen.getMartesApertura());
        destino.setMartesCierre(origen.getMartesCierre());
        destino.setMiercolesAbierto(origen.getMiercolesAbierto());
        destino.setMiercolesApertura(origen.getMiercolesApertura());
        destino.setMiercolesCierre(origen.getMiercolesCierre());
        destino.setJuevesAbierto(origen.getJuevesAbierto());
        destino.setJuevesApertura(origen.getJuevesApertura());
        destino.setJuevesCierre(origen.getJuevesCierre());
        destino.setViernesAbierto(origen.getViernesAbierto());
        destino.setViernesApertura(origen.getViernesApertura());
        destino.setViernesCierre(origen.getViernesCierre());
        destino.setSabadoAbierto(origen.getSabadoAbierto());
        destino.setSabadoApertura(origen.getSabadoApertura());
        destino.setSabadoCierre(origen.getSabadoCierre());
        destino.setDomingoAbierto(origen.getDomingoAbierto());
        destino.setDomingoApertura(origen.getDomingoApertura());
        destino.setDomingoCierre(origen.getDomingoCierre());
    }

    // ── Gestión de Barberos ───────────────────────────────────────────────────

    @Transactional
    public Barbero agregarBarbero(Long barberiaId, Long barberoId) {
        Barberia barberia = barberiaRepository.findById(barberiaId)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada con id: " + barberiaId));
        Barbero barbero = barberoRepository.findById(barberoId)
                .orElseThrow(() -> new RuntimeException("Barbero no encontrado con id: " + barberoId));
        barbero.setBarberia(barberia);
        return barberoRepository.save(barbero);
    }

    @Transactional
    public void removerBarbero(Long barberiaId, Long barberoId) {
        barberiaRepository.findById(barberiaId)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada con id: " + barberiaId));
        Barbero barbero = barberoRepository.findById(barberoId)
                .orElseThrow(() -> new RuntimeException("Barbero no encontrado con id: " + barberoId));
        barbero.setBarberia(null);
        barberoRepository.save(barbero);
    }

    public List<Barbero> listarBarberos(Long barberiaId) {
        Barberia barberia = barberiaRepository.findById(barberiaId)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada con id: " + barberiaId));
        return barberia.getBarberos();
    }

    // ── Gestión de Servicios ──────────────────────────────────────────────────

    @Transactional
    public Servicio agregarServicio(Long barberiaId, Servicio servicio) {
        Barberia barberia = barberiaRepository.findById(barberiaId)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada con id: " + barberiaId));
        servicio.setBarberia(barberia);
        return servicioRepository.save(servicio);
    }

    @Transactional
    public Servicio actualizarServicio(Long barberiaId, int servicioId, Servicio datosServicio) {
        barberiaRepository.findById(barberiaId)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada con id: " + barberiaId));
        return servicioRepository.findById((long) servicioId).map(servicio -> {
            if (datosServicio.getNombreservicio() != null) {
                servicio.setNombreservicio(datosServicio.getNombreservicio());
            }
            if (datosServicio.getDecripcionservicio() != null) {
                servicio.setDecripcionservicio(datosServicio.getDecripcionservicio());
            }
            servicio.setPrecioservicio(datosServicio.getPrecioservicio());
            if (datosServicio.getDuracion() != null) {
                servicio.setDuracion(datosServicio.getDuracion());
            }
            return servicioRepository.save(servicio);
        }).orElseThrow(() -> new RuntimeException("Servicio no encontrado con id: " + servicioId));
    }

    @Transactional
    public void eliminarServicio(Long barberiaId, int servicioId) {
        barberiaRepository.findById(barberiaId)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada con id: " + barberiaId));
        Servicio servicio = servicioRepository.findById((long) servicioId)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado con id: " + servicioId));
        servicio.setBarberia(null);
        servicioRepository.delete(servicio);
    }

    public List<Servicio> listarServicios(Long barberiaId) {
        Barberia barberia = barberiaRepository.findById(barberiaId)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada con id: " + barberiaId));
        return barberia.getServicios();
    }

    // ── Estadísticas ──────────────────────────────────────────────────────────

    public EstadisticasDTO obtenerEstadisticas(Long barberiaId) {
        Barberia barberia = barberiaRepository.findById(barberiaId)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada con id: " + barberiaId));

        List<Barbero> barberos = barberia.getBarberos() != null ? barberia.getBarberos() : List.of();
        List<Servicio> servicios = barberia.getServicios() != null ? barberia.getServicios() : List.of();

        long totalBarberos = barberos.size();
        long barberosActivos = barberos.stream()
                .filter(b -> "activo".equalsIgnoreCase(b.getEstado()))
                .count();

        double calificacionPromedio = barberos.stream()
                .filter(b -> b.getCalificacion() != null)
                .mapToDouble(Barbero::getCalificacion)
                .average()
                .orElse(0.0);

        // Count turnos for this month using barbero emails belonging to the barberia
        List<String> emailsBarberos = barberos.stream()
                .filter(b -> b.getEmail() != null)
                .map(Barbero::getEmail)
                .collect(Collectors.toList());

        LocalDate inicioMes = LocalDate.now().withDayOfMonth(1);
        LocalDate finMes = inicioMes.plusMonths(1).minusDays(1);

        long citasEsteMes = emailsBarberos.isEmpty() ? 0
                : turnoRepository.findByEmailBarberoInAndFechaBetween(emailsBarberos, inicioMes, finMes).size();

        long citasCanceladas = emailsBarberos.isEmpty() ? 0
                : turnoRepository.findByEmailBarberoInAndFechaBetweenAndEstado(emailsBarberos, inicioMes, finMes, "cancelado").size();

        double tasaCancelacion = citasEsteMes > 0
                ? Math.round((double) citasCanceladas / citasEsteMes * 100.0 * 100.0) / 100.0
                : 0.0;

        double ingresosEstimados = citasEsteMes > 0 && !servicios.isEmpty()
                ? citasEsteMes * servicios.stream()
                        .mapToLong(Servicio::getPrecioservicio)
                        .average()
                        .orElse(0.0)
                : 0.0;

        return new EstadisticasDTO(
                barberiaId,
                barberia.getNombre(),
                totalBarberos,
                barberosActivos,
                (long) servicios.size(),
                citasEsteMes,
                citasCanceladas,
                tasaCancelacion,
                Math.round(calificacionPromedio * 100.0) / 100.0,
                Math.round(ingresosEstimados * 100.0) / 100.0
        );
    }

    // ── Imágenes ──────────────────────────────────────────────────────────────

    @Transactional
    public Barberia subirLogo(Long id, MultipartFile archivo) throws IOException {
        Barberia barberia = barberiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada con id: " + id));
        barberia.setLogo(archivo.getBytes());
        barberia.setFechaActualizacion(LocalDateTime.now());
        return barberiaRepository.save(barberia);
    }

    @Transactional
    public Barberia subirFotoPrincipal(Long id, MultipartFile archivo) throws IOException {
        Barberia barberia = barberiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada con id: " + id));
        barberia.setFotoPrincipal(archivo.getBytes());
        barberia.setFechaActualizacion(LocalDateTime.now());
        return barberiaRepository.save(barberia);
    }

    public byte[] obtenerLogo(Long id) {
        Barberia barberia = barberiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada con id: " + id));
        if (barberia.getLogo() == null) {
            throw new RuntimeException("Logo no encontrado para la barbería con id: " + id);
        }
        return barberia.getLogo();
    }

    public byte[] obtenerFotoPrincipal(Long id) {
        Barberia barberia = barberiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Barbería no encontrada con id: " + id));
        if (barberia.getFotoPrincipal() == null) {
            throw new RuntimeException("Foto principal no encontrada para la barbería con id: " + id);
        }
        return barberia.getFotoPrincipal();
    }

    // ── Conversión a DTO ──────────────────────────────────────────────────────

    public BarberiaDTO toDTO(Barberia barberia) {
        return new BarberiaDTO(
                barberia.getId(),
                barberia.getNombre(),
                barberia.getSlogan(),
                barberia.getDescripcion(),
                barberia.getDireccion(),
                barberia.getCiudad(),
                barberia.getTelefono(),
                barberia.getEmail(),
                barberia.getSitioWeb(),
                barberia.getInstagram(),
                barberia.getFacebook(),
                barberia.getLogo() != null,
                barberia.getFotoPrincipal() != null,
                barberia.getFechaCreacion(),
                barberia.getFechaActualizacion()
        );
    }

    public HorariosDTO toHorariosDTO(Horarios h) {
        return new HorariosDTO(
                h.getId(),
                h.getLunesAbierto(), h.getLunesApertura(), h.getLunesCierre(),
                h.getMartesAbierto(), h.getMartesApertura(), h.getMartesCierre(),
                h.getMiercolesAbierto(), h.getMiercolesApertura(), h.getMiercolesCierre(),
                h.getJuevesAbierto(), h.getJuevesApertura(), h.getJuevesCierre(),
                h.getViernesAbierto(), h.getViernesApertura(), h.getViernesCierre(),
                h.getSabadoAbierto(), h.getSabadoApertura(), h.getSabadoCierre(),
                h.getDomingoAbierto(), h.getDomingoApertura(), h.getDomingoCierre()
        );
    }
}
