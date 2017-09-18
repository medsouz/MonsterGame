import {Table, Column, Model} from "sequelize-typescript";

@Table
export default class EntityType extends Model<EntityType> {

	// types of entitities, with their picture id
	// picture id needs to match name of image in images folder

	@Column
	public PictureID: string;
	@Column
	public DefaultName: string;

	public toString = (): string => {
		return this.DefaultName;
	}
}
