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

describe("GET /api/customer/show-placed-orders", () => {
    it("should return all products", async () => {
        const headers = {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Y4NDAzMTg5ZGI1NzM4MGMwMTFlZDYiLCJjb2xsZWN0aW9uTmFtZSI6IkN1c3RvbWVyIiwiaWF0IjoxNjc3MjIxNzMzLCJleHAiOjE2Nzk4MTM3MzN9.oXdzJjp1cv7bGhQ7DRLoVhVMTFdaZVcQHwflzPH5iek',
            'Content-Type': 'application/json'
        };
        const res = await request(app).get("/api/customer/show-placed-orders").set(headers);
        expect(res.statusCode).toBe(200);
        expect(res.body.orderList.length).toBeGreaterThan(0);
    });
});

describe("GET /api/customer/get-all-plans",()=>{
    it("should return subsciption plans related to this customer",async()=>{
        const headers = {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Y4NDAzMTg5ZGI1NzM4MGMwMTFlZDYiLCJjb2xsZWN0aW9uTmFtZSI6IkN1c3RvbWVyIiwiaWF0IjoxNjc3MjIxNzMzLCJleHAiOjE2Nzk4MTM3MzN9.oXdzJjp1cv7bGhQ7DRLoVhVMTFdaZVcQHwflzPH5iek',
            'Content-Type': 'application/json'
        };
        const res = await request(app).get("/api/customer/get-all-plans").set(headers);
        expect(res.statusCode).toBe(200);
        expect(res.body.plans.length).toBeGreaterThanOrEqual(0);
    });
})
