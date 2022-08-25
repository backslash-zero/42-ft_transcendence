import React, { useState, useContext } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from 'react-redux'
import { SocketContext } from '../../context/socket';
import IconButton from "../commons/buttons/IconButton";
import Room from "../room";

interface IProps {
	conv: any
}

const Com: React.FC<IProps> = ({ conv }) => {
	const socket = useContext(SocketContext);
	const global = useSelector((state: any) => state.global)

	const [input, setInput] = useState({
		content: ""
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		})
	}

	const sendMessage = (): void => {
		console.log("Send msg")
		if (conv.adminId != undefined) {
			socket.emit('roomMsg', {
				content: input.content,
				client_send: global.username,
				client_recv: global.clientChat,
				conversationID: conv.id,
				jwt:global.token
			})
		}
		else {
			socket.emit('dmServer', {
				content: input.content,
				client_send: global.username,
				client_recv: global.clientChat,
				conversationID: conv.id,
				jwt:global.token
			});
		}
		setInput({
			content: ""
		})
	}

	return (
		<div className="flex gap-[8px] w-full items-center justify-between">
			<input
				className="	w-full
							grow
							p-[8px] pl-[12px] rounded-sm
							bg-slate-800 text-slate-200 placeholder:text-slate-400
							font-space text-[16px]

							"
				type="text"
				placeholder="write here..."
				value={input.content}
				onChange={handleChange}
				name="content"
				
			/>
			<IconButton icon={FiArrowRight} onClick={sendMessage} ></IconButton>
		</div>
	)
}

export default Com;