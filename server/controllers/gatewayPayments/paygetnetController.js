//GETNET GATEWAY
const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//MODELS DB
const User = require("../../models/mongo/userModel");
const Payment = require("../../models/mongo/paymentModel");

//ENV KEYS 
// const Token = process.env.GETNETTOKENS;


exports.getnetAuth = async (req, res, next) => {
  //  const { CardNumber, ExpirationDate, SecurityCode } = req.body

  //GETNET URL
  const url_mode = process.env.URLGETNET;
  //var url = "https://api-sandbox.getnet.com.br/auth/oauth/v2/token";

  var url = url_mode+"/auth/oauth/v2/token";

  var data = {
    scope: "oob",
    grant_type: "client_credentials"
  };

  axios
    .post(url, data, {
      headers: {
        Accept: "application/json, text/plain,",
        "Content-Type": "application/json",
        Authorization:
          "Basic YWE4ZjJjNGMtYThlYS00MjMxLTg0MmEtZTFiODUyZWM2YjEzOjgwZTMwN2Q4LWNmOGItNDU1NC05M2M5LTNmYzdmMDA0ZjVkYQ==Bearer 34724fc2-3991-422c-8d9d-1b4604d2e20a"
      }
    })
    .then(data => {
      //console.log("data", data);
      return res.json(data.data);
    })
    .catch(e => {
      console.log("error", e);
      return res.json(e);
    });
};



//Token Credit Card -hash card credentials
exports.getnetToken = async (req, res, next) => {
  //  const { CardNumber, ExpirationDate, SecurityCode } = req.body

  //Getnet URL
  const url_mode = process.env.URLGETNET;
  //var url = "https://api-sandbox.getnet.com.br/v1/tokens/card";

  var url = url_mode+"/v1/tokens/card";

  var data = {
    card_number: "5155901222280001"
  };

  axios
    .post(url, data, {
      headers: {
        Accept: "application/json, text/plain,",
        "Content-Type": "application/json",
        Authorization: "Bearer 2397acdc-ac3f-40ce-92a5-3ce379d3ef5f"
      }
    })
    .then(data => {
      //console.log("data", data);
      return res.json(data.data);
    })
    .catch(e => {
      console.log("error", e);
      return res.json(e);
    });
};



//Payment credit card function
exports.getnetPayment = async (req, res, next) => {
  //  const { CardNumber, ExpirationDate, SecurityCode } = req.body


  //GETNET URL
    const url_mode = process.env.URLGETNET;
    //var url = "https://api-sandbox.getnet.com.br/v1/payments/credit";
  
    var url = url_mode+"/v1/payments/credit";
  
  //BODY DATA REQ
  var data = {
    seller_id: "ee166199-8d66-491d-988c-e4deab5bc9f5", //id inique seller account getnet
    amount: "100",
    order: {
      order_id: "12345"
    },
    customer: {
      customer_id: "12345",
      billing_address: {}
    },
    device: {},
    shippings: [
      {
        address: {}
      }
    ],
    credit: {
      delayed: false,
      save_card_data: false,
      transaction_type: "FULL",
      number_installments: 1,
      card: {
        number_token:
          "9f2a99d38a463fbea8bdd8475413b043b411587fd884cbfc33c4082cf6b9bcfab2cda09f8a4d44e9ccd1828c453a7253331deadfc3f7510babb320c6f50c711d",             //IMPORTANT TOKEN CREDIT CARD-VARIABLE
        cardholder_name: "JOAO DA SILVA",
        expiration_month: "12",
        expiration_year: "21"
      }
    }
  };

  axios
    .post(url, data, {
      headers: {
        Accept: "application/json, text/plain,",
        "Content-Type": "application/json",
        Authorization: "Bearer 1dda160f-a9e2-4f5a-b550-168effda2001"     //OAUTH TOKEN GETNET 1 HOURS VALID-VARIABLE
        
      }
    })
    .then(data => {
      //console.log("data", data);
      return res.json(data.data);
    })
    .catch(e => {
      console.log("error", e);
      return res.json(e);
    });
};

/*

-SANDBOX TEST ACCOUNT

https://developers.getnet.com.br/
https://developers.getnet.com.br/api#section/Como-comecar/Criando-a-sua-conta-no-Sandbox
https://github.com/brunopazz/GetnetSDK


access_token
47f5370d-d653-4aa4-b7b8-cfb622bc40e1

seller_id
ee166199-8d66-491d-988c-e4deab5bc9f5
 
client_id
aa8f2c4c-a8ea-4231-842a-e1b852ec6b13

client_secret
80e307d8-cf8b-4554-93c9-3fc7f004f5da

authorization
Basic YWE4ZjJjNGMtYThlYS00MjMxLTg0MmEtZTFiODUyZWM2YjEzOjgwZTMwN2Q4LWNmOGItNDU1NC05M2M5LTNmYzdmMDA0ZjVkYQ==

URL da API
https://api-sandbox.getnet.com.br/

*/
