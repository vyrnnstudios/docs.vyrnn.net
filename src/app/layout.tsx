import { PropsWithChildren } from 'react';

import { GlobalStyle } from '@vyrnn/next-template/assets/styles';

export default function ({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br">
      <body>
        <GlobalStyle />

        {children}
      </body>
    </html>
  );
}
