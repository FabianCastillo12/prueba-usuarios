import { User } from '../entities/user.entity';
import { CreateUserDto } from '../../application/dto/create-user.dto';

export interface UserRepository {
    createUser(userData: CreateUserDto): Promise<User>;
}
