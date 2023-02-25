enum Type {
	SUCCESS = '\x1b[32m',
	ERROR = '\x1b[31m',
	WARNING = '\x1b[33m',
	INFO = '\x1b[36m',
	RESET = '\x1b[0m'
}

const log = (
	message: string,
	type: Type = Type.RESET,
	messageColorized = '',
	clear = true
) => {
	clear ? console.clear() : null
	console.log(message, `${type + messageColorized}`, Type.RESET)
}

export { log, Type }
