function funVisitaSeguimiento()
{
	$("#frmVisita_VisitaSeguimiento").on("submit", function(evento)
	{
		evento.preventDefault();

    cargarModulo("home-visita.html", "Hogar Visitado", function(){
      Mensaje("Hey", "La visita ha sido registrada", "success");
    });
	});

  $("#btnVisitaSeguimiento_Foto").on("click", function()
  {
    abrirCamara(1, function(uri)
      {
            Mensaje("", "Foto guardada");
      });
  });

  $("#btnVisitaSeguimiento_Foto_Galeria").on("click", function()
  {
    abrirCamara(0, function(uri)
      {
        Mensaje("", "Foto Asociada");
       });      
  });

  iniciarWizard($("#cntVisitaSeguimiento_Wizard"), "#cntVisitaSeguimiento_Controles", function(){});

  $(document).delegate('.btnVisitaSeguimiento_BorrarCompromiso', 'click', function(event) {
    $(this).parent("div").parent("div").remove();
  });

  $("#btnVisitaSeguimiento_AgregarCompromiso").on("click", function(evento)
    {
      evento.preventDefault();
      var obj = $("#cntVisitaSeguimiento_Compromisos_PrimeraFila").html();
      obj = obj.replace("btnVisitaSeguimiento_BorrarCompromiso_fake hide", "btnVisitaSeguimiento_BorrarCompromiso");
      $("#cntVisitaSeguimiento_Compromisos").append('<div class="col-sm-12 row">' + obj + '</div>');
    });
}

