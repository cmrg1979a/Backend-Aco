export interface postMaster {
  id: Number;
  id_branch: Number;
  nro_master: Number;
  code_master: String;
  id_cot: Number;
  id_modality: Number;
  id_shipment: Number;
  id_incoterms: Number;
  id_port_begin: Number;
  id_port_end: Number;
  id_operador: Number;
  fecha_etd: Date;
  fecha_eta: Date;
  fecha_disponibilidad: Date;
  ganancia_pricing: Float32Array;
  ganancia_operaciones: Float32Array;
  id_agent: Number;
  id_consigner: Number;
  id_notify: Number;
  id_aerolinea: Number;
  id_coloader: Number;
  id_naviera: Number;
  nro_mbl: bigint;
  id_motonave: Number;
  nro_viaje: String;
  bultos: Float32Array;
  peso: Float32Array;
  volumen: Float32Array;
  id_conditions: Number;
  id_moneda: Number;
  monto: bigint;
  statuslock: Number;
  statuslockadm: Number;

  status: Number;
}
