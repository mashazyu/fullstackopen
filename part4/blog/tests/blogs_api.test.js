const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "title",
    author: "famous author",
    url: "http://website1.com",
    likes: 2,
    id: "66fa8dfbe75e597b07c68a29",
  },
  {
    title: "longer title",
    author: "very famous author",
    url: "http://website2.com",
    likes: 22,
    id: "66fa9246fbc8a71ff5ff5f4d",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blog posts", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 2);
});

test("the first blog has correct properties", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map((e) => e.content);

  assert.strictEqual(contents.includes("HTML is easy"), true);
});

after(async () => {
  await mongoose.connection.close();
});
