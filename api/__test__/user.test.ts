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
