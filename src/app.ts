import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";

export class App {
  router: Router;
  heading = "Hanh Application Process";

  constructor() {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "Hanh Application Process";
    config.options.pushState = true;
    config.options.root = "/";
    config.map([
      {
        route: "",
        moduleId: PLATFORM.moduleName("./components/no-selection"),
        title: "Hanh App Process",
      },

      {
        route: "/applicant/create",
        moduleId: PLATFORM.moduleName("./components/create-applicant"),
        name: "create_applicant",
      },
    ]);
    this.router = router;
  }
}
