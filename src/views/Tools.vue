<template>
  <div class="container col-xxl-8 px-4 py-5">
    <div class="row">
      <div class="col-md-12">
        <img
          src="@/assets/logo.png"
          style="
            float: left;
            margin-top: 2em;
            margin-right: 2em;
            height: 5em;
            width: auto;
          "
          class="img-circle"
        />
        <h2>Ape Tools - Image Gorilla</h2>
        <p class="lead">
          Tired of creating all your icons and splashscreen sizes manually?
          You've come to the right place.
        </p>
        <p>
          Upload your Icons and/or Splashscreen and we'll do all the hard work
          to create the sizes you need for each platform:
        </p>
        <p>
          Need to design a logo first? Try
          <a target="_blank" href="https://logojoy.grsm.io/apetools">Logojoy</a>
        </p>
        <p>
          Want to quickly make some PNGs (or JPGs) tiny? Check out
          <a target="_blank" href="https://www.betweenelements.com/tinypng-app"
            >tinyPNG.App</a
          >
        </p>
        <p>
          Is it just too hard to manage your website certificates? See
          <a target="_blank" href="https://certifytheweb.com"
            >Certify the web</a
          >
        </p>
        <div class="row">
          <div class="col-md-6">
            <div class="panel panel-default">
              <div class="panel-body">
                <h3>Step 1 - Select Your Icon</h3>
                <div class="input-group file-upload">
                  <input
                    type="file"
                    accept="image/*"
                    id="fileupload-icon"
                    v-on:change="selectionChanged('icon', $event)"
                    name="FileUploadIcon"
                  />
                </div>
                <p>
                  Select an Icon image in PNG format (transparency allowed)
                  measuring 1024x1024 pixels.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="panel panel-default">
              <div class="panel-body">
                <h3>Step 2 - Select Your Splashscreen</h3>
                <div class="input-group file-upload">
                  <input
                    type="file"
                    accept="image/*"
                    id="fileupload-splash"
                    v-on:change="selectionChanged('splash', $event)"
                    name="FileUploadSplash"
                  />
                </div>
                <p>
                  Select a Splashscreen image in PNG format (no transparency)
                  measuring 4096*4096 pixels with the important stuff centred,
                  we'll then resize from the centre outwards, sampling the top
                  left corner colour as background.
                  <span class="sample-swatch" :style="sampleStyle">&nbsp;</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12"></div>
        </div>

        <div v-if="selectedIconFile || selectedSplashFile">
          <h4 class="clearfix" style="clear: left">
            Step 3 - Where the magic happens
          </h4>

          <p v-if="!isProcessing && !isArchiveReady" class="alert alert-info">
            Ready to Punch It?
            <button
              type="button"
              v-on:click="process"
              class="btn btn-primary btn-lg"
            >
              <i class="fa fa-thumbs-up" aria-hidden="true"></i> Kapow!
            </button>

            <input type="checkbox" :id="showPreviews" v-model="showPreviews" />
            <label for="checkbox"> show previews</label>
          </p>

          <div v-if="isProcessing">
            <i class="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
            {{ msg }}
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="70"
                aria-valuemin="0"
                aria-valuemax="100"
                v-bind:style="{ width: processingProgress + '%' }"
              >
                <span class="sr-only"
                  >Processing {{ processingProgress }}% Complete</span
                >
              </div>
            </div>
          </div>

          <div v-if="isArchiveReady">
            <button class="btn btn-success btn-lg" v-on:click="downloadZip">
              Download Zip
            </button>
            <a href="https://apetools.webprofusion.com" class="ms-2">Try Again</a>
          </div>

          <p>
            We will generate an asset bundle you can download for the following
            platforms:
          </p>

          <div
            v-for="platform of allPlatforms"
            :key="platform.id"
            style="
              width: 300px;
              min-height: 100px;
              display: inline-block;
              border: 1px solid gainsboro;
              box-shadow: #c0c0c0 2px 2px;
              padding: 1em;
              margin: 1em;
            "
          >
            <h3>
              <i class="fa fa-lg fa-fw" v-bind:class="platform.icon"></i>
              {{ platform.title }}
            </h3>
            <p class="lead">
              {{
                platform.bundleSpecs.filter((f) => f.category == "icon")[0]
                  .imageSet.length
              }}
              icon sizes,
              {{
                platform.bundleSpecs.filter((f) => f.category == "splash")[0]
                  .imageSet.length
              }}
              splashscreen sizes.
            </p>

            <input
              type="checkbox"
              :id="platform.path"
              v-model="platform.includeInBundle"
            />
            <label for="checkbox"> include in bundle </label>

            <div v-if="platform.includeInBundle">
              <p>{{ platform.instructions }}</p>
              <div v-if="showPreviews">
                <div
                  v-for="bundle of platform.bundleSpecs"
                  :key="bundle.category"
                >
                  <h2>{{ bundle.category }}</h2>
                  <input
                    v-model="bundle.prefix"
                    placeholder="file name prefix"
                  />
                  <ul
                    class="list-group"
                    v-for="(fileSpec, i) of bundle.imageSet"
                    :key="i"
                  >
                    <li class="list-group-item">
                      {{ fileSpec.path }} {{ fileSpec.prefix }}
                      {{ fileSpec.idiom }} {{ fileSpec.fileName }}:
                      {{ fileSpec.width * fileSpec.scale }}x{{
                        fileSpec.height * fileSpec.scale
                      }}
                      <img
                        v-if="fileSpec.imgData"
                        :src="fileSpec.imgData"
                        style="max-width: 200px; max-height: 200px"
                        class="img-thumbnail"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="well well-sm">
        <p>
          We'd really appreciate it if you could tell others about this app:
          <a
            href="https://twitter.com/share"
            class="twitter-share-button"
            data-url="https://apetools.webprofusion.com"
            data-text="Check out Ape Tools, the quick way to generate all the icons and splash screens for your app:"
            data-via="webprofusion"
            >Share</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Logger } from "../util/log";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import pica from "pica";
