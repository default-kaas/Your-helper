import { publicProcedure, router } from '~/server/trpc/trpc'

export const ticketsRouter = router({
  tickets: publicProcedure.query(() => {
    return ['1','2','3']
  })
})