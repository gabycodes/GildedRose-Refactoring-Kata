import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it('"Sulfuras, Hand of Ragnaros", being a legendary item, never has to be sold or decreases in Quality', () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 1, 50),
    ]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items).toEqual([
      { name: "Sulfuras, Hand of Ragnaros", quality: 50, sellIn: 1 },
    ]);
  });

  test("store contains no items by default", () => {
    const gildedRose = new GildedRose();
    expect(gildedRose.items.length).toEqual(0);
  });

  it("can hold items", () => {
    const gildedRose = new GildedRose([
      new Item("foo", 0, 0),
      new Item("boo", 0, 0),
    ]);
    expect(gildedRose.items.length).toEqual(2);
  });

  it("updateQuality function ultimately returns a list of items", () => {
    const gildedRose = new GildedRose([new Item("test", 5, 5)]);
    expect(gildedRose.updateQuality()).toEqual([
      { name: "test", quality: 4, sellIn: 4 },
    ]);
  });

  it("updateQuality reduces quality & sellIn by 1", () => {
    const gildedRose = new GildedRose([new Item("test", 5, 5)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items).toEqual([{ name: "test", quality: 3, sellIn: 3 }]);
  });

  it("Once the sell by date has passed, Quality degrades twice as fast", () => {
    const gildedRose = new GildedRose([new Item("test", 1, 10)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items).toEqual([
      { name: "test", quality: 7, sellIn: -1 },
    ]);
  });

  it("The Quality of an item is never negative", () => {
    const gildedRose = new GildedRose([new Item("test", 1, 1)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items).toEqual([
      { name: "test", quality: 0, sellIn: -1 },
    ]);
  });

  it('"Aged Brie" actually increases in Quality the older it gets', () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 4)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items).toEqual([
      { name: "Aged Brie", quality: 6, sellIn: 3 },
    ]);
  });

  it("The Quality of an item is never more than 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 1, 50)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items).toEqual([
      { name: "Aged Brie", quality: 50, sellIn: -1 },
    ]);
  });

  it('"Backstage passes" increases in Quality as its SellIn value approaches', () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 20, 10),
    ]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items).toEqual([
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 12,
        sellIn: 18,
      },
    ]);
  });

  // it('"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches', () => {
  //   const gildedRose = new GildedRose([
  //     new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
  //   ]);
  //   gildedRose.updateQuality();
  //   gildedRose.updateQuality();
  //   expect(gildedRose.items).toEqual([
  //     {
  //       name: "Backstage passes to a TAFKAL80ETC concert",
  //       quality: 14,
  //       sellIn: 8,
  //     },
  //   ]);
  // });

  // -
  // - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
  // Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
  // Quality drops to 0 after the concert
});
