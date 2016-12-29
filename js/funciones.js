var Usuario = null;
abrirWebSQL();

$(document).ready(function() {
	aplicacion();
  Usuario = JSON.parse(localStorage.getItem('jhyp_icbf'));
  
  if (Usuario == null || Usuario == undefined)
  {
    cerrarSesion();
  }

  document.addEventListener("backbutton", function(e)
    { 
          e.preventDefault(); 
    }, false);
});

function aplicacion()
{
  $("#lblCerrarSesion").on("click", cerrarSesion);
    
  $(document).delegate('.lnkMenuBar_Item', 'click', function(evento) {
      evento.preventDefault();
      var titulo = $(this).find('span').text();
      if (titulo == null)
      {
        titulo = $(this).parent("div").find('span').text();
      }
      var vinculo = $(this).attr("vinculo");

      if (vinculo != undefined)
      {
       	cargarModulo(vinculo, titulo);
        if ($(window).width() < 767)
          {
            $("#btnInicio_OcultarMenu").trigger('click');
          }
      }
  });
  
  $(document).delegate(".inputControl", "change" ,function()
    {
      var contenedor = $(this).parent("span").parent("span").parent("div");
      var texto = $(contenedor).find(".inputText");
      var archivo = $(this).val();
      archivo = archivo.split("\\");
      archivo = archivo[(archivo.length - 1)];
      $(texto).val(archivo);
      var barra = $(contenedor).parent("form").find(".progress-bar");
      var percentVal = '0%';
      $(barra).width(percentVal);
      $(barra).text(percentVal);
    });
}

