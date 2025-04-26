import { ProductRepository } from '../../domain/ports/product.repository';
import { ProductResponseDto } from '../dto/product-response.dto';

export interface GetProductsResult {
    success: boolean;
    data?: ProductResponseDto[];
    error?: string;
}

export class GetProductsUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(): Promise<GetProductsResult> {
        try {
            const products = await this.productRepository.getProducts();
            
            const productResponses: ProductResponseDto[] = products.map(product => ({
                id: product.id!,
                nombre: product.nombre,
                precio: product.precio,
                descripcion: product.descripcion,
                createdAt: product.createdAt
            }));

            return {
                success: true,
                data: productResponses
            };
        } catch (error: any) {
            console.error('Error al obtener los productos:', error);
            return {
                success: false,
                error: error.message || 'Error al obtener los productos'
            };
        }
    }
}
