'use client';

import { PropsWithChildren } from 'react';

import { H1 } from '@vyrnnstudios/documentation/components/Heading/styles';

export function Heading({ children }: PropsWithChildren) {
  return <H1>{children}</H1>;
}