import { setTimeout } from "timers";
import {
  PlatformSpec,
  RGBA,
  BundleSpec,
  ImageSpec,
  ImageDataSet,
} from "../models/models";

import { PlatformFileSpecs } from "./../models/platformFileSpecs";

@Options({})
export default class Tools extends Vue {
  protected logger: Logger = new Logger();

  msg = "";
  allPlatforms: Array<PlatformSpec> = [];
  zipArchive: JSZip | undefined;
  itemsProcessed = 0;
  isArchiveReady = false;
  isProcessing = false;
  isCropSplashFromCentreMode = false;
  selectedIconFile: any = null;
  selectedSplashFile: any = null;
  processingProgress = 0;
  totalTasks = 0;
  showPreviews = false;

  iconSrcData: string | null = null;
  iconImgData: ImageData | undefined;
  splashSrcData: string | undefined;
  splashImgData: ImageData | undefined;
  splashColourSample: RGBA = { r: 0, g: 0, b: 0, a: 255 };

  pica = new pica({ features: ["js","wasm"] });

  get sampleStyle(): string {
    return `background-color: rgb(${this.splashColourSample.r}, ${this.splashColourSample.g}, ${this.splashColourSample.b});`;
  }

  mounted() {
    if (!this.logger) this.logger = new Logger();

    this.allPlatforms = PlatformFileSpecs.Specs();

    // prepare new zip for archive
    this.zipArchive = new JSZip();
  }

  async selectionChanged(imageType: string, e: any) {
    // icon/splash changed

    if (imageType === "splash") {
      this.selectedSplashFile = e.target.files[0];

      // get image and sample it

      let result = await this.getSourceImageForProcessing(
        "splash",
        this.selectedSplashFile
      );
      this.splashImgData = result.imgData;

      // sample splash corner colour for canvas fill
      this.splashColourSample = this.samplePixelValue(
        this.splashImgData,
        10,
        10
      );
    }

    if (imageType === "icon") {
      this.selectedIconFile = e.target.files[0];
    }
  }

  samplePixelValue(
    imagedata: ImageData,
    sampleX: number,
    sampleY: number
  ): RGBA {
    //  get pixelArray from imagedata object
    let data = imagedata.data;

    //  image data is array of RGBA values (4 bytes). Pixel sample offset is Y value * width of image, plus X pixels across.
    let i = (sampleY * imagedata.width + sampleX) * 4;

    //  get RGBA values
    let result: RGBA = {
      r: data[i],
      g: data[i + 1],
      b: data[i + 2],
      a: data[i + 3],
    };
    return result;
  }

