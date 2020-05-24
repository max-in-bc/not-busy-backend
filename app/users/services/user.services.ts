import {CRUD} from '../../common/interfaces/crud.interface';
import { UsersDao } from '../daos/users.dao';

export class UsersService implements CRUD {
    private static instance: UsersService;

    constructor() {
    }

    static getInstance(): UsersService {
        if (!UsersService.instance) {
            UsersService.instance = new UsersService();
        }
        return UsersService.instance;
    }

    create(resource: any) {
        return UsersDao.getInstance().addUser(resource);
    }

    deleteById(resourceId: any) {
        return UsersDao.getInstance().removeUserById(resourceId);
    };

    list(limit: number, page: number) {
        return UsersDao.getInstance().listUsers();
    };

    patchById(resource: any) {
        return UsersDao.getInstance().patchUser(resource)
    };

    readById(resourceId: any) {
        return UsersDao.getInstance().getUserById(resourceId);
    };

    updateById(resource: any) {
        return UsersDao.getInstance().patchUser(resource);
    };

    getByEmail(email: string) {
        return UsersDao.getInstance().getUserByEmail(email);
    }
}