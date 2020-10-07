import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'email@email.com',
      password: '123123123',
    });

    const response = await authenticateUser.execute({
      email: 'email@email.com',
      password: '123123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'email@gmail.com',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'email@email.com',
      password: '123123123',
    });

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'email@email.com',
        password: '4567890123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
