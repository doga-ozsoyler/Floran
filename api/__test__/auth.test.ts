import app from "../server";
import * as testDB from "../config/dbTestConnect";
import supertest from "supertest";

const request = supertest(app);

describe("Auth Signup controller", () => {
  beforeAll(async () => {
    await testDB.connect();
  });
  afterEach(async () => {
    await testDB.clearDatabase();
  });
  afterAll(async () => {
    await testDB.closeDatabase();
  });

  test("POST - /signup --> User is created successfully. Return success message", async () => {
    const res = await request.post("/api/auth/signup").send({
      nickname: "Test Jest",
      email: "test.jest@gmail.com",
      password: "test.jest",
    });

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "Signup Success!",
      })
    );
  });
});
