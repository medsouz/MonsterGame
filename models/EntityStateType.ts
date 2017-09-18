import {Table, Column, Model} from "sequelize-typescript";

@Table
export default class EntityStateType extends Model<EntityStateType> {

	// model for managing state types, like hunger, intelligence, happiness, etc.

	@Column
	public Name: string;

	@Column
	public MaxValue: number;
	@Column
	public MinValue: number;
	@Column
	public InitialValue: number;
	@Column
	public DecayInterval: number;
	@Column
	public DecayAmount: number;

	public toString = (): string => {
		return this.Name;
	}
}
