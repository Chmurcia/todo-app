import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

describe("API Task Tests", () => {
  let token: string;

  before(async () => {
    const response = await request(app)
      .post("/api/v1/user/login")
      .send({ email: "uwuboi@gmail.com", password: "uwu" });

    token = response.body.token;
  });

  it("should return all tasks by user id", (done) => {
    request(app)
      .get("/api/v1/user/2/task")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body.tasks).to.be.an("array");
        done();
      });
  });

  it("should return task by task id", (done) => {
    request(app)
      .get("/api/v1/user/2/task/15")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);
        expect(res.body.task.title).to.equal("ReplacedTitle");

        done();
      });
  });

  it("should post task and have given properties", (done) => {
    const newTask = {
      title: "TestTitle",
      description: "TestDescription",
      status: "TO_DO",
      priority: "HIGH",
      dueDate: "2026-12-31T00:00:00.000Z",
    };
    request(app)
      .post("/api/v1/user/2/task")
      .set("Authorization", `Bearer ${token}`)
      .send(newTask)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(201);
        expect(res.body).to.be.an("object");
        expect(res.body.task).to.have.property("id");
        expect(res.body.task).to.have.property("title");
        expect(res.body.task.title).to.equal(newTask.title);
        expect(res.body.task).to.have.property("description");
        expect(res.body.task.description).to.equal(newTask.description);
        expect(res.body.task).to.have.property("status");
        expect(res.body.task.status).to.equal(newTask.status);
        expect(res.body.task).to.have.property("priority");
        expect(res.body.task.priority).to.equal(newTask.priority);
        expect(res.body.task).to.have.property("userId");

        done();
      });
  });

  it("should replace the task", (done) => {
    const replacedTask = {
      title: "ReplacedTitle",
      description: "ReplacedDescription",
      status: "IN_PROGRESS",
      priority: "ASAP",
      dueDate: "2026-12-31T00:00:00.000Z",
    };
    request(app)
      .put("/api/v1/user/2/task/15")
      .set("Authorization", `Bearer ${token}`)
      .send(replacedTask)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);
        expect(res.body.replacedTask).to.be.an("object");
        expect(res.body.replacedTask).to.have.property("title");
        expect(res.body.replacedTask.title).to.equal(replacedTask.title);
        expect(res.body.replacedTask).to.have.property("title");
        expect(res.body.replacedTask.description).to.equal(
          replacedTask.description
        );
        expect(res.body.replacedTask).to.have.property("status");
        expect(res.body.replacedTask.status).to.equal(replacedTask.status);
        expect(res.body.replacedTask).to.have.property("priority");
        expect(res.body.replacedTask.priority).to.equal(replacedTask.priority);
        expect(res.body.replacedTask).to.have.property("updatedBy");
        expect(res.body.replacedTask.updatedBy).to.equal(2);
        done();
      });
  });

  // it("should delete a task", async function() {
  //   const res = await request(app)
  //     .delete("/api/v1/user/2/task/18")
  //     .set("Authorization", `Bearer ${token}`);

  //   expect(res.status).to.equal(200);

  //   const checkResponse = await request(app)
  //     .get("/api/v1/user/2/task/18")
  //     .set("Authorization", `Bearer ${token}`);

  //   expect(checkResponse.status).to.equal(404);
  // });

  it("should not get a task that does not exist", (done) => {
    request(app)
      .get("/api/v1/user/2/task/12312")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(404);

        done();
      });
  });

  it("should not receive task that does not own", (done) => {
    request(app)
      .get("/api/v1/user/1/task/23")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(403);
        done();
      });
  });
});
