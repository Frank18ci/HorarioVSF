function generarTabla(horarios) {
    var horariosTable = document.getElementById("horariosBody");
    horariosTable.innerHTML = '';
    horarios.forEach(function (evento) {
        var row = document.createElement("tr");

        var textoCell = document.createElement("td");
        var inputText = document.createElement("input");
        inputText.className = `cuadroTexto elemento${evento.indice}`;
        inputText.id = `elementoTexto${evento.indice}`;
        inputText.setAttribute("type", "text");
        inputText.value = evento.texto;
        //inputText.setAttribute("disabled", "disabled");
        textoCell.appendChild(inputText);
        row.appendChild(textoCell);



        var horaCell = document.createElement("td");
        var inputHora = document.createElement("input");
        inputHora.className = `cuadroTexto elemento${evento.indice}`;
        inputHora.id = `elementoHora${evento.indice}`;
        inputHora.setAttribute("type", "time");
        inputHora.setAttribute("step", "1");
        inputHora.value = evento.horaFin;
        //inputHora.setAttribute("disabled", "disabled");
        horaCell.appendChild(inputHora);
        row.appendChild(horaCell);



        var cajaBtnEditar = document.createElement("td");
        cajaBtnEditar.style.textAlign = "center";
        var btnEditar = document.createElement("button");
        btnEditar.id = 'bntEditar';
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener('click', () => {
            var elementos1 = document.getElementsByClassName(`elemento${evento.indice}`);
            var elementosArray = Array.from(elementos1);
            elementosArray.forEach(function (elemento) {
                if (elemento.getAttribute("disabled") == "disabled") {
                    elemento.removeAttribute("disabled");
                } else {
                    elemento.setAttribute("disabled", "disabled");
                }
            });
        });


        cajaBtnEditar.appendChild(btnEditar);
        row.appendChild(cajaBtnEditar);

        horariosTable.appendChild(row);
        document.getElementById('seccionTabla').style.overflow = "auto";
    });
}
async function verificaExistencia(){
    let horario = await leerJSON();
    let horariosGuardados = horario.Horarios;

    if(horariosGuardados){
        var turnoHorarios = horariosGuardados[seleccionTurno()];
        generarTabla(turnoHorarios);
    } else{
        ValoresDefecto();
        return;
    }
}

function ActualizaHorario() {
const jsonData = localStorage.getItem("horarios");
if (jsonData) {
  const horariosGuardados = JSON.parse(jsonData);
  var turnoHorarios = horariosGuardados[seleccionTurno()];
  turnoHorarios.forEach((evento) => {
    var elementoTexto = document.getElementById(
      `elementoTexto${evento.indice}`
    ).value;
    evento.texto = elementoTexto;

    var elementoHora = document.getElementById(
        `elementoHora${evento.indice}`
    ).value;
    evento.horaFin = elementoHora;
  });
  const updatedJsonData = JSON.stringify(horariosGuardados);
  localStorage.setItem("horarios", updatedJsonData);
  verificaExistencia();
}
}

//Establece valores por defecto para cada tabla 
function ValoresDefecto(){
var horarios = horariosJSON.Horarios;
const jsonData = JSON.stringify(horarios);
localStorage.setItem("horarios", jsonData);
verificaExistencia();
}

//Selecciona el turno en base al cboBox 
function seleccionTurno(){
    const seleccionTurno = "seleccionTurno";
    const elementoSelect = document.getElementById(seleccionTurno);
    const selectedIndex = elementoSelect.selectedIndex;
    const selectedOption = elementoSelect.options[selectedIndex];
    const selectedValue = selectedOption.value;
    localStorage.setItem("turnoElegido", selectedValue);
    return selectedValue;
}
verificaExistencia();



let ventanaAbierta;



function abrirVentana() {
    // Cerrar la ventana abierta si existe
    if (ventanaAbierta && !ventanaAbierta.closed) {
        ventanaAbierta.close();
    }

    // Abrir una nueva ventana y guardar la referencia
    ventanaAbierta = window.open('./prueba.html', '_blank', 'width=500,height=500');
}


function estableceCBOTurnos(){
    let hora = new Date().getHours();
    const turnosCBO = document.getElementsByClassName('turnos');
    for(let i = 0; i < turnosCBO.length; i++){
        if(hora >= 7 && hora <= 10){
            if(turnosCBO[i].value == 'PrimerTurno') turnosCBO[i].setAttribute('selected', 'selected');
            verificaExistencia();
        }
        else if(hora >= 11 && hora <= 14){
            if(turnosCBO[i].value == 'SegundoTurno') turnosCBO[i].setAttribute('selected', 'selected');
            verificaExistencia();
        }
        else if(hora >= 17 && hora <= 20){
            if(turnosCBO[i].value == 'TercerTurno') turnosCBO[i].setAttribute('selected', 'selected');    
            verificaExistencia();
        }
    }
}

estableceCBOTurnos();