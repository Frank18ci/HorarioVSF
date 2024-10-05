async function leerJSON() {
    const response = await fetch("./horario.json");
    const data = await response.json();
    return data;
}