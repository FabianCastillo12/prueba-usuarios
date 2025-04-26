export const USER_QUERIES = {
  CREATE_USER: `
    INSERT INTO users (id, nombre, correo, edad, created_at)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, nombre, correo, edad, created_at as "createdAt"
  `,
};

export const PRODUCT_QUERIES = {
  GET_PRODUCTS: `
    SELECT 
      id, 
      nombre, 
      precio, 
      descripcion, 
      created_at as "createdAt" 
    FROM products
  `
};
