import request from 'supertest';
import app from 'app';

describe("Officestypes", () => {
    it("should retrieve all", async () => {
        const response = await request(app).get("/officestypes");

        expect(response.statusCode).toBe(200);
    })
});
