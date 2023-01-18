import app from "../server";
import * as testDB from "../config/dbTestConnect";
import supertest from "supertest";
import { faker } from "@faker-js/faker";

const request = supertest(app);

const dummyUser = {
  nickname: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};
const link = "/api/plant";

describe("Plant Controllers", () => {
  let testToken: any;
  beforeAll(async () => {
    await testDB.connect();

    await request.post("/api/auth/signup").send(dummyUser);
    const signinRes = await request
      .post("/api/auth/signin")
      .send({ email: dummyUser.email, password: dummyUser.password });

    testToken = signinRes.body.token;
  });

  afterAll(async () => {
    await testDB.clearDatabase();
    await testDB.closeDatabase();
  });

  test("POST - /plant/new --> When authentication isn't exist. Return error message ", async () => {
    const res = await request.post(`${link}/new`).send({
      name: faker.animal.lion(),
      petFriendly: faker.datatype.boolean(),
      sunExposure: faker.datatype.number(),
      fertilizer: faker.datatype.number(),
      picture: faker.image.cats(),
    });

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("POST - /plant/new --> When authentication isn't exist. Return error message ", async () => {
    const res = await request
      .post(`${link}/new`)
      .set("authorization", testToken)
      .send({
        name: faker.animal.lion(),
        petFriendly: faker.datatype.boolean(),
        sunExposure: faker.datatype.number(),
        fertilizer: faker.datatype.number(),
        picture: faker.image.cats(),
      });

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "Plant is successfully created!",
      })
    );
  });
});
