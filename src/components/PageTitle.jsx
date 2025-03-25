import Image from 'next/image'

export function PageTitle({ as: Component = 'h1', imageSrc = null, title = '', ...props }) {
    return (
        <div className='flex items-center gap-3'>
            {imageSrc && <Image src={imageSrc} alt="Logo Title" className="h-8 w-10 my-0" unoptimized />}
            <Component className='my-0'>{title}</Component>
        </div>
    )
}