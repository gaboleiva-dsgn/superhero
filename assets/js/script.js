$(document).ready(function () {
  function limpiarErrores() {
    document.querySelector(".errorNumero").innerHTML = "";
  }
  $("#btn").click(function (event) {
    limpiarErrores();
    event.preventDefault();
    // Se vacía el DIV contenedor con id cardsHero y chartContainer.
    $("#cardsHero").empty();
    $("#chartContainer").empty();
    // validación
    // Se crea la variable idHero que se recibe desde el imput con id numHero
    let idHero = $("#numHero").val();
    if (!/^[0-9]+$/.test(idHero)) {
      // alert('Solo se permiten números');
      document.querySelector(".errorNumero").innerHTML =
        "Solo se permiten números !!!!";
      return;
    }

    // Se crea else if para enviar error de id no encintrado
    else if (idHero > 732 || idHero == 0) {
      document.querySelector(".errorNumero").innerHTML =
        "Ingrese un número desde el 1 al 732";

      return;
    }
    // Fin validación
    // Se crea variable urlBase y se concatena con idHero
    let urlBase =
      "https://www.superheroapi.com/api.php/10230942351609658/" + idHero;
    // console.log(urlBase);
    $.ajax({
      type: "GET",
      url: urlBase,
      dataType: "json",
      success: function (response) {
        // mostramos por consola el Superheroe para consultar
        //console.log("Superheroe: ", response);
        // Se crea las card para mostrar el superheroe buscado
        $("#cardsHero").append(
          `<div class="card mb-3"><div class="row g-0"><div class="col-md-4"><img src="${
            response.image == "null"
              ? "Imagen confidencial"
              : response.image.url
          }" class="img-fluid rounded-start" alt="${
            response.name == "null" ? "No se conoce su nombre" : response.name
          }"></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">Nombre: ${
            response.name == "null" ? "No se conoce su nombre" : response.name
          }</h5><p class="card-text">Conexiones: ${
            response.connections == "null"
              ? "Información confidencial"
              : response.connections["group-affiliation"]
          }</p><p class="card-text"><small class="text-body-secondary">Publicado por: ${
            response.biography.publisher == "null"
              ? "Información confidencial"
              : response.biography.publisher
          }</small></p><hr><p class="card-text">Ocupación: ${
            response.work.occupation == "null"
              ? "Información confidencial"
              : response.work.occupation
          }</p><hr><p class="card-text">Primera aparición: ${
            response.biography["first-appearance"] == "null"
              ? "Información confidencial"
              : response.biography["first-appearance"]
          }</p><hr><p class="card-text">Altura: ${
            response.appearance.height == "null"
              ? "Información confidencial"
              : response.appearance.height.join(" / ")
          }</p><hr><p class="card-text">Peso: ${
            response.appearance.weight == "null"
              ? "Información confidencial"
              : response.appearance.weight.join(" / ")
          }</p><hr><p class="card-text">Alianzas: ${
            response.appearance.aliases == "null"
              ? "Información confidencial"
              : response.biography.aliases.join(", ")
          }}</p></div></div></div></div>`
        );

        // gráfico

        let areaGrafico;

        let datosXY = [];

        for (const key in response.powerstats) {
          datosXY.push({
            label: key,
            y:
              response.powerstats[key] == "null"
                ? 0
                : Number(response.powerstats[key]),
          });
        }

        let options =
          ("#chartContainer",
          {
            legend: {
              //legend properties
              cursor: "pointer",
              itemclick: explodePie,
            },
            animationEnabled: true,
            title: { text: "Powerstats de " + response.name },
            data: [
              {
                type: "pie",
                showInLegend: true,
                legendText: "{label}",
                indexLabel: "{label} - {y}",
                dataPoints: datosXY,
              },
            ],
          });

        areaGrafico = $("#chartContainer");
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
        $("#cardsHero").append("Error, No se encuentra superheroe");
      },
    });
  });
});
