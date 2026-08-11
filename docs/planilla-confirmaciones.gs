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

    hoja.appendRow([
      new Date(),
      d.nombre || "",
      d.contacto || "",
      d.asistencia || "",
      d.asistencia === "No" ? 0 : (Number(d.cantidad) || 1),
      d.mensaje || ""
    ]);

    avisar_(d);
    return ContentService.createTextOutput("ok");

  } catch (err) {
    return ContentService.createTextOutput("error: " + err);

  } finally {
    lock.releaseLock();
  }
}

/* Crea la hoja con los títulos la primera vez */
function obtenerHoja_() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getSheetByName("Confirmaciones");

  if (!hoja) {
    hoja = libro.insertSheet("Confirmaciones");
  }

  if (hoja.getLastRow() === 0) {
    hoja.appendRow(["Fecha", "Nombre", "Contacto", "Asiste", "Cantidad", "Mensaje"]);
    hoja.getRange(1, 1, 1, 6)
        .setFontWeight("bold")
        .setBackground("#0A2419")
        .setFontColor("#F5C662");
    hoja.setFrozenRows(1);
    hoja.setColumnWidth(1, 150);
    hoja.setColumnWidth(2, 220);
    hoja.setColumnWidth(3, 180);
    hoja.setColumnWidth(6, 320);
  }

  return hoja;
}

/* Aviso por mail, sólo si cargaste MI_MAIL */
function avisar_(d) {
  if (!MI_MAIL) return;

  var viene = d.asistencia === "No" ? "NO viene" : "viene (" + (d.cantidad || 1) + ")";

  MailApp.sendEmail(
    MI_MAIL,
    "Bar Mitzvá de Leivi — confirmó " + (d.nombre || "alguien"),
    [
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

  hoja.getRange("A7").setValue("Última confirmación");
  hoja.getRange("B7").setFormula('=IFERROR(MAX(Confirmaciones!A:A);"—")')
      .setNumberFormat("dd/MM/yyyy HH:mm");

  hoja.getRange("A3:A7").setFontWeight("bold");
  hoja.setColumnWidth(1, 220);
}
