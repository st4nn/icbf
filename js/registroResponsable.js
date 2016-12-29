function funRegistroResponsable()
{

	$("#frmVisita_AgregarResponsable").on("submit", function(evento)
	{
		evento.preventDefault();

		var posicion = new plugin.google.maps.LatLng(parseFloat($("#txtResponsable_Latitud").val().replace(",", ".")), parseFloat($("#txtResponsable_Longitud").val().replace(",", ".")));
        var data = {'position': posicion, 'title': $("#txtResponsable_Nombre1").val() + " " + $("#txtResponsable_Apellido1").val(), 'icon' : {'url' : 'www/assets/images/icons/tree_green.png'}, 'snippet' : $("#txtResponsable_Codigo").val()};

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
            });

            $("#frmVisita_AgregarResponsable").guardarFormulario("txtResponsable_", "Responsable", {campo : "Codigo", valor : $("#txtResponsable_Codigo").val()}, function()
            {
              cargarModulo("mapa.html", "Registro de Visita", function(){
                Mensaje("Hey", "El Hogar ha sido agregado", "success");
              });
            });
          });
	});

  $("#txtResponsable_FechaNacimiento").on("change", function()
  {
    var valor = $(this).val();
    if (valor != "")
    {
      valor = calcularEdad(valor);
      valor = valor.anios + " años, " + valor.meses + " meses y " + valor.dias + " días";
    } 
    $("#txtResponsable_Edad").val(valor);
  });

  $("#btnRegistroResponsable_Foto").on("click", function()
  {
    abrirCamara(1, function(uri)
      {
        Responsable_RegistrarFoto(uri);
      });
  });

  $("#btnRegistroResponsable_Galeria").on("click", function()
  {
    abrirCamara(0, function(uri)
      {
        Responsable_RegistrarFoto(uri);  
      });      
  });

  function Responsable_RegistrarFoto(uri)
  {
    ejecutarSQL("SELECT * FROM Fotos WHERE Proceso = ? AND idRecurso = ?", ["Registro_Responsable", $("#txtResponsable_Codigo").val()], function(fotos)
    {
      if (fotos.length > 0)
      {
        ejecutarInsert("UPDATE Fotos SET Ruta = ?, Estado = ?, fechaCargue = ? WHERE Proceso = ? AND idRecurso =  ?", [uri, 'Sincronizar', obtenerFecha(), "Registro_Responsable", $("#txtResponsable_Codigo").val()], function()
        {
          Mensaje("", "Foto Actualizada");
        });
      } else
      {
        ejecutarInsert("INSERT INTO Fotos (idFoto, Proceso, idRecurso, Estado, Ruta, fechaCargue) VALUES (?, ?, ?, ?, ?, ?)", [obtenerPrefijo(), "Registro_Responsable", $("#txtResponsable_Codigo").val(), 'Sincronizar', uri, obtenerFecha()], function()
        {
          Mensaje("", "Foto Asociada");
        });

      }
      $("#imgResponsable_Foto").attr("src", uri);
    });
  }
}

