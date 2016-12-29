function instalarWebSQL()
{
  var sentencia = "";
  var datos ={};

  ejecutarSQL(crearTabla("Login"), []);

  ejecutarSQL(crearTabla("sincronizacion"), []);

  ejecutarSQL(crearTabla("parametros"), []);

  ejecutarSQL(crearTabla("Fotos"), []);

  ejecutarSQL(crearTabla("Responsable"), []);

  ejecutarSQL(crearTabla("VisitaSeguimiento"), []);

  ejecutarSQL(crearTabla("ActaVisitaDomiciliaria"), []);

  ejecutarSQL(crearTabla("PlatinSeguimiento"), []);
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
    case "Responsable":
      sentencia = 'CREATE TABLE IF NOT EXISTS Responsable (Usuario, Latitud, Longitud, Codigo, Cedula, Apellido1, Apellido2, Nombre1, Nombre2, FechaNacimiento, Telefono1, Telefono2, Celular1, Celular2, Correo, Direccion, Barrio, Localidad, Icono, fechaCargue, Estado)';
    break
    case "VisitaSeguimiento":
      sentencia = 'CREATE TABLE IF NOT EXISTS VisitaSeguimiento (Usuario, Latitud, Longitud, Codigo, Recibe_Nombre, Recibe_Documento, Recibe_Correo, Encuesta, Compromisos, FechaInicio, FechaFin, Responsable, fechaCargue, Estado)';
    break
    case "ActaVisitaDomiciliaria":
      sentencia = 'CREATE TABLE IF NOT EXISTS ActaVisitaDomiciliaria (Usuario, Latitud, Longitud, Codigo, Area, Fecha, Observacion, Observaciones, Recomendaciones, MiembrosDelHogar, MiembrosDelEquipo, FechaInicio, FechaFin, Responsable, fechaCargue, Estado)';
    break
    case "PlatinSeguimiento":
      sentencia = 'CREATE TABLE IF NOT EXISTS PlatinSeguimiento (Usuario, Latitud, Longitud, Codigo, NNA, Fecha, MotivoIngreso, MotivoIngresoObs, SituacionAlEgreso, SituacionAlEgresoObs, SituacionIngreso_VidaSaludable, MotivoIngresoObs_VidaSaludable, SituacionAlEgreso_VidaSaludable, SituacionAlEgresoObs_VidaSaludable, SituacionIngreso_DesarrolloPotenciales, MotivoIngresoObs_DesarrolloPotenciales, SituacionAlEgreso_DesarrolloPotenciales, SituacionAlEgresoObs_DesarrolloPotenciales, SituacionIngreso_ConstruccionCiudadania, MotivoIngresoObs_ConstruccionCiudadania, SituacionAlEgreso_ConstruccionCiudadania, SituacionAlEgresoObs_ConstruccionCiudadania, SituacionIngreso_Fortalecimiento, SituacionAlEgreso_Fortalecimiento, SituacionAlEgresoObs_Fortalecimiento, SituacionIngreso_EvaluacionCompromiso, MotivoIngresoObs_EvaluacionCompromiso, SituacionAlEgreso_EvaluacionCompromiso, SituacionAlEgresoObs_EvaluacionCompromiso, SituacionIngreso_NuevosCompromisos, MotivoIngresoObs_NuevosCompromisos, SituacionAlEgreso_NuevosCompromisos, SituacionAlEgresoObs_NuevosCompromisos, txtPlatinSeguimiento_Observaciones,  MiembrosDelEquipo, FechaInicio, FechaFin, Responsable, fechaCargue, Estado)';
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