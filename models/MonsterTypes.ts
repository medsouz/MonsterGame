import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class MonsterTypes extends Model<MonsterTypes> {
	@Column
	public MonsterTypeID: number;
	@Column
	public MonsterTypeName: string;

}
