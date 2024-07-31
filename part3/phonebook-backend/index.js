require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const Person = require("./models/person");

const app = express();

app.use(cors());
// serve static frontend content
app.use(express.static("dist"));
app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (request, response) => {
  response.send("<h1>Server is up and running</h1>");
});

app.get("/api/info", (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      const dateTime = new Date().toString();
      let info = `<p>Phonebook has info for ${count} people</p>
    <p>${dateTime}</p>`;

      response.send(info);
    })
    .catch((error) => next(error));
});

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((data) => {
      response.json(data);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body || !body.number || !body.name) {
    next({ message: "necessary data is missing" });
    return response.status(400).json({
      error: "necessary data is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  if (id) {
    Person.findById(id)
      .then((data) => {
        if (data) {
          response.json(data);
        } else {
          response.status(404).end();
        }
      })
      .catch((error) => next(error));
  } else {
    response.status(404).send({ error: "malformatted id" });
  }
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  if (!body) {
    next({ message: "no info provided" });
    response.status(400).end();
  }

  const personObject = {
    name: body.name,
    number: body.number,
  };

  if (id) {
    Person.findByIdAndUpdate(id, personObject, {
      new: true,
      runValidators: true,
    })
      .then((data) => {
        response.json({ ...personObject, id: id });
      })
      .catch((error) => next(error));
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  if (id) {
    Person.findOneAndDelete(id)
      .then((data) => {
        response.json(data);
      })
      .catch((error) => next(error));
  } else {
    response.status(404).end();
  }
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
