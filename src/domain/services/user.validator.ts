import { CreateUserDto } from '../../application/dto/create-user.dto';

export class UserValidator {
    static validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validateAge(age: number): boolean {
        return age >= 0 && age < 120; 
    }

    static validate(user: CreateUserDto): { isValid: boolean, errors: string[] } {
        const errors: string[] = [];
        
        if (!user.nombre || user.nombre.trim() === '') {
            errors.push('El nombre es obligatorio');
        }
        
        if (!user.correo) {
            errors.push('El correo es obligatorio');
        } else if (!this.validateEmail(user.correo)) {
            errors.push('El formato del correo es inválido');
        }
        
        if (user.edad === undefined || user.edad === null) {
            errors.push('La edad es obligatoria');
        } else if (!this.validateAge(user.edad)) {
            errors.push('La edad debe estar entre 0 y 120 años');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
