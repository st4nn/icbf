function funRegistroResponsable()
{

	$("#frmVisita_AgregarResponsable").on("submit", function(evento)
	{
		evento.preventDefault();

		var posicion = new plugin.google.maps.LatLng(parseFloat($("#txtResponsable_Latitud").val().replace(",", ".")), parseFloat($("#txtResponsable_Longitud").val().replace(",", ".")));
        var data = {'position': posicion, 'title': $("#txtResponsable_Nombre1").val() + " " + $("#txtResponsable_Apellido1").val(), 'icon' : {'url' : 'www/assets/images/icons/tree_Programado.png'}, 'snippet' : $("#txtResponsable_Codigo").val()};

        mapDiligenciamiento.addMarker(data, function(marker)
          {
            markers[marker.getSnippet()] = marker;

            marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function() 
            {
              $("#cntVisitas_Marcador_Opciones").show();
              $("#cntVisitas_Mapa_Opciones").hide();
              $("#img_Marcador_Mira").hide();
              marker.getPosition(function(latlng)
              {
                personMarker.setPosition(latlng);
                mapDiligenciamiento.setCenter(latlng);
              });
              $("#txtLevantamiento_Poda_idArbol").val(marker.getSnippet());
            });
            cargarModulo("mapa.html", "Registro de Visita", function(){
              Mensaje("Hey", "El Hogar ha sido agregado", "success");
            });
          });
	});
}

