import Image from 'next/image'
import GithubLogo from '@/images/logos/github.svg'

export const GithubRepo = ({ href, title, description }) => {
  return (
    <div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
        <div className="not-prose flex justify-center gap-6  rounded-xl bg-gray-50 p-6">
          <div>
            <Image src={GithubLogo} alt="" className="w-52" unoptimized />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="leading-5 text-gray-700">{description}</p>
          </div>
        </div>
      </a>
    </div>
  )
}
