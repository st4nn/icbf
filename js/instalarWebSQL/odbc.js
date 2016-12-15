var db;

function abrirWebSQL()
{
  db = openDatabase("icbf_1", "1.0", "Base de datos de ICBF", 5*1024*1024);
  instalarWebSQL();
}
function InsertarMasivo(sentencia, datos, callback)
{
    if (callback === undefined)
        {callback = function(){};}

  $.each(datos, function(index, val) 
  {
     ejecutarInsert(sentencia, val);
  });
  callback();
}
function ejecutarInsert(sentencia, datos, callback, siError)
{
  if (siError === undefined)
        {siError = errorCB;}

  if (callback === undefined)
        {callback = function(){};}

  db.transaction(function(tx) 
  {
    tx.executeSql(sentencia, datos, callback, function(tx, error)
      {
        siError(tx, error);
        if (datos === undefined)
        {
          datos = [];
        }
        console.log(obtenerFecha2() + " " + sentencia + " -->" + datos.toString());
      });
  });
}
function ejecutarSQL(sentencia, parametro, callback, siError)
{
  if (siError === undefined)
        {siError = errorCB;}

  if (callback === undefined)
        {callback = function(){};}

  db.transaction(function(tx) 
  {
    tx.executeSql(sentencia, parametro, 
      function(tx, rs)
      {
        var data = [];
        var maximo = rs.rows.length;
              var idx = 0;
              for (idx = 0; idx < maximo; idx++) 
              {
                data.push(rs.rows.item(idx));
              };
        callback(data);
      }
      , function(tx, error)
      {
        siError(tx, error);
        if (parametro === undefined)
        {
          parametro = [];
        }
        console.log(obtenerFecha2() + " " + sentencia + " -->" + parametro.toString());
      });
  });
}
function errorCB(tx, error)
{
  Mensaje("Error", error.message, "danger");
}
function comprobarWebSQL()
{
  ejecutarSQL("SELECT * FROM Login", [], function(tx, rs)
        {}, function(tx, rs)
        {
          instalarWebSQL();
        });
        
}

function obtenerFecha2()
{
  var f = new Date();
  return f.getFullYear() + "-" + CompletarConCero2(f.getMonth() +1, 2) + "-" + CompletarConCero2(f.getDate(), 2) + " " + CompletarConCero2(f.getHours(), 2) + ":" + CompletarConCero2(f.getMinutes(), 2) + ":" + CompletarConCero2(f.getSeconds(), 2);
}

function CompletarConCero2(n, length)
{
   n = n.toString();
   while(n.length < length) n = "0" + n;
   return n;
}