import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp"; 
import * as pg from "pg";
import { ApiClient, Configuration, PaymentsApi } from "cybersource-rest-client";

const { Pool } = pg;
const pool = conexion();

export const processPayment = async (req: Request, res: Response) => {
  const paymentRequest = {
    clientReferenceInformation: {
      code: "Customer Ref #1"
    },
    processingInformation: {
      commerceIndicator: "internet"
    },
    paymentInformation: {
      card: {
        number: req.body.cardNumber,
        securityCode: req.body.securityCode,
        expirationMonth: req.body.expirationMonth,
        expirationYear: req.body.expirationYear,
        billTo: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address1: req.body.address,
          locality: req.body.city,
          administrativeArea: req.body.state,
          postalCode: req.body.zip,
          country: req.body.country
        }
      }
    },
    orderInformation: {
      amountDetails: {
        totalAmount: req.body.amount,
        currency: "USD"
      },
      billTo: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address1: req.body.address,
        locality: req.body.city,
        administrativeArea: req.body.state,
        postalCode: req.body.zip,
        country: req.body.country
      }
    }
  };

  const apiClient = new ApiClient();
  const configuration = new Configuration();
  configuration.setDebug(true);
  configuration.setMerchantId('carlos_curo');

  const paymentsApi = new PaymentsApi(configuration, apiClient);

  paymentsApi.createPayment(paymentRequest, (error, data, response) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Payment processing failed.' });
    } else {
      console.log(`Response: ${JSON.stringify(response)}`);
      res.status(200).send({ message: 'Payment successful!' });
    }
  });
};
