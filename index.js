const express = require('express');
const app = express();
app.use(express.json());
const fs = require('fs');

app.get('/orders/:paramApi?/', (req, res) => {
  try {

    // Lê o arquivo JSON
    fs.readFile('./orders_data.json', 'utf8', (err, data) => {

      if (err) {
        console.error(err);
        res.json({ error: 'Erro interno do servidor' });
        return;
      }

      // Converte o conteúdo do arquivo em um objeto JavaScript
      const jsonData = JSON.parse(data);

      // Dados do parâmetro como uma variável
      const paramApi = req.params.paramApi;

      // Variável que vai armazenar o que deve ser retornado na resposta
      let filteredData;

      if (paramApi) {
        // Converter dados para fazer uma validação
        
        if (!isNaN(parseInt(paramApi, 10))) {
          // Requisição por ID do pedido
          filteredData = jsonData.filter(item => item.orderId === paramApi);
          console.log("Está pegando id do pedido")

        }

      } else {
        // Retornar todo o JSON quando o parâmetro "dados" for vazio
        filteredData = jsonData;
      }

      // Resposta para as requisições
      if (filteredData.length === 0) {
        res.json({ error: 'Pedido não encontrado' });
      } else {
        res.json(filteredData);
      }

    });

  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server Error' });
  }

});

const port = 3001;

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}/orders/`);
});