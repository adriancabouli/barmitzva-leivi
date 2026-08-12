/* ============================================================
   SÓLO EL FORMATO — archivo aparte, para pegar sin borrar nada

   Esto existe para poder hacerlo desde el teléfono. En Apps Script,
   seleccionar y borrar el código viejo con el dedo es casi imposible;
   agregar un archivo nuevo y pegar en una hoja en blanco, no.

   Cómo: en el editor, el "+" de la izquierda → Script → ponele
   "formato" → pegá todo esto → guardá → elegí "embellecer" arriba
   → ▶ Ejecutar.

   No pisa nada del archivo que ya está: no redefine doPost ni
   obtenerHoja_ ni crearResumen. Convive con ellos.

   (Si algún día pegás planilla-confirmaciones.gs completo, que ya
   trae estas mismas funciones, borrá este archivo para no tener
   dos copias dando vueltas.)
   ============================================================ */

// Los colores del sitio, los mismos de css/styles.css
var F_VERDE       = "#0A2619";   // --verde-700, el fondo de los títulos
var F_VERDE_TEXTO = "#04120D";   // --verde-900, el texto
var F_VERDE_CLARO = "#13452D";   // --verde-500
var F_ORO         = "#F5C662";   // --oro-400, los títulos
var F_CREMA       = "#FBF7EF";   // crema muy suave, filas alternadas
var F_LINEA       = "#E8DCC3";   // los bordes

function embellecer() {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Confirmaciones");
  if (!hoja) {
    throw new Error('No encontré la pestaña "Confirmaciones" en esta planilla.');
  }
  darleFormato_(hoja);
  return "Listo: la hoja Confirmaciones quedó con los colores del sitio.";
}

function darleFormato_(hoja) {
  var filas = hoja.getMaxRows();

  hoja.getRange(1, 1, filas, 6)
      .setFontFamily("Georgia")
      .setFontSize(11)
      .setFontColor(F_VERDE_TEXTO)
      .setVerticalAlignment("middle")
      .setBorder(true, true, true, true, true, true, F_LINEA, SpreadsheetApp.BorderStyle.SOLID);

  // Los títulos, en verde con letras doradas como la portada
  var cab = hoja.getRange(1, 1, 1, 6);
  cab.setFontWeight("bold")
     .setBackground(F_VERDE)
     .setFontColor(F_ORO)
     .setHorizontalAlignment("center");
  // Cinzel es la tipografía del sitio. Si la planilla no la tiene,
  // se queda con Georgia, que también es serif y acompaña igual.
  try { cab.setFontFamily("Cinzel"); } catch (e) {}
  hoja.setRowHeight(1, 38);
  hoja.setFrozenRows(1);

  hoja.setColumnWidth(1, 155);   // Fecha
  hoja.setColumnWidth(2, 230);   // Nombre
  hoja.setColumnWidth(3, 175);   // Contacto
  hoja.setColumnWidth(4, 85);    // Asiste
  hoja.setColumnWidth(5, 95);    // Cantidad
  hoja.setColumnWidth(6, 340);   // Mensaje

  if (filas > 1) {
    var cuerpo = hoja.getRange(2, 1, filas - 1, 6);
    hoja.getRange(2, 1, filas - 1, 1)
        .setNumberFormat("dd/MM/yyyy HH:mm")
        .setHorizontalAlignment("center");
    hoja.getRange(2, 4, filas - 1, 2).setHorizontalAlignment("center");
    hoja.getRange(2, 5, filas - 1, 1).setFontWeight("bold");
    hoja.getRange(2, 6, filas - 1, 1).setWrap(true);

    // El color va por reglas, no pintando celdas: así las
    // confirmaciones que lleguen mañana salen pintadas solas.
    var colAsiste = hoja.getRange(2, 4, filas - 1, 1);
    hoja.setConditionalFormatRules([
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("Sí")
        .setBackground("#DFF0E3").setFontColor(F_VERDE_CLARO).setBold(true)
        .setRanges([colAsiste]).build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo("No")
        .setBackground("#F6E6E3").setFontColor("#8A3A2C")
        .setRanges([colAsiste]).build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied("=ISEVEN(ROW())")
        .setBackground(F_CREMA)
        .setRanges([cuerpo]).build()
    ]);
  }

  // Con los bordes puestos, la cuadrícula de fondo sobra y ensucia
  hoja.setHiddenGridlines(true);

  // Las columnas de la G en adelante no se usan
  var sobran = hoja.getMaxColumns() - 6;
  if (sobran > 0) hoja.hideColumns(7, sobran);

  if (!hoja.getFilter()) hoja.getRange(1, 1, filas, 6).createFilter();
}
