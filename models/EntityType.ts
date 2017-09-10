import {Table, Column, Model} from "sequelize-typescript";

@Table
export default class EntityType extends Model<EntityType> {

	@Column
	public PictureID: string;
	@Column
	public DefaultName: string;

	public toString = (): string => {
		return this.DefaultName;
	}
}
