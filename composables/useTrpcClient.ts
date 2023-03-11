import { TRPCClientError } from '@trpc/client'
import type { inferRouterOutputs, inferRouterInputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/trpc/[trpc]";
import { AsyncDataExecuteOptions, _AsyncData } from 'nuxt/dist/app/composables/asyncData';
import type { Ref } from 'vue';

type RouterOutput = inferRouterOutputs<AppRouter>;
type RouterInput = inferRouterInputs<AppRouter>;
type ErrorOutput = TRPCClientError<AppRouter>

// #region Check if response data is not null
interface _AsyncResponse<DataT> {
  data: Ref<DataT>;
  pending: Ref<boolean>;
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>;
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>;
}

export function useResponseDataIsNotNull<T>(
  toBeDetermined: _AsyncData<T, ErrorOutput | null> | _AsyncResponse<T>
): toBeDetermined is _AsyncResponse<T> {
  if(toBeDetermined.data === null || toBeDetermined.data.value === null){
    return false
  }
  return true 
}
// #endregion
// #region error handling
// TODO: make function that displays pop ups
// TODO: make function that returns error for a form
export function useDisplayError<T>(response: _AsyncData<T, ErrorOutput | null>) {
  if(response.error.value != null){
    const errorMessages = JSON.parse(response.error.value.message) as [{message: string}] 
    for(let i = 0; i < errorMessages.length; i++){
      console.log(errorMessages[i])
    }
  }
}
// #endregion
// #region end - points
//* Authentication
export type PostAuthenticationInput = RouterInput['authenticationRouter']['authentication']
export type PostAuthenticationOutput = RouterOutput['authenticationRouter']['authentication']
export async function usePostAuthentication(input: PostAuthenticationInput) {
  const { $client } = useNuxtApp()
  return useAsyncData<PostAuthenticationOutput, ErrorOutput>(() => $client.authenticationRouter.authentication.mutate(input))
}
// #endregion
