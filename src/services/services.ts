import { HttpClient } from "aurelia-http-client";
import { inject } from "aurelia-framework";
import IApplicant from "../components/contract";
import api from "../config/api-config";

@inject(HttpClient)
export class ApplicantService {
  private http: HttpClient;
  applicants = [];

  constructor(http: HttpClient) {
    http.configure((x) => x.withBaseUrl(api.BASE_URL + "/"));
    this.http = http;
  }

  getApplicants() {
    let promise = new Promise((resolve, reject) => {
      this.http
        .get("")
        .then((data) => {
          this.applicants = JSON.parse(data.response);
          resolve(this.applicants);
        })
        .catch((err) => reject(err));
    });
    return promise;
  }

  createApplicant(applicant: IApplicant) {
    console.log(applicant);
    let promise = new Promise((resolve, reject) => {
      this.http
        .post("", applicant)
        .then((data) => {
          let newApplicant = JSON.parse(data.response);
          resolve(newApplicant);
        })
        .catch((err) => reject(err));
    });
    return promise;
  }

  getApplicant(id) {
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(id)
        .then((response) => {
          let applicant = JSON.parse(response.response);
          resolve(applicant);
        })
        .catch((err) => reject(err));
    });
    return promise;
  }

  deleteApplicant(id) {
    let promise = new Promise((resolve, reject) => {
      this.http
        .delete(id)
        .then((response) => {
          let deleteResponse = JSON.parse(response.response);
          resolve(deleteResponse);
        })
        .catch((err) => reject(err));
    });
    return promise;
  }

  updateApplicant(id, applicant: IApplicant) {
    let promise = new Promise((resolve, reject) => {
      this.http
        .put(id, applicant)
        .then((response) => {
          let updateResponse = JSON.parse(response.response);
          resolve(updateResponse);
        })
        .catch((err) => reject(err));
    });
    return promise;
  }
}
