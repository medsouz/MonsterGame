import {Table, Column, Model, HasMany, ForeignKey} from "sequelize-typescript";
import ItemInventory from "./ItemInventory";

@Table
export default class User extends Model<User> {
	@Column({primaryKey: true})
	public UserID: number;
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
}

export enum eAccountType {
	User,
	Admin
}
