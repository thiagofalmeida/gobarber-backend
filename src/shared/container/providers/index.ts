import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IMailProvider from './MailProvider/models/IMailProvider';

container.registerSingleton<IStorageProvider>(
  'IStorageProvider',
  DiskStorageProvider,
);

// container.registerSingleton<IMailProvider>(
//   'IMailProvider',
//   DiskStorageProvider,
// );
