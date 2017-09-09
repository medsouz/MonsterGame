import {Table, Column, Model} from "sequelize-typescript";

@Table
export default class MonsterStateType extends Model<MonsterStateType> {

	@Column
	public Name: string;
	@Column
	public MaxValue: number;
	@Column
	public MinValue: number;
}
