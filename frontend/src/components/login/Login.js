import React, { Component } from "react";
import "./login.css";
import { Alert } from "@mui/material";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }
  handleChange(event) {
    let value = event.target.value;
    if (event.target.name === "email") {
      this.setState({ email: value });
    } else if (event.target.name === "password") {
      this.setState({ password: value });
    } else {
      this.setState({ error: "" });
    }
  }

  handleValidation() {
    let message = "";
    if (this.state.email === "") {
      message = "Email cant be emtpy";
    } else if (
      this.state.email.match("^[A-Za-z0-9.]+@[A-Za-z0-9.-]+$") === null
    ) {
      message = "Email is not valid, enter valid email";
    }else if(this.state.password === ""){
        message = "Password can't be empty"
    }else if(this.state.password.length<8){
        message = "Password can't be less than 8 characters"

    }

    if (message !== "") {
      this.setState({ error: message });
      return true;
    }
    return false;
  }
  handleSubmit(event) {
    event.preventDefault();
    if (!this.handleValidation()) {
      let url = "http://localhost:3001/users/login";
      fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          if (
            response.status === 200 ||
            response.status === 400 ||
            response.status === 401
          ) {
            return response.json();
          } else {
            return Promise.reject({
              message: "Some error occured during login",
            });
          }
        })
        .then((json) => {
          // console.log(json);
          this.setState({ error: json.message });
        })
        .catch((error) => console.error(error));
    }
  }
  render() {
    return (
      <div className="parent">
        <form className="loginform" onSubmit={this.handleSubmit}>
          <div className="loginform__heading">Sign In Here</div>
          {this.state.error && (
            <Alert severity="error" onClose={this.handleChange}>
              {this.state.error}
            </Alert>
          )}
          <div className="loginform__formgroup">
            <label htmlFor="email" className="loginfor__label">
              Email
            </label>
            <input
              type="text"
              className="loginform__input"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="loginform__formgroup">
            <label htmlFor="password" className="loginfor__label">
              Password
            </label>
            <input
              type="password"
              className="loginform__input"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <input
            type="submit"
            className="loginform__submit"
            name="signin"
            value={"Sign In"} disabled={this.state.error}
          />
        </form>
      </div>
    );
  }
}