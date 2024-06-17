import { type MetadataRoute } from 'next';

import { config } from '@/config/app';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: [],
			},
		],
		sitemap: `${config.url}/sitemap.xml`,
		host: config.url,
	};
}
