import { SSTConfig } from "sst";
import ApiStack from "./stacks/api.stack";

export default {
  config(_input) {
    return {
      name: "mytodo-app",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(ApiStack);
  },
} satisfies SSTConfig;
