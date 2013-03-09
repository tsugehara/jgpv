module jgpv {
    interface PointingValue {
        point: number;
        value: number;
        easing?: (t: number, b: number, c: number, d: number) => number;
    }
    class PV {
        public pvs: PointingValue[];
        public center: number;
        constructor();
        public add(pv: any, value?: number, easing?: (t: number, b: number, c: number, d: number) => number): PV;
        public getStartPoint(): number;
        public getEndPoint(): number;
        public getMinValue(): number;
        public getMaxValue(): number;
        public get(point: number): number;
        public createDebugCanvas(scale?: number): HTMLCanvasElement;
    }
}
