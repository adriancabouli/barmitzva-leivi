/* ============================================================
   CONFIRMACIONES → PLANILLA DE GOOGLE

   Pegá este código en Extensiones → Apps Script de tu planilla.
   Los pasos completos están en docs/README-planilla.md
   ============================================================ */

// Poné acá tu mail si querés recibir un aviso por cada confirmación.
// Dejalo en "" si no querés que te llegue nada.
var MI_MAIL = "";

function doPost(e) {
  // El lock evita que dos confirmaciones simultáneas se pisen
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    var hoja = obtenerHoja_();
    var d = (e && e.parameter) ? e.parameter : {};

    // La misma fecha va a la planilla y al mail, así nunca discrepan
    var cuando = new Date();

    hoja.appendRow([
      cuando,
      d.nombre || "",
      d.contacto || "",
      d.asistencia || "",
      d.asistencia === "No" ? 0 : (Number(d.cantidad) || 1),
      d.mensaje || "",
      // Ceremonia, Fiesta o Ambos. Va al final para no correr las
      // columnas de las confirmaciones que ya estaban cargadas.
      d.asistencia === "No" ? "" : (d.evento || "Ceremonia")
    ]);

    // La fecha se estampa con su formato acá mismo, en la fila recién
    // escrita. Confiar sólo en el formato de la columna no alcanza: basta
    // con borrar unas filas para que las de abajo suban con el formato
    // viejo y una confirmación nueva vuelva a aparecer con la hora.
    hoja.getRange(hoja.getLastRow(), 1).setNumberFormat("dd/MM/yyyy");

    avisar_(d, cuando);
    return ContentService.createTextOutput("ok");

  } catch (err) {
    return ContentService.createTextOutput("error: " + err);

  } finally {
    lock.releaseLock();
  }
}

/* ============================================================
   LOS COLORES DEL SITIO
   Son los mismos de css/styles.css, para que la planilla se vea
   parte de la invitación y no una tabla suelta.
   ============================================================ */
var VERDE        = "#0A2619";   // --verde-700, el fondo de los títulos
var VERDE_TEXTO  = "#04120D";   // --verde-900, el texto
var VERDE_CLARO  = "#13452D";   // --verde-500
var ORO          = "#F5C662";   // --oro-400, los títulos
var CREMA        = "#FBF7EF";   // crema muy suave, para las filas alternadas
var LINEA        = "#E8DCC3";   // los bordes

/* Crea la hoja con los títulos la primera vez */
function obtenerHoja_() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getSheetByName("Confirmaciones");

  if (!hoja) {
    hoja = libro.insertSheet("Confirmaciones");
  }

  if (hoja.getLastRow() === 0) {
    hoja.appendRow(["Fecha", "Nombre", "Contacto", "Asiste", "Cantidad", "Mensaje", "Ceremonia / Fiesta"]);
    darleFormato_(hoja);
  } else if (hoja.getRange(1, 7).getValue() === "") {
    // Planilla de antes de la columna G: se le agrega el título
    hoja.getRange(1, 7).setValue("Ceremonia / Fiesta");
  }

  return hoja;
}

/* ============================================================
   EL FORMATO
   Corré "embellecer" una vez desde el editor (▶ Ejecutar) y la
   planilla que ya tenés queda con los colores del sitio. Se puede
   correr las veces que quieras: siempre deja lo mismo.
   ============================================================ */
function embellecer() {
  darleFormato_(obtenerHoja_());
  var resumen = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Resumen");
  if (resumen) crearResumen();
}

