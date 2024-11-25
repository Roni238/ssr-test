
//import axios from 'axios';
import xml2js from 'xml2js';

export default class PostService {
  static async loadPosts(url: string): Promise<object[]> {
    try {
      // Запросы направляются на Vercel API
      const response = await fetch(url);
      const xmlData = await response.text();

      return new Promise<object[]>((resolve, reject) => {
        // Парсинг XML в JSON
        xml2js.parseString(xmlData, (err: any, result: any) => {
          if (err) {
            console.error('Error parsing XML:', err);
            reject(err);
          } else {
            const items = result.rss.channel[0].item || [];
            const posts = items.map((item: any) => ({
              title: item?.title?.[0] || '',
              description: item?.description?.[0] || '',
              enclosure: item?.enclosure?.[0]?.$ || {},
              link: item?.link?.[0] || '',
              pubDate: item?.pubDate?.[0] || '',
            }));
            resolve(posts);
          }
        });
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
