export const USER_QUERIES = {
  CREATE_USER: `
    INSERT INTO users (id, nombre, correo, edad, created_at)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, nombre, correo, edad, created_at as "createdAt"
  `,
  
};
