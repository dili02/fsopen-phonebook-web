import React from "react";

const Persons = ({ personsList, deletePerson }) => {
  return (
    <div>
      {personsList.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>DELTE</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
