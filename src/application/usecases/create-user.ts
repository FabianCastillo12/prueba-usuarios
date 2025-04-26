import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/ports/user.repository';
import { UserValidator } from '../../domain/services/user.validator';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';

export interface CreateUserResult {
    success: boolean;
    data?: UserResponseDto;
    errors?: string[];
}

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(userData: CreateUserDto): Promise<CreateUserResult> {

        const validationResult = UserValidator.validate(userData);

        if (!validationResult.isValid) {
            return {
                success: false,
                errors: validationResult.errors
            };
        }

        try {
            const createdUser: User = await this.userRepository.createUser(userData);

            const userResponse: UserResponseDto = {
                id: createdUser.id!,
                nombre: createdUser.nombre,
                correo: createdUser.correo,
                edad: createdUser.edad,
                createdAt: createdUser.createdAt
            };

            return {
                success: true,
                data: userResponse
            };
        } catch (error: any) {
            console.error('Error al crear el usuario:', error);
            return {
                success: false,
                errors: [error.message || 'Error al crear el usuario']
            };
        }
    }
}