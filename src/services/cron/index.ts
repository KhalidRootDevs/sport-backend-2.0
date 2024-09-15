import cron from 'node-cron';
import { NinetyMins } from '../90min';

// every hour fetch news from 90min
cron.schedule('0 * * * *', async () => {
    try {
        console.log('fetching news from 90min', new Date())
        await NinetyMins()
    } catch (e: any) {
        console.log(e.message)
    }
})

// // every day at midnight send notifications
// cron.schedule('0 0 * * *', async () => {
//   try {
//     await notificationCron()
//   } catch (e) {
//     next(e)
//     sendTestMail(e.message, JSON.stringify(e))
//   }
// })
