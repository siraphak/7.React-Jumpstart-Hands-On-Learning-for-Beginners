import "@picocss/pico";
import PropTypes from "prop-types";
import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import "dayjs/locale/th";
import dayjs from "dayjs";
import bhuddishtEra from "dayjs/plugin/buddhistEra";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.locale("th");
dayjs.extend(localizedFormat);
dayjs.extend(bhuddishtEra);

// /**
//  *
//  * @type {React.FC<{name : string} >}
//  * @returns {React.ReactNode}
//  */

const SelfIntroduction = ({ name = "unknown", dateOfBirth, hobbies = [] }) => {
  return (
    <div>
      <h1>
        "My name is <span style={{ color: "tomato" }}>{name}</span>."
      </h1>
      {dateOfBirth ? (
        <h2>I was born in {dayjs(dateOfBirth).format("D MMM BBBB")}</h2>
      ) : null}
      {hobbies.length > 0 ? (
        <div>
          <h2>My hobbies are :</h2>
          {hobbies.map((item, index) => (
            <div key={item}>
              {index + 1}. {item}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

// SelfIntroduction.propTypes = {
//   name: PropTypes.string.isRequired,
// };

function App() {
  const [data, setData] = useState({ name: undefined, dob: undefined });
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [hobbies, setHobbies] = useState([""]);
  return (
    <div className="App">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr 48px",
          gap: "0.5rem",
        }}
      >
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          style={{ gridColumn: "span 2" }}
        />
        <label htmlFor="dob">Date of Birth:</label>
        <input
          id="dob"
          value={dob}
          type="date"
          onChange={(event) => {
            setDob(event.target.value);
          }}
          style={{ gridColumn: "span 2" }}
        />

        {hobbies.map((item, index) => (
          <div key={index} style={{ display: "contents" }}>
            <label htmlFor={`hobby-${index}`}>Hobby {index + 1}:</label>
            <input
              id={`hobby-${index}`}
              value={item}
              onChange={(event) => {
                const newValue = event.target.value;
                const newHobbies = hobbies.map((hobby, hobbyIndex) =>
                  hobbyIndex === index ? newValue : hobby
                );

                setHobbies(newHobbies);
              }}
            />
            <button
              onClick={() => {
                setHobbies(
                  hobbies.filter((hobby, hobbyIndex) => hobbyIndex !== index)
                );
              }}
            >
              -
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            setHobbies([...hobbies, ""]);
          }}
          style={{ gridColumn: "2", width: "max-content" }}
        >
          Add another hobby
        </button>

        <button
          onClick={() => {
            setData({ name, dob });
            setName("");
            setDob("");
          }}
          style={{ gridColumn: "1/ span 3", backgroundColor: "limegreen" }}
        >
          Save
        </button>
      </div>
      <SelfIntroduction
        name={data.name}
        dateOfBirth={data.dob}
        hobbies={["Game", "Movie", "Music"]}
      />
    </div>
  );
}

export default App;
