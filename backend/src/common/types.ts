import { Conversation, User } from "src/user/models/user.entity";
import { UserSocket } from "src/user/models/user.interface";
import { Pong } from "src/game/pong"

export enum status {
	Connected = 'Connected',
	Disconnected = 'Disconnected',
	InGame = 'InGame',
	Spectate = 'Spectate',
	InQueue = 'InQueue',
}

export interface MessageEvent {
	data: string | object;
	id?: string;
	type?: string;
	retry?: number;
}

export interface friendEvent {
	id: number;
	friend_id: number;
}

export enum FRIEND_REQUEST_ACTIONS {
	ADD = 'ADD',
	REMOVE = 'REMOVE',
	DECLINE = 'DECLINE',
	ACCEPT = 'ACCEPT',
}

export interface FRIEND_REQUEST_DATA {
	client_send:string;
	client_recv:string;
	action:FRIEND_REQUEST_ACTIONS;
	jwt:string;
}

export interface BLOCKED_DATA {
	user:string;
	user_to_block:string;
	jwt:string;
}

export enum HTTP_STATUS {
	ALREADY_EXIST = 'User already exist.',
	ALREADY_CONNECTED = 'User is already connected.',
	LOGIN_FAILED = 'Login failed.',
} 

export interface MESSAGE_DATA {
	client_send: string;
	client_recv: string;
	content: string;
	conversationID: number;
	jwt: string;
}

export interface ROOM_DATA {
	admin: string;
	name: string;
	password: string;
	jwt: string;
}

export interface NEW_MEMBER {
	roomId: number;
	user: string;
	admin: string;
	jwt: string;
}

export interface FIND_GAME_DATA {
	client_send: string;
	mode:gamemode;
	jwt: string;
}

export interface POPUP_DATA {
	error: boolean;
	message: string;
}

export interface GameUserI {
	id:number,
	username:string,
	posx?:number,
	posy?:number,
	point?:number,
	keyPress?:number,
	speed?:number,
	pos:string,
	clickpos?:{x:number, y:number}[]
}

export enum GAME_STATUS {
	COUNTDOWN = 'COUNTDOWN',
	PAUSE = "PAUSE",
	RUNNING = "RUNNING",
	WINNER = "WINNER",
	ENDED = "ENDED"
}

export interface GameBallI {
	posx:number,
	posy:number,
	speed:number,
	angle:number,
	d:{x:number, y:number}
	size:number // rayon
}

export interface GameI {
	users:GameUserI[],
	status?:GAME_STATUS,
	ball?:GameBallI,
	time:number,
	countDown?:number,
	winner?:{username:string,id:number},
	mode:gamemode
}

export interface GAMES_SOCKET {
	id:string,
	usersID:number[],
	spectatesID:number[],
	pong:Pong,
}

export enum gamemode {
	normal = 'normal',
	boost = 'boost',
}
