import Image, { type StaticImageData } from 'next/image'

interface BrandProps {
  image: string | StaticImageData
  name: string
}

const Brand = ({ image, name }: BrandProps) => {
  return (
    <div className='flex items-center gap-2'>
      <Image src={image} alt={name} width={75} height={75} className='rounded-md' />
      <p>{name}</p>
    </div>
  )
}

export { Brand }
