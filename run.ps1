# Arrancar Backend y Frontend del Proyecto BarberTurn

echo "Iniciando Backend (Spring Boot)..."
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList "-NoProfile -Command `"`$host.UI.RawUI.WindowTitle='Backend_Spring_Boot'; cd backend; .\mvnw.cmd spring-boot:run`""

echo "Iniciando Frontend (React)..."
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList "-NoProfile -Command `"`$host.UI.RawUI.WindowTitle='Frontend_React'; cd frontend; npm start`""

echo "Ambos servicios se han iniciado."
echo "- Frontend en: http://localhost:3000"
echo "- Backend en: http://localhost:8090"
echo "Presiona cualquier tecla para cerrar los procesos (Ctrl+C en las terminales activas)..."

$host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null
