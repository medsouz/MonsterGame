export default class Item {

	private ItemCount: number;
	private ItemName: string;
	private ItemEffects: number[];
	private ItemValue: number;
	private ItemDescription: string;

	// items in the database are arranged as:
	// items: with an ID and name, as the main table
	// itemEffects: with an effectid, value and description
	// itemeffectslist: a linking table to combine items with effects
	// this is to allow us to create custom items later on, and better versions of existing items
	// as well as "premium" versions of items for paid users which have greater values

	// 0 "Happiness" 1 "Hunger" 2 "Intelligence" 3 "Strength"

	constructor() {
		this.ItemCount = 0;
		this.ItemName = "NON INITIALIZED OBJECT";
		this.ItemValue = 0;
		this.ItemDescription = "NON INITIALIZED OBJECT";
	}

	public updateItemFromDB(userID: number, userItemID: number) {
		// TODO: update this to pull from DB

		// get all UserItems from db UserItems where UserID = userID
		// --- may be best to do this in 8 loops, for item ids 0-7 for now and later
		// --- do some specific updating by name.
		// get itemEffects from db ItemEffects where itemEffectID 0-3 to match above
		// --- will be a positive or negative number to increase or decrease monster states
		// --- later on we can change this to have an item have multiple effects like increase strength but decrease intelligence too
		var item1: Item;
		item1 = this.fakeItemDB(0, userItemID);
		this.setItemCount(item1.getItemCount());
		this.setItemName(item1.getItemName());
		this.setItemValue(item1.getItemValue());
		this.setItemDescription(item1.getItemDescription());

	}

	public getItemCount() {
		return this.ItemCount;
	}

	public setItemCount(count: number) {
		this.ItemCount = count;
	}

	public getItemName() {
		return this.ItemName;
	}

	public setItemName(name: string) {
		this.ItemName = name;
	}

	public getItemEffects() {
		return null;
	}

	public setItemEffects() {
		return null;
	}

	public getItemValue() {
		return this.ItemValue;
	}

	public setItemValue(value: number) {
		this.ItemValue = value;
	}

	public getItemDescription() {
		return this.ItemDescription;
	}

	public setItemDescription(description: string) {
		this.ItemDescription = description;
	}
	public inrementItemCountByOne() {
		this.ItemCount++;
	}

	public decrementItemCountByOne() {
		this.ItemCount--;
	}
	public inrementItemCountByValue(value: number) {
		this.ItemCount += value;
	}

	public decrementItemCountByValue(value: number) {
		this.ItemCount -= value;
	}

	private  fakeItemDB(userID: number, userItemID: number) {

		// 0 "Happiness" 1 "Hunger" 2 "Intelligence" 3 "Strength"

		let fakeDB: Item[] = [
			new Item(),
			new Item(),
			new Item(),
			new Item(),
			new Item(),
			new Item(),
			new Item(),
			new Item()
		];

		fakeDB[0].setItemCount(100);
		fakeDB[0].setItemName("Antidote");
		fakeDB[0].setItemValue(10);
		fakeDB[0].setItemDescription("Antidote");

		fakeDB[1].setItemCount(200);
		fakeDB[1].setItemName("Awakening");
		fakeDB[1].setItemValue(100);
		fakeDB[1].setItemDescription("Awakening");

		fakeDB[2].setItemCount(300);
		fakeDB[2].setItemName("Burn-Heal");
		fakeDB[2].setItemValue(10);
		fakeDB[2].setItemDescription("Burn-Heal");

		fakeDB[3].setItemCount(400);
		fakeDB[3].setItemName("Calcium");
		fakeDB[3].setItemValue(10);
		fakeDB[3].setItemDescription("Calcium");

		fakeDB[4].setItemCount(500);
		fakeDB[4].setItemName("Hyper-Potion");
		fakeDB[4].setItemValue(50);
		fakeDB[4].setItemDescription("Hyper-Potion");

		fakeDB[5].setItemCount(600);
		fakeDB[5].setItemName("Magic Berry");
		fakeDB[5].setItemValue(-50);
		fakeDB[5].setItemDescription("Magic Berry");

		fakeDB[6].setItemCount(700);
		fakeDB[6].setItemName("Pineapple");
		fakeDB[6].setItemValue(-10);
		fakeDB[6].setItemDescription("Pineapple");

		fakeDB[7].setItemCount(800);
		fakeDB[7].setItemName("Quick-Powder");
		fakeDB[7].setItemValue(10);
		fakeDB[7].setItemDescription("Quick-Powder");

		return fakeDB[userItemID];
	}

}
