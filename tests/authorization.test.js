const request = require("supertest");
const app = require("../app");

let adminToken;
let userToken;

beforeAll(async () => {
    const admin = await request(app)
        .post("/login")
        .send({ username: "admin", password: "admin123" });

    adminToken = admin.body.token;

    const user = await request(app)
        .post("/login")
        .send({ username: "user", password: "user123" });

    userToken = user.body.token;
});

describe("Unit Testing Authorization", () => {

    test("Admin boleh mengakses route admin", async () => {
        const res = await request(app)
        .get("/protected/admin")
        .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Welcome Admin");
    });

    test("User biasa ditolak mengakses route admin", async () => {
        const res = await request(app)
        .get("/protected/admin")
        .set("Authorization", `Bearer ${userToken}`);

        expect(res.statusCode).toBe(403);
    });

    test("Akses ditolak jika token tidak ada", async () => {
        const res = await request(app)
        .get("/protected/admin");

        expect(res.statusCode).toBe(403);
    });

});
