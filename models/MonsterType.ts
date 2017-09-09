import {Table, Column, Model} from "sequelize-typescript";

@Table
export default class MonsterType extends Model<MonsterType> {

	@Column
	public PictureID: string;
	@Column
	public DefaultName: string;
}
