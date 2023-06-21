

import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import applogo from "../../assets/applogo.jpg";
import styles from "./styles.module.css";

function Main() {

  	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
  const [employeeList, setEmployeeList] = useState([]);
 

  const [formData, setFormData] = useState({
    _id: "",
    busnum: "",
    route: "",
    stime: "",
    etime: "",
    price: "",
    delays: "",
  });
  const [routeOptions, setRouteOptions] = useState([]);

  useEffect(() => {
    loadEmployees();
    loadRouteOptions();
  }, []);

  async function loadEmployees() {
    try {
      const response = await axios.get("http://localhost:1337/user/getAll");
      setEmployeeList(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadRouteOptions() {
    try {
      const response = await axios.get("http://localhost:1337/routes");
      setRouteOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function saveEmployee(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:1337/user/create", {
        busnum: formData.busnum,
        route: formData.route,
        stime: formData.stime,
        etime: formData.etime,
        price: formData.price,
        delays: formData.delays,
      });
      alert("Employee Registration Successful");
      resetForm();
      loadEmployees();
    } catch (error) {
      console.error(error);
      alert("Employee Registration Failed");
    }
  }

  async function editEmployee(employee) {
    setFormData({
      _id: employee._id,
      busnum: employee.busnum,
      route: employee.route,
      stime: employee.stime,
      etime: employee.etime,
      price: employee.price,
      delays: employee.delays,
    });
  }

  async function updateEmployee(event) {
    event.preventDefault();
    try {
      await axios.patch(
        `http://localhost:1337/user/update/${formData._id}`,
        {
          busnum: formData.busnum,
          route: formData.route,
          stime: formData.stime,
          etime: formData.etime,
          price: formData.price,
          delays: formData.delays,
        }
      );
      alert("Employee Updated Successfully");
      resetForm();
      loadEmployees();
    } catch (error) {
      console.error(error);
      alert("Failed to update Employee");
    }
  }

  async function deleteEmployee(employeeId) {
    try {
      await axios.delete(`http://localhost:1337/user/delete/${employeeId}`);
      alert("Employee deleted successfully");
      loadEmployees();
    } catch (error) {
      console.error(error);
    }
  }

  function resetForm() {
    setFormData({
      _id: "",
      busnum: "",
      route: "",
      stime: "",
      etime: "",
      price: "",
      delays: "",
    });
  }

  return (
    <div>
      <div className={styles.main_container}></div>
      <nav className={styles.navbar}>
        <h1>Authorities Shedule Update</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <br />
      <h1 className="font-weight-bold">
        <center>Update Bus Schedule</center>
      </h1>
      <center>
        <img
          src={applogo}
          alt="applogo"
          className="img-fluid position-absolute"
          style={{ maxWidth: "100px", top: "23%", left: "45%" }}
        />
      </center>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="_id"
              hidden
              value={formData._id}
              onChange={(event) =>
                setFormData({ ...formData, _id: event.target.value })
              }
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <label htmlFor="busnum">Enter Bus Number</label>
            <input
              type="text"
              className="form-control"
              id="busnum"
              value={formData.busnum}
              onChange={(event) =>
                setFormData({ ...formData, busnum: event.target.value })
              }
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="route">Select Bus Route</label>
            <select
              className="form-control"
              id="route"
              value={formData.route}
              onChange={(event) =>
                setFormData({ ...formData, route: event.target.value })
              }
            >
              <option value="">Select Route</option>
              <option value="Kadawatha-Moratuwa">Kadawatha-Moratuwa</option>
              <option value="Moratuwa-Kadawatha">Moratuwa-Kadawatha</option>
              {routeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

            <div className="form-group">
            <label htmlFor="stime">Destination Start Time</label>
            <select
              className="form-control"
              id="stime"
              value={formData.stime}
              onChange={(event) =>
                setFormData({ ...formData, stime: event.target.value })
              }
            >
              <option value="">Select Time</option>

              <option value="4.00 a.m">4.00 a.m</option>
              <option value="5.00 a.m">5.00 a.m</option>
              <option value="6.00 a.m">6.00 a.m</option>
              <option value="7.00 a.m">7.00 a.m</option>
              <option value="8.00 a.m">8.00 a.m</option>
              <option value="9.00 a.m">9.00 a.m</option>
              <option value="10.00 a.m">10.00 a.m</option>
              <option value="11.00 a.m">11.00 a.m</option>
              <option value="12.00 p.m">12.00 p.m</option>
              <option value="1.00 p.m">1.00 p.m</option>
              <option value="2.00 p.m">2.00 p.m</option>
              <option value="3.00 p.m">3.00 p.m</option>
              <option value="4.00 p.m">4.00 p.m</option>
              <option value="5.00 p.m">5.00 p.m</option>
              <option value="6.00 p.m">6.00 p.m</option>
              <option value="7.00 p.m">7.00 p.m</option>
              {routeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="etime">Destination End Time</label>
            <select
              className="form-control"
              id="etime"
              value={formData.etime}
              onChange={(event) =>
                setFormData({ ...formData, etime: event.target.value })
              }
            >
              <option value="">Select Time</option>

              <option value="4.00 a.m">4.00 a.m</option>
              <option value="5.00 a.m">5.00 a.m</option>
              <option value="6.00 a.m">6.00 a.m</option>
              <option value="7.00 a.m">7.00 a.m</option>
              <option value="8.00 a.m">8.00 a.m</option>
              <option value="9.00 a.m">9.00 a.m</option>
              <option value="10.00 a.m">10.00 a.m</option>
              <option value="11.00 a.m">11.00 a.m</option>
              <option value="12.00 p.m">12.00 p.m</option>
              <option value="1.00 p.m">1.00 p.m</option>
              <option value="2.00 p.m">2.00 p.m</option>
              <option value="3.00 p.m">3.00 p.m</option>
              <option value="4.00 p.m">4.00 p.m</option>
              <option value="5.00 p.m">5.00 p.m</option>
              <option value="6.00 p.m">6.00 p.m</option>
              <option value="7.00 p.m">7.00 p.m</option>
              {routeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
  
          {/* <div className="form-group">
            <label htmlFor="price">Enter Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={formData.price}
              onChange={(event) =>
                setFormData({ ...formData, price: event.target.value })
              }
            />
          </div> */}

          <div className="form-group">
          <label htmlFor="price">Enter Price</label>
          <div className="input-group">
          <div className="input-group-prepend">
          <span className="input-group-text">RS</span>
          </div>
          <input
          type="text"
          className="form-control"
          id="price"
          value={formData.price}
          onChange={(event) =>
          setFormData({ ...formData, price: event.target.value })
          }
          />
          </div>
          </div>



  
          <div className="form-group">
            <label htmlFor="delays">Select Bus Delays</label>
            <select
              className="form-control"
              id="delays"
              value={formData.delays}
              onChange={(event) =>
                setFormData({ ...formData, delays: event.target.value })
              }
            >
              <option value="">Delays</option>
              <option value="Ontime">Ontime</option>
              <option value="15 Minutes">15 Minutes</option>
              <option value="30 Minutes">30 Minutes</option>
              <option value="45 Minutes">45 Minutes</option>
              {routeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <button
              className="btn btn-primary mt-4"
              onClick={saveEmployee}
              disabled={
                !formData.busnum ||
                !formData.route ||
                !formData.stime ||
                !formData.etime ||
                !formData.price ||
                !formData.delays
              }
            >
              Register
            </button>
            <button
              className="btn btn-warning mt-4"
              onClick={updateEmployee}
              disabled={!formData._id}
            >
              Update
            </button>
            <button className="btn btn-secondary mt-4" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <br />
  
      <h1 className="font-weight-bold">
        <center>Updated Data</center>
      </h1>
  
      <center>
        <table className="table table-dark" align="center">
          <thead>
            <tr>
              <th scope="col">Bus Number</th>
              <th scope="col">Route</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Price Rs</th>
              <th scope="col">Delays</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.busnum}</td>
                <td>{employee.route}</td>
                <td>{employee.stime}</td>
                <td>{employee.etime}</td>
                <td>{employee.price}</td>
                <td>{employee.delays}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => editEmployee(employee)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteEmployee(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </div>
  );
 }
  

export default Main;




