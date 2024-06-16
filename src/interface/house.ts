export interface postHouse {
  id: Number;
  id_master: Number;
  nro_house: Number;
  code_house: String;
  id_cot: Number;
  id_modality: Number;
  id_shipment: Number;
  id_port_begin: Number;
  id_port_end: Number;
  id_agent: Number;
  id_consigner: Number;
  id_notify: Number;
  id_aerolinea: Number;
  id_coloader: Number;
  id_naviera: Number;
  id_incoterms: Number;
  nro_hbl: bigint;
  id_motonave: Number;
  nro_viaje: String;
  bultos: Float32Array;
  peso: Float32Array;
  volumen: Float32Array;
  id_conditions: Number;
  id_moneda: Number;
  monto: Number;
  id_branch: Number;
  id_consigner_real: Number;
}

export interface postHouseEdit {
  id: Number;
  id_master: Number;
  nro_house: Number;
  code_house: String;
  id_cot: Number;
  id_agent: Number;
  id_consigner: Number;
  id_notify: Number;
  id_aerolinea: Number;
  id_coloader: Number;
  id_naviera: Number;
  id_incoterms: Number;
  nro_hbl: bigint;
  id_motonave: Number;
  nro_viaje: String;
  bultos: Float32Array;
  peso: Float32Array;
  volumen: Float32Array;
  id_conditions: Number;
  id_moneda: Number;
  monto: Number;
  status: Number;
  id_branch: Number;
}
