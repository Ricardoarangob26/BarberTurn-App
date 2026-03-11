package com.Aplication.Services;


import com.Aplication.modelo.Turno;
import com.Aplication.repository.TurnoRepository;
import jakarta.mail.MessagingException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.scheduling.annotation.Scheduled;

@Service
public class TurnoService {

    @Autowired
    private TurnoRepository turnoRepository;
    
    @Autowired
    private EmailService emailService;

    // Crear o actualizar un turno
    public Turno saveOrUpdate(Turno turno) {
        // Verificar si ya existe un turno para el mismo barbero, local, fecha y hora
        Optional<Turno> turnoExistente = turnoRepository.findByBarberoAndLocalAndFechaAndHora(
                turno.getBarbero(), turno.getLocal(), turno.getFecha(), turno.getHora()
        );

        if (turnoExistente.isPresent()) {
            throw new RuntimeException("Este turno ya está reservado para esta fecha y hora con este barbero en el local especificado.");
        }

        // Guardar el turno
        Turno savedTurno = turnoRepository.save(turno);

        // Enviar correo al cliente
        String subject = "Confirmación de tu reserva en BarberTurn";
        String htmlContent = "<html lang='es'>"
                + "<head><meta charset='UTF-8'/><meta name='viewport' content='width=device-width, initial-scale=1.0'/><title>Confirmación de Reserva - BarberTurn</title></head>"
                + "<body style='font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f6f6f6;'>"
                + "<table cellpadding='0' cellspacing='0' border='0' width='100%' style='background-color: #f6f6f6; padding: 20px;'>"
                + "<tr><td align='center'><table cellpadding='0' cellspacing='0' border='0' width='600' style='background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);'>"
                + "<tr><td style='padding: 40px 0; text-align: center; background-color: #FFD700;'><h1 style='color: #333333; font-size: 28px; margin: 0;'>¡Reserva Confirmada!</h1></td></tr>"
                + "<tr><td style='padding: 40px 30px;'>"
                + "<p style='color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;'>Hola <strong>" + turno.getCliente() + "</strong>,</p>"
                + "<p style='color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;'>Tu reserva en BarberTurn ha sido confirmada.</p>"
                + "<p style='color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;'>Detalles de tu reserva:</p>"
                + "<ul style='color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;'>"
                + "<li>Fecha: <strong>" + turno.getFecha() + "</strong></li>"
                + "<li>Hora: <strong>" + turno.getHora() + "</strong></li>"
                + "<li>Barbería: <strong>" + turno.getLocal() + "</strong></li>"
                + "<li>Barbero: <strong>" + turno.getBarbero() + "</strong></li>"
                + "</ul>"
                + "<p style='color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 30px;'>¡Gracias por elegir BarberTurn!</p>"
                + "</td></tr>"
                + "<tr><td style='background-color: #333333; padding: 30px; text-align: center;'>"
                + "<p style='color: #ffffff; font-size: 14px; margin: 0;'>El equipo de BarberTurn</p>"
                + "</td></tr></table></td></tr></table></body></html>";

        try {
            emailService.sendHtmlEmail(turno.getEmailCliente(), subject, htmlContent);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Error al enviar el correo electrónico");
        }

        return savedTurno;
    }


    // Obtener todos los turnos
    public List<Turno> getAllTurnos() {
        return turnoRepository.findAll();
    }

    // Obtener turno por ID
    public Optional<Turno> findById(Long id) {
        return turnoRepository.findById(id);
    }

    // Eliminar un turno
    public void deleteTurno(Turno turno) {
        turnoRepository.delete(turno);
    }

    // Actualizar un turno por ID
    public Turno updateTurno(Long id, Turno updateTurno) {
        return turnoRepository.findById(id).map(turno -> {
            turno.setFecha(updateTurno.getFecha());
            turno.setLocal(updateTurno.getLocal());
            turno.setEstado(updateTurno.getEstado());
            turno.setCorte(updateTurno.getCorte());
            turno.setAdicional(updateTurno.getAdicional());
            turno.setEmailBarbero(updateTurno.getEmailBarbero());
            turno.setEmailCliente(updateTurno.getEmailCliente());
            turno.setCliente(updateTurno.getCliente());
            turno.setHora(updateTurno.getHora());
            return turnoRepository.save(turno);  // Guardar turno actualizado
        }).orElseThrow(() -> new RuntimeException("Turno no encontrado"));
    }
    
