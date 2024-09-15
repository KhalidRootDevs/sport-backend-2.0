import News from "../../features/news/model";
import { getCategories } from "../../utils/helper"
import fetch90min from "./fetch90min";

export const NinetyMins = async function () {
    const categories = await getCategories();

    const newsPromises = categories.map((category) => fetch90min(category))
    const newsArrays = await Promise.all(newsPromises)
    let news = newsArrays.flat()

    try {
        const abc = await News.insertMany(news, { ordered: false, rawResult: true })
        return abc?.insertedCount || 0
    } catch (e: any) {
        return e?.result?.insertedCount || 0
    }
}
