# Desafio GO
Documentação da aplicação está contida neste arquivo.
> ## Deescrição
<p>Os Certificados de Depósito Bancário (CDB) são títulos privados representativos de depósitos a prazo feitos por pessoas físicas ou jurídicas. Podem emitir CDB: os bancos comerciais, múltiplos, de investimento, de desenvolvimento e a Caixa Econômica Federal.</p>

> ## Demo Heroku
```
curl -i -X POST https://desafiogo.herokuapp.com/api/calculatecdb  
    -H 'Content-Type: application/json' 
    -d '{
        "investmentDate": "2016-04-03",
        "currentDate": "2016-04-10", 
        "cdbRate": 103.5
        }'
```

>## Back-end
<p>Você deve criar um serviço para calcular o valor de um CDB pós fixado indexado ao CDI em uma data específica e uma página web em que esses dados calculados serão expostos.</p>

> ## Instalação
#### Utilizado
- Node v14.16.1
- NPM 6.14.12

Para instalar as bibliotecas
```
npm install
```

Para rodar em um ambiente é necessário alterar o script.js presente no diretório website/javascript, você deve alterar a url de requisição da api, para a url do seu servidor ou local.
```
npm start

```

> ## API Calculate CDB
### Funcionamento

Para utilizar a API é necessário realizar uma requisição POST, passando 3 dados como parâmetro.
```

http://localhost:1337/api/calculatecdb

``` 

```
{
    startInvestmentDate: '2016-04-03',
    currentDate: '2016-04-10',
    cdbRate: 103.5
}
```

> ## Metodologias e Designs

* TDD
* Clean Architecture
* Use Cases

> ## Bibliotecas e Ferramentas

* NPM
* Git
* Jest
* Express
* Cors
* Supertest
* DotEnv
* Fast-glob
* Bignumber 