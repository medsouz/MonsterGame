import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class MonsterType extends Model<MonsterType> {

	@Column({primaryKey: true})
	public MonsterTypeId: number;
	@Column
	public PictureID: string;
	@Column
	public DefaultName: string;
}
