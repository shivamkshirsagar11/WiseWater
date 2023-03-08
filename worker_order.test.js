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

describe("GET /api/worker/daily-ord", () => {
    it("should give daily orders list assigned to this worker", async () => {
        const headers = {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Y4NDE3YTg5ZGI1NzM4MGMwMTFlZmIiLCJjb2xsZWN0aW9uTmFtZSI6IldvcmtlciIsImlhdCI6MTY3ODI4MTMzMiwiZXhwIjoxNjgwODczMzMyfQ.ShUUi0rsKxpTsRwxBvKpGKsNuyUaSPlyoEBae8YQmKo',
            'Content-Type': 'application/json'
        };
        const res = await request(app).get("/api/worker/daily-ord").set(headers);
        expect(res.statusCode).toBe(200);
        // expect(res.body.plans.length).toBeGreaterThanOrEqual(0);
    });
});