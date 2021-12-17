export class Category {
  _id: string;
  name: string;
  updated_at?: Date;
  created_at: Date;
}

export class Product {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
  categories: Category[];
  updated_at?: Date;
  created_at: Date;
}

export class User {
  _id: string;
  name: string;
  email: string;
  password: string;
  updated_at?: Date;
  created_at: Date;
}
