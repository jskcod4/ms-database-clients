"use strict";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI || "", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const handler = async (
  event?: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await client.connect();
    console.log("client connected");
    const db = client.db("uat");
    const collection = db.collection("clients");
    const clients = await collection.findOne({
      code: "JOSE_CHINA_01",
    });

    return {
      statusCode: 200,
      body: JSON.stringify(clients),
    };
  } finally {
    await client.close();
  }
};
