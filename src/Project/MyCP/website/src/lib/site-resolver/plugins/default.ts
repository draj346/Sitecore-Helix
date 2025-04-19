import { SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs/site';
import config from 'temp/config';
import { SiteResolverPlugin } from '..';

class DefaultPlugin implements SiteResolverPlugin {
  exec(sites: SiteInfo[]): SiteInfo[] {
    // Add default/configured site
    sites.unshift({
      name: config.sitecoreSiteName,
      language: config.defaultLanguage,
      hostName: '{F7DC0BF9-7162-442A-9B3B-6E75AF39D9CD}',
    });

    return sites;
  }
}

export const defaultPlugin = new DefaultPlugin();
