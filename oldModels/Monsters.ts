import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

@Table
export default class Monsters extends Model<Monsters> {
	@Column({primaryKey: true})
	public MonsterID: number;
	@Column
	public MonsterDefaultName: string;
	@Column
	public MonsterPictureId: string;
}
