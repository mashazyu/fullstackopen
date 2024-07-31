require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
// serve static frontend content
app.use(express.static("dist"));

app.use(cors());
app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (request, response) => {
  response.send("<h1>Server is up and running</h1>");
});

app.get("/api/info", (request, response) => {
  const dateTime = new Date().toString();
  let info = `<p>Phonebook has info for ${Person.length} people</p>
    <p>${dateTime}</p>`;

  response.send(info);
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((data) => {
    response.json(data);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (!body.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "phone number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((data) => {
    response.json(data);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  if (id) {
    Person.findById(id)
      .exec()
      .then((data) => {
        response.json(data);
      });
  } else {
    response.status(404).end();
  }
});

app.put("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const body = request.body;

  if (!body) {
    response.status(400).end();
  }

  const personObject = {
    name: body.name,
    number: body.number,
  };

  if (id) {
    Person.findByIdAndUpdate(id, personObject)
      .exec()
      .then((data) => {
        console.log("// {} ", { ...personObject, _id: id });
        response.json({ ...personObject, id: id });
      });
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  if (id) {
    Person.findOneAndDelete({ _id: id })
      .exec()
      .then((data) => {
        response.json(data);
      });
  } else {
    response.status(404).end();
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
