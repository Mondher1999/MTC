export interface NewRide {
  iddriver: string;
  idclient?: string;
  clientName: string;
  destination: string;
  nsecu: string;
  InfoBt: string;
  coverageDate: string;
  insuranceName: string;
  totalTransports: number;
  currentTransport: number;
  driverName: string;
  driverColor: string;
  startTime: string;
  endTime: string;
  linkDestination: string;
  linkDeparture: string;
  clientLinkDepart: string;
  departure: string;
  telProche: string;
  nameProche: string;
  clientTel: string;
  statut: string;
  infoComp: string;
  btValide: string;
}

export interface RideSchedule extends NewRide {
  id: string;
}
export interface CalendarEvent extends RideSchedule {
  id: string;
  driverName: string;
  idclient: string;
  driverColor: string;
  startTime: string;
  endTime: string;

  start: Date;
  end: Date;
  title: string;
  bt: string;
  color: string;
  linkDestination: string;
  linkDeparture: string;
  destination: string;
  classNames: string;
  iddriver: string;
  clientName: string;
  InfoBt: string;
  coverageDate: string;
  currentTransport: number;
  insuranceName: string;
  nsecu: string;
  totalTransports: number;
  clientLinkDepart: string;
  departure: string;
  telProche: string;
  statut: string;
  infoComp: string;
  btValide: string;
  clientTel: string;
}
