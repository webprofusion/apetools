
export interface ImageSpec {
    fileName: string;
    path?: string | undefined | null;
    width: number;
    height: number;
    idiom?: string | undefined | null;
    scale: number | undefined | null;
    imgData?: string | null;
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
        public path:string | undefined | null = null,
        public idiom:string | undefined | null = null,
        public scale: number | undefined | null = null,
        public orientation:string | undefined | null = null

    ) { }
}

export interface BundleSpec {
    category: string;
    path: string | undefined |null;
    prefix?: string;
    imageSet: Array<FileSpec>;
    manifest?: string | null;
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
