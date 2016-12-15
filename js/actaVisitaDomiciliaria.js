function funActaVisitaDomiciliaria()
{

	$("#frmVisita_ActaVisitaDomiciliaria").on("submit", function(evento)
	{
		evento.preventDefault();

    cargarModulo("home-visita.html", "Hogar Visitado", function(){
      Mensaje("Hey", "El acta ha sido registrada y se enviará por correo", "success");
    });
	});

  $("#btnActaVisitaDomiciliaria_Foto").on("click", function()
  {
    abrirCamara(1, function(uri)
      {
            Mensaje("", "Foto guardada");
      });
  });

  $("#btnActaVisitaDomiciliaria_Galeria").on("click", function()
  {
    abrirCamara(0, function(uri)
      {
        Mensaje("", "Foto Asociada");
       });      
  });
}

