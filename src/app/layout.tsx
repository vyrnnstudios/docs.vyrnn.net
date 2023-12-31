import { PropsWithChildren } from 'react';

import { GlobalStyle } from '@vyrnnstudios/next-template/assets/styles';

export default function ({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GlobalStyle />

        {children}
      </body>
    </html>
  );
}
