
export interface ImageSpec {
    fileName: string;
    path?: string;
    width: number;
    height: number;
    idiom?: string;
    scale: number;
    imgData?: string;
}

export interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface ImageDataSet {
    // base64 version of image
    imgSrcDataBase64: string;

    // img data version of image
    imgData: ImageData;
}

export class FileSpec implements ImageSpec {
    constructor(
        public fileName: string,
        public width: number,
        public height: number,
        public path = null,
        public idiom: string = null,
        public scale: number = null,
        public orientation: string = null

    ) { }
}

export interface BundleSpec {
    category: string;
    path: string;
    prefix?: string;
    imageSet: Array<ImageSpec>;
    manifest?: string;
    useAlpha: boolean;
    maintainAspectRatio: boolean;
    resizeFromCentre: boolean;
}

export interface PlatformSpec {
    id: string;
    title: string;
    icon: string;
    path: string;
    instructions: string;
    bundleSpecs: Array<BundleSpec>;
    includeInBundle: boolean;
}

export interface ExportSpec {
    platforms: Array<PlatformSpec>;
}
