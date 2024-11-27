export interface User {
  _id: string;
  nome: string;
  cognome: string;
  email: string;
  dataNascita: Date;
  fotoProfilo?: string;
}

export interface NewUser {
  nome: string;
  cognome: string;
  email: string;
  dataNascita: string;
  fotoProfilo?: string;
}

export interface FetchUsersResponse {
  users: User[];
  total: number;
}
