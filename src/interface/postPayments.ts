export interface postPayment {
  id_house: string;
  id_proveedor: string;
  monto: string;
  status: string;
  conceptos: Array<any>;
}