function cargarModulo(vinculo, titulo, callback)
{
  titulo = titulo || null;

  if (callback === undefined)
    {callback = function(){};}


	$(".Modulo").hide();
        var tds = "";
        var nomModulo = "modulo_" + vinculo.replace(/\s/g, "_");
        nomModulo = nomModulo.replace(/\./g, "_");
        nomModulo = nomModulo.replace(/\//g, "_");

        if ($('#' + nomModulo).length)
        {
          $('#' + nomModulo).show();
          callback();
        } else
        {
          tds += '<div id="' + nomModulo + '" class="page Modulo">';
          tds += '</div>';

          $("#contenedorDeModulos").append(tds);
          $.get(vinculo + "?tmpId=" + obtenerPrefijo(), function(data) 
          {
            $("#" + nomModulo).html(data);
            callback();
          });
        }
        $("#lblUbicacionModulo").text(titulo);
}
$.fn.generarDatosEnvio = function(restricciones, callback)
{
  if (callback === undefined)
    {callback = function(){};}

    var obj = $(this).find(".guardar");
  var datos = {};
  datos['Usuario'] = Usuario.id;

  $.each(obj, function(index, val) 
  {
    if ($(val).attr("id") != undefined)
    {
      if (!$(val).hasClass('tt-hint'))
      {
        datos[$(val).attr("id").replace(restricciones, "")] = $(val).val();
      }
    }
  });
  datos = JSON.stringify(datos);  

  callback(datos);
}
function Mensaje(Titulo, Mensaje, Tipo)
{
  if (Tipo == undefined)
  {
    Tipo = "success";
  }
  switch (Tipo)
  {
    case "success":
        alertify.success(Mensaje);
      break;
    case "danger":
        alertify.error(Mensaje);
      break;
    default:
        alertify.log(Mensaje);
  }
}

function cerrarSesion()
{
  delete localStorage.jhyp_icbf;
  window.location.replace("../index.html");
}
function readURL(input, idObj) 
{
  var Nombre = input.value.replace("C:\\fakepath\\", "");
  
  if (input.files && input.files[0]) 
  {
      var reader = new FileReader();

      var tds = "";
      var tds2 = "";

      reader.onload = function (e) 
      {
        auditoria_AgregarSoporte(idObj, e.target.result, Nombre, 0);       
      }
      reader.readAsDataURL(input.files[0]);
  }
}

function textObtenerCoordenadas(callback, sierror)
{
  if (callback === undefined)
    {callback = function(){};}

if (sierror === undefined)
    {sierror = function(){};}


  var objCoordenadas ="";
  navigator.geolocation.getCurrentPosition(
    function(datos)
    {
      var lat = datos.coords.latitude;
      var lon = datos.coords.longitude;
      var accu = datos.coords.accuracy;

      objCoordenadas =  lat + "," + lon + "#" + accu;
      callback(lat, lon, accu);
    }, 
    function ()
    {
      objCoordenadas ="No hay precision en el dato";
      if (pMensaje != false)
      {
        Mensaje("Ubicación", objCoordenadas);
      }
      sierror(objCoordenadas);
    });
  return objCoordenadas;
}

 function obtenerCoordenadas()
{
  if ($("#modulo_obras_auditoria_html").is(":visible"))
  {
    navigator.geolocation.getCurrentPosition(devCoordenads, errorMapa);
  } 
}

function devCoordenads(datos)
{
  var lat = datos.coords.latitude;
  var lon = datos.coords.longitude;
  $("#txtCoordenadas").val(lat + "," + lon);
}
function errorMapa()
{
  
}
function abrirURL(url)
{
  var win = window.open(url, "_blank", "directories=no, location=no, menubar=no, resizable=yes, scrollbars=yes, statusbar=no, tittlebar=no");
  win.focus();
}
function obtenerFecha()
{
  var f = new Date();
  return f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 2);
}
function obtenerPrefijo()
{
  var f = new Date();
  return f.getFullYear() + CompletarConCero(f.getMonth() +1, 2) + CompletarConCero(f.getDate(), 2) + CompletarConCero(f.getHours(), 2) + CompletarConCero(f.getMinutes(), 2) + CompletarConCero(f.getSeconds(), 2) + CompletarConCero(Usuario.id, 3);
}
function CompletarConCero(n, length)
{
   n = n.toString();
   while(n.length < length) n = "0" + n;
   return n;
}
$.fn.crearDataTable = function(tds, callback)
{
  if (callback === undefined)
    {callback = function(){};}

  var dtSpanish = {
    "sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún dato disponible en esta tabla",
    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Filtrar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
  };

  var options = {
        "aoColumnDefs": [{
          'bSortable': false,
          'aTargets': [-1]
        }],
        "iDisplayLength": 10,
        "aLengthMenu": [
          [10, 25, 50, -1],
          [10, 25, 50, "Todos"]
        ],
        "sDom": '<"dt-panelmenu clearfix"lTfr>t<"dt-panelfooter clearfix"ip>',
        "oTableTools": {
          "sSwfPath": "../assets/vendor/datatables-tabletools/swf/copy_csv_xls_pdf.swf"
        },
        "language" : dtSpanish
      };

  var idObj = $(this).attr("id");
  if ($("#" + idObj + "_wrapper").length == 1)
    {
        $(this).dataTable().fnDestroy();
    } 

    if (tds =! undefined && tds != "")
    {
      $(this).find("tbody").find("tr").remove();
      $("#" + idObj + " tbody").append(tds);
    }

  $(this).DataTable(options);
  callback();
}
function sumarFecha(fecha, days)
{
    milisegundos=parseInt(35*24*60*60*1000);
 
    fecha=new Date(fecha);
    day=fecha.getDate();
    month=fecha.getMonth()+1;
    year=fecha.getFullYear();
 
    tiempo=fecha.getTime();
    milisegundos=parseInt(days*24*60*60*1000);
    total=fecha.setTime(tiempo+milisegundos);
    day=fecha.getDate();
    month=fecha.getMonth()+1;
    year=fecha.getFullYear();
 
    return year + "-" + CompletarConCero(month, 2)  + "-" + CompletarConCero(day, 2);   
}

function controlarPermisos()
{
  
}

function abrirCamara(tipo, callback, sierror)
{
  
  if (callback == undefined)
  {    callback = function(){};  }

  var ownCallback = function(uri){ callback(uri)};

  if (sierror == undefined)
  {    sierror = cameraFail;  }

  var vSourceType = Camera.PictureSourceType.CAMERA;
  var vDestinationType = Camera.DestinationType.FILE_URI;
  
  if (tipo == 0)
  {
    vSourceType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    //vDestinationType = Camera.DestinationType.NATIVE_URI;
    ownCallback = function(uri)
    {
      window.FilePath.resolveNativePath(uri, function(rUri)
      {
        callback(rUri);
      });
    };
  }

  navigator.camera.getPicture(ownCallback, sierror, 
    { quality: 80,
      sourceType: vSourceType,
    destinationType: vDestinationType,
    correctOrientation: true,
    targetWidth: 380, targetHeight: 480,
    saveToPhotoAlbum : true });
}

function cameraFail(message) 
{
  Mensaje("Error", message, "danger");
}

