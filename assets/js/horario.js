document.addEventListener('DOMContentLoaded', () => {
  const btnLista = document.getElementById('btnLista');
  const btnCalendario = document.getElementById('btnCalendario');
  const vistaLista = document.getElementById('vistaLista');
  const vistaCalendario = document.getElementById('vistaCalendario');
  const cuerpoCalendario = document.getElementById('cuerpoCalendario');

  const diasSemana = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"];

  // 1. Función para alternar visualización
  function switchView(showCalendar) {
    if (showCalendar) {
      vistaLista.classList.add('d-none');
      vistaCalendario.classList.remove('d-none');
      btnCalendario.className = 'btn btn-primary';
      btnLista.className = 'btn btn-outline-secondary';
      renderizarCalendario();
    } else {
      vistaLista.classList.remove('d-none');
      vistaCalendario.classList.add('d-none');
      btnLista.className = 'btn btn-primary';
      btnCalendario.className = 'btn btn-outline-secondary';
    }
  }

  btnLista.addEventListener('click', () => switchView(false));
  btnCalendario.addEventListener('click', () => switchView(true));

  // 2. Función Motor de Renderizado
  function renderizarCalendario() {
    cuerpoCalendario.innerHTML = ""; // Limpiar

    // Extraer datos de la tabla actual
    const filas = document.querySelectorAll("#datosHorario tr");
    const mapaClases = Array.from(filas).map(f => {
      const cells = f.cells;
      return {
        nombre: cells[1].innerText,
        grupo: cells[2].innerText,
        dia: cells[3].innerText.trim(),
        horaInicio: parseInt(cells[4].innerText.split(':')[0]), // Toma el "08" de "08:00"
        aula: cells[5].innerText
      };
    });

    // EJE Y: Bucle de horas (de 8 AM a 5 PM)
    for (let hora = 8; hora <= 17; hora++) {
      const tr = document.createElement('tr');
      
      // Columna de la hora (Eje Y)
      const tdHora = document.createElement('td');
      tdHora.className = "table-light fw-bold";
      tdHora.innerText = `${hora < 10 ? '0' + hora : hora}:00`;
      tr.appendChild(tdHora);

      // Columnas de días (Lunes a Viernes)
      diasSemana.forEach(dia => {
        const td = document.createElement('td');
        
        // Buscar si hay una clase que coincida con este día y esta hora
        const clase = mapaClases.find(c => c.dia === dia && c.horaInicio === hora);

        if (clase) {
          td.innerHTML = `
            <div class="bg-clase">
              <div class="fw-bold" style="font-size: 0.75rem;">${clase.nombre}</div>
              <div style="font-size: 0.7rem;">${clase.grupo} - ${clase.aula}</div>
            </div>
          `;
        } else {
          // Celda vacía para que no se deforme la tabla
          td.innerText = "";
        }
        tr.appendChild(td);
      });

      cuerpoCalendario.appendChild(tr);
    }
  }
});
