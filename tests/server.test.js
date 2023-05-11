const { server } = require("../server");
const request = require("supertest");

afterAll(() => {
  server.close();
});

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(server).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeUndefined();
  });
  test("It should respond with an empty body", async () => {
    const response = await request(server).post("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeUndefined();
    expect(response.body.serverResponse).toBeNull();
    expect(response.body.remainedWaterResponse).toBeUndefined();
    expect(response.body.percentResponse).toBeUndefined();
  });
  test("It should update the water goal", async () => {
    const responseSet = await request(server).post("/calculate").send({
      userWaterGoal: 2000,
    });
    expect(responseSet.statusCode).toBe(200);
    expect(responseSet.body.error).toBeUndefined();
    expect(responseSet.body.serverResponse).toBe(2000);

    const responseGet = await request(server).post("/");
    expect(responseGet.statusCode).toBe(200);
    expect(responseGet.body.error).toBeUndefined();
    expect(responseGet.body.serverResponse).toBe(2000);
    expect(responseGet.body.remainedWaterResponse).toBeUndefined();
    expect(responseGet.body.percentResponse).toBeUndefined();
  });
});
