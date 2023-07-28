import { useState } from "react";
import Nav from "../components/Nav";
import ReactDatePicker from "../components/datepicker";
import PlusMinus from "../components/plusminus";
import FileUpload from "../components/fileuploader";


const Assignment = () => {

  const handleDate = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      "date": date
    }))
    return date;
  }
  const [formData, setFormData] = useState({
    user_id: '',
    full_name: '',
    type: '',
    date: { handleDate },
    pages: '1',
    topic: '',
    details: '',
    file: '',
    email: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
  }


  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))

  }
  console.log(formData)



  return (
    <>
      <Nav
        minimal={true}
        setShowModal={() => { }}
        showModal={false} />
      <div className="assignment">
        <div className="top-description"><h1>Get Your Assignments Done!</h1>
          <p>Tell us about your assignment details and our experts will get back to you in no time.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="main-block">
            <section className="section1">
              <label htmlFor="name">Name</label>
              <input
                id="full_name"
                type="text"
                name="full_name"
                placeholder="Name"
                required="true"
                value={formData.full_name}
                onChange={handleChange}
              />
              <label htmlFor="order-type">Assignment Type</label>
              <div className="btn-group">
                <input type="radio" name="type" id="writing" value="writing" onChange={handleChange} />
                <label id="writing-label" for="writing">Writing</label>
                <input type="radio" name="type" id="ppt" value="ppt" onChange={handleChange} />
                <label id="ppt-label" for="ppt">PPT</label>
              </div>

              <ReactDatePicker handleDate={handleDate} />
              <label htmlFor="pages">Pages</label>
              <div className="page-container">
                <PlusMinus type={formData.type} handleChange={handleChange} />
              </div>
              <label htmlFor="Topic">Topic</label>
              <input id="topic" name="topic" required="true" placeholder="Main idea" type="text" onChange={handleChange} value={formData.topic} />
            </section>
            <section className="section2">
              <label htmlFor="detailed-instruction">Detailed Instructions</label>
              <textarea required="true" type="text" id="details" name="details" placeholder="Requirements like writing style, references, structure etc" value={formData.details} onChange={handleChange} />
            </section>
            <section className="section3">
              {/* <label htmlFor="attatchment">Attach A File</label> */}
              {/* <input type="url" name="url" id="url" onChange={handleChange} required="true" value={formData.url} /> */}
              <FileUpload />
              <button className="primary-button">Get a Quote!</button>
            </section>
          </div>
        </form>

      </div>
    </>
  );
}

export default Assignment;