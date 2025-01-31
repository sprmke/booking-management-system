import { createTRPCRouter } from '@/server/api/trpc';
import { bookingRouter } from '@/server/api/routers/booking';
import { propertyRouter } from '@/server/api/routers/property';
import { userRouter } from '@/server/api/routers/user';

export const appRouter = createTRPCRouter({
  booking: bookingRouter,
  property: propertyRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;