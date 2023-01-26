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
  whenToWater: faker.datatype.number(),
  petFriendly: faker.datatype.boolean(),
  sunExposure: faker.datatype.number(),
  fertilizer: faker.datatype.number(),
  picture: faker.image.cats(),
};
const dummyReminder = {
  repeat: faker.datatype.number(),
  time: new Date().toISOString(),
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
    expect(res.statusCode).toBe(200);
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
    expect(res.statusCode).toBe(200);
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
    expect(res.statusCode).toBe(400);
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
    expect(res.statusCode).toBe(200);
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
    expect(userRes.body.user.plants[0]._id).toContain(testPlant._id);
    expect(res.statusCode).toBe(200);
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
    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE - /user/delete", () => {
  let testToken: any;
  let testUser: any;
  let testPlant: any;
  let testReminder: any;
  const link = "/api/user/delete";
  beforeAll(async () => {
    await testDB.connect();

    const signupRes = await request.post("/api/auth/signup").send(dummyUser);

    testUser = signupRes.body.user;

    const signinRes = await request
      .post("/api/auth/signin")
      .send({ email: dummyUser.email, password: dummyUser.password });

    testToken = signinRes.body.token;

    const plantRes = await request
      .post("/api/plant/new")
      .set("authorization", testToken)
      .send(dummyPlant);

    testPlant = plantRes.body.plant;

    const reminderRes = await request
      .post("/api/reminder/new")
      .set("authorization", testToken)
      .send({
        plant: testPlant._id,
        repeat: dummyReminder.repeat,
        time: dummyReminder.time,
      });

    testReminder = reminderRes.body.reminder;
  });

  afterAll(async () => {
    await testDB.clearDatabase();
    await testDB.closeDatabase();
  });

  test("When authentication isn't exist. Return error message", async () => {
    const res = await request.delete(link);

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("When user is successfully deleted. Return success message", async () => {
    const res = await request.delete(link).set("authorization", testToken);
    const plant = await request.get(`/api/plant/get/${testPlant._id}`);

    expect(res.body).toEqual({
      success: true,
      message: "User is successfully deleted!",
    });
    const trySignin = await request
      .post("/api/auth/signin")
      .send({ email: dummyUser.email, password: dummyUser.password });
    expect(trySignin.body).toEqual({
      success: false,
      message: "User doesn't exist",
    });
    expect(plant.body).toEqual(
      expect.objectContaining({
        success: false,
        message: "Plant is successfully returned!",
      })
    );
    const tryGetUser = await request
      .get(`/api/reminder/get/${testReminder._id}`)
      .set("authorization", testToken);
    expect(tryGetUser.text).toEqual(
      '{"success":false,"message":"User doesn\'t exist"}'
    );
    expect(res.statusCode).toBe(200);
  });
});
