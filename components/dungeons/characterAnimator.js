import React, { useRef } from "react";

export default function CharacterAnimator(props) {
	const canvasRef = useRef(null)
	const canvasWidth = 72
	const canvasHeight = 72
	let attackAnimInterval
	let reactionAnimInterval

	React.useEffect(() => {
		animateAttack()
		return () => {
			clearInterval(attackAnimInterval)
			clearInterval(reactionAnimInterval)
		}
	}, [props.playbackTrigger])

	function animateAttack() {
		let i = 0
		if (props.attackMaxFrames > 0) {
			attackAnimInterval = setInterval(() => {
				if (i <= props.attackMaxFrames) {
					draw(props.attackSpriteSource, props.frameWidth, i)
					i++
				} else {
					animateReaction()
					clearInterval(attackAnimInterval)
				}
			}, 600 / props.attackMaxFrames)
		}
	}

	function animateReaction() {
		let i = 0
		if (props.reactionMaxFrames > 0) {
			reactionAnimInterval = setInterval(() => {
				if (props.hp > 0) {
					if (i >= props.reactionMaxFrames) { i = 0 }
				}
				if (i < props.reactionMaxFrames) {
					draw(props.reactionSpriteSource, props.frameWidth, i)
					i++
				}
			}, 600 / props.reactionMaxFrames)
		}
	}

	const draw = (_src, _spriteW, _frameX) => {
		const _spriteH = _spriteW
		const sx = _frameX * _spriteW
		const sy = 0
		const dx = 0 + 72 - _spriteW
		const dy = 0 + 72 - _spriteH

		const image = new Image()
		image.src = _src
		const canvas = canvasRef.current
		const context = canvas.getContext('2d')
		image.onload = () => {
			context.clearRect(0, 0, canvasWidth, canvasHeight)
			context.drawImage(image, sx, sy, _spriteW, _spriteH, dx, dy, _spriteW, _spriteH)
		}
	}
	return (<canvas ref={canvasRef} {...props} width={canvasWidth} height={canvasHeight} />)
}
