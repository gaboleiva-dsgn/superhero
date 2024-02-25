$(document).ready(function () {
  $("#btn").click(function (event) {
    event.preventDefault();
    let idHero = document.querySelector("#numHero").value;
    let urlBase = "https://www.superheroapi.com/api.php/10230942351609658/" + idHero;
    console.log(urlBase);
    $.ajax({
      type: "GET",
      url: urlBase,
      dataType: "json",
      success: function (response) {
        //console.log(response.element.id);
        console.log("Superheroe: ", response);
        $('#idHero').text(response.id);
        $('#nameHero').text(response.name);
      },
      error: function (error) {
        // mensaje error
      },
    });
  });
});
