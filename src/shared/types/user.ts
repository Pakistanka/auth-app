export interface User {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
}

export interface CreateUserDto {
  name: string;
  avatar: string;
}

export interface UpdateUserDto {
  name: string;
  avatar: string;
}
