export interface programmedPaymentInterface {
  id?: bigint;
  id_detailspayinvoicecxp?: BigInt;
  id_controlgastosegresos?: Int8Array;
  id_master?: Int8Array;
  id_proveedor?: Int8Array;
  fecha: Date;
  controlgastoegreso: Boolean;
  STATUS: Boolean;
  nuevoflag: boolean;
  created_at?: Date;
  updated_at?: Date;
}
