// type cho 1 user
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

// response từ API
export interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
