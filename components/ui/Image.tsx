import NextImage, { ImageProps } from 'next/image'

export function Image({ src, ...props }: ImageProps) {
  return <NextImage src={src} {...props} />
}
