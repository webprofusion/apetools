import Vue from 'vue';
import Component from 'vue-class-component';
import { Logger } from '../../util/log';
import * as fileSaver from 'file-saver';
import * as JSZip from 'JSZip';
// import { RadialProgressBar } from 'vue-radial-progress/';

interface ImageSpec {
    fileName: string;
    path?: string;
    width: number;
    height: number;
}

interface BundleSpec {
    category: string;
    path: string;
    imageSet: Array<ImageSpec>;
}

interface PlatformSpec {
    title: string;
    path: string;
    instructions: string;
    bundleSpecs: Array<BundleSpec>;
}

interface ExportSpec {
    platforms: Array<PlatformSpec>;
}

@Component({
    template: require('./about.html')
})
export class AboutComponent extends Vue {

    protected logger: Logger;

    msg: string = 'open..';
    allPlatforms: Array<PlatformSpec>;
    zipArchive: JSZip;
    itemsProcessed: number = 0;
    isArchiveReady: boolean = false;

    mounted() {
        if (!this.logger) this.logger = new Logger();
        this.$nextTick(() => this.logger.info('about is ready!'));

        this.setupSpecs();

        // prepare new zip for archive
        this.zipArchive = new JSZip();
    }

    setupSpecs() {
        this.allPlatforms = new Array<PlatformSpec>();

        let plat1: PlatformSpec = {
            path: 'test1',
            title: 'Test Platform 1',
            instructions: 'Use this',
            bundleSpecs:
            [
                {
                    category: 'set1',
                    path: 'set1',
                    imageSet: [
                        {
                            fileName: 'test80x60.png',
                            width: 80,
                            height: 60,
                        },
                        {
                            fileName: 'test120x80.png',
                            width: 120,
                            height: 80,
                        },
                        {
                            fileName: 'test1200x800.png',
                            width: 1200,
                            height: 800,
                        }
                    ]
                },
                {
                    category: 'set2',
                    path: 'set2',
                    imageSet: [
                        {
                            fileName: 'test2_80x60.png',
                            width: 80,
                            height: 60,
                        },
                        {
                            fileName: 'test2_120x80.png',
                            width: 120,
                            height: 80,
                        },
                        {
                            fileName: 'test2_1200x800.png',
                            width: 1200,
                            height: 800,
                        }
                    ]
                }
            ]
        };

        this.allPlatforms.push(plat1);

        /*
        let plat2: PlatformSpec = <PlatformSpec>{


        };
            this.allPlatforms.push(plat2);
        */
    }

    transformAndArchive(platSpec: PlatformSpec, bundleSpec: BundleSpec, fileSpec: ImageSpec, srcData: string) {

        let canvas = document.createElement('canvas');
        canvas.width = fileSpec.width;
        canvas.height = fileSpec.height;

        const img = new Image();

        img.src = srcData;
        img.onload = () => {
            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, fileSpec.width, fileSpec.height);

            // compress
            let imgData = canvas.toDataURL('image/png');

            let imgFolder = this.zipArchive.folder('bundle').folder(platSpec.path);
            if (bundleSpec.path) imgFolder = imgFolder.folder(bundleSpec.path);
            if (fileSpec.path) imgFolder = imgFolder.folder(fileSpec.path);
            let imgDataBase64 = imgData.replace(/^data:image\/(png|jpg);base64,/, '');

            // add file to zip folder
            imgFolder.file(fileSpec.fileName, imgDataBase64, { base64: true });

            this.itemsProcessed++;
            this.msg = 'Processing Completed ' + this.itemsProcessed;
            this.isArchiveReady = true;
        };

    }

    downloadZip() {
        this.zipArchive.generateAsync({ type: 'blob' })
            .then((content) => {
                // see FileSaver.js
                fileSaver.saveAs(content, 'assetbundle.zip');
            });
    }

    process() {
        this.msg = 'Processing..';

        // take uploaded image
        const inputFile1 = (<HTMLInputElement>document.getElementById('uploadimage1')).files[0];

        const inputFile2 = (<HTMLInputElement>document.getElementById('uploadimage2')).files[0];

        for (let platformSpec of this.allPlatforms) {
            for (let bundleSpec of platformSpec.bundleSpecs) {
                for (let itemSpec of bundleSpec.imageSet) {
                    let srcItem = inputFile1;
                    if (bundleSpec.category === 'set1') {
                        srcItem = inputFile1;
                    }

                    if (bundleSpec.category === 'set2') {
                        srcItem = inputFile2;
                    }
                    // read file, transform size/shape, export and add to zip
                    let reader = new FileReader();

                    reader.addEventListener('load', () => {
                        let srcData = reader.result;
                        this.transformAndArchive(platformSpec, bundleSpec, itemSpec, srcData);
                    }, false);

                    if (srcItem) {
                        // fire above load even for file
                        reader.readAsDataURL(srcItem);
                    }

                }
            }

        }



    }
}
