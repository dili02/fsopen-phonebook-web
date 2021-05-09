import React, { useState, useEffect } from "react";

import personService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonsList";
import Notification from "./components/Notification";

const App = () => {
  const notificationState = {
    classNotification: "",
    message: "",
  };

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [searchTerm, setsearchTerm] = useState("");
  const [notification, setNotification] = useState(notificationState);

  // [✔️] --- GET ALL PERSONS --- //
  useEffect(() => {
    personService.getAll().then((intitialPersons) => {
      setPersons(intitialPersons);
    });
  }, []);

  // [✔️] --- ADD PERSON --- //
  const addPerson = (newPerson) => {
    personService.create(newPerson).then((createdPerson) => {
      setPersons(persons.concat(createdPerson));
      setNewName("");
      setNewNumber("");
      setNotification({
        classNotification: "success",
        message: `Added ${createdPerson.name}`,
      });
      setTimeout(() => {
        setNotification(notificationState);
      }, 2000);
    });
  };

  // [✔️] --- DELETE PERSON --- //
  const deletePerson = (id) => {
    const searchPerson = persons.find((person) => person.id === id);

    if (searchPerson) {
      if (window.confirm(`DELETE ${searchPerson.name} ?`)) {
        personService
          .deletePerson(searchPerson.id)
          .then((person) => {
            setPersons(
              persons.filter((person) => person.id !== searchPerson.id)
            );
            setNotification({
              classNotification: "success",
              message: `Removed ${searchPerson.name} from the server`,
            });
            setTimeout(() => {
              setNotification(notificationState);
            }, 2000);
          })
          .catch((error) =>
            alert(`Could not delete the person ${searchPerson.name}`)
          );
      }
    }
  };

  // [✔️] --- UPDATE PERSON --- //
  const updatePerson = (id, person) => {
    if (
      window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one`
      )
    ) {
      personService
        .update(id, person)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) => (person.id !== id ? person : updatedPerson))
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setNotification({
            classNotification: "error",
            message: `Information of ${person.name} has already been removed from server`,
          });
          setTimeout(() => {
            setNotification(notificationState);
          }, 2000);
        });
    } else {
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleSearchChange = (event) => {
    setsearchTerm(event.target.value.toLocaleLowerCase());
    setShowAll(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
    };

    const searchPerson = persons.find((person) => person.name === newName);

    if (!searchPerson) {
      addPerson(person);
    } else {
      updatePerson(searchPerson.id, person);
    }
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLocaleLowerCase().includes(searchTerm)
      );

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter handleSearchChange={handleSearchChange} />

      <Notification notification={notification} />

      <h2>Add a new</h2>

      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>

      <PersonList personsList={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
