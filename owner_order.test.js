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

describe("GET /api/owner/show-assigned-orders", () => {
    it("should give daily orders list assigned to this worker", async () => {
        const headers = {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VlNTA0MDJhZWMyMTA4M2I1MWYzYTciLCJjb2xsZWN0aW9uTmFtZSI6Ik93bmVyIiwiaWF0IjoxNjc4MjgxNDUyLCJleHAiOjE2ODA4NzM0NTJ9.Iaot-gz4Si5WYBFpWG-PhO2z0Ui6N87u0Nbd2Tbd6ug',
            'Content-Type': 'application/json'
        };
        const res = await request(app).get("/api/owner/show-assigned-orders").set(headers);
        expect(res.statusCode).toBe(200);
        // expect(res.body.plans.length).toBeGreaterThanOrEqual(0);
    });
});