import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class UserMonsters extends Model<UserMonsters> {
	@Column({primaryKey: true})
	public UserMonsterID: number;
	@Column
	public MonsterID: number;
	@Column
	public UserMonsterName: string;
	@Column
	public UserID: number;
	@Column
	public isEgg: boolean;
}
