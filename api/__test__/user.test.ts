import app from "../server";
import * as testDB from "../config/dbTestConnect";
import supertest from "supertest";
import { faker } from "@faker-js/faker";

const request = supertest(app);

const dummyUser = {
  nickname: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  plants: [],
  reminders: [],
  addedPlants: [],
};
const dummyPlant = {
  name: faker.animal.lion(),
  petFriendly: faker.datatype.boolean(),
  sunExposure: faker.datatype.number(),
  fertilizer: faker.datatype.number(),
  picture: faker.image.cats(),
};

describe("GET - /user/get", () => {
  let testToken: any;
  let testUser: { password?: string };
  const link = "/api/user/get";
  beforeAll(async () => {
    await testDB.connect();
    const signupRes = await request.post(`/api/auth/signup`).send({
      nickname: dummyUser.nickname,
      email: dummyUser.email,
      password: dummyUser.password,
    });

    testUser = signupRes.body.user;
    if (testUser) delete testUser["password"];

    const signinRes = await request.post(`/api/auth/signin`).send({
      email: dummyUser.email,
      password: dummyUser.password,
    });

    testToken = signinRes.body.token;
  });

  afterAll(async () => {
    await testDB.clearDatabase();
    await testDB.closeDatabase();
  });

  test("When authentication isn't exist. Return error message", async () => {
    const res = await request.get(link);

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("When authentication is currect. Return success message and user info", async () => {
    const res = await request.get(link).set("authorization", testToken);

    expect(res.body).toEqual({
      success: true,
      message: "User is successfully returned!",
      user: testUser,
    });
  });
});

describe("PUT - /user/update/info", () => {
  let testToken: any;
  let testUser: { password?: string };
  const link = "/api/user/update/info";
  beforeAll(async () => {
    await testDB.connect();
    const signupRes = await request.post(`/api/auth/signup`).send({
      nickname: dummyUser.nickname,
      email: dummyUser.email,
      password: dummyUser.password,
    });

    testUser = signupRes.body.user;
    if (testUser) delete testUser["password"];

    const signinRes = await request.post(`/api/auth/signin`).send({
      email: dummyUser.email,
      password: dummyUser.password,
    });

    testToken = signinRes.body.token;
  });

  afterAll(async () => {
    await testDB.clearDatabase();
    await testDB.closeDatabase();
  });

  test("When authentication isn't exist. Return error message", async () => {
    const res = await request
      .put(link)
      .send({ nickname: faker.internet.userName() });

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("When user is successfully updated. Return success message", async () => {
    const res = await request
      .put(link)
      .set("authorization", testToken)
      .send({ nickname: faker.internet.userName() });

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "User is successfully updated!",
      })
    );
  });
});

describe("PUT - /user/update/password", () => {
  let testToken: any;
  let testUser: { password?: string };
  const link = "/api/user/update/password";
  beforeAll(async () => {
    await testDB.connect();
    const signupRes = await request.post(`/api/auth/signup`).send({
      nickname: dummyUser.nickname,
      email: dummyUser.email,
      password: dummyUser.password,
    });

    testUser = signupRes.body.user;
    if (testUser) delete testUser["password"];

    const signinRes = await request.post(`/api/auth/signin`).send({
      email: dummyUser.email,
      password: dummyUser.password,
    });

    testToken = signinRes.body.token;
  });

  afterAll(async () => {
    await testDB.clearDatabase();
    await testDB.closeDatabase();
  });

  test("When authentication isn't exist. Return error message", async () => {
    const res = await request.put(link).send({
      oldPassword: dummyUser.password,
      newPassword: faker.internet.password(),
    });

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("When user's password is incorrect. Return error message", async () => {
    const res = await request.put(link).set("authorization", testToken).send({
      oldPassword: "incorrect password",
      newPassword: faker.internet.password(),
    });

    expect(res.body).toEqual(
      expect.objectContaining({
        success: false,
        message: "Password is incorrect",
      })
    );
  });

  test("When user's password is successfully updated. Return success message", async () => {
    const res = await request.put(link).set("authorization", testToken).send({
      oldPassword: dummyUser.password,
      newPassword: faker.internet.password(),
    });

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "Password is successfully updated!",
      })
    );
  });
});

describe("PUT - /user/own/plants", () => {
  let testToken: any;
  let testPlant: any;
  const link = "/api/user/own/plants";
  beforeAll(async () => {
    await testDB.connect();
  });

  beforeEach(async () => {
    await request.post("/api/auth/signup").send(dummyUser);
    const signinRes = await request
      .post("/api/auth/signin")
      .send({ email: dummyUser.email, password: dummyUser.password });

    testToken = signinRes.body.token;

    const plantRes = await request
      .post("/api/plant/new")
      .set("authorization", testToken)
      .send(dummyPlant);

    testPlant = plantRes.body.plant;
  });

  afterEach(async () => {
    await testDB.clearDatabase();
  });

  afterAll(async () => {
    await testDB.closeDatabase();
  });

  test("When authentication isn't exist. Return error message", async () => {
    const res = await request.put(link).send({
      plantID: testPlant._id,
    });

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("When user successfully adds the  plant in plants list. Return success message", async () => {
    const res = await request.put(link).set("authorization", testToken).send({
      plantID: testPlant._id,
    });

    const userRes = await request
      .get("/api/user/get")
      .set("authorization", testToken);

    expect(res.body).toEqual({
      success: true,
      message: "Plant is successfully added plants list!",
    });
    expect(userRes.body.user.plants).toContain(testPlant._id);
  });

  test("When user successfully outs the  plant in plants list. Return success message", async () => {
    await request.put(link).set("authorization", testToken).send({
      plantID: testPlant._id,
    });
    const res = await request.put(link).set("authorization", testToken).send({
      plantID: testPlant._id,
    });

    const userRes = await request
      .get("/api/user/get")
      .set("authorization", testToken);

    expect(res.body).toEqual({
      success: true,
      message: "Plant is successfully outed plants list!",
    });
    expect(userRes.body.user.plants).not.toContain(testPlant._id);
  });
});
