export interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
  address?: {
    street: string;
    city: string;
    zipcode: string;
  };
  phone?: string;
  website?: string;
}

export interface NewUser {
  name: string;
  email: string;
  company: {
    name: string;
  };
}