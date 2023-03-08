import Image, { ImageLoaderProps, ImageProps } from 'next/image'
import logoImg from '@public/logo.svg'

interface LogoProps {
	alt?: string
	height?: number
	width?: number
}

const Logo = ({ alt = 'Logo Sujeito Pizzaria', ...rest }: LogoProps) => {
	return (
		<Image
			src={logoImg}
			alt={alt}
			height={rest.height}
			width={rest.width}
			priority
		/>
	)
}

export default Logo
