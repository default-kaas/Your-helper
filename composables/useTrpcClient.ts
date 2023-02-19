import { TRPCClientError } from '@trpc/client'
import type { inferRouterOutputs, inferRouterInputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/trpc/[trpc]";
type RouterOutput = inferRouterOutputs<AppRouter>;
type RouterInput = inferRouterInputs<AppRouter>;
type ErrorOutput = TRPCClientError<AppRouter>

// TODO: make this part of an wrapper function to wrap the response
export function useTRPCValidation(errorResponse: ErrorOutput){
  return JSON.parse(errorResponse.message) as [{message: string}]
}

//* Authentication
export type PostAuthenticationInput = RouterInput['authenticationRouter']['authentication']
type PostAuthenticationOutput = RouterOutput['authenticationRouter']['authentication']
export async function usePostAuthentication(input: PostAuthenticationInput) {
  const { $client } = useNuxtApp()
  // TODO: make use of a wrapper function to make the use of the using function easier
  return useAsyncData<PostAuthenticationOutput, ErrorOutput>(() => $client.authenticationRouter.authentication.mutate(input))
}
