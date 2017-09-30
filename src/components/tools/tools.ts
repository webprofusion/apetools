import Vue from 'vue';
import Component from 'vue-class-component';
import { Logger } from '../../util/log';
import * as fileSaver from 'file-saver';
import * as JSZip from 'JSZip';

interface ImageSpec {
    fileName: string;
    path?: string;
    width: number;
    height: number;
}

class FileSpec implements ImageSpec {
    constructor(public fileName: string, public width: number, public height: number, public path = null) { }
}

interface BundleSpec {
    category: string;
    path: string;
    prefix?: string;
    imageSet: Array<ImageSpec>;
}

interface PlatformSpec {
    title: string;
    icon: string;
    path: string;
    instructions: string;
    bundleSpecs: Array<BundleSpec>;
}

interface ExportSpec {
    platforms: Array<PlatformSpec>;
}

@Component({
    template: require('./tools.html')
})
export class ToolsComponent extends Vue {

    protected logger: Logger;

    msg: string = '';
    allPlatforms: Array<PlatformSpec>;
    zipArchive: JSZip;
    itemsProcessed: number = 0;
    isArchiveReady: boolean = false;
    selectedIconFile: any = null;
    selectedSplashFile: any = null;
    processingProgress: number = 0;
    totalTasks: number = 0;

    mounted() {
        if (!this.logger) this.logger = new Logger();
        this.$nextTick(() => this.logger.info('about is ready!'));

        this.setupSpecs();

        // prepare new zip for archive
        this.zipArchive = new JSZip();
    }

