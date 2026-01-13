// type cho 1 user
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  age: number;
  gender: string;
}

export interface Coordinate {
  lat: number;
  lng: number;
}
export interface Address {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  coordinate: Coordinate;
  country: string;
}

export interface UserDetail extends User {
  birthDate: string;
  phone: string;
  address: Address;
  height: number;
  weight: number;
}

// response từ API
export interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
