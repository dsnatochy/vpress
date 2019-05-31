# Poynt OS SDK

Poynt OS SDK is distributed as an Android Library (aar) through our Maven repository.


### Adding the Poynt OS SDK dependencies

To use the Poynt SDK include the maven repository in your root build.gradle file 

```
allprojects {
    repositories {
        google()
        jcenter()
        maven {
            url 'https://nexus.poynt.com/content/repositories/releases'
        }
    }
}
```
Add the following dependencies to the build.gradle file of the app

```
dependencies {
  compile fileTree(dir: 'libs', include: ['*.jar'])

  // Poynt SDK and Model Dependencies
  implementation 'co.poynt.api:android-api-model:<release-version>@jar'
  implementation 'co.poynt.android.sdk:poynt-sdk:<release-version>1@aar'

  // Gson dependency
  compile 'com.google.code.gson:gson:2.8.0@jar'

  // JWT dependencies - if you want to parse JWTs
  compile 'net.jcip:jcip-annotations:1.0@jar'
  compile 'com.nimbusds:nimbus-jose-jwt:2.26@jar'
  compile 'net.minidev:json-smart:1.2@jar'
}
``` 

::: tip
Refer to [Release notes](/info/#release-notes) for latest **release-version**
:::
