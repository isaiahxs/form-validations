import { useEffect, useState } from "react";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [comments, setComments] = useState("");
  //we don't want to display any errors until a user tries to submit the form
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  //old WIP
  // useEffect(() => {
  //   const errors = {};
  //   if (!name.length) errors["name"] = "Please enter your Name";
  //   if (!email.includes("@")) {
  //     errors["email"] = "Please provide a valid Email";
  //   }
  //   setValidationErrors(errors);
  // }, [name, email, hasSubmitted]);

  useEffect(() => {
    const errors = {};
    if (!name.length) errors["name"] = "Please enter your Name";
    if (!email.includes("@")) errors["email"] = "Please provide a valid Email";
    setValidationErrors(errors);
  }, [name, email, hasSubmitted]);

  const onSubmit = (e) => {
    // Prevent the default form behavior so the page doesn't reload.
    e.preventDefault();

    setHasSubmitted(true);
    if (Object.values(validationErrors).length) return alert("Cannot Submit");

    // Create a new object for the contact us information.
    const contactUsInformation = {
      name,
      email,
      phone,
      phoneType,
      comments,
      submittedOn: new Date()
    };

    // Ideally, we'd persist this information to a database using a RESTful API.
    // For now, though, just log the contact us information to the console.
    console.log(contactUsInformation);

    // Reset the form state.
    setName("");
    setEmail("");
    setPhone("");
    setPhoneType("");
    setComments("");
    setValidationErrors({});
    setHasSubmitted(false);
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {validationErrors.name && (
            <div className="error">* {validationErrors.name}</div>
          )}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* render div.error with field's error extracted from validationErrors object */}
        {validationErrors.email && (
          <div className="error">* {validationErrors.email}</div>
        )}

        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <select
            name="phoneType"
            onChange={(e) => setPhoneType(e.target.value)}
            value={phoneType}
          >
            <option value="" disabled>
              Select a phone type...
            </option>
            <option>Home</option>
            <option>Work</option>
            <option>Mobile</option>
          </select>
        </div>
        <div>
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            name="comments"
            onChange={(e) => setComments(e.target.value)}
            value={comments}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ContactUs;