    // Tarea programada para enviar el recordatorio 20 minutos antes del turno
    @Scheduled(fixedRate = 60000)  // Ejecuta cada minuto
    public void sendTurnoReminder() throws MessagingException {
        System.out.println("Revisando los turnos...");
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime reminderTime = now.plusMinutes(5); // 20 minutos antes del turno

        // Obtiene la hora actual y la hora del recordatorio
        LocalTime nowTime = now.toLocalTime();
        LocalTime reminderTimeStart = reminderTime.toLocalTime();

        // Convierte la hora de LocalTime a String
        String horaRecordatorio = reminderTimeStart.format(DateTimeFormatter.ofPattern("HH:mm"));

        // Buscar todos los turnos para la fecha actual
        List<Turno> turnos = turnoRepository.findByFechaAndHoraBetween(now.toLocalDate(), "00:00", "23:59");
        System.out.println("Turnos encontrados: " + turnos.size());

        // Filtrar los turnos que están dentro del rango de 20 minutos antes de la hora del turno
        for (Turno turno : turnos) {
            // Convertimos la hora del turno a LocalTime para compararla
            LocalTime turnoHora = LocalTime.parse(turno.getHora(), DateTimeFormatter.ofPattern("HH:mm"));
            System.out.println("Hora del turno: " + turnoHora);

            // Verificamos si la hora del turno está dentro del rango de 20 minutos antes
            if (turnoHora.isAfter(reminderTimeStart.minusMinutes(1)) && turnoHora.isBefore(reminderTimeStart.plusMinutes(1))) {
                // Enviar el correo de recordatorio
                String subject = "Recordatorio de tu reserva en BarberTurn";
                String htmlContent = "<html lang='es'>"
                        + "<head><meta charSet='UTF-8'/><meta name='viewport' content='width=device-width, initial-scale=1.0'/><title>Recordatorio de Reserva - BarberTurn</title></head>"
                        + "<body style='font-family: Helvetica Neue, Arial, sans-serif; margin: 0; padding: 0; background-color: #f6f6f6;'>"
                        + "<table cellpadding='0' cellspacing='0' border='0' width='100%' style='background-color: #f6f6f6; padding: 20px;'>"
                        + "<tr><td align='center'><table cellpadding='0' cellspacing='0' border='0' width='600' style='background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);'>"
                        + "<tr><td style='padding: 40px 0; text-align: center; background-color: #FFD700;'><h1 style='color: #333333; font-size: 28px; margin: 0;'>¡Recordatorio de Reserva!</h1></td></tr>"
                        + "<tr><td style='padding: 40px 30px;'>"
                        + "<p style='color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;'>Hola <strong>" + turno.getCliente() + "</strong>,</p>"
                        + "<p style='color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;'>Tu reserva en BarberTurn es a las <strong>" + turno.getHora() + "</strong> con el barbero <strong>" + turno.getBarbero() + "</strong> en la barbería <strong>" + turno.getLocal() + "</strong>.</p>"
                        + "<p style='color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;'>Te recomendamos que te acerques a la barbería en los próximos minutos si te encuentras en una larga distancia.</p>"
                        + "<p style='color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 30px;'>¡Nos vemos pronto!</p>"
                        + "<table cellpadding='0' cellspacing='0' border='0' width='100%'><tr><td align='center'>"
                        + "<a href='https://barberturn.netlify.app/' style='display: inline-block; background-color: #FFD700; color: #333333; text-decoration: none; font-weight: bold; padding: 12px 30px; border-radius: 25px; font-size: 16px;'>Ver mi reserva</a>"
                        + "</td></tr></table></td></tr>"
                        + "<tr><td style='background-color: #333333; padding: 30px; text-align: center;'>"
                        + "<p style='color: #ffffff; font-size: 14px; margin: 0 0 10px 0;'>¡Gracias por elegir BarberTurn!</p>"
                        + "<p style='color: #ffffff; font-size: 14px; margin: 0;'>El equipo de BarberTurn</p>"
                        + "</td></tr></table></td></tr></table></body></html>";

                // Enviar correo al cliente
                System.out.println("Enviando correo a: " + turno.getEmailCliente());
                emailService.sendHtmlEmail(turno.getEmailCliente(), subject, htmlContent);
            }
        }
    }
}