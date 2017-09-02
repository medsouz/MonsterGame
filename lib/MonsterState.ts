export default class MonsterState {

	private MonsterStateId: number;
	private MonsterStateName: string;
	private MonsterStateValue: number;

	constructor(id: number, name: string, value: number) {
		this.senMonsterStateId(id);
		this.setMonsterStateName(name);
		this.setMosterStateValue(value);
	}
	public getMonsterStateId() {
		return this.MonsterStateId;
	}
	public senMonsterStateId(id: number) {
		this.MonsterStateId = id;
	}
	public getMonsterStateName() {
		return this.MonsterStateName;
	}
	public setMonsterStateName(name: string) {
		this.MonsterStateName = name;
	}
	public getMonterStateValue() {
		return this.MonsterStateValue;
	}
	public setMosterStateValue(value: number) {
		this.MonsterStateValue = value;
	}

}
