var mapDiligenciamiento = null;
var markers = [];

function funMapa()
{

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
	            $("#frmVisita_AgregarResponsable")[0].reset();
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

