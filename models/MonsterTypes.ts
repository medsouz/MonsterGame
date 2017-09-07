import {Table, Column, Model, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";

// monster types is a placeholder for implementing monster types
// so that monster interactions can be added later, where monsters fight each other
@Table
export default class MonsterTypes extends Model<MonsterTypes> {
	@Column({primaryKey: true})
	public MonsterTypeID: number;
	@Column
	public MonsterTypeName: string;

}
