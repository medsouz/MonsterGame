import {Table, Column, Model, HasMany} from "sequelize-typescript";

@Table
export default class UserMonsterStatesList extends Model<UserMonsterStatesList> {
	@Column
	public UserMonsterStatesListID: number;
  @Column
  public UserMonsterID: number;
  @Column
  public MonsterStateID: string;
  @Column
  public Value: number;

}
