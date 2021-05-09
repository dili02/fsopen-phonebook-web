import React from "react";

const Persons = ({ personsList }) => {
  return (
    <div>
      {personsList.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
