import { TestBed } from '@angular/core/testing';

import { LoginVerifyService } from './login-verify.service';

describe('LoginVerifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginVerifyService = TestBed.get(LoginVerifyService);
    expect(service).toBeTruthy();
  });
});
