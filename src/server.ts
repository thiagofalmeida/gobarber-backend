import express, { response } from 'express';

const app = express();

app.get('/', (request, response) => {
    return response.json({ message: 'Nada nos puede parar!'});
});

app.listen(3333, () =>{
    console.log('Server Started!');
});