import "./App.css";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [emailList, setEmailList] = useState([]);
  const [email, setEmail] = useState("");
  const [editValue, setEditValue] = useState("");
  const mainInputRef = useRef();

  const validateEmail = (emailToValidate) => {
    // red border around invalid/duplicate emails - can be used to render error message
    const isValid = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(emailToValidate);
    const isDuplicate = emailList.includes(emailToValidate);

    return { isValid, isDuplicate };
  };

  const addEmailToList = () => {
    if (email === "") {
      return;
    }
    const validationDetails = validateEmail(email);
    setEmailList([
      ...emailList,
      { id: uuidv4(), email, ...validationDetails, editActive: false },
    ]);
    setEmail("");
    mainInputRef.current.focus();
  };

  const updateEmail = (updateId) => {
    setEmailList(
      emailList.map((e) => {
        if (e.id === updateId) {
          const validationDetails = validateEmail(editValue);
          return {
            ...e,
            email: editValue,
            ...validationDetails,
            editActive: false,
          };
        }

        return e;
      })
    );
    setEditValue("");
    mainInputRef.current.focus();
  };

  const renderChip = (emailDetail) => {
    if (emailDetail.editActive) {
      return (
        <input
          autoFocus
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (["Enter"].includes(e.key)) {
              e.preventDefault();
              updateEmail(emailDetail.id);
            }
          }}
        />
      );
    }

    return (
      <div
        style={{
          border: `1px solid ${
            !emailDetail.isValid || emailDetail.isDuplicate ? "red" : "grey"
          }`,
          borderRadius: "4px",
          padding: "2px 4px",
          marginRight: "4px",
        }}
      >
        <span
          onClick={() =>
            setEmailList(
              emailList.map((e) => {
                if (e.id === emailDetail.id) {
                  return { ...e, editActive: true };
                }
                return e;
              })
            )
          }
        >
          {emailDetail.email}
        </span>
        <button
          style={{ marginLeft: "4px", cursor: "pointer" }}
          onClick={() =>
            setEmailList(emailList.filter((e) => e.id !== emailDetail.id))
          }
        >
          X
        </button>
      </div>
    );
  };

  return (
    <div className="App">
      <div
        style={{
          border: "1px solid grey",
          padding: "10px",
          width: "500px",
          height: "auto",
          display: "flex",
          flexWrap: "wrap",
          borderRadius: "8px",
          margin: "50px auto",
          rowGap: "8px",
        }}
      >
        {emailList.map((emailDetail) => renderChip(emailDetail))}
        <input
          style={{ border: "none", outline: "none", flex: 1 }}
          ref={mainInputRef}
          type="email"
          value={email}
          onChange={(e) => {
            if (![" ", ","].includes(e.key)) {
              setEmail(e.target.value);
            }
          }}
          onKeyUp={(e) => {
            if ([" ", ","].includes(e.key)) {
              return;
            }
          }}
          onKeyDown={(e) => {
            if ([" ", ","].includes(e.key)) {
              e.preventDefault();
              addEmailToList();
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
