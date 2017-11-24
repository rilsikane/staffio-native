package com.gable.mobilestaffio;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativenavigation.NavigationApplication;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.rnfs.RNFSPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;

//public class MainApplication extends Application implements ReactApplication {
//
//  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
//    @Override
//    public boolean getUseDeveloperSupport() {
//      return BuildConfig.DEBUG;
//    }
//
//    @Override
//    protected List<ReactPackage> getPackages() {
//      return Arrays.<ReactPackage>asList(
//          new MainReactPackage(),
//            new NavigationReactPackage(),
//            new ImageResizerPackage(),
//            new BackgroundTimerPackage(),
//            new RNDeviceInfo(),
//            new RNFSPackage(),
//            new RCTCameraPackage(),
//            new RNSpinkitPackage(),
//            new SplashScreenReactPackage(),
//            new FIRMessagingPackage(),
//            new VectorIconsPackage()
//      );
//    }
//  };
//
//  @Override
//  public ReactNativeHost getReactNativeHost() {
//    return mReactNativeHost;
//  }
//
//  @Override
//  public void onCreate() {
//    super.onCreate();
//    SoLoader.init(this, /* native exopackage */ false);
//  }
//}
public class MainApplication extends NavigationApplication {

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
            new ImageResizerPackage(),
            new BackgroundTimerPackage(),
            new RNDeviceInfo(),
            new RNFSPackage(),
            new RCTCameraPackage(),
            new RNSpinkitPackage(),
            new SplashScreenReactPackage(),
            new FIRMessagingPackage(),
            new VectorIconsPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
