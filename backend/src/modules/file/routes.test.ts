import request from "supertest";
import app from "./index.routes";

describe("File route tests", () => {
  const csvContent =
    "name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball";
  const csvBlob = new Blob([csvContent], { type: 'text/csv' });
  
  
  it("Should create many users in database", async () => {
    const csvBuffer = Buffer.from(await csvBlob.arrayBuffer());
    
    const response = await request(app)
      .post("/")
      .attach("file", csvBuffer, 'test.csv');


    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it("no file - should return error", async () => {
    const response = await request(app).post("/");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message");
  });

  it("invalid file - should return error", async () => {
    const textBlob = new Blob(["fake csv"], { type: 'text/txt' });
  const textBuffer = Buffer.from(await textBlob.arrayBuffer());

    const response = await request(app).post("/").attach("file", textBuffer, 'test.txt');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message");
  });
});
