import MonsterState from "./MonsterState";

export default class Monster {

	private UserMonsterID: number;
	private UserMonsterName: string;
	private MonsterDefaultName: string;
	private MonsterStates: MonsterState[];
	private IsEgg: boolean;
	private MonsterPictureId: string;

	constructor(name: string, pictureId: string, monsterStates: MonsterState[], monsterId: number) {
		this.setUserMonsterName(name);
		this.setMonsterPictureId(pictureId);
		this.setMonsterState(monsterStates);
		this.setUserMonsterID(monsterId);
	}

	public getUserMonsterID() {
		return this.UserMonsterID;
	}

	public setUserMonsterID(id: number) {
		this.UserMonsterID = id;
	}

	public getUserMonsterName() {
		return this.UserMonsterName;
	}

	public setUserMonsterName(name: string) {
		this.UserMonsterName = name;
	}

	public getMonsterDefaultName() {
		return null;
	}

	public setMonsterDefaultName() {
		return null;
	}

	public getMonsterStates() {
		return this.MonsterStates;
	}

	public addMonsterState() {
		return null;
	}

	public setMonsterState(monsterStates: MonsterState[]) {
		this.MonsterStates = monsterStates;
	}

	public getMonsterTypes() {
			return null;
	}

	public setMonsterTypes() {
			return null;
	}

	public getIsEgg() {
			return null;
	}

	public setIsEgg() {
			return null;
	}
	// this may be easier to divide to the pic id 0-19 then an evolve state A-C
	// then you combine them for id(1) + evolveState(B) = 1B.png
	public setMonsterPictureId(id: string) {
		this.MonsterPictureId = id;
	}

	public getMonsterPictureId(){
		return this.MonsterPictureId;
	}
}
