import express from 'express';

const app = express();

app.get('/', (request, response) =>
  response.json({ message: 'Nada nos puede parar!' }),
);

app.listen(3333, () => {
  console.log('Server Started!');
});
