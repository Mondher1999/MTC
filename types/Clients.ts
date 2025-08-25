export interface Clients {
  id: string;
 // coverageDate: string;
  telProche: string;
  departure: string;
  //clientLinkDepart: string;
  clientName: string;
  insuranceName: string;
  nsecu: string;
  nameProche: string,
  clientTel: string;
}

export interface Userss {
  id:string;
  role: string;
  firstName: string;
  lastName:string;
  telNumber:string;
  email: string;
  formValidated?:string;
  accessValidated?:string;
  dateOfBirth?: string,
  gender?: string,
  address?: string,
  motivation?: string,
  receipt?: string;  // File while uploading, string after saved
  photoId?: string;  // same here


}


