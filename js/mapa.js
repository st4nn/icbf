var mapDiligenciamiento = null;
var markers = [];

function funMapa()
{

	$(document).delegate('.btn_VolverAlPanel', 'click', function(evento) {
		evento.preventDefault();
        cargarModulo("home-visita.html", "Hogar Visitado", function()
          {
            
          });
	});

	$(document).delegate('.btn_VolverAlMapa', 'click', function(evento) {
		evento.preventDefault();
        cargarModulo("mapa.html", "Registrar Visita", function()
          {
            
          });
	});

	

	$("#btnVisitas_VolverAlPanel").on("click", function(evento)
      {
        evento.preventDefault();
        cargarModulo("Inicio.html", "Inicio", function()
          {
            
          });
      });

	$("#btnVisitas_agregarHogar").on("click", function(evento)
      {
        evento.preventDefault();
        mapDiligenciamiento.getCameraPosition(function(camera) 
      	{
	        cargarModulo("registroResponsable.html", "Registrar Responsable", function()
	          {
	            //$("#frmVisita_AgregarResponsable")[0].reset();
		        $("#txtResponsable_Latitud").val(camera.target.lat);
		        $("#txtResponsable_Longitud").val(camera.target.lng);
	            $("#txtResponsable_Codigo").val(obtenerPrefijo());
	          });
      	});
      });

	$("#btnVisitas_VerHogar").on("click", function(evento)
	{
		evento.preventDefault();
		cargarModulo("home-visita.html", "Hogar Visitado", function()
		{
				
		});

	});

	if (mapDiligenciamiento == null)
	{
		var alto = $("body").height(); // - 60;
	    $("#cntVisitas_Mapa").height(alto);

	    $( window ).resize(function() 
	    {
	      var alto = $("body").height(); // - 60;
	      $("#cntVisitas_Mapa").height(alto);
	    });

	    var mapDiv = document.getElementById("cntVisitas_Mapa");
    
	    mapDiligenciamiento = plugin.google.maps.Map.getMap(mapDiv, {
	      'backgroundColor': 'white',
	      'controls': {
	        'compass': true,
	        'myLocationButton': true,
	        'mapTypeControl' : true,
	        'indoorPicker': true,
	        'zoom': true
	      },
	      'gestures': {
	        'scroll': true,
	        'tilt': true,
	        'rotate': true,
	        'zoom': true
	      }   });

	    mapDiligenciamiento.addEventListener(plugin.google.maps.event.MAP_READY, function() 
	      {
	      	mapa_CargarHogares();
	        mapDiligenciamiento.on(plugin.google.maps.event.MAP_CLICK, function()
	          {
	            if(!$("#cntVisitas_Mapa_Opciones").is(":visible"))
	            {
	              $("#cntVisitas_Marcador_Opciones").slideUp();
	              $("#cntVisitas_Mapa_Opciones").show();
	              $("#img_Marcador_Mira").show();
	            }
	          });

	        mapDiligenciamiento.setZoom(16);
	      });
	}
}

function mapa_CargarHogares()
{
	var sql = "SELECT Latitud, Longitud, Nombre1, Apellido1, Icono, Codigo FROM Responsable;";
	
	ejecutarSQL(sql, [], function(fila)
      {
        if (fila.length > 0)
        {
          var data = [];
          var urlImagen = "";
          var idx = 0;
          $.each(fila, function(index, val) 
          {
            if (val.latitud != "")
            {
              if (val.idEstado == "" || val.idEstado < 2)
              {
                val.idEstado = 0;
              }
              urlImagen = 'www/assets/images/icons/' + val.Icono;

              var posicion = new plugin.google.maps.LatLng(parseFloat(val.Latitud.replace(",", ".")), parseFloat(val.Longitud.replace(",", ".")));
               data.push({'position': posicion, 'title': val.Nombre1 + ' ' + val.Apellido1, 'icon' : {'url' : urlImagen}, 'snippet' : val.Codigo});
            }
          });

          addMarkers(data, function(markers) {
              markers[markers.length - 1].showInfoWindow();
            });
        }
      });

	function addMarkers(data, callback) {
	  markers = [];
	  var idxMarker = 0;
	  function onMarkerAdded(marker) {
	
	    markers[marker.getSnippet()] = marker;

	    if (markers.length === data.length) {
	      callback(markers);
	      marker.getPosition(function(latlng)
	      {
	        mapDiligenciamiento.setCenter(latlng)
	      });
	    }
	    marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function() 
	    {
	      $("#cntVisitas_Marcador_Opciones").show();
          $("#cntVisitas_Mapa_Opciones").hide();
          $("#img_Marcador_Mira").hide();
          $("#txtMapa_idHogar").val(marker.getSnippet());
          marker.getPosition(function(latlng)
          {
            mapDiligenciamiento.setCenter(latlng);
          });
	    });
	  }
	  data.forEach(function(markerOptions) {
	    mapDiligenciamiento.addMarker(markerOptions, onMarkerAdded);
	  });
	}
}