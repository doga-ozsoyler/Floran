import userRoutes from "../routes/userRoutes";
import * as testDB from "../config/dbTestConnect";
import supertest from "supertest";

const request = supertest(userRoutes);

describe("Test request with mongoose", () => {
  beforeAll(async () => {
    await testDB.connect();
  });
  afterEach(async () => {
    await testDB.clearDatabase();
  });
  afterAll(async () => {
    await testDB.closeDatabase();
  });

  request.get("");
});
