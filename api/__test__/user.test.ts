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
const link = "/api/user";

describe("User Controllers", () => {
  let testToken: any;
  let testUser: { password?: string };
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

  test("GET - /user/get --> When authentication isn't exist. Return error message", async () => {
    const res = await request.get(`${link}/get`);

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("GET - /user/get --> When authentication is currect. Return success message and user info", async () => {
    const res = await request
      .get(`${link}/get`)
      .set("authorization", testToken);

    expect(res.body).toEqual({
      success: true,
      message: "User is successfully returned!",
      user: testUser,
    });
  });

  test("PUT - /user/update/info --> When authentication isn't exist. Return error message", async () => {
    const res = await request
      .put(`${link}/update/info`)
      .send({ nickname: faker.internet.userName() });

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("PUT - /user/update/info --> When user is successfully updated. Return success message", async () => {
    const res = await request
      .put(`${link}/update/info`)
      .set("authorization", testToken)
      .send({ nickname: faker.internet.userName() });

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "User is successfully updated!",
      })
    );
  });

  test("PUT - /user/update/password --> When authentication isn't exist. Return error message", async () => {
    const res = await request.put(`${link}/update/password`).send({
      oldPassword: dummyUser.password,
      newPassword: faker.internet.password(),
    });

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("PUT - /user/update/password --> When user's password is incorrect. Return error message", async () => {
    const res = await request
      .put(`${link}/update/password`)
      .set("authorization", testToken)
      .send({
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

  test("PUT - /user/update/password --> When user's password is successfully updated. Return success message", async () => {
    const res = await request
      .put(`${link}/update/password`)
      .set("authorization", testToken)
      .send({
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
