export type CategoryQuery = {
  categoryId: string;
  query: string;
};

export type ProductID = {
  productId: string | undefined;
};

export type CategoryType = {
  id: string;
  name: string;
};

export interface ProductType {
  title: string;
  price: string;
  thumbnail: string;
  id: string;
  quantity: number;
  description:string;
}
export type CartProduct = {
  quantity: number;
  price: number;
};

export type RatingType = {
  email: string;
  text?: string;
  rating: string;
};

export type ProductDescriptionType = {
  'plain_text':string
};
