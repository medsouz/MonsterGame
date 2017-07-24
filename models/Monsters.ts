import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class Monsters extends Model<Monsters> {
	@Column
	public MonsterID: number;
  @Column
  public MonsterDefaultName: string;
}
