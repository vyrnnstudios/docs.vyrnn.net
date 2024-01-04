import { Settings } from '@vyrnnstudios/documentation/schemas/Settings';

export function Sidebar({ settings }: { settings: Array<Settings> }) {
  return (
    <div>
      <ul>
        {settings.map((setting, index) => (
          <li key={`${setting.title}-${index + 1}`}>{setting.title}</li>
        ))}
      </ul>
    </div>
  );
}
