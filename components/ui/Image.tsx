import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.NODE_ENV === 'production' ? '/buildx' : ''

export function Image({ src, ...props }: ImageProps) {
  const resolvedSrc =
    typeof src === 'string' && src.startsWith('/') ? `${basePath}${src}` : src
  return <NextImage src={resolvedSrc} {...props} />
}
