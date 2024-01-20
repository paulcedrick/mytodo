import { StackContext, Api } from "sst/constructs";

export default function ApiStack({ stack }: StackContext) {
  const api = new Api(stack, "MainApi", {
    routes: {
      $default: "src/lambda.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return { api };
}
