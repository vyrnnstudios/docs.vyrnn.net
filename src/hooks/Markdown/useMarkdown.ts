import { IMarkdownService, MarkdownService } from '@vyrnnstudios/documentation/services/MarkdownService';

export function useMarkdown() {
  const markdownService: IMarkdownService = new MarkdownService();

  return {
    fetchByPathname: (pathname: string) => {
      return markdownService.parseToJSON(pathname);
    },
    fetchTitles: (pathname: string) => {
      return markdownService.fetchTitlesFromMarkdown(pathname);
    },
    fetchSections: (pathname: string) => {
      return markdownService.fetchSectionsFromMarkdown(pathname);
    }
  };
}
