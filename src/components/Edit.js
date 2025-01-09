// Filename - Edit.js
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Edit() {
    // Here usestate has been used in order
    // to set and get values from the jsx
    const [name, setname] = useState("");
    const [age, setage] = useState("");
    const [id, setid] = useState("");
    const [birthdate, setbirthdate] = useState(new Date());
    const [email, setemail] = useState("");

    // Used for navigation with logic in javascript
    let history = useNavigate();

    // Getting an index of an entry with an id
    let index = array
        .map(function (e) {
            return e.id;
        })
        .indexOf(id);

    // Function for handling the edit and
    // pushing changes of editing/updating
    const handelSubmit = (e) => {
        // Preventing from reload
        e.preventDefault();
        if (name == "" || age == "") {
            alert("invalid input");
            return;
        }

        // Getting an index of an array
        let a = array[index];

        // Putting the value from the input
        // textfield and replacing it from
        // existing for updation
        a.Name = name;
        a.Age = age;
        a.Birthdate =birthdate;
        a.Email =email;

        // Redirecting to main page
        history("/");
    };

    const  handleChange_age = (e) => {
        console.log("DOB:", e.target.value);
        let d =e.target.value; 
        setbirthdate(d);
        d = calculate_age(d);
         console.log(d);
         //array.push({ Cage: d });
         setage(d);
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

    // Useeffect take care that page will
    // be rendered only once
    useEffect(() => {
        setname(localStorage.getItem("Name"));
        setage(localStorage.getItem("Age"));
        setid(localStorage.getItem("id"));
        setbirthdate(localStorage.getItem("Birthdate"));
        const storedDate = localStorage.getItem("Birthdate"); // Example: "11-10-2002"
        if (storedDate) {
            // Parse to YYYY-MM-DD format
            const [day, month, year] = storedDate.split("-"); // Change order based on your format
            const formattedDate = `${year}-${month}-${day}`; // YYYY-MM-DD format
            setbirthdate(formattedDate);
        } 
        setemail(localStorage.getItem("Email"));
    }, []);

    return (
         <div className="col-md-12">
            <Form className="d-grid gap-2" style={{ margin: "5rem 20rem" }}  >
                {/* setting a name from the 
                    input textfiled */}
                <Form.Group
                    className="mb-3"
                    controlId="formBasicEmail"
                >
                    <Form.Control
                        value={name}
                        onChange={(e) =>
                            setname(e.target.value)
                        }
                        type="text"
                        placeholder="Enter Name"
                    />
                </Form.Group>

                 
                
                {/* setting date  in date field*/}
                <Form.Group  className="mb-3" controlId="formBirthDate" >
                    <Form.Control
                        value={birthdate}
                        onChange={handleChange_age}
                        type="date"
                        placeholder="Birth Date" 
                        dateFormat="dd-MM-yyyy"
                    />
                </Form.Group>

                
                {/* Fetching a value from input textfirld in a setage using usestate*/}
                <Form.Group   className="mb-3" controlId="formCalAge" >
                    <Form.Control  value={age}  type="number"  placeholder="Cal Age" disabled />
                </Form.Group>

                {/* setting a age from the input textfiled */}
                <Form.Group
                    className="mb-3"
                    controlId="formEmail"
                >
                    <Form.Control
                        value={email}
                        onChange={(e) =>
                            setemail(e.target.value)
                        }
                        type="email"
                        placeholder="Email"
                    />
                </Form.Group>

                

                {/* Hadinling an onclick event 
                    running an edit logic */}
                <Button
                    onClick={(e) => handelSubmit(e)}
                    variant="primary"
                    type="submit"
                    size="lg"
                >
                    Update
                </Button>

                {/* Redirecting to main page after editing */}
                <Link className="d-grid gap-2" to="/">
                    <Button variant="warning" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Edit;