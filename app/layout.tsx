import type {ReactNode} from 'react';
import type {Metadata} from 'next';
import {Archivo} from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-archivo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BuildX — Giải pháp BIM & Thiết kế',
  description: 'Công ty Cổ phần Đầu tư BuildX — Giải pháp BIM, Thiết kế và Thi công chuyên nghiệp tại Đà Nẵng.',
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html suppressHydrationWarning className={archivo.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