  simpleImageResize(
    // eslint-disable-next-line no-undef
    img: CanvasImageSource,
    canvas: HTMLCanvasElement
  ): Promise<ImageData> {
    // resize the given image onto the destination canvas
    return new Promise<ImageData>((resolve, reject) => {
      let context = canvas.getContext("2d");

      if (context != null) {
        context.drawImage(
          img,
          0,
          0,
          img.width as number,
          img.height as number,
          0,
          0,
          canvas.width,
          canvas.height
        );

        setTimeout(() => {
          if (context != null) {
            let imgData = context.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            resolve(imgData);
          }
        }, 500);
      } else {
        reject();
      }
    });
  }

  getImageData(imgSrcData: string): Promise<ImageData> {
    return new Promise<ImageData>((resolve, reject) => {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");

      if (canvas != null) {
        const img = new Image();

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context?.drawImage(img, 0, 0, img.width, img.height);
          setTimeout(() => {
            if (context != null) {
              let imgData = context.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
              );
              resolve(imgData);
            }
          }, 500);

          return;
        };

        img.src = imgSrcData;
      } else {
        this.logger.warn("getImageData: Canvas is null");
        reject();
      }
    });
  }

  transformAndArchive(
    platSpec: PlatformSpec,
    bundleSpec: BundleSpec,
    fileSpec: ImageSpec,
    srcImage: ImageDataSet,
    fromCentre: boolean
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // create new canvas for our target image render
      let canvas = document.createElement("canvas");

      let newWidth = fileSpec.width;
      let newHeight = fileSpec.height;

      if (fileSpec.scale != null) {
        newWidth = fileSpec.width * fileSpec.scale;
        newHeight = fileSpec.height * fileSpec.scale;
      }

      // TODO: for fixed aspect ratio, work out largest width or height
      // for resize from centre, sample corner value and fill canvas, then centre resized image in canvas
      canvas.width = newWidth;
      canvas.height = newHeight;

      let isPortrait = true;

      if (bundleSpec.maintainAspectRatio) {
        let aspectRatio = srcImage.imgData.width / srcImage.imgData.height;
        if (fileSpec.width > fileSpec.height) {
          // original height / original width * new width = new height
          // landscape aspect

          let maxDimension = fileSpec.height;
          canvas.width = maxDimension;
          canvas.height =
            (srcImage.imgData.height / srcImage.imgData.width) * maxDimension;
        } else {
          // portrait aspect
          // original width / original height * new height = new width
          isPortrait = true;
          let maxDimension = fileSpec.width;
          canvas.width =
            (srcImage.imgData.width / srcImage.imgData.height) * maxDimension;
          canvas.height = maxDimension;
        }
      }

      const img = new Image();

      img.onload = () => {
        // if image has no alpha, fill with background color based on sample
        this.logger.info(
          `resizing ${img.width} x ${img.height} to ${fileSpec.width} x ${fileSpec.height}  canvas: ${canvas.width}x${canvas.height}`
        );

        // FIXME: no idea what this calculation should be (crop from center)
        if (this.isCropSplashFromCentreMode && bundleSpec.maintainAspectRatio) {
          // copy source image to a canvas, cropped from centre

          let destx = -(img.width / 2) + fileSpec.width / 2;
          let desty = -(img.height / 2) + fileSpec.height / 2;

          let srcCtx = canvas.getContext("2d");
          if (srcCtx != null) {
            srcCtx.drawImage(img, destx, desty);

            this.logger.info(
              `crop from centre: fileSpec ${fileSpec.width}x${fileSpec.height} ': Src img: ${srcImage.imgData.width}x${srcImage.imgData.height} , Src Canvas ${canvas.width} x ${canvas.height} destX:${destx}, destY:${desty}`
            );

            this.addImageToBundle(canvas, fileSpec, platSpec, bundleSpec);

            return resolve(true);
          } else {
            reject("Invalid context");
          }
        } else {
          // resize to fit

          this.pica
            .resize(img, canvas, {
              unsharpAmount: 160,
              unsharpRadius: 0.6,
              unsharpThreshold: 1,
              //   alpha: bundleSpec.useAlpha,
            })

            .then(
              () => {
                if (bundleSpec.maintainAspectRatio) {
                  let destCanvas = document.createElement("canvas");
                  destCanvas.width = fileSpec.width;
                  destCanvas.height = fileSpec.height;

                  let sample: RGBA = this.splashColourSample;

                  let ctx = destCanvas.getContext("2d");
                  if (ctx != null) {
                    ctx.fillStyle =
                      "rgb(" + sample.r + "," + sample.g + "," + sample.b + ")";
                    ctx.fillRect(0, 0, destCanvas.width, destCanvas.height);
                    // centre destination coord to draw image to
                    let destx = (destCanvas.width - canvas.width) / 2;
                    let desty = (destCanvas.height - canvas.height) / 2;
                    if (destx < 0) destx = 0;
                    if (desty < 0) desty = 0;

                    this.logger.info(
                      `fileSpec ${fileSpec.width}x${fileSpec.height} : Src img: ${srcImage.imgData.width}x${srcImage.imgData.height} , Src Canvas ${canvas.width} x ${canvas.height} Dest: ${destCanvas.width} x ${destCanvas.height} destX:${destx}, destY:${desty}`
                    );
                    ctx.drawImage(canvas, destx, desty);
                    canvas = destCanvas;
                  }
                }

                this.addImageToBundle(canvas, fileSpec, platSpec, bundleSpec);

                return resolve(true);
              },
              () => {
                return reject("Resize failed");
              }
            );
        }
      };

      // trigger image load for source image, which then triggers processing onload
      img.src = srcImage.imgSrcDataBase64;
    });
  }

  addImageToBundle(
    canvas: HTMLCanvasElement,
    fileSpec: ImageSpec,
    platSpec: PlatformSpec,
    bundleSpec: BundleSpec
  ): void {
    
    this.logger.info("resize done, adding to bundle.");

    // take generated image and archive it in our bundle
    let imgData = canvas.toDataURL("image/png");

    fileSpec.imgData = imgData;
    if (this.zipArchive != null) {
      let imgFolder: JSZip | null | undefined =
        this.zipArchive.folder("bundle");

      imgFolder = imgFolder?.folder(platSpec.path) ?? null;
      if (imgFolder != null) {
        if (bundleSpec.path) imgFolder = imgFolder.folder(bundleSpec.path);
        if (fileSpec.path) imgFolder = imgFolder?.folder(fileSpec.path);

        let imgDataBase64 = imgData.replace(
          /^data:image\/(png|jpg);base64,/,
          ""
        );

        // add file to zip folder
        imgFolder?.file(bundleSpec.prefix + fileSpec.fileName, imgDataBase64, {
          base64: true,
        });
      } else {
        this.logger.warn("Bundle image folder is null");
      }
    } else {
      this.logger.warn("Zip archive is null");
    }
  }

  downloadZip() : void {
    this.zipArchive?.generateAsync({ type: "blob" }).then((content) => {
      // see FileSaver.js
      saveAs(content, "ApeToolsGeneratedAssets.zip");
    });
  }

  appendToManifest(
    generatedManifest: any,
    bundleSpec: BundleSpec,
    itemSpec: ImageSpec
  ) : void {
    generatedManifest.images.push({
      idiom: itemSpec.idiom,
      size: itemSpec.width + "x" + itemSpec.height,
      scale: itemSpec.scale + "x",
      filename: bundleSpec.prefix + itemSpec.fileName,
    });
  }

  getSourceImageForProcessing(
    srcItemCategory: string,
    srcItemBlob: any
  ): Promise<ImageDataSet> {
    let promise = new Promise<any>((resolve, reject) => {
      if (srcItemCategory === "icon" && this.iconSrcData != null) {
        resolve({
          imgSrcDataBase64: this.iconSrcData,
          imgData: this.iconImgData,
        });
        return;
      }

      if (srcItemCategory === "splash" && this.splashSrcData != null) {
        resolve({
          imgSrcDataBase64: this.splashSrcData,
          imgData: this.splashImgData,
        });
        return;
      }

      // not got cached values, read image data blob and process

      let reader = new FileReader();

      reader.addEventListener(
        "load",
        () => {
          let srcData = reader.result as string;

          // use setTimeout to allow image time to complete load, otherwise reading image data doesn't always work
          setTimeout(() => {
            return this.getImageData(srcData).then((imgData) => {
              // cache values
              if (srcItemCategory === "icon") {
                this.iconSrcData = srcData;
                this.iconImgData = imgData;
              }

              if (srcItemCategory === "splash") {
                this.splashSrcData = srcData;
                this.splashImgData = imgData;
              }

              resolve({
                imgSrcDataBase64: srcData,
                imgData: imgData,
              });
              return;
            });
          }, 500);
        },
        false
      );

      // fire above load event for file
      reader.readAsDataURL(srcItemBlob);
    });

    return promise;
  }

  async process() : Promise<void> {
    this.msg = "Processing..";
    this.logger.info("Begin processing..");
    this.isProcessing = true;
    this.isArchiveReady = false;
    let numTasks = 0;

    // compute total number of tasks to perform and compile manifests if required
    for (let platformSpec of this.allPlatforms) {
      if (platformSpec.includeInBundle) {
        for (let bundleSpec of platformSpec.bundleSpecs) {
          let generatedManifest: any = null;

          // optionally generate a manifest file
          if (bundleSpec.manifest != null && platformSpec.id === "ios") {
            generatedManifest = {
              images: [],
              info: { version: 1, author: "apetools.webprofusion.com" },
            };
          }

          for (let itemSpec of bundleSpec.imageSet) {
            if (
              (bundleSpec.category === "icon" && this.selectedIconFile) ||
              (bundleSpec.category === "splash" && this.selectedSplashFile)
            ) {
              if (generatedManifest)
                this.appendToManifest(generatedManifest, bundleSpec, itemSpec);
              numTasks++;
            }
          }

          if (bundleSpec.manifest != null) {
            bundleSpec.manifest = generatedManifest;
            this.logger.info(JSON.stringify(bundleSpec.manifest));
          }
        }
      }
    }

    this.totalTasks = numTasks;

    this.logger.info(`Generating ${this.totalTasks} assets for bundle..`);

    if (this.totalTasks > 0) {
      // process the images for each platform
      this.processingProgress = 0;

      // cache image data
      if (this.selectedIconFile)
        await this.getSourceImageForProcessing("icon", this.selectedIconFile);
      if (this.selectedSplashFile) {
        await this.getSourceImageForProcessing(
          "splash",
          this.selectedSplashFile
        );

        // sample splash corner colour for canvas fill
        // this.splashColourSample = this.samplePixelValue(this.splashImgData, 0, 0);
      }

      for (let platformSpec of this.allPlatforms) {
        if (platformSpec.includeInBundle) {
          for (let bundleSpec of platformSpec.bundleSpecs) {
            for (let itemSpec of bundleSpec.imageSet) {
              let srcItem: any = null;
              let fromCentre = false;

              if (bundleSpec.category === "icon") {
                srcItem = this.selectedIconFile;
              }

              if (bundleSpec.category === "splash") {
                srcItem = this.selectedSplashFile;
              }
              if (srcItem != null) {
                setTimeout(async () => {
                  await this.getSourceImageForProcessing(
                    bundleSpec.category,
                    srcItem
                  ).then((imgBundle: ImageDataSet) => {
                    this.transformAndArchive(
                      platformSpec,
                      bundleSpec,
                      itemSpec,
                      imgBundle,
                      fromCentre
                    ).then(() => {
                      this.itemsProcessed++;

                      this.processingProgress = Math.round(
                        (this.itemsProcessed / this.totalTasks) * 100
                      );
                      this.msg = "Processing " + this.processingProgress + "%";
                      this.logger.info(this.msg);
                      if (this.processingProgress === 100) {
                        this.isArchiveReady = true;
                        this.isProcessing = false;
                      }

                      // ask vue to re-render
                      this.$forceUpdate();
                    });
                  });
                }, 1000);
              }
            }

            // optionally include generated manifest in archiver
            if (bundleSpec.manifest) {
              // append manifest to archive
              let imgFolder = this.zipArchive?.folder("bundle");
              if (imgFolder != null) {
                imgFolder = imgFolder.folder(platformSpec.path);
                imgFolder = imgFolder?.folder(bundleSpec.path as string);
                imgFolder?.file(
                  "Contents.json",
                  JSON.stringify(bundleSpec.manifest, null, "\t")
                );
              }
            }
          }
        }
      }

      this.logger.info(`Bundle generation completed.`);
    } else {
      this.logger.info("Nothing to do..");
      this.isProcessing = false;

      alert(
        "The apes are bored, there's nothing to do. \nMaybe set an icon or splashscreen and check a few platforms?"
      );
    }
  }
}
</script>

<style scoped>
</style>