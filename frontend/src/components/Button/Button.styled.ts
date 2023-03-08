import tw from 'tailwind-styled-components'

interface Props {
	variant: 'primary' | 'secondary' | 'tertiary'
	customize?: string
}

const getColors = ({ variant }: Props) => {
	switch (variant) {
		case 'primary':
			return `
				bg-red-700
				hover:bg-red-800
				focus:ring-red-300
			`
		case 'secondary':
			return `
				bg-green-600
				hover:bg-green-800
				focus:ring-green-300
			`
		case 'tertiary':
			return `
				bg-purple-700
				hover:bg-purple-800
				focus:ring-purple-300
				dark:bg-purple-600
				dark:hover:bg-purple-700
			`
	}
}

export const StyledButton = tw.button<Props>`
	rounded-lg 
	text-sm 
	px-5 
	py-2.5 
	mb-2 
	text-white
	font-medium
	focus:ring-2
	focus:outline-none
	${(props) => props.customize ?? getColors(props)}
`
