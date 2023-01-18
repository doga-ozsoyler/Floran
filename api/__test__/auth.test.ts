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

describe("Auth Controllers", () => {
  beforeAll(async () => {
    await testDB.connect();
  });

  //afterEach

  afterAll(async () => {
    await testDB.clearDatabase();
    await testDB.closeDatabase();
  });

  test("POST - /signup --> When infos are missing. Return error message", async () => {
    const res = await request.post("/api/auth/signup").send({
      password: dummyUser.password,
    });

    expect(res.body).toEqual({ success: false, message: "Missing info!" });
  });

  test("POST - /signup --> User is created successfully. Return success message", async () => {
    const res = await request.post("/api/auth/signup").send(dummyUser);

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "Signup Success!",
      })
    );
  });

  test("POST - /signup --> When email has already existed. Return error message", async () => {
    const res = await request.post("/api/auth/signup").send(dummyUser);

    expect(res.body).toEqual({ success: false, message: "User already exist" });
  });

  test("POST - /signin --> When user doesn't exist. Return error message", async () => {
    const res = await request.post("/api/auth/signin").send({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(res.body).toEqual({ success: false, message: "User doesn't exist" });
  });

  test("POST - /signin --> When password isn't correct. Return error message", async () => {
    const res = await request.post("/api/auth/signin").send({
      email: dummyUser.email,
      password: "incorrect password",
    });

    expect(res.body).toEqual({
      success: false,
      message: "Password is incorrect",
    });
  });

  test("POST - /signin --> When signing is happend successfully. Return success message", async () => {
    const res = await request.post("/api/auth/signin").send({
      email: dummyUser.email,
      password: dummyUser.password,
    });

    expect(res.body).toEqual(
      expect.objectContaining({ success: true, message: "Signin Success!" })
    );
  });
});
