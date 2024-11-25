import xml2js from 'xml2js';

export default class PostService {
  static async loadPosts(url: string): Promise<object[]> {
    try {
      const response = await fetch(url);
      const xmlData = await response.text(); // Получаем текст из ответа
      console.log(xmlData)
      return new Promise<object[]>((resolve, reject) => {
        // Парсинг XML в JSON
        xml2js.parseString(xmlData, (err: any, result: any) => {
          if (err) {
            console.error('Error parsing XML:', err);
            reject(err);
          } else {
            const items = result.rss.channel[0].item || [];
            const posts = items.map((item: any) => ({
              title: item?.title || '',
              description: item?.description || [''],
              enclosure: item?.enclosure,
              link: item?.link || '',
              pubDate: item?.pubDate || '',
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

