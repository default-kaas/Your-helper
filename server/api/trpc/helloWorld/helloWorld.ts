import { publicProcedure, router } from '~/server/trpc/trpc'
import { z } from 'zod';
// TODO: remove this example after creation of a get singular and get multiple end point
export const helloWorldRouter = router({
  hello: publicProcedure
    // This is the input schema of your procedure
    .input(
      z.object({
        text: z.string().nullish(),
      }),
    )
    .query(({ input }) => {
      // This is what you're returning to your client
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      }
    }),
})