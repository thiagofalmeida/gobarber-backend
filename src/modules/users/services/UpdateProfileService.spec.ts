import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: '123123123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Wick',
      email: 'updated@teste.com',
    });

    expect(updatedUser.name).toBe('John Wick');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user-id',
        name: 'John Wick',
        email: 'updated@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update email for another user email', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: '123123123',
    });

    const user = await fakeUserRepository.create({
      name: 'John Wick',
      email: 'john@teste.com',
      password: '123123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Wick Updated',
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: '123123123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Wick',
      email: 'updated@teste.com',
      old_password: '123123123',
      password: '456456456',
    });

    expect(updatedUser.password).toBe('456456456');
  });

  it('should be not able to update the password without the old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: '123123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Wick',
        email: 'updated@teste.com',
        password: '456456456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to update the password without wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: '123123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Wick',
        email: 'updated@teste.com',
        old_password: 'wrong_old_pass',
        password: '456456456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
