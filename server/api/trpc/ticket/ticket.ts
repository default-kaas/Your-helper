import { publicProcedure, router } from '~/server/trpc/trpc'
import { z } from 'zod';

export const ticketsRouter = router({
  tickets: publicProcedure.query(() => {
    return ['1','2','3']
  })
})