import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, status } from '../user/models/user.entity';
import { Repository, getConnection } from 'typeorm';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthHelper } from './auth.helper';
import { UserService } from 'src/user/user.service';
import { HTTP_STATUS } from 'src/common/types';

@Injectable()
export class AuthService {
	@InjectRepository(UserEntity)
	private readonly repository: Repository<UserEntity>;
	@Inject(UserService)
	private readonly userService: UserService;
	@Inject(AuthHelper)
	private readonly helper: AuthHelper;

	/*
		create user in db, if username exist return HTTP C409 (CONFLICT)
	*/
	public async register(body: RegisterDto): Promise<UserEntity | never> {
		const { username }: RegisterDto = body;
		let user: UserEntity = await this.repository.findOne({ where: { username } });

		if (user) 
			throw new HttpException(HTTP_STATUS.ALREADY_EXIST, HttpStatus.CONFLICT);
		user = new UserEntity();
		user.username = username;
		return this.repository.save(user);
	}

	/*
		login user if user exist in db, else create it, update status of user, return JWT token
	*/
	public async login(body: LoginDto): Promise<Object | never> {
		const { username }: LoginDto = body;
		var user: UserEntity = await this.repository.findOne({ where: { username } });

		if (!user) {
			await this.register(body);
			user = await this.repository.findOne({ where: { username } });
		}
		console.log(user.id, this.userService.connectedUser)
		if (this.userService.getUserStatus(user.id) != status.Disconnected)
			throw new HttpException(HTTP_STATUS.ALREADY_CONNECTED, HttpStatus.CONFLICT);
		return {user:await this.userService.parseUserInfo(user), token:this.helper.generateToken(user)};
	}
	public createToken(user: UserEntity): string{
		return this.helper.generateToken(user);
	}

	public async registerIntra(userData: any): Promise<UserEntity | never> {
		var user: UserEntity = new UserEntity();
		user.username = userData.login;
		user.intraID = userData.id;
		user.profilIntraUrl = userData.image_url;
		return this.repository.save(user);
	}

	public async loginIntra(userData: any): Promise<Object | never> {
		var user: UserEntity = await this.userService.findUserByIntra(userData.id);
		if (!user)
			user = await this.registerIntra(userData);
		return user;
	}
	public async validToken(jwt: string): Promise<boolean> {
		return this.helper.validate(jwt);
	}
	public async refresh(user: UserEntity): Promise<string> {
		return this.helper.generateToken(user);
	}
}