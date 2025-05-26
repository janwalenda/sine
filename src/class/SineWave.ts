export type Point = {
  x: number;
  y: number;
}

export interface SineWaveOptions {
  start?: number;
  end?: number;
  resolution?: number;
  x?: number;
  y?: number;
  r: number;
  frequency?: number;
  index?: number;
}

export class SineWave {
  private start: number = 0;
  private end: number = 1000;
  private resolution: number = 1;
  private points: Point[] = [];
  private x: number = 0;
  private y: number = 0;
  private r: number = 5;
  private frequency: number = 1;
  private point: number = 0;

  constructor(options: SineWaveOptions) {
    Object.assign(this, options);
    this.start = (this.start || 0);
    this.end = (this.end || 1000);
    this.resolution = (this.resolution || 1);
    this.points = [];

    for (let i = this.start; i < this.end; i += this.resolution) {
      const tmp: Point = {
        x: i,
        y: this.y + (Math.sin((i * Math.PI * this.frequency + this.x) / 180) * this.r),
      };

      this.points.push(tmp);
    }
    if (options.index) {
      this.point = (this.y || 0) + Math.sin((options.index * Math.PI * this.frequency) / 180) * this.r;
    }
  }

  public getPoint() {
    if(typeof this.point === "number") {
      return this.point;
    }

    throw new Error("Index has not been set. Please provide an index value")
  }

  round() {
    for (const point of this.points) {
      point.x = Math.round(point.x);
      point.y = Math.round(point.y);
    }
  }
  toPolyLine() {
    let sin = "";
    for (const point of this.points) {
      sin += `${point.x},${point.y} `;
    }
    return sin;
  }
  toCanvas(context: CanvasRenderingContext2D) {
    let i = 0;
    for (const point of this.points) {
      if (i == 0) {
        context.moveTo(point.x, point.y);
        i++;
      } else {
        context.lineTo(point.x, point.y);
        i++;
      }
    }
  }
  toJSON(replacer?: (this: any, key: string, value: any) => any, space?: string | number) {
    return JSON.stringify(this.points, replacer, space);
  }
}