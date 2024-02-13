import request from "supertest";
import app from "./index.routes";

describe("Users routes tests", () => {
  
  it("should return all data with pagination configuration", async () => {

    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("page");
    expect(response.body.data).toHaveProperty("limit");
    expect(response.body.data).toHaveProperty("total");
    expect(response.body.data).toHaveProperty("totalPages");
    expect(response.body.data).toHaveProperty("users");
  });

  it("should return data by query filter - search only one", async () => {

    const response = await request(app).get("/?q=Rosene2");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("users");
    expect(response.body.data.users.length).toBe(1);

  });

  it("should return empty data by query filter - search non existent data", async () => {

    const response = await request(app).get("/?q=ThisIsNotAUser");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("users");
    expect(response.body.data.users.length).toBe(0);

  });

});