import request from "supertest";
import { sequelize } from "./utils/sequelize/sequelize";
const app = require("./app");

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: false });
});

afterAll(async () => {
  await sequelize.close();
});

describe("POST /api/auth/register", () => {
  describe("Given username and Password", () => {
    test("It should respond with a 201 status", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Abubakr",
        email: "test@test.com",
        password: "Admin!123",
      });
      console.log(response.body);
      expect(response.status).toBe(201);
    });
  });

  describe("Missing username and Password", () => {
    test("It should respond with a 400 status", async () => {
      const response = await request(app).post("/api/auth/register").send({});
      expect(response.status).toBe(400);
    });
  });

  describe("Invalid email format", () => {
    test("It should respond with a 400 status", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Abubakr",
        email: "invalid-email",
        password: "Admin!123",
      });
      expect(response.status).toBe(400);
    });
  });

  describe("Password too short", () => {
    test("It should respond with a 400 status", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Abubakr",
        email: "asdf@gmaul.com",
        password: "short",
      });
      expect(response.status).toBe(400);
    });
  });
});
