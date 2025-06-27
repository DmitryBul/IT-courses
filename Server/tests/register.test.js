import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";
import User from "../db/models/UserModel.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
afterEach(async () => {
  await User.deleteMany({});
});
describe("POST /auth/register", () => {
  it("Rejestracja nowego użytkownika", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        firstName: "test1",
        secondName: "test1",
        email: "test@example.com",
        password: "123123",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("email", "test@example.com");
    const user = await User.findOne({ email: "test@example.com" });
    expect(user).not.toBeNull();
    expect(user.email).toBe("test@example.com");
  });
  it("Rejestracja bez hasła", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        firstname: "test1",
        secondName: "test1",
        email: "test@example.com",
      });
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("message", "Błąd rejestracji");
  });
});
