import { Heading } from '@vyrnnstudios/documentation/components';

import { Sidebar } from '@vyrnnstudios/documentation/components/Sidebar';

import { useDocumentation, useMarkdown } from '@vyrnnstudios/documentation/hooks';

export default function () {
  const { fetchSettingsFromDocumentation } = useDocumentation();

  const { fetchByPathname } = useMarkdown();

  fetchByPathname(`${process.cwd()}/docs/introduction/index.md`);

  return (
    <div>
      <Sidebar
        settings={fetchSettingsFromDocumentation()}
      />

      <div>
        <Heading>Welcome to Vyrnn Studios docs!</Heading>
      </div>
    </div>
  );
}
