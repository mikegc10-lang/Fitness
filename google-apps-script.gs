/**
 * Mike Tracker → Google Sheets
 * Recibe todos tus datos desde la app y los escribe en 4 pestañas:
 * Semanas, Dias, Series y Comidas. Cada envío reemplaza el contenido
 * (la app manda siempre el historial completo), así nunca hay duplicados.
 *
 * Instalación (5 minutos):
 * 1. Crea una hoja nueva en sheets.google.com y nómbrala "Mike Tracker datos".
 * 2. Menú Extensiones → Apps Script. Borra lo que haya y pega este archivo completo.
 * 3. Guarda (ícono de disquete).
 * 4. Botón "Implementar" → "Nueva implementación" → tipo "Aplicación web".
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier usuario
 *    Clic en "Implementar" y autoriza los permisos con tu cuenta.
 * 5. Copia la "URL de la aplicación web" (termina en /exec).
 * 6. En Mike Tracker: Ajustes → Tus datos → pega la URL → Guardar URL → Enviar ahora.
 *
 * Nota: cualquiera que tenga esa URL puede ENVIAR datos a tu hoja (no leerlos).
 * No la publiques.
 */
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  writeTable_(ss, 'Semanas', data.semanas || []);
  writeTable_(ss, 'Dias', data.dias || []);
  writeTable_(ss, 'Series', data.series || []);
  writeTable_(ss, 'Comidas', data.comidas || []);
  let log = ss.getSheetByName('Envios') || ss.insertSheet('Envios');
  log.appendRow([new Date(), data.enviado, (data.dias || []).length + ' días']);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}

function writeTable_(ss, name, rows) {
  const sh = ss.getSheetByName(name) || ss.insertSheet(name);
  sh.clearContents();
  if (!rows.length) { sh.getRange(1, 1).setValue('(sin datos)'); return; }
  const cols = Object.keys(rows[0]);
  const values = [cols].concat(rows.map(r => cols.map(c => r[c] === undefined ? '' : r[c])));
  sh.getRange(1, 1, values.length, cols.length).setValues(values);
  sh.getRange(1, 1, 1, cols.length).setFontWeight('bold');
  sh.setFrozenRows(1);
}
