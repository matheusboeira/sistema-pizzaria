import tw from 'tailwind-styled-components'

interface ToggleSpanProps {
	position?: 'left' | 'right'
}

export const ToggleLabel = tw.label`
  flex 
  items-center 
  relative 
  w-max 
  cursor-pointer 
  select-none
`

export const ToggleInput = tw.input`
  appearance-none 
  cursor-pointer 
  w-14 h-7 
  rounded-full 
  focus:outline-none 
  focus:ring-2
  focus:ring-offset-2
  focus:ring-offset-black 
  focus:ring-blue-500 
  bg-[#303030]
`

export const ToggleSpan = tw.span<ToggleSpanProps>`
  absolute
  ${(props) => (props.position === 'left' ? 'right-1' : 'right-8')}
`

export const ToggleCircle = tw.span<ToggleSpanProps>`
  w-7
  h-7 
  absolute 
  rounded-full 
  transform 
  transition-transform 
  bg-gray-200
  ${(props) => (props.position === 'right' ? 'right-7' : 'left-7')}
`
