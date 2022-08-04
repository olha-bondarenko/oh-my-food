import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { sample_register_user, sample_user } from 'src/data';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService,
  httpTestingController: HttpTestingController,
  registerUser: IUserRegister,
  userCreds: IUserLogin;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        UserService,
        ToastrService
      ]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
    userCreds = {
      email: 'test@email.com',
      password: '1234567'
    }
    registerUser = sample_register_user;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#login should let user login', () => {
    service.login(userCreds).subscribe(user => {
      expect(user.id).toBe('2');
    });
    const req = httpTestingController.expectOne(USER_LOGIN_URL);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toBe(userCreds);
    req.flush(sample_user);
  });

  it('#register should let user register', () => {
    service.register(registerUser).subscribe(user => {
      expect(user.id).toBe('2');
    });
    const req = httpTestingController.expectOne(USER_REGISTER_URL);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(registerUser);
    req.flush(sample_user);
  });

});
