import {Table, Column, Model} from "sequelize-typescript";

@Table
export default class EntityStateType extends Model<EntityStateType> {

	@Column
	public Name: string;
	// note: by default, monster states are a value of 1-100, with a default starting value of 25
	// this can be changed or customized as needed upon intial setup, for example if administrator wishes to add Hit Points as a state
	@Column
	public MaxValue: number;
	@Column
	public MinValue: number;
	@Column
	public InitialValue: number;

	public toString = (): string => {
		return this.Name;
	}
}
