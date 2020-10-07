# Recuperar senha

**RF**

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com as instruções de recuperar a senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios de e-mails em ambiente de dev;
- Utilizar o Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, e-mail e senha;

**RN**

- O usuário não pode alterar seu e-mail para um já utilizado;
- Para atualizar sua senha, o usuário deve informar sua antiga;
- Para atualizar sua senha, o usuário precisa confirmar sua senha;

# Painel do prestador

**RF**

- O usuário deve poder visualizar todos seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser salvos em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida e não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários de um dia específicos de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre as 8h às 18h;
- O usuário não pode agendar um horário já ocupado;
- O usuário não pode agendar um horário com sigo mesmo;
- O usuário não pode agendar um horário que já passou;
