const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

let data = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => Math.floor(Math.random() * 1000);
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
  let info = `<p>Phonebook has info for ${data.length} people</p>
    <p>${dateTime}</p>`;

  response.send(info);
});

app.get("/api/persons", (request, response) => {
  response.json(data);
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

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  data = data.concat(person);
  response.json(person);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = data.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = data.find((person) => person.id === id);
  console.log("// id ", id);
  console.log("// person ", person);
  console.log("// data ", data);
  if (person) {
    persons = data.filter((person) => person.id !== id);

    response.status(200).json(person);
  } else {
    response.status(404).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
