// Filename - components/Create.js

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function Create() {
    // Making usestate for setting and
    // fetching a value in jsx
    const [name, setname] = useState("");
    const [age, setage] = useState("");
    const [birthdate, setbirthdate] = useState("");
    const [cage, setcalAge] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    // Using useNavigation for redirecting to pages
    let history = useNavigate();

    // Function for creating a post/entry
    const handelSubmit = (e) => {
        e.preventDefault(); // Prevent reload

        const ids = uuid(); // Creating unique id
        let uni = ids.slice(0, 8); // Slicing unique id

        // Fetching a value from usestate and
        // pushing to javascript object
        let a = name,
            b = age,
            c=birthdate,
            d=cage,
            em=email;
        if (name == "" || cage == "" || birthdate == "") {
            alert("Please complete all the details!!");
            return;
        }
        c = formatDate(c);
        array.push({ id: uni, Name: a, Age: d, Birthdate:c, Email:em });

        // Redirecting to home page after creation done
        history("/");
    };

    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        let newDate = `${day}-${month}-${year}`;
        return newDate;
      };

    const  handleChange_age = (e) => {
        console.log("DOB:", e.target.value);
        let d =e.target.value; 
        setbirthdate(d);
        d = calculate_age(d);
         console.log(d);
         //array.push({ Cage: d });
         setcalAge(d);
      }
 
      const calculate_age = (dob1) => {
        var today = new Date();
        var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age_now--;
        }
        console.log(age_now);
        return age_now;
      }

      const handleEmailChange = (e) => {
        const enteredEmail = e.target.value;
        setEmail(enteredEmail);

        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(enteredEmail)) {
            setEmailError("Invalid email format");
        } else {
            setEmailError(""); // Clear error if valid
        }
      };

    return (
         
        <div className="col-md-12">
            <Form className="d-grid gap-2" style={{ margin: "5rem 20rem" }} >
                {/* Fetching a value from input textfirld  in a setname using usestate*/}
                <Form.Group  className="mb-3" controlId="formBasicName" >
                    <Form.Control
                        onChange={(e) =>
                            setname(e.target.value)
                        }
                        type="text"
                        placeholder="Enter Name"
                        required
                    />
                </Form.Group>

                {/* Fetching a value from input textfirld in a setage using usestate
                <Form.Group className="mb-3" controlId="formBasicAge" >
                    <Form.Control
                        onChange={(e) =>
                            setage(e.target.value)
                        }
                        type="number"
                        placeholder="Age"
                        required
                    />
                </Form.Group>*/}

                {/* Fetching a value from input textfirld in a setage using usestate*/}
                <Form.Group className="mb-3" controlId="formBirthDate"
                >
                    <Form.Control
                        onChange={handleChange_age}
                        value={birthdate}
                        type="date"
                        placeholder="Birth Date"
                        required
                    />
                </Form.Group>
 
                {/* Fetching a value from input textfirld in a setage using usestate*/}
                <Form.Group   className="mb-3" controlId="formCalAge" >
                    <Form.Control  value={cage}  type="number"  placeholder="Cal Age" disabled />
                </Form.Group>

                <Form.Group   className="mb-3" controlId="formCalAge" >
                <Form.Control 
                    value={email}
                    onChange={handleEmailChange} fontSize="13px" 
                    placeholder="example@gmail.com" bgColor="white" id='email' type='email' required />
                    {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                </Form.Group>
                <p>
          <strong>Email:</strong> {email || "Not provided yet"}
        </p>
                {/* handing a onclick event in button for firing a function */}
                <Button
                    onClick={(e) => handelSubmit(e)}
                    variant="primary"
                    type="submit"
                >
                    Submit
                </Button>

                {/* Redirecting back to home page */}
                <Link className="d-grid gap-2" to="/">
                    <Button variant="info" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Create;