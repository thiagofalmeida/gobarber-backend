import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido.',
    );
  }
}

export default SendForgotPasswordEmailService;
