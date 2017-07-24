import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class MonsterStates extends Model<MonsterStates> {
	@Column
	public MonsterStateID: number;
  @Column
  public MonsterID: number;
  @Column
  public MonsterStateName: string;
  @Column
  public MonsterStateMaxValue: number;
	@Column
	public MonsterStateMinValue: number;

}
