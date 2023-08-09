import { useState } from "react";
import Nav from "../components/Nav";
import Dropdown from "../components/dropdown";
import ReactDatePicker from "../components/datepicker";
import PlusMinus from "../components/plusminus";
import { useCookies } from 'react-cookie'
import FileUpload from "../components/fileuploader";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Assignment = () => {

  const handleDate = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      "date": date
    }))
    return date;
  }

  const handleBranch = (branch) => {
    setFormData((prevState) => ({
      ...prevState,
      "branch": branch
    }))
    return branch;
  }

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [formData, setFormData] = useState({
    user_id: cookies.userId,
    full_name: '',
    type: '',
    date: { handleDate },
    pages: '1',
    topic: '',
    details: '',
    file: '',
    email: ''
  })

  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8000/user', { formData })
      const success = response.status === 200
      if (success) navigate('/thankyou')
    } catch (err) {
      console.log(err)
    }
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
        authToken={true}
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
                required
                value={formData.full_name}
                onChange={handleChange}
              />
              <label htmlFor="branch">Branch</label>
              <Dropdown
                id="branch"
                type="text"
                name="branch"
                placeholder=""
                required
                value={formData.full_name}
                handleBranch={handleBranch}
              />
              <label htmlFor="number">Phone Number</label>
              <input
                id="number"
                type="tel"
                name="number"
                placeholder="Phone number"
                required
                pattern="[0-9]{10}"
                value={formData.number}
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
            </section>
            <section className="section2">
              <label htmlFor="Topic">Topic</label>
              <input id="topic" name="topic" required="true" placeholder="Main idea" type="text" onChange={handleChange} value={formData.topic} />
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