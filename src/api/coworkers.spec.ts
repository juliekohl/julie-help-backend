import request from 'supertest';
import app from 'app';

describe("coworkers", () => {
    it('sanity test', () => {
        expect(true).toBe(true);
    })

    it("should respond with a 200 status code", async () => {
        const response = await request(app).get("/coworkers");
        expect(response.statusCode).toBe(200);
    })

    it("should get a coworkers by its email and name", async () => {
        const response = await request(app).get("/coworkers/1");
        expect(response.body).toStrictEqual({
            email: "Sedrick.Johnston@gmail.com",
            name: "Kristine Moore"
        });
    })

    it("should post create a coworkers by its name, email and pass", async () => {
        const response = await request(app).post("/coworkers").send({
            coworking_id: 6,
            name: "Name8",
            email: "email-test8@email.com",
            password: "secret"
        });
        expect(response.body.message).toBe("Success");
    })

    it("should post update a coworkers by its name or pass", async () => {
        const response = await request(app).post("/coworkers/2").send({
            name: "Name",
            password: "secret"
        });
        expect(response.body.message).toBe("Success");
    })

    it("should delete a coworkers by its id", async () => {
        const response = await request(app).delete("/coworkers/6")
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
})