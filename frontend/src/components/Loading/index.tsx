import styles from './Loading.module.scss'

import { SVGAttributes } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { FaSpinner } from 'react-icons/fa'

interface LoadingProps extends SVGAttributes<SVGElement> {
	size?: number
}

export const PrimarySpinner = (props: LoadingProps) => (
	<FaSpinner
		className={styles.loading}
		color={props.color ?? '#fff'}
		size={props.size ?? 16}
	/>
)

export const SecondarySpinner = (props: LoadingProps) => (
	<CgSpinnerTwo
		className={styles.loading}
		color={props.color ?? '#fff'}
		size={props.size ?? 16}
	/>
)
