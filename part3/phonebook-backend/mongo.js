const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const databaseName = "phone_book";
const userName = "mariyaz";
const appName = "Cluster0";
const url = `mongodb+srv://${userName}:${password}@cluster0.tnbvg6w.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=${appName}`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 5) {
  console.log("phonebook:");

  Person.find({})
    .then((result) => {
      result.forEach(({ name, number }) => {
        console.log(`${name} ${number}`);
      });
      mongoose.connection.close();
    })
    .catch((error) => console.log(error));
} else {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({ name, number });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);

    mongoose.connection.close();
  });
}
