import { connect, connection } from "mongoose";
import request from "supertest";
import { app } from "./backend/server";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await connect(process.env.MONGO_URI);
});

/* Dropping the database and closing connection after each test. */
afterEach(async () => {
    // await mongoose.connection.dropDatabase();
    await connection.close();
});

// /* Testing the API endpoints. */

// valid customer check
describe("post /api/login", () => {
    it("should give status 200 and token", async () => {
        const res = await request(app).post("/api/user/login").send({
            email: "omikakadiya7777@gmail.com",
            password: "Shivam@2002",
            collectionName: 'Customer'
        });
        expect(res.statusCode).toBe(200);
    })
});

// invalid user check 
// we are giving wrong password
describe("post /api/login", () => {
    it("should give status 200 and token", async () => {
        const res = await request(app).post("/api/user/login").send({
            email: "omikakadiya7777@gmail.com",
            password: "shivam@2002",
            collectionName: 'Customer'
        });
        expect(res.statusCode).toBe(400);
    })
});


// valid owner check
describe("post /api/login", () => {
    it("should give status 200 and token", async () => {
        const res = await request(app).post("/api/user/login").send({
            email: "shivamkshirsagar97@gmail.com",
            password: "Shivam@2002",
            collectionName: 'Owner'
        });
        expect(res.statusCode).toBe(200);
    })
});

// valid worker check
describe("post /api/login", () => {
    it("should give status 200 and token", async () => {
        const res = await request(app).post("/api/user/login").send({
            email: "omikakadiya7777@gmail.com",
            password: "Shivam@2002",
            collectionName: 'Worker'
        });
        expect(res.statusCode).toBe(200);
    })
});
