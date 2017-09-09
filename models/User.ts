import {Table, Column, Model, HasMany, ForeignKey} from "sequelize-typescript";
import ItemInventory from "./ItemInventory";

@Table
export default class User extends Model<User> {
	@Column
	public UserName: string;
	@Column
	public Password: string;
	@Column
	public AccountType: eAccountType;

	@ForeignKey(() => ItemInventory)
	@Column
	public ItemInventoryId: number;
	@HasMany(() => ItemInventory)
	public ItemInventory: ItemInventory;

	public toString = (): string => {
		return ((this.AccountType === eAccountType.Admin) ? "[ADMIN] " : "") + this.UserName;
	}
}

export enum eAccountType {
	User,
	Admin
}
