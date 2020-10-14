import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to show the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'doe@teste.com',
      password: '123123123',
    });

    const user2 = await fakeUserRepository.create({
      name: 'John Dux',
      email: 'dux@teste.com',
      password: '123123123',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Trix',
      email: 'trix@teste.com',
      password: '123123123',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toBe([user1, user2]);
  });
});
