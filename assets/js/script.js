$(document).ready(function () {
  $("#btn").click(function (event) {
    function limpiarErrores() {
      document.querySelector(".errorNumero").innerHTML = "";
  };
    event.preventDefault();
    // Se vacía el DIV contenedor con id cardsHero y chartContainer.
    $("#cardsHero").empty();
    $("#chartContainer").empty();
// validación
    // Se crea la variable idHero que se recibe desde el imput con id numHero
    let idHero = $("#numHero").val();
    if (!(/^[0-9]+$/.test(idHero))) {
      alert('Solo se permiten números');
      return;
  }
  
  // Se crea else if para enviar error de id no encintrado
  else if ((idHero) > 732 || (idHero) == 0) {
      alert("Ingrese un número desde el 1 al 732");
      return;
  }
  // Fin validación
    // Se crea variable
    let urlBase =
      "https://www.superheroapi.com/api.php/10230942351609658/" + idHero;
    // console.log(urlBase);
    $.ajax({
      type: "GET",
      url: urlBase,
      dataType: "json",
      success: function (response) {
        // mostramos por consola el Superheroe para consultar
        console.log("Superheroe: ", response);
        // Se crea las card para mostrar el superheroe buscado
        $("#cardsHero").append(
          `<div class="card mb-3"><div class="row g-0"><div class="col-md-4"><img src="${
            response.image.url
          }" class="img-fluid rounded-start" alt="${
            response.name
          }"></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">Nombre: ${
            response.name
          }</h5><p class="card-text">Conexiones: ${
            response.connections["group-affiliation"]
          }</p><p class="card-text"><small class="text-body-secondary">Publicado por: ${
            response.biography.publisher
          }</small></p><hr><p class="card-text">Ocupación: ${
            response.work.occupation
          }</p><hr><p class="card-text">Primera aparición: ${
            response.biography["first-appearance"]
          }</p><hr><p class="card-text">Altura: ${response.appearance.height.join(
            " / "
          )}</p><hr><p class="card-text">Peso: ${response.appearance.weight.join(
            " / "
          )}</p><hr><p class="card-text">Alianzas: ${response.biography.aliases.join(
            ", "
          )}}</p></div></div></div></div>`
        );
        

        // gráfico

        let areaGrafico;

        let options =
          ("#chartContainer",
          {
            animationEnabled: true,
            title: { text: "Stats de poderes de " + (response.name) },
            data: [
              {
                type: "pie",
                showInLegend: true,
                indexLabel: "{name} - {y}",
                dataPoints: [
                  { y: (response.powerstats.intelligence), name: "Inteligencia" },
                  { y: (response.powerstats.strength), name: "Fuerza" },
                  { y: (response.powerstats.speed), name: "Velocidad" },
                  { y: (response.powerstats.durability), name: "Resistencia" },
                  { y: (response.powerstats.power), name: "Poder" },
                  { y: (response.powerstats.combat), name: "Combate" },
                ],
              },
            ],
          });

        areaGrafico = $("#chartContainer");
        console.log("Objeto options: ", options);
        console.log("Objeto Jquery donde ira la grafica: ", areaGrafico);
        areaGrafico.CanvasJSChart(options);

        function explodePie(e) {
          if (
            typeof e.dataSeries.dataPoints[e.dataPointIndex].exploded ===
              "undefined" ||
            !e.dataSeries.dataPoints[e.dataPointIndex].exploded
          ) {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
          } else {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
          }
          e.chart.render();
        }
        // Fin Gráfico
      },
      error: function (error) {
        // mensaje error
        $("#cardsHero").append("Error, No se encuentra superheroe"
        );
      },
    });
  });
});
