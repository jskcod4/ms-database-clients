import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "../src/handler";
import { expect } from "chai";
import * as sinon from "sinon";
import "mocha";

describe("handler", () => {
  const dummyEvent: APIGatewayProxyEvent = {
    headers: {},
    body: null,
    multiValueHeaders: {},
    httpMethod: "GET",
    isBase64Encoded: false,
    path: "xx",
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {
      accountId: "",
      apiId: "",
      connectedAt: 100,
      httpMethod: "GET",
      identity: {
        accessKey: null,
        accountId: null,
        apiKey: null,
        apiKeyId: null,
        caller: null,
        cognitoAuthenticationProvider: null,
        cognitoAuthenticationType: null,
        cognitoIdentityId: null,
        cognitoIdentityPoolId: null,
        sourceIp: "10.10.10.10",
        user: null,
        userAgent: null,
        userArn: null,
        clientCert: null,
        principalOrgId: null,
      },
      path: "xx",
      stage: "test",
      requestId: "id",
      requestTimeEpoch: 123,
      resourceId: "a",
      resourcePath: "xxx",
      authorizer: {},
      protocol: "HTTP/1.1",
    },
    resource: "",
  };

  before(function () {
    this.clock = sinon.useFakeTimers(new Date(2012, 1, 10).getTime());
  });

  after(function () {
    this.clock.restore();
  });

  it("should return 200 always!", () => {
    try {
      handler(dummyEvent).then((result) => {
        expect(result.statusCode).to.be.deep.equal(200);
      });
    } catch (error) {
      console.log(error);
    }
  });
});
