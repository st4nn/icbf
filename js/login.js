$(document).on("ready", ready_login);

function ready_login()
{
  abrirWebSQL();

  $("#btnEntrar").on("click", frmLogin_submit);
  $("#frmLogin").on("submit", frmLogin_submit);

  navigator.geolocation.getCurrentPosition(function(dato)
    {

    });

  /**
   * Fragmento para controlar si la sesión está activa
  **/

  if (localStorage.jhyp_icbf != null)
  {
    window.location.replace("aplicacion/index.html");
  } else
  {
    instalarWebSQL();
  }

  $.post("http://cerberus.wspcolombia.com/server/movil/sincronizarUsuarios.php", {},
    function(data)
    {
      if (typeof(data) == "object")
      {  
        ejecutarInsert("DELETE FROM Login", [], 
          function()
          {
            $.each(data, function(index, val) 
            {
               ejecutarInsert("INSERT INTO Login (id, username, password, nombre, email, empresa) VALUES (?, ?, ?, ?, ?, ?)", [val.id, val.username, val.password, val.nombre, val.email, val.empresa]);
            });
          });
      } else
      {
        
      }
    }, "json").fail(function()
    {
      ejecutarSQL("SELECT * FROM Login WHERE id = ?", [1], function(data)
        {
          if (data.length == 0)
          {
              ejecutarInsert("INSERT INTO Login (id, username, password, nombre, email, empresa) VALUES (?, ?, ?, ?, ?, ?)", [1, "admin", "dab4ec27e4772948284b13606a5a61a9", "Jhonathan Espinosa", "jhonathan.espinosa@wspgroup.com", 1]);
          }
        });
    });
}
/**
 * Evento que se llama cuando el usuario hace submit para Iniciar Sesión
**/
function frmLogin_submit(event)
{
  event.preventDefault();
  var cDate = new Date();

    var pUsuario = $("#txtLogin_Usuario").val();
    var pClave = md5(md5(md5($("#txtLogin_Clave").val())));

    ejecutarSQL('SELECT * FROM Login WHERE username = ? AND password = ?', [pUsuario, pClave], 
    function(rs)
    { 
      if (rs.length != 0)
      {
        rs[0].cDate = cDate;
        localStorage.setItem("jhyp_icbf", JSON.stringify(rs[0]));  

        window.location.replace("aplicacion/index.html");
      } else
      {
        $(".alert").html("<strong>Error!</strong> Acceso denegado.");
        $(".alert").fadeIn(300).delay(2600).fadeOut(600);
      }
    });
}