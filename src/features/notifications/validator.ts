import { z } from 'zod';

export const notificationSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  image: z.string().optional(),
  notification_type: z.string().default('in_app'),
  action_url: z.string().optional(),
});