function iniciarWizard(elemento, controles, funFinish, funBeforeChange)
{
  if (funBeforeChange == undefined)
  {
    funBeforeChange = function(from, to){};
  }

  if (funFinish == undefined)
  {
    funFinish = function(){};
  }
  var defaults = $.components.getDefaults("wizard");
  var options = $.extend(true, {}, defaults, {
    autoFocus: false,
    buttonsAppendTo: controles,
    buttonLabels: {
            next: 'Siguiente',
            back: 'Anterior',
            finish: 'Cerrar'
        },
    onBeforeChange: funBeforeChange,
    onFinish : funFinish
  });

  var wizard = elemento.wizard(options).data('wizard');
}

function calcularEdad(fecha)
{
  if (fecha != "")
  {
    // Si la fecha es correcta, calculamos la edad
    var values=fecha.split("-");
    var dia = values[2];
    var mes = values[1];
    var ano = values[0];

    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth()+1;
    var ahora_dia = fecha_hoy.getDate();

    // realizamos el calculo
    var edad = (ahora_ano + 1900) - ano;
    if ( ahora_mes < mes )
    {
        edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia))
    {
        edad--;
    }
    if (edad > 1900)
    {
        edad -= 1900;
    }

    // calculamos los meses
    var meses=0;
    if(ahora_mes>mes)
        meses=ahora_mes-mes;
    if(ahora_mes<mes)
        meses=12-(mes-ahora_mes);
    if(ahora_mes==mes && dia>ahora_dia)
        meses=11;

    // calculamos los dias
    var dias=0;
    if(ahora_dia>dia)
        dias=ahora_dia-dia;
    if(ahora_dia<dia)
    {
        ultimoDiaMes=new Date(ahora_ano, ahora_mes, 0);
        dias=ultimoDiaMes.getDate()-(dia-ahora_dia);
    }
      
      return {anios : edad, meses : meses, dias : dias};
  } else
  {
    return {anios : 0, meses : 0, dias : 0};
  }
}

$.fn.guardarFormulario = function(restricciones, tabla, unicidad, callback)
{
  if (callback === undefined)
  {
    callback = function(){};
  }

  $(this).generarDatosEnvio(restricciones, function(datos)
  {
    datos = $.parseJSON(datos);
    var campos = "";
    var parametros = "";
    var update = "";
    var valores = [];
    $.each(datos, function(index, val) 
    {
      campos += index + ", ";
      parametros += "?, ";
      update += index + '= ?, ';
      
      valores.push(val);
    });
    
    update += 'Estado = ?, fechaCargue = ?';
    parametros += '?, ?';
    campos += 'Estado, fechaCargue';
    valores.push('Sincronizar');
    valores.push(obtenerFecha());

    ejecutarSQL("SELECT * FROM " + tabla + " WHERE " + unicidad.campo + " = ?", [unicidad.valor], function(unico)
    {
      if (unico.length > 0)
      {
        valores.push(unicidad.valor);
        ejecutarSQL("UPDATE " + tabla + ' SET ' + update + ' WHERE ' + unicidad.campo + '= ?;', valores, function()
        {
          callback();
        });
      } else
      {
        ejecutarSQL('INSERT INTO ' + tabla + ' (' + campos + ') VALUES (' + parametros + ');', valores, function()
        {
          callback();
        });
      }
    });
  });
}

$.fn.generarJsonRadios = function(restricciones, objCampo, callback)
{

  if (callback === undefined)
  {
    callback = function(){};
  }

  var obj = $(this).find(".cntRadio_Comentarios");
  $(objCampo).val("");

  var idObj = {};
  var Comentarios = {};
  var Valor = "";
  var Cadena = [];
  if (obj.length > 0)
  {
    $.each(obj, function(index, val) 
    {
      idObj = {};
      Comentarios = {};
      Valor = "";
      
      idObj = $(val).find('input:checked');
      if (idObj.length == 0)
      {
        idObj = $(val).find('input[type=radio]');
      } else
      {
        Valor = $("label[for=" + $(idObj).attr("id") + "]").text();
      }

        idObj = $(idObj[0]).attr("name").replace(restricciones, "");
        Comentarios = $(val).find("textarea");
        if (Comentarios.length > 0)
        {
          Comentarios = $(Comentarios[0]).val();
        } else
        {
          Comentarios = "";
        }
      Cadena.push({'p' : idObj,  'r' : Valor, 'o' : Comentarios});
    });
    $(objCampo).val(JSON.stringify(Cadena));
    callback();
  }
}