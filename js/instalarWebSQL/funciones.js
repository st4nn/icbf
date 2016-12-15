function instalarWebSQL()
{
  var sentencia = "";
  var datos ={};

  ejecutarSQL(crearTabla("Login"), []);

  ejecutarSQL(crearTabla("sincronizacion"), []);

  ejecutarSQL(crearTabla("parametros"), []);

  ejecutarSQL(crearTabla("Fotos"), []);
}
function crearTabla(Tabla)
{
  var sentencia = "";

  switch (Tabla)
  {
    case "Login":
      sentencia = 'CREATE TABLE IF NOT EXISTS Login (id, username, password, nombre, email, empresa)';
    break
    case "sincronizacion":
      sentencia = 'CREATE TABLE IF NOT EXISTS Sincronizacion (Nombre, Valor)';
    break    
    case "parametros":
      sentencia = 'CREATE TABLE IF NOT EXISTS Parametros (Nombre, Valor, Proceso, Estado, fechaCargue)';
    break    
    case "Fotos":
      sentencia = 'CREATE TABLE IF NOT EXISTS Fotos (idFoto, Proceso, idProyecto, idRecurso, Estado, Ruta, fechaCargue)';
    break
  }
  return sentencia;
}
function parametroSincronizado(parametro, valor)
{
  ejecutarSQL("SELECT * FROM Sincronizacion WHERE Nombre = ?", [parametro], function(tx)
  {
    if (tx.length > 0)
    {
      ejecutarInsert("UPDATE Sincronizacion SET Valor = ? WHERE Nombre = ?", [valor, parametro]);
    } else
    {
      ejecutarInsert("INSERT INTO Sincronizacion (Valor, Nombre) VALUES (?, ?)", [valor, parametro]);
    }
  });
}