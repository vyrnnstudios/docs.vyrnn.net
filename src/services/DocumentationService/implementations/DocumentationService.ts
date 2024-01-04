import { Settings } from '@vyrnnstudios/documentation/schemas/Settings';
import { IDocumentationService } from '@vyrnnstudios/documentation/services/DocumentationService/interfaces/IDocumentationService';

import { readFileSync, readdirSync } from 'node:fs';

export class DocumentationService implements IDocumentationService {
  public fetchAll(): Array<string> {
    return readdirSync(`${process.cwd()}/docs`);
  }

  public fetchSettingsFromDocumentation(): Array<Settings> {
    const documentations = readdirSync(`${process.cwd()}/docs`);

    const documentationSettings = new Array<Settings>();

    for (const documentation of documentations) {
      const settings = new Settings();

      const json = JSON.parse(readFileSync(`${process.cwd()}/docs/${documentation}/settings.json`, 'utf-8'));

      settings.title = json.title;
      settings.icon = json.icon;
      settings.children = json.children;

      documentationSettings.push(settings);
    }

    return documentationSettings;
  }
}
