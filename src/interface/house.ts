export interface postHouse {
  id_master: string;
  nro_house: string;
  code_house: string;
  id_cot: string;
  id_agent: string;
  id_consigner: string;
  id_notify: string;
  id_aerolinea: string;
  id_coloader: string;
  id_naviera: string;
  id_incoterms: string;
  nro_hbl: string;
  id_motonave: string;
  nro_viaje: string;
  bultos: string;
  peso: string;
  volumen: string;
  id_conditions: string;
  id_moneda: string;
  monto: string;
  status: string;
}

export interface postHouseEdit {
  id: string;
  id_cot: string;
  id_agent: string;
  id_consigner: string;
  id_notify: string;
  id_aerolinea: string;
  id_coloader: string;
  id_naviera: string;
  id_incoterms: string;
  nro_hbl: string;
  id_motonave: string;
  nro_viaje: string;
  bultos: string;
  peso: string;
  volumen: string;
  id_conditions: string;
  id_moneda: string;
  monto: string;
  status: string;
}
