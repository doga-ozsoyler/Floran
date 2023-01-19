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

describe("POST - /plant/new", () => {
  let testToken: any;
  const link = "/api/plant/new";
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

  test("When authentication isn't exist. Return error message", async () => {
    const res = await request.post(link).send(dummyPlant);

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("When plant is successfully created. Return success message", async () => {
    const res = await request
      .post(link)
      .set("authorization", testToken)
      .send(dummyPlant);

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "Plant is successfully created!",
      })
    );
  });
});

describe("PUT - /update/:plantID", () => {
  let testToken: any;
  let plantTestID: any;
  const link = "/api/plant/update";
  beforeAll(async () => {
    await testDB.connect();

    await request.post("/api/auth/signup").send(dummyUser);
    const signinRes = await request
      .post("/api/auth/signin")
      .send({ email: dummyUser.email, password: dummyUser.password });

    testToken = signinRes.body.token;

    const plantRes = await request
      .post(`/api/plant/new`)
      .set("authorization", testToken)
      .send(dummyPlant);

    plantTestID = plantRes.body.plant._id;
  });

  afterAll(async () => {
    await testDB.clearDatabase();
    await testDB.closeDatabase();
  });

  test("When authentication isn't exist. Return error message", async () => {
    const res = await request.put(`${link}/${plantTestID}`).send({
      name: faker.animal.dog(),
    });

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("When plant doesn't belong the user. Return error message", async () => {
    await request.post("/api/auth/signup").send(dummySecondUser);
    const secondUser = await request.post("/api/auth/signin").send({
      email: dummySecondUser.email,
      password: dummySecondUser.password,
    });

    const res = await request
      .put(`${link}/${plantTestID}`)
      .set("authorization", secondUser.body.token)
      .send({
        name: faker.animal.dog(),
      });

    expect(res.body).toEqual({
      success: false,
      message: "Plant doesn't belong the user!",
    });
  });

  test("When plant is successfully updated. Return success message", async () => {
    const res = await request
      .put(`${link}/${plantTestID}`)
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

describe("DELETE - /delete/:plantID", () => {
  let testToken: any;
  let plantTestID: any;
  const link = "/api/plant/delete";
  beforeAll(async () => {
    await testDB.connect();

    await request.post("/api/auth/signup").send(dummyUser);
    const signinRes = await request
      .post("/api/auth/signin")
      .send({ email: dummyUser.email, password: dummyUser.password });

    testToken = signinRes.body.token;

    const plantRes = await request
      .post(`/api/plant/new`)
      .set("authorization", testToken)
      .send(dummyPlant);

    plantTestID = plantRes.body.plant._id;
  });

  afterAll(async () => {
    await testDB.clearDatabase();
    await testDB.closeDatabase();
  });

  test("When authentication isn't exist. Return error message", async () => {
    const res = await request.delete(`${link}/${plantTestID}`);

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("When plant doesn't belong the user. Return error message", async () => {
    await request.post("/api/auth/signup").send(dummySecondUser);
    const secondUser = await request.post("/api/auth/signin").send({
      email: dummySecondUser.email,
      password: dummySecondUser.password,
    });

    const res = await request
      .delete(`${link}/${plantTestID}`)
      .set("authorization", secondUser.body.token);

    expect(res.body).toEqual({
      success: false,
      message: "Plant doesn't belong the user!",
    });
  });

  test("When plant is successfully deleted. Return success message", async () => {
    const res = await request
      .delete(`${link}/${plantTestID}`)
      .set("authorization", testToken);

    expect(res.body).toEqual({
      success: true,
      message: "Plant is successfully deleted!",
    });
  });
});