function darleFormato_(hoja) {
  // Planillas creadas antes de la columna G: se le pone el título
  if (hoja.getMaxColumns() < 7) hoja.insertColumnsAfter(hoja.getMaxColumns(), 7 - hoja.getMaxColumns());
  hoja.getRange(1, 7).setValue("Ceremonia / Fiesta");
  var filas = hoja.getMaxRows();

  hoja.getRange(1, 1, filas, 7)
      .setFontFamily("Georgia")
      .setFontSize(11)
      .setFontColor(VERDE_TEXTO)
      .setVerticalAlignment("middle")
      .setBorder(true, true, true, true, true, true, LINEA, SpreadsheetApp.BorderStyle.SOLID);

  // Los títulos, en verde con letras doradas como la portada
  var cab = hoja.getRange(1, 1, 1, 7);
  cab.setFontWeight("bold")
     .setBackground(VERDE)
     .setFontColor(ORO)
     .setHorizontalAlignment("center");
  // Cinzel es la tipografía de los títulos del sitio. Si esta planilla no
  // la tiene disponible no pasa nada: se queda con Georgia, que también
  // es serif y acompaña igual.
  try { cab.setFontFamily("Cinzel"); } catch (e) {}
  hoja.setRowHeight(1, 38);
  hoja.setFrozenRows(1);

  hoja.setColumnWidth(1, 155);   // Fecha
  hoja.setColumnWidth(2, 230);   // Nombre
  hoja.setColumnWidth(3, 175);   // Contacto
  hoja.setColumnWidth(4, 85);    // Asiste
  hoja.setColumnWidth(5, 95);    // Cantidad
  hoja.setColumnWidth(6, 340);   // Mensaje
  hoja.setColumnWidth(7, 170);   // Ceremonia / Fiesta / Ambos

  if (filas > 1) {
    var cuerpo = hoja.getRange(2, 1, filas - 1, 7);
    hoja.getRange(2, 1, filas - 1, 1)
        .setNumberFormat("dd/MM/yyyy")
        .setHorizontalAlignment("center");
    hoja.getRange(2, 4, filas - 1, 2).setHorizontalAlignment("center");
    hoja.getRange(2, 5, filas - 1, 1).setFontWeight("bold");
    hoja.getRange(2, 6, filas - 1, 1).setWrap(true);
    hoja.getRange(2, 7, filas - 1, 1).setHorizontalAlignment("center");

    // El color se pone con reglas, no pintando celdas: así las
    // confirmaciones que lleguen mañana salen pintadas solas.
    var colAsiste = hoja.getRange(2, 4, filas - 1, 1);
    hoja.setConditionalFormatRules([
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("Sí")
        .setBackground("#DFF0E3").setFontColor(VERDE_CLARO).setBold(true)
        .setRanges([colAsiste]).build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("No")
        .setBackground("#F6E6E3").setFontColor("#8A3A2C")
        .setRanges([colAsiste]).build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied("=ISEVEN(ROW())")
        .setBackground(CREMA)
        .setRanges([cuerpo]).build()
    ]);
  }

  // Con los bordes puestos, la cuadrícula de fondo sobra y ensucia
  hoja.setHiddenGridlines(true);

  // Las columnas de la H en adelante no se usan: ocultarlas hace que
  // la hoja se lea como una tarjeta y no como una planilla infinita
  var sobran = hoja.getMaxColumns() - 7;
  if (sobran > 0) hoja.hideColumns(8, sobran);

  // El filtro tiene que abarcar la columna G: si quedó uno viejo más
  // angosto, se rehace (sacar el filtro no borra ningún dato)
  var filtro = hoja.getFilter();
  if (filtro && filtro.getRange().getNumColumns() < 7) { filtro.remove(); filtro = null; }
  if (!filtro) hoja.getRange(1, 1, filas, 7).createFilter();
}

/* Aviso por mail, sólo si cargaste MI_MAIL */
function avisar_(d, cuando) {
  if (!MI_MAIL) return;

  var viene = d.asistencia === "No" ? "NO viene"
    : "viene (" + (d.cantidad || 1) + ") a " + (d.evento || "Ceremonia");

  // Fecha sola, sin hora, en el huso de la planilla — si se usa el del
  // servidor de Google, una confirmación de la noche puede aparecer con
  // la fecha del día siguiente.
  var fecha = Utilities.formatDate(
    cuando || new Date(),
    SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(),
    "dd/MM/yyyy"
  );

  MailApp.sendEmail(
    MI_MAIL,
    "Bar Mitzvá de Leivi — confirmó " + (d.nombre || "alguien"),
    [
      "Fecha: " + fecha,
      "Nombre: " + (d.nombre || ""),
      "Contacto: " + (d.contacto || ""),
      "Asiste: " + viene,
      d.mensaje ? "Mensaje: " + d.mensaje : ""
    ].join("\n")
  );
}

