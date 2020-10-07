import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';

let fakeUserRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUsersTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersTokenRepository = new FakeUsersTokensRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUsersTokenRepository,
    );
  });

  it('should be able to recovery the password using the email address', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: '123123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'teste@teste.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recovery a non-existing user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a fogot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: '123123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'teste@teste.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
