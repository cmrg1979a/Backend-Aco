export interface InvoiceAdminCxC {
  type_payment: Number;
  id_expediente: Number;
  id_cliente: Number;
  fecha: Date;
  nro_factura: String;
  nro_serie: String;
  id_coins: String;
  monto: Number;
  type_igv: Number;
  igv: Number;
  status: Number;
  id_path: Number;
  id_proformance: Number;
  id_month: Number;
  id_year: Number;
  detalle: any;
  concepto_d: string;
  id: Number;
}
