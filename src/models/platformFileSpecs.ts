import { PlatformSpec, FileSpec } from './models';

export class PlatformFileSpecs {

    public static Specs(): Array<PlatformSpec> {
        let allPlatforms = new Array<PlatformSpec>();

        let iOS: PlatformSpec = {
            id: 'ios',
            path: 'iOS/',
            icon: 'fa-apple',
            title: 'iOS',
            instructions: 'Import into your Xcode project. Right-click Assets.xcassets, Show in finder. Drag and drop the contents of AppIcon.appiconset to replace the defaults. Note that launch images are no longer supported in iOS, instead you should use a Launch Screen storyboard.',
            includeInBundle: true,
            bundleSpecs:
                [
                    {
                        category: 'icon',
                        path: 'AppIcon.appiconset',
                        prefix: 'Icon',
                        manifest: 'Contents.json',
                        useAlpha: true,
                        maintainAspectRatio: false,
                        resizeFromCentre: false,
                        imageSet: [
                            new FileSpec('-20x20@1x.png', 20, 20, null, 'ipad', 1),
                            new FileSpec('-20x20@2x.png', 20, 20, null, 'iphone', 2),
                            new FileSpec('-20x20@3x.png', 20, 20, null, 'iphone', 3),
                            new FileSpec('-29x29@1x.png', 29, 29, null, 'iphone', 1),
                            new FileSpec('-29x29@2x.png', 29, 29, null, 'iphone', 2),
                            new FileSpec('-29x29@3x.png', 29, 29, null, 'iphone', 3),
                            new FileSpec('-40x40@2x.png', 40, 40, null, 'iphone', 2),
                            new FileSpec('-40x40@3x.png', 40, 40, null, 'iphone', 3),
                            new FileSpec('-60x60@2x.png', 60, 60, null, 'iphone', 2),
                            new FileSpec('-60x60@3x.png', 60, 60, null, 'iphone', 3),
                            new FileSpec('-76x76@1x.png', 76, 76, null, 'ipad', 1),
                            new FileSpec('-76x76@2x.png', 76, 76, null, 'ipad', 2),
                            new FileSpec('-83.5@2x.png', 167, 167, null, 'ipad', 2),
                            new FileSpec('-marketing-1024x1024.png', 1024, 1024, null, 'ios-marketing', 1),
                        ]
                    },
                    {
                        category: 'splash',
                        path: 'LaunchImage.launchimage',
                        prefix: 'LaunchImage',
                        useAlpha: false,
                        maintainAspectRatio: true,
                        resizeFromCentre: true,
                        imageSet: [
                            /* no longer supported in iOS */
                            new FileSpec('~iphone-320x480.png', 320, 480, null, 'iphone', 1),
                            new FileSpec('~iphone_640x960.png', 640, 960, null, 'iphone', 1),
                            new FileSpec('-568h@2x~iphone_640x1136.png', 640, 1136, null, 'iphone', 1),
                            new FileSpec('-Landscape~ipad_1024x748.png', 1024, 748, null, 'ipad', 1, 'landscape'),
                            new FileSpec('-Landscape~ipad_1024x768.png', 1024, 768, null, 'ipad', 1, 'landscape'),
                            new FileSpec('-Landscape@2x~ipad_2048x1496.png', 2048, 1496, null, 'ipad', 2, 'landscape'),
                            new FileSpec('-Landscape@2x~ipad_2048x1536.png', 2048, 1536, null, 'ipad', 2, 'landscape'),
                            new FileSpec('-Landscape@2x~ipad_2224x1668.png', 2224, 1668, null, 'ipad', 2, 'landscape'),
                            new FileSpec('-Landscape@2x~ipad_2732x2048.png', 2732, 2048, null, 'ipad', 2, 'landscape'),
                            new FileSpec('~ipad.png', 1536, 2008, null, 'ipad', 1, 'portrait'),
                            new FileSpec('-Portrait@2x~ipad_1536x2048.png', 1536, 2048, null, 'ipad', 2, 'portrait'),
                            new FileSpec('-Portrait@2x~ipad_1536x2008.png', 1536, 2008, null, 'ipad', 2, 'portrait'),
                            new FileSpec('-Portrait@2x~ipad_1668x2224.png', 1668, 2224, null, 'ipad', 2, 'portrait'),
                            new FileSpec('-Portrait@2x~ipad_2048x2732.png', 2048, 2732, null, 'ipad', 2, 'portrait'),
                            new FileSpec('.png', 768, 1004, null, 'ipad', 1, 'portrait'),
                            new FileSpec('-Portrait~ipad_768x1024.png', 768, 1024, null, 'ipad', 1, 'portrait'),
                            new FileSpec('-750@2x~iphone6-portrait_750x1334.png', 750, 1334, null, 'iphone', 2, 'portrait'),
                            new FileSpec('-750@2x~iphone6-landscape_1334x750.png', 1334, 750, null, 'iphone', 2, 'landscape'),
                            new FileSpec('-1242@3x~iphone6s-portrait_1242x2208.png', 1242, 2208, null, 'iphone', 3, 'portrait'),
                            new FileSpec('-1242@3x~iphone6s-landscape_2208x1242.png', 2208, 1242, null, 'iphone', 3, 'landscape'),
                            new FileSpec('-1125@3x~iphoneX-portrait_1125x2436.png', 1125, 2436, null, 'iphone', 3, 'portrait'),
                            new FileSpec('-2436@3x~iphoneX-landscape_2436x1125.png', 2436, 1125, null, 'iphone', 3, 'landscape'),
                        ]
                    }
                ]
        };
        
        allPlatforms.push(iOS);

        let android: PlatformSpec = {
            id: 'android',
            path: 'android',
            icon: 'fa-android',
            title: 'Android',
            instructions: 'Import into your Android Studio project',
            includeInBundle: true,
            bundleSpecs:
                [
                    {
                        category: 'icon',
                        path: null,
                        prefix: 'icon',
                        useAlpha: true,
                        maintainAspectRatio: false,
                        resizeFromCentre: false,
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
                        useAlpha: false,
                        maintainAspectRatio: true,
                        resizeFromCentre: true,
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

        allPlatforms.push(android);

        let windowsStore: PlatformSpec = {
            id: 'windows',
            path: 'windows',
            icon: 'fa-windows',
            title: 'Windows Store',
            instructions: 'Import into your Visual Studio project',
            includeInBundle: true,
            bundleSpecs:
                [
                    {
                        category: 'icon',
                        path: 'icons',
                        prefix: 'icon',
                        useAlpha: true,
                        maintainAspectRatio: false,
                        resizeFromCentre: false,
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
                        useAlpha: false,
                        maintainAspectRatio: true,
                        resizeFromCentre: true,
                        imageSet: [
                            new FileSpec('Splashscreen-620x300.png', 620, 300),
                            new FileSpec('Splashscreen-868x420.png', 868, 420),
                            new FileSpec('Splashscreen-1116x540.png', 1116, 540),
                        ]
                    }
                ]
        };
        
        allPlatforms.push(windowsStore);

        return allPlatforms;
    }
}