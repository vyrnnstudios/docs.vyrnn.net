import { Settings } from '@vyrnnstudios/documentation/schemas/Settings';

export interface IDocumentationService {
  fetchAll(): Array<string>;

  fetchSettingsFromDocumentation(): Array<Settings>;
}
