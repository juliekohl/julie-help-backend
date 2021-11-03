import request from 'supertest';
import app from 'app';

describe("teams", () => {
    it('sanity test', () => {
        expect(true).toBe(true);
    })

    it("should respond with a 200 status code", async () => {
        const response = await request(app).get("/teams");
        expect(response.statusCode).toBe(200);
    })

    it("should get a teams by its email and name", async () => {
        const response = await request(app).get("/teams/1");
        expect(response.body).toStrictEqual({
            email: "Amos38@gmail.com",
            name: "Sharon Mills"
        });
    })

    it("should post create a teams by its name, email and pass", async () => {
        const response = await request(app).post("/teams").send({
            coworking_id: 6,
            name: "Name8",
            email: "email-test8@email.com",
            password: "secret"
        });
        expect(response.body.message).toBe("Success");
    })

    it("should post update a teams by its name or pass", async () => {
        const response = await request(app).post("/teams/2").send({
            name: "Name",
            password: "secret"
        });
        expect(response.body.message).toBe("Success");
    })

    it("should delete a teams by its id", async () => {
        const response = await request(app).delete("/teams/6")
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
})