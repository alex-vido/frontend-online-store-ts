import { CategoryQuery, ProductID } from '../types';

export async function getCategories() {
  const URL_CATEGORIES = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(URL_CATEGORIES);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery({
  categoryId, query }:CategoryQuery) {
  const URL_QUERY = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(URL_QUERY);
  const data = await response.json();
  return data;
}

export async function getProductById({ productId }: ProductID) {
  const URL_PRODUCT = `https://api.mercadolibre.com/items/${productId}`;
  const URL_DESCRIPTION = `https://api.mercadolibre.com/items/${productId}/description`;
  const response = await fetch(URL_PRODUCT);
  const responseDescription = await fetch(URL_DESCRIPTION);

  const data = await response.json();
  const responseDescriptionData = await responseDescription.json();
  const { plain_text: description } = responseDescriptionData;
  return { ...data, description };
}

export async function getProductsFromTerm(term: string) {
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${term}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export async function listProductsByCategory(categoryId:string) {
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export async function getProductDescriptionbyId(productId: string) {
  const URL_PRODUCT = `https://api.mercadolibre.com/items/${productId}/description`;
  const response = await fetch(URL_PRODUCT);
  const data = await response.json();
  return data;
}
