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
const dummyReminder = {
  repeat: faker.datatype.number(),
  time: new Date().toISOString(),
};

describe("POST - /reminder/new", () => {
  let testToken: any;
  let testPlant: any;
  const link = "/api/reminder/new";
  beforeAll(async () => {
    await testDB.connect();

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

  afterAll(async () => {
    await testDB.clearDatabase();
    await testDB.closeDatabase();
  });

  test("When authentication isn't exist. Return error message", async () => {
    const res = await request.post(link).send({
      plant: testPlant._id,
      repeat: 2,
      time: new Date().getHours(),
    });

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("When reminder is successfully created. Return success message and reminder", async () => {
    const res = await request.post(link).set("authorization", testToken).send({
      plant: testPlant._id,
      repeat: dummyReminder.repeat,
      time: dummyReminder.time,
    });

    const userRes = await request
      .get("/api/user/get")
      .set("authorization", testToken);

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "Reminder is successfully created!",
      })
    );
    expect(res.body.reminder).toEqual(
      expect.objectContaining({
        plant: testPlant._id,
        repeat: dummyReminder.repeat,
        time: dummyReminder.time,
      })
    );
    expect(userRes.body.user.plants).toContain(testPlant._id);
    expect(userRes.body.user.reminders).toContain(res.body.reminder._id);
  });
});

describe("GET - /reminder/get/:reminderID", () => {
  let testToken: any;
  let testPlant: any;
  let testReminder: any;
  const link = "/api/reminder/get";
  beforeAll(async () => {
    await testDB.connect();

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
    const res = await request.get(`${link}/${testReminder._id}`);

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("When reminder doesn't belong the user. Return error message", async () => {
    await request.post("/api/auth/signup").send(dummySecondUser);
    const secondUser = await request.post("/api/auth/signin").send({
      email: dummySecondUser.email,
      password: dummySecondUser.password,
    });

    const res = await request
      .get(`${link}/${testReminder._id}`)
      .set("authorization", secondUser.body.token);

    expect(res.body).toEqual({
      success: false,
      message: "Reminder doesn't belong the user!",
    });
  });

  test("When reminder is successfully returned. Return success message and reminder info", async () => {
    const res = await request
      .get(`${link}/${testReminder._id}`)
      .set("authorization", testToken);

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "Reminder is successfully returned!",
      })
    );
    expect(res.body.reminder).toEqual(testReminder);
  });
});

describe("PUT - /reminder/update/:reminderID", () => {
  let testToken: any;
  let testPlant: any;
  let testReminder: any;
  const link = "/api/reminder/update";
  beforeAll(async () => {
    await testDB.connect();

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

    const reminderRes = await request
      .post("/api/reminder/new")
      .set("authorization", testToken)
      .send({
        plant: testPlant._id,
        repeat: 2,
        time: new Date().getHours(),
      });

    testReminder = reminderRes.body.reminder;
  });

  afterAll(async () => {
    await testDB.clearDatabase();
    await testDB.closeDatabase();
  });
  test("When authentication isn't exist. Return error message", async () => {
    const res = await request.put(`${link}/${testReminder._id}`).send({
      repeat: faker.datatype.number(),
    });

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("When reminder doesn't belong the user. Return error message", async () => {
    await request.post("/api/auth/signup").send(dummySecondUser);
    const secondUser = await request.post("/api/auth/signin").send({
      email: dummySecondUser.email,
      password: dummySecondUser.password,
    });

    const res = await request
      .put(`${link}/${testReminder._id}`)
      .set("authorization", secondUser.body.token)
      .send({
        repeat: faker.datatype.number(),
      });

    expect(res.body).toEqual({
      success: false,
      message: "Reminder doesn't belong the user!",
    });
  });

  test("When reminder is successfully updated. Return success message", async () => {
    const repeat = faker.datatype.number();
    const res = await request
      .put(`${link}/${testReminder._id}`)
      .set("authorization", testToken)
      .send({
        repeat: repeat,
      });

    const reminderRes = await request
      .get(`/api/reminder/get/${testReminder._id}`)
      .set("authorization", testToken);

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "Reminder is successfully updated!",
      })
    );
    expect(reminderRes.body.reminder.repeat).toEqual(repeat);
  });
});

describe("DELETE - /reminder/delete/:reminderID", () => {
  let testToken: any;
  let testPlant: any;
  let testReminder: any;
  const link = "/api/reminder/delete";
  beforeAll(async () => {
    await testDB.connect();

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
    const res = await request.delete(`${link}/${testReminder._id}`);

    expect(res.body).toEqual({
      success: false,
      message: "Invalid Authentication",
    });
  });

  test("When reminder doesn't belong the user. Return error message", async () => {
    await request.post("/api/auth/signup").send(dummySecondUser);
    const secondUser = await request.post("/api/auth/signin").send({
      email: dummySecondUser.email,
      password: dummySecondUser.password,
    });

    const res = await request
      .delete(`${link}/${testReminder._id}`)
      .set("authorization", secondUser.body.token);

    expect(res.body).toEqual({
      success: false,
      message: "Reminder doesn't belong the user!",
    });
  });

  test("When reminder is successfully deleted. Return success message", async () => {
    const res = await request
      .delete(`${link}/${testReminder._id}`)
      .set("authorization", testToken);

    const userRes = await request
      .get("/api/user/get")
      .set("authorization", testToken);

    expect(res.body).toEqual({
      success: true,
      message: "Reminder is successfully deleted!",
    });
    expect(userRes.body.user.reminders).not.toContain(testReminder._id);
  });
});
