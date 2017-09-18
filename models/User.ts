import {Table, Column, Model, HasMany, ForeignKey} from "sequelize-typescript";
import ItemInventory from "./ItemInventory";

@Table
export default class User extends Model<User> {

	// model to hold user info, as well as hash password

	public static hashPassword(password: string): string {
		return require("crypto").pbkdf2Sync(password, "NaCL" /* TODO: Better salting */, 30000, 512, "sha512");
	}

	@Column
	public UserName: string;
	@Column
	public Password: string;
	@Column
	public AccountType: eAccountType;

	@HasMany(() => ItemInventory)
	public ItemInventory: ItemInventory[];

	public toString = (): string => {
		return ((this.AccountType === eAccountType.Admin) ? "[ADMIN] " : "") + this.UserName;
	}
}

export enum eAccountType {
	User,
	Admin
}
