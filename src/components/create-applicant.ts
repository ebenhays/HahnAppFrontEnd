import { inject } from "aurelia-framework";
import Swal from "sweetalert2";
import { ApplicantService } from "../services/services";
import IApplicant from "../components/contract";
import {
  ValidationControllerFactory,
  ValidationRules,
} from "aurelia-validation";

@inject(ApplicantService, ValidationControllerFactory)
export class CreateApplicant {
  private _applicantService;
  private controller;
  public applicant: IApplicant;

  constructor(applicantService: ApplicantService, ValidationControllerFactory) {
    this._applicantService = applicantService;
    this.controller = ValidationControllerFactory.createForCurrentScope();
  }

  create() {
    Swal.fire({
      title: "Application Confirmation",
      text: "Are you sure that you want to save this record?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, Save it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        let newApplicant = JSON.parse(JSON.stringify(this.applicant));
        this._applicantService
          .createApplicant(newApplicant)
          .then(() => {
            Swal.fire("Success!", "Record Saved Successfully", "success");
          })
          .catch((error) => {
            Swal.fire("Error!!", "There was a problem saving record", "error");
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          "Cancelled",
          "Your Submission has been cancelled :)",
          "error"
        );
      }
    });
  }

  postChanged(newValue, oldValue) {
    if (this.applicant) {
      ValidationRules.ensure("name")
        .required()
        .minLength(5)
        .withMessage("Name Should be at least 5 Characters")
        .on(this.applicant);
      ValidationRules.ensure("familyName")
        .required()
        .minLength(5)
        .withMessage("Family Name Should be at least 5 Characters")
        .on(this.applicant);
      ValidationRules.ensure("age")
        .required()
        .min(20)
        .max(60)
        .withMessage("Age should be between 20 and 60")
        .on(this.applicant);
      ValidationRules.ensure("address")
        .required()
        .minLength(10)
        .withMessage("Address Should be at least 10 Characters")
        .on(this.applicant);
      ValidationRules.ensure("countryOfOrigin")
        .required()
        .withMessage("Country of Origin Required")
        .on(this.applicant);
      ValidationRules.ensure("emailAddress")
        .email()
        .required()
        .withMessage("Email is Required")
        .on(this.applicant);

      this.controller.validate();
    }
  }
}
