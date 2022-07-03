export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.map((item) => {
      const { name } = item;

      const ageOneDay = () => (item.sellIn = item.sellIn - 1);

      const increaseOrDecreaseQuality = (number) => {
        const updatedQuality = item.quality + number;
        if (updatedQuality < 1) {
          return (item.quality = 0);
        } else if (item.quality > 50) {
          return (item.quality = 50);
        } else {
          return (item.quality = updatedQuality);
        }
      };

      switch (name) {
        case "Aged Brie":
          increaseOrDecreaseQuality(+1);
          ageOneDay();
          break;

        case "Backstage passes to a TAFKAL80ETC concert":
          if (item.sellIn < 1) {
            increaseOrDecreaseQuality(-item.quality);
          } else if (item.sellIn <= 5) {
            increaseOrDecreaseQuality(+3);
          } else if (item.sellIn <= 10) {
            increaseOrDecreaseQuality(+2);
          } else {
            increaseOrDecreaseQuality(+1);
          }

          ageOneDay();
          break;

        case "Sulfuras, Hand of Ragnaros":
          break;

        default:
          item.sellIn < 1
            ? increaseOrDecreaseQuality(-2)
            : increaseOrDecreaseQuality(-1);
          ageOneDay();

          break;
      }
    });

    return this.items;
  }
}
