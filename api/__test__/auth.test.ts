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
const link = "/api/auth";

describe("Auth Controllers", () => {
  beforeAll(async () => {
    await testDB.connect();
  });

  //afterEach

  afterAll(async () => {
    await testDB.clearDatabase();
    await testDB.closeDatabase();
  });

  test("POST - /auth/signup --> When infos are missing. Return error message", async () => {
    const res = await request.post(`${link}/signup`).send({
      password: dummyUser.password,
    });

    expect(res.body).toEqual({ success: false, message: "Missing info!" });
    expect(res.statusCode).toBe(400);
  });

  test("POST - /auth/signup --> User is created successfully. Return success message", async () => {
    const res = await request.post(`${link}/signup`).send(dummyUser);

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "Signup Success!",
      })
    );
    expect(res.statusCode).toBe(201);
  });

  test("POST - /auth/signup --> When email has already existed. Return error message", async () => {
    const res = await request.post(`${link}/signup`).send(dummyUser);

    expect(res.body).toEqual({ success: false, message: "User already exist" });
    expect(res.statusCode).toBe(404);
  });

  test("POST - /auth/signin --> When user doesn't exist. Return error message", async () => {
    const res = await request.post(`${link}/signin`).send({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(res.body).toEqual({ success: false, message: "User doesn't exist" });
    expect(res.statusCode).toBe(404);
  });

  test("POST - /auth/signin --> When password isn't correct. Return error message", async () => {
    const res = await request.post(`${link}/signin`).send({
      email: dummyUser.email,
      password: "incorrect password",
    });

    expect(res.body).toEqual({
      success: false,
      message: "Password is incorrect",
    });
    expect(res.statusCode).toBe(400);
  });

  test("POST - /auth/signin --> When signing is happend successfully. Return success message", async () => {
    const res = await request.post(`${link}/signin`).send({
      email: dummyUser.email,
      password: dummyUser.password,
    });

    expect(res.body).toEqual(
      expect.objectContaining({ success: true, message: "Signin Success!" })
    );
    expect(res.statusCode).toBe(201);
  });
});
