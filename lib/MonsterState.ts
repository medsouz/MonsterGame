export default class MonsterState {

	private MonsterStateId: number;
	private MonsterStateName: string;
	private MonsterStateValue: number;

	constructor(id: number, stateValue: number) {
		this.setMonsterStateId(id);
		this.setMonsterStateName("default");
		this.setMosterStateValue(stateValue);
	}
	public getMonsterStateId() {
		return this.MonsterStateId;
	}
	public setMonsterStateId(id: number) {
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
