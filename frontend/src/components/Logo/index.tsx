import Image from 'next/image'
import logoImg from '@public/logo.svg'

type LogoProps = {
	alt?: string
}

const Logo = ({ alt = 'Logo Sujeito Pizzaria' }: LogoProps) => {
	return <Image src={logoImg} alt={alt} priority />
}

export default Logo
