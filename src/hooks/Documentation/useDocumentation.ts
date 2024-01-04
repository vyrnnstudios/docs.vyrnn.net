import { DocumentationService } from '@vyrnnstudios/documentation/services/DocumentationService';

export function useDocumentation() {
  const { fetchAll, fetchSettingsFromDocumentation } = new DocumentationService();

  return { fetchAll, fetchSettingsFromDocumentation };
}