    setupSpecs() {
        this.allPlatforms = new Array<PlatformSpec>();

        let iOS: PlatformSpec = {
            path: 'iOS/Resources',
            icon: 'fa-apple',
            title: 'iOS',
            instructions: 'Import into your Xcode project',
            bundleSpecs:
            [
                {
                    category: 'icon',
                    path: 'icons',
                    prefix: 'Icon',
                    imageSet: [
                        new FileSpec('-small.png', 29, 29),
                        new FileSpec('.png', 57, 57),
                        new FileSpec('@2x.png', 114, 114),
                        new FileSpec('-40.png', 40, 40),
                        new FileSpec('-40@2x.png', 80, 80),
                        new FileSpec('-small@3x.png', 87, 87),
                        new FileSpec('-50.png', 50, 50),
                        new FileSpec('-small@2x.png', 58, 58),
                        new FileSpec('-50@2x.png', 100, 100),
                        new FileSpec('-60.png', 60, 60),
                        new FileSpec('-72.png', 72, 72),
                        new FileSpec('-72@2x.png', 144, 144),
                        new FileSpec('-76.png', 76, 76),
                        new FileSpec('-40@2x.png', 80, 80),
                        new FileSpec('-60@2x.png', 120, 120),
                        new FileSpec('-76@2x.png', 152, 152),
                        new FileSpec('-167.png', 167, 167),
                        new FileSpec('-60@3x.png', 180, 180)
                    ]
                },
                {
                    category: 'splash',
                    path: 'splash',
                    prefix: 'Default',
                    imageSet: [
                        new FileSpec('~iphone.png', 320, 480),
                        new FileSpec('@2x~iphone_640x960.png', 640, 960),
                        new FileSpec('-568h@2x~iphone_640x1136.png', 640, 1136),
                        new FileSpec('-Landscape~ipad_1024x748.png', 1024, 748),
                        new FileSpec('-Landscape~ipad_1024x768.png', 1024, 768),
                        new FileSpec('-Landscape@2x~ipad_2048x1496.png', 2048, 1496),
                        new FileSpec('-Landscape@2x~ipad_2048x1536.png', 2048, 1536),
                        new FileSpec('~ipad.png', 1536, 2008),
                        new FileSpec('-Portrait@2x~ipad_1536x2048.png', 1536, 2048),
                        new FileSpec('-Portrait@2x~ipad_1536x2008.png', 1536, 2008),
                        new FileSpec('.png', 768, 1004),
                        new FileSpec('-Portrait~ipad_768x1024.png', 768, 1024),
                        new FileSpec('-750@2x~iphone6-portrait_750x1334.png', 750, 1334),
                        new FileSpec('-750@2x~iphone6-landscape_1334x750.png', 1334, 750),
                        new FileSpec('-1242@3x~iphone6s-portrait_1242x2208.png', 1242, 2208),
                        new FileSpec('-1242@3x~iphone6s-landscape_2208x1242.png', 2208, 1242),
                    ]
                }
            ]
        };

        this.allPlatforms.push(iOS);

        let android: PlatformSpec = {
            path: 'android',
            icon: 'fa-android',
            title: 'Android',
            instructions: 'Import into your Android Studio project',
            bundleSpecs:
            [
                {
                    category: 'icon',
                    path: null,
                    prefix: 'icon',
                    imageSet: [
                        new FileSpec('.png', 96, 96, 'drawable'),
                        new FileSpec('.png', 36, 36, 'drawable-ldpi'),
                        new FileSpec('.png', 48, 48, 'drawable-mdpi'),
                        new FileSpec('.png', 72, 72, 'drawable-hdpi'),
                        new FileSpec('.png', 96, 96, 'drawable-xhdpi'),
                        new FileSpec('.png', 152, 152, 'drawable-xxhdpi'),
                        new FileSpec('.png', 192, 192, 'drawable-xxxhdpi')
                    ]
                },
                {
                    category: 'splash',
                    path: null,
                    prefix: 'screen',
                    imageSet: [
                        new FileSpec('.png', 480, 800, 'drawable'),
                        new FileSpec('.png', 800, 480, 'drawable-land'),
                        new FileSpec('.png', 200, 320, 'drawable-ldpi'),
                        new FileSpec('.png', 320, 200, 'drawable-land-ldpi'),
                        new FileSpec('.png', 320, 480, 'drawable-mdpi'),
                        new FileSpec('.png', 480, 320, 'drawable-land-mdpi'),
                        new FileSpec('.png', 480, 800, 'drawable-hdpi'),
                        new FileSpec('.png', 800, 480, 'drawable-land-hdpi'),
                        new FileSpec('.png', 720, 1280, 'drawable-xhdpi'),
                        new FileSpec('.png', 1280, 720, 'drawable-land-xhdpi'),
                        new FileSpec('.png', 960, 1600, 'drawable-xxhdpi'),
                        new FileSpec('.png', 1600, 960, 'drawable-land-xxhdpi'),
                        new FileSpec('.png', 1280, 1920, 'drawable-xxxhdpi'),
                        new FileSpec('.png', 1920, 1280, 'drawable-land-xxxhdpi'),
                    ]
                }
            ]
        };
        this.allPlatforms.push(android);

        let windowsStore: PlatformSpec = {
            path: 'windows',
            icon: 'fa-windows',
            title: 'Windows Store',
            instructions: 'Import into your Visual Studio project',
            bundleSpecs:
            [
                {
                    category: 'icon',
                    path: 'icons',
                    prefix: 'icon',
                    imageSet: [
                        new FileSpec('ApplicationIcon-16x16.png', 16, 16),
                        new FileSpec('ApplicationIcon-24x24.png', 24, 24),
                        new FileSpec('ApplicationIcon-30x30.png', 30, 30),
                        new FileSpec('ApplicationIcon-32x32.png', 32, 32),
                        new FileSpec('ApplicationIcon-42x42.png', 42, 42),
                        new FileSpec('ApplicationIcon-48x48.png', 48, 48),
                        new FileSpec('ApplicationIcon-50x50.png', 50, 50),
                        new FileSpec('ApplicationIcon-54x54.png', 54, 54),
                        new FileSpec('ApplicationIcon-70x70.png', 70, 70),
                        new FileSpec('ApplicationIcon-90x90.png', 90, 90),
                        new FileSpec('ApplicationIcon-150x150.png', 150, 150),
                        new FileSpec('ApplicationIcon-120x120.png', 120, 120),
                        new FileSpec('ApplicationIcon-210x210.png', 210, 210),
                        new FileSpec('ApplicationIcon-256x256.png', 256, 256),
                        new FileSpec('ApplicationIcon-270x270.png', 270, 270)
                    ]
                },
                {
                    category: 'splash',
                    path: 'splashscreens',
                    prefix: 'screen',
                    imageSet: [
                        new FileSpec('Splashscreen-620x300.png', 620, 300),
                        new FileSpec('Splashscreen-868x420.png', 868, 420),
                        new FileSpec('Splashscreen-1116x540.png', 1116, 540),
                    ]
                }
            ]
        };
        this.allPlatforms.push(windowsStore);
    }

