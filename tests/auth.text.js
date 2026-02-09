const request = require("supertest");
const app = require("../app");

describe("Unit Testing Authentication", () => {

    test("Login berhasil dan menghasilkan JWT", async () => {
        const res = await request(app)
        .post("/login")
        .send({
            username: "admin",
            password: "admin123"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });

    test("Login gagal jika username/password salah", async () => {
        const res = await request(app)
        .post("/login")
        .send({
            username: "admin",
            password: "salah"
        });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe("Invalid credentials");
    });

});
