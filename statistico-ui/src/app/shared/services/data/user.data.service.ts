import { Injectable } from '@angular/core';
import { HttpService } from '../base/http.service';
import { CrudService } from '../base/crud.service';
import { User } from '../../interfaces/user.interface';

const userEndpoint = 'users';

@Injectable()
export class UsersDataService extends CrudService<User> {
    public constructor(httpService: HttpService) {
        super(userEndpoint, httpService);
    }
}
