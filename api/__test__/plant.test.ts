import app from "../server";
import * as testDB from "../config/dbTestConnect";
import supertest from "supertest";
import { faker } from "@faker-js/faker";

const request = supertest(app);

const dummyPlant = {
  name: faker.animal.lion(),
  petFriendly: faker.datatype.boolean(),
  sunExposure: faker.datatype.number(),
  fertilizer: faker.datatype.number(),
  picture: faker.image.cats(),
};
const dummyUser = {
  nickname: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};
const dummySecondUser = {
  nickname: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};
const link = "/api/plant";

describe("Plant Controllers", () => {
  let testToken: any;
  let plantTestID: any;
  beforeAll(async () => {
    await testDB.connect();

    await request.post("/api/auth/signup").send(dummyUser);
    const signinRes = await request
      .post("/api/auth/signin")
      .send({ email: dummyUser.email, password: dummyUser.password });

    testToken = signinRes.body.token;

    const plantRes = await request
      .post(`${link}/new`)
      .set("authorization", testToken)
      .send(dummyPlant);

    plantTestID = plantRes.body.plant._id;
  });

  afterAll(async () => {
    await testDB.clearDatabase();
    await testDB.closeDatabase();
  });

  test("POST - /plant/new --> When authentication isn't exist. Return error message", async () => {
    const res = await request.post(`${link}/new`).send(dummyPlant);

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("POST - /new --> When plant is successfully created. Return success message", async () => {
    const res = await request
      .post(`${link}/new`)
      .set("authorization", testToken)
      .send(dummyPlant);

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "Plant is successfully created!",
      })
    );
  });

  test("PUT - /update/:plantID --> When authentication isn't exist. Return error message", async () => {
    const res = await request.put(`${link}/update/${plantTestID}`).send({
      name: faker.animal.dog(),
    });

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("PUT - /update/:plantID --> When plant doesn't belong the user. Return error message", async () => {
    await request.post("/api/auth/signup").send(dummySecondUser);
    const newUsers = await request.post("/api/auth/signin").send({
      email: dummySecondUser.email,
      password: dummySecondUser.password,
    });

    const res = await request
      .put(`${link}/update/${plantTestID}`)
      .set("authorization", newUsers.body.token)
      .send({
        name: faker.animal.dog(),
      });

    expect(res.body).toEqual({
      success: false,
      message: "Plant doesn't belong the user!",
    });
  });

  test("PUT - /update/:plantID --> When plant is successfully updated. Return success message", async () => {
    const res = await request
      .put(`${link}/update/${plantTestID}`)
      .set("authorization", testToken)
      .send({
        name: faker.animal.dog(),
      });

    expect(res.body).toEqual({
      success: true,
      message: "Plant is successfully updated!",
    });
  });
});
