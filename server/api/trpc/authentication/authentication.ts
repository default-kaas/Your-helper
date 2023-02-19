import { publicProcedure, router } from '~/server/trpc/trpc'
import { z } from 'zod';

export const authenticationRouter = router({
  authentication: publicProcedure.input(z.object({
    userName: z.string().email(),
    password: z.string().min(12).max(64)
  })).mutation(({input})=> {
    // TODO: check of input email is valid
    // TODO: check of input password is valid
    // TODO: create JWT
    // TODO: set refresh token in a safe way
    // TODO: return jwt
    return { 
      jwt: 'jwt-return-value'
    }
  }),
  refresh: publicProcedure.input(z.object({
    refreshToken: z.string()
  })).mutation(({input})=> {
    // TODO: check of refresh token is valid
    // TODO: create JWT
    // TODO: set refresh token in a safe way
    // TODO: return jwt
    return { 
      jwt: 'jwt-return-value'
    }
  })
})