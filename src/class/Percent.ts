type MaxAndValue = {
  max: number;
  value: number;
}

type ValueAndPercent = {
  value: number;
  percent: number;
}

type PercentAndMax = {
  max: number;
  percent: number;
}

type PercentOptions = MaxAndValue | ValueAndPercent | PercentAndMax;

export class Percent {
  public max: number = 0;
  public value: number = 0;
  public percent: number = 0;

  constructor(options: PercentOptions) {
    if ('max' in options && 'value' in options) {
      this.max = options.max;
      this.value = options.value;
      this.percent = (options.value * 100) / options.max;
    } else if ('value' in options && 'percent' in options) {
      this.value = options.value;
      this.percent = options.percent;
      this.max = (options.value * 100) / options.percent;
    } else if ('max' in options && 'percent' in options) {
      this.max = options.max;
      this.percent = options.percent;
      this.value = (options.percent * options.max) / 100;
    }
  }

  percentString() {
    return `${this.percent}%`;
  }
}
