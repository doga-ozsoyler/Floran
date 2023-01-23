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

    const userRes = await request
      .get("/api/user/get")
      .set("authorization", testToken);

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "Plant is successfully created!",
      })
    );
    expect(userRes.body.user.addedPlants).toContain(res.body.plant._id);
    expect(res.statusCode).toBe(200);
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
    expect(res.statusCode).toBe(403);
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
    expect(res.statusCode).toBe(200);
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
    expect(res.statusCode).toBe(403);
  });

  test("When plant is successfully deleted. Return success message", async () => {
    const res = await request
      .delete(`${link}/${plantTestID}`)
      .set("authorization", testToken);

    const userRes = await request
      .get("/api/user/get")
      .set("authorization", testToken);

    expect(res.body).toEqual({
      success: true,
      message: "Plant is successfully deleted!",
    });
    expect(userRes.body.user.addedPlants).not.toContain(plantTestID);
    expect(res.statusCode).toBe(200);
  });
});

describe("GET - /plant/:plantID", () => {
  let testToken: any;
  let plantID: any;
  let link = "/api/plant/get";
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

    plantID = plantRes.body.plant._id;
  });

  afterAll(async () => {
    await testDB.clearDatabase();
    await testDB.closeDatabase();
  });

  test("When plant doesn't exist or id isn't correct. Return error message", async () => {
    const res = await request.get(`${link}/wrongID`);

    expect(res.body).toEqual(
      expect.objectContaining({
        success: false,
      })
    );
    expect(res.body.error).toEqual(
      expect.objectContaining({
        message:
          'Cast to ObjectId failed for value "wrongID" (type string) at path "_id" for model "Plant"',
      })
    );
    expect(res.statusCode).toBe(500);
  });

  test("When plant is successfully returned. Return success message and plant info", async () => {
    const res = await request.get(`${link}/${plantID}`);

    expect(res.body).toEqual(
      expect.objectContaining({
        success: false,
        message: "Plant is successfully returned!",
      })
    );
    expect(res.body.plant).toEqual(expect.objectContaining(dummyPlant));
    expect(res.statusCode).toBe(200);
  });
});

describe("GET - /plant/all", () => {
  let firstPlant: any;
  let secondPlant: any;
  beforeAll(async () => {
    await testDB.connect();

    await request.post("/api/auth/signup").send(dummyUser);
    const singinRes = await request
      .post("/api/auth/signin")
      .send({ email: dummyUser.email, password: dummyUser.password });

    const plantRes = await request
      .post("/api/plant/new")
      .set("authorization", singinRes.body.token)
      .send(dummyPlant);

    firstPlant = plantRes.body.plant;

    const secondPlantRes = await request
      .post("/api/plant/new")
      .set("authorization", singinRes.body.token)
      .send(dummyPlant);
    secondPlant = secondPlantRes.body.plant;
  });

  afterAll(async () => {
    await testDB.clearDatabase();
    await testDB.closeDatabase();
  });

  test("When all plants are successfully returned. Return success message and plants infos", async () => {
    const res = await request.get("/api/plant/all");

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "All plants are successfully returned!",
      })
    );
    expect(res.body.allPlant[0]).toEqual(expect.objectContaining(firstPlant));
    expect(res.body.allPlant[1]).toEqual(expect.objectContaining(secondPlant));
    expect(res.statusCode).toBe(200);
  });
});