    selectionChanged(imageType: string, e: any) {
        // icon/splash changed

        if (imageType === 'splash') {
            this.selectedSplashFile = e.target.files[0];
        }

        if (imageType === 'icon') {
            this.selectedIconFile = e.target.files[0];
        }
    }

    transformAndArchive(platSpec: PlatformSpec, bundleSpec: BundleSpec, fileSpec: ImageSpec, srcData: string, fromCentre: boolean) {

        let canvas = document.createElement('canvas');
        canvas.width = fileSpec.width;
        canvas.height = fileSpec.height;

        const img = new Image();

        img.src = srcData;
        img.onload = () => {
            let ctx = canvas.getContext('2d');
            ctx.mozImageSmoothingEnabled = true;
            ctx.webkitImageSmoothingEnabled = true;
            ctx.webkitImageSmoothingEnabled = true;
            ctx.imageSmoothingEnabled = true;
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, fileSpec.width, fileSpec.height);

            // compress
            let imgData = canvas.toDataURL('image/png');
            let imgFolder = this.zipArchive.folder('bundle');

            imgFolder = imgFolder.folder(platSpec.path);
            if (bundleSpec.path) imgFolder = imgFolder.folder(bundleSpec.path);
            if (fileSpec.path) imgFolder = imgFolder.folder(fileSpec.path);
            let imgDataBase64 = imgData.replace(/^data:image\/(png|jpg);base64,/, '');

            // add file to zip folder
            imgFolder.file(bundleSpec.prefix + fileSpec.fileName, imgDataBase64, { base64: true });

            this.itemsProcessed++;

            this.processingProgress = this.itemsProcessed / this.totalTasks * 100;
            this.msg = 'Processing Completed ' + this.processingProgress;

            if (this.processingProgress === 100) {
                this.isArchiveReady = true;
            }

        };

    }

    downloadZip() {
        this.zipArchive.generateAsync({ type: 'blob' })
            .then((content) => {
                // see FileSaver.js
                fileSaver.saveAs(content, 'ApeToolsGeneratedAssets.zip');
            });
    }

    process() {
        this.msg = 'Processing..';

        let numTasks = 0;
        // compute total number of tasks to perform
        for (let platformSpec of this.allPlatforms) {
            for (let bundleSpec of platformSpec.bundleSpecs) {
                for (let itemSpec of bundleSpec.imageSet) {
                    if (bundleSpec.category === 'icon' && this.selectedIconFile) {
                        numTasks++;
                    }

                    if (bundleSpec.category === 'splash' && this.selectedSplashFile) {
                        numTasks++;
                    }
                }
            }
        }
        this.totalTasks = numTasks;

        // process the images for each platform
        this.processingProgress = 0;

        for (let platformSpec of this.allPlatforms) {
            for (let bundleSpec of platformSpec.bundleSpecs) {
                for (let itemSpec of bundleSpec.imageSet) {
                    let srcItem = null;
                    let fromCentre: boolean = false;
                    if (bundleSpec.category === 'icon') {
                        srcItem = this.selectedIconFile;
                    }

                    if (bundleSpec.category === 'splash') {
                        srcItem = this.selectedSplashFile;
                        fromCentre = true; // splashscreens work from centre and crop rather than resize source to fit
                    }
                    setTimeout(() => {
                        if (srcItem != null) {
                            // read file, transform size/shape, export and add to zip
                            let reader = new FileReader();

                            reader.addEventListener('load', () => {
                                let srcData = reader.result;
                                this.transformAndArchive(platformSpec, bundleSpec, itemSpec, srcData, fromCentre);
                            }, false);


                            // fire above load event for file, allow a little time for UI updates
                            reader.readAsDataURL(srcItem);
                        }

                    }, 300);
                }
            }
        }
    }
}
