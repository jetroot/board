export type Color = {
    r: number;
    g: number;
    b: number;
};

export type Camera = {
    x: number;
    y: number;
}

export enum LayerType {
    Rectange,
    Ellipse,
    Path,
    Text,
    Note
};

export type RectangeLayer = {
    type: LayerType.Rectange;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
};

export type EllipseLayer = {
    type: LayerType.Ellipse;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
};

export type PathLayer = {
    type: LayerType.Path;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    points: number[][];
    value?: string;
};

export type TextLayer = {
    type: LayerType.Text;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
};

export type NoteLayer = {
    type: LayerType.Note;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
};

export type Point = {
    x: number;
    y: number;
};

export type XYWH = {
    x: number;
    y: number;
    height: number;
    width: number;
};

export enum Side {
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8
};

export type CanvasState = 
    | {
        mode: CanvasMode.None
    }
    | {
        mode: CanvasMode.SelectionNet,
        origin: Point,
        current?: Point
    }| {
        mode: CanvasMode.Translating,
        current: Point
    }| {
        mode: CanvasMode.Inserting,
        layerType: LayerType.Ellipse | LayerType.Rectange | LayerType.Text | LayerType.Note
    }| {
        mode: CanvasMode.Pencil
    }| {
        mode: CanvasMode.Pressing,
        origin: Point
    } | {
        mode: CanvasMode.Resizing,
        initialBounds: XYWH,
        corner: Side
    };

export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Pencil
}

export type Layer = RectangeLayer | EllipseLayer | PathLayer | TextLayer | NoteLayer;