async function contador(horariosJSON) {
    for (let evento of horariosJSON) {
      await controladorActulizado(evento.texto, evento.horaFin);
    }
  }
  
  function controladorActulizado(textoEvento, horaEvento) {
    return new Promise((resolve) => {
      let elementos = document.getElementsByClassName("horario");
      let elementoTexto = document.getElementById("campoTexto");
      elementoTexto.textContent = textoEvento;
      let elementoTiempo = document.getElementById("campoTiempo");
      let tiempos = horaEvento.split(":");
      let temporizador = setInterval(function () {
        let tiempoFinal = new Date();
        tiempoFinal.setHours(tiempos[0]);
        tiempoFinal.setMinutes(tiempos[1]);
        tiempoFinal.setSeconds(tiempos[2]);
  
        let tiempoActual = new Date();
  
        let tiempoRestante =
          tiempoFinal.getHours() * 3600 +
          tiempoFinal.getMinutes() * 60 +
          tiempoFinal.getSeconds() -
          (tiempoActual.getHours() * 3600 +
            tiempoActual.getMinutes() * 60 +
            tiempoActual.getSeconds());

        tiempoRestante -= 1;

        let FormatoLetra = 1;

        if (tiempoRestante <= 60 * 60 * 5 && tiempoRestante > 60 * 60 * 5) {
          for (let elemento of elementos) {
            elemento.style.display = "block";
          }
        } else if (tiempoRestante <= 60 * 60 * 1 && tiempoRestante > 60 * 5) {
          FormatoLetra = 2;
          for (let elemento of elementos) {
            elemento.style.display = "block";
          }
        } else if (tiempoRestante <= 60 * 5 && tiempoRestante > 0) {
          FormatoLetra = 2;
          //elementoTiempo.style.color = "#ff0000";
          for (let elemento of elementos) {
            elemento.style.display = "block";
          }
        } else if(tiempoRestante < 0) {
          clearInterval(temporizador);
          for (let elemento of elementos) {
            elemento.style.display = "none";
          }
          resolve();
          return;
        }
  
        let horas = Math.floor(tiempoRestante / 3600);
        let minutos = Math.floor((tiempoRestante % 3600) / 60);
        let segundos = tiempoRestante % 60;
  
        horas = horas < 10 ? "0" + horas : horas;
        minutos = minutos < 10 ? "0" + minutos : minutos;
        segundos = segundos < 10 ? "0" + segundos : segundos;
  
        elementoTiempo.innerHTML =
          FormatoLetra == 1
            ? horas + ":" + minutos + ":" + segundos
            : minutos + ":" + segundos;
      }, 1000);
    });
  }
  