/* ============================================================
   TOTALES
   Corré esta función una vez (botón ▶ arriba) y te crea una hoja
   "Resumen" con la cuenta. Se actualiza sola cada vez que la abrís.
   ============================================================ */
function crearResumen() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getSheetByName("Resumen") || libro.insertSheet("Resumen");
  hoja.clear();

  hoja.getRange("A1").setValue("Resumen de confirmaciones").setFontWeight("bold");

  hoja.getRange("A3").setValue("Personas que vienen");
  hoja.getRange("B3").setFormula('=SUMIF(Confirmaciones!D:D;"Sí";Confirmaciones!E:E)');

  hoja.getRange("A4").setValue("Familias que confirmaron");
  hoja.getRange("B4").setFormula('=COUNTIF(Confirmaciones!D:D;"Sí")');

  hoja.getRange("A5").setValue("No pueden venir");
  hoja.getRange("B5").setFormula('=COUNTIF(Confirmaciones!D:D;"No")');

  hoja.getRange("A7").setValue("Personas a la ceremonia");
  hoja.getRange("B7").setFormula(
    '=SUMIFS(Confirmaciones!E:E;Confirmaciones!D:D;"Sí";Confirmaciones!G:G;"Ceremonia")' +
    '+SUMIFS(Confirmaciones!E:E;Confirmaciones!D:D;"Sí";Confirmaciones!G:G;"Ambos")');

  hoja.getRange("A8").setValue("Personas a la fiesta");
  hoja.getRange("B8").setFormula(
    '=SUMIFS(Confirmaciones!E:E;Confirmaciones!D:D;"Sí";Confirmaciones!G:G;"Fiesta")' +
    '+SUMIFS(Confirmaciones!E:E;Confirmaciones!D:D;"Sí";Confirmaciones!G:G;"Ambos")');

  hoja.getRange("A10").setValue("Última confirmación");
  hoja.getRange("B10").setFormula('=IFERROR(MAX(Confirmaciones!A:A);"—")')
      .setNumberFormat("dd/MM/yyyy");

  hoja.getRange("A3:A10").setFontWeight("bold");
  hoja.setColumnWidth(1, 220);

  // Mismos colores que la hoja de confirmaciones
  hoja.getRange(1, 1, 11, 2)
      .setFontFamily("Georgia").setFontSize(11).setFontColor(VERDE_TEXTO)
      .setVerticalAlignment("middle");

  var titulo = hoja.getRange("A1:B1").merge();
  titulo.setBackground(VERDE).setFontColor(ORO).setFontSize(13)
        .setFontWeight("bold").setHorizontalAlignment("center");
  try { titulo.setFontFamily("Cinzel"); } catch (e) {}
  hoja.setRowHeight(1, 40);

  hoja.getRange("B3:B10")
      .setFontWeight("bold").setFontSize(13).setFontColor(VERDE_CLARO)
      .setHorizontalAlignment("center");
  hoja.setColumnWidth(2, 150);

  hoja.getRange("A3:B5").setBorder(
    true, true, true, true, true, true, LINEA, SpreadsheetApp.BorderStyle.SOLID);
  hoja.getRange("A7:B8").setBorder(
    true, true, true, true, true, true, LINEA, SpreadsheetApp.BorderStyle.SOLID);
  hoja.getRange("A10:B10").setBorder(
    true, true, true, true, true, true, LINEA, SpreadsheetApp.BorderStyle.SOLID);

  hoja.setHiddenGridlines(true);
  var sobran = hoja.getMaxColumns() - 2;
  if (sobran > 0) hoja.hideColumns(3, sobran);
}
