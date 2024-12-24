import "isomorphic-fetch";
import { apiURL } from "../config";

class api {
  constructor() {
    this.token = "";
  }

  getToken() {
    return this.token;
  }

  setToken(token) {
    this.token = token;
  }

  // Refactored GET method
  async get(path) {
    try {
      const response = await fetch(`${apiURL}${path}`, {
        mode: "cors",
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json", Authorization: `JWT ${this.token}` },
      });

      const res = await response.json();
      if (!response.ok) {
        throw new Error(res); // Handle non-200 responses
      }
      return res;
    } catch (e) {
      throw new Error(e); // Catch any error and throw it
    }
  }

  // Refactored POST method
  async post(path, body) {
    try {
      const response = await fetch(`${apiURL}${path}`, {
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Authorization: `JWT ${this.token}` },
        body: typeof body === "string" ? body : JSON.stringify(body),
      });

      const res = await response.json();
      if (!response.ok) {
        throw new Error(res); // Handle non-200 responses
      }
      return res;
    } catch (e) {
      throw new Error(e); // Catch any error and throw it
    }
  }

  // Refactored PUT method
  async put(path, body) {
    try {
      const response = await fetch(`${apiURL}${path}`, {
        mode: "cors",
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json", Authorization: `JWT ${this.token}` },
        body: typeof body === "string" ? body : JSON.stringify(body),
      });

      const res = await response.json();
      if (!response.ok) {
        throw new Error(res); // Handle non-200 responses
      }
      return res;
    } catch (e) {
      throw new Error(e); // Catch any error and throw it
    }
  }

  // Refactored DELETE method
  async remove(path) {
    try {
      const response = await fetch(`${apiURL}${path}`, {
        mode: "cors",
        credentials: "include",
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `JWT ${this.token}` },
      });

      const res = await response.json();
      if (!response.ok) {
        throw new Error(res); // Handle non-200 responses
      }
      return res;
    } catch (e) {
      throw new Error(e); // Catch any error and throw it
    }
  }
}

const API = new api();
export default API;
