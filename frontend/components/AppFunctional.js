import axios from "axios";
import React, { useEffect, useState } from "react";

const dizi = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function AppFunctional(props) {
  const kok = Math.sqrt(dizi.length);
  const [click, setClick] = useState(4);
  const [sayac, setSayac] = useState(-1);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  let x = Math.floor(click / kok) + 1;
  let y = click < kok ? click + 1 : click + 1 - kok * (x - 1);

  useEffect(() => {
    setSayac(sayac === -1 ? 0 : sayac + 1);
  }, [click]);
  //console.log(x, y);
  console.log(sayac);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      x: x,
      y: y,
      steps: sayac,
      email: email,
    });

    const config = {
      method: "post",
      url: "http://localhost:9000/api/result",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setMessage(JSON.stringify(response.data.message));
      })
      .catch(function (error) {
        console.log(error);
      });
    setEmail("");
    setMessage("");
  };

  console.log(email);

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Koordinatlar ({x},{y})
        </h3>
        <h3 id="steps">{sayac} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {dizi.map((idx) => (
          <div key={idx} className={`square${idx === click ? " active" : ""}`}>
            {idx === click ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button
          onClick={() => (
            setClick(click - 1 < 0 ? click : click - 1), setMessage("")
          )}
          id="left"
        >
          SOL
        </button>
        <button
          onClick={() => (
            setClick(click - kok > -1 ? click - kok : click), setMessage("")
          )}
          id="up"
        >
          YUKARI
        </button>
        <button
          onClick={() => (
            setClick(click + 1 > dizi.length - 1 ? click : click + 1),
            setMessage("")
          )}
          id="right"
        >
          SAĞ
        </button>
        <button
          onClick={() => (
            setClick(click + kok < dizi.length ? click + kok : click),
            setMessage("")
          )}
          id="down"
        >
          AŞAĞI
        </button>
        <button
          onClick={() => {
            setClick(4);
            setSayac(sayac !== 0 ? -1 : 0);
            setMessage("");
          }}
          id="reset"
        >
          reset
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={email}
          id="email"
          type="email"
          placeholder="email girin"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
