import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class UserMonsters extends Model<UserMonsters> {
	@Column
	public UserMonsterID: number;
	@Column
	public MonsterID: number;
	@Column
	public UserMonsterName: string;
	@Column
	public isEgg: boolean;
}
