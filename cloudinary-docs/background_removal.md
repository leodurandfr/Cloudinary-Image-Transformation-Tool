# Background removal


The Cloudinary AI background removal functionality combines a variety of deep-learning algorithms to recognize the primary foreground object(s) in an image and accurately remove the background in a matter of seconds. 

> **NOTE**: There are ways to make backgrounds transparent in video overlays to effectively change the background of a video.  See [Video effects and enhancements](video_effects_and_enhancements#transparency) for details.

## Overview

The default background removal behavior detects the foreground object(s) of the image and removes the background. You can activate this behavior in one of two ways:

* **Recommended**: [On the fly](#removing_the_background_on_the_fly), by specifying the `background_removal` effect transformation parameter when delivering images (`e_background_removal` in URLs). This leaves the original image intact.
* **Legacy** (retained for backward compatibility): By setting the `background_removal` parameter to `cloudinary_ai` when [uploading](#removing_the_background_while_uploading) an image (`Upload` method), or by using the `Update` method of the Admin API for [existing images](#removing_the_background_from_existing_images). This changes the original image that's stored in Cloudinary. 

## Removing the background on the fly

Removing the background on the fly keeps the original image intact and creates a derived version of the image with the background removed.

When background removal is requested on the fly, a 423 error response may be returned, until the background removal process has completed. This only happens for the first request.  After this, the image is cached, so subsequent requests to the same URL will return the background-removed image. You can request background removal as an [eager transformation](eager_and_incoming_transformations#eager_transformations) to prepare the derived versions in advance of the first request.

To remove the background of an image on the fly, specify the `background_removal` effect (`e_background_removal` in URLs).  For example:

![Dog on couch with background removed](https://res.cloudinary.com/demo/image/upload/e_background_removal/docs/rmv_bgd/dog_couch_orig "with_image:false")

```nodejs
cloudinary.image("docs/rmv_bgd/dog_couch_orig", {effect: "background_removal"})
```

```react
new CloudinaryImage("docs/rmv_bgd/dog_couch_orig").effect(backgroundRemoval());
```

```vue
new CloudinaryImage("docs/rmv_bgd/dog_couch_orig").effect(backgroundRemoval());
```

```angular
new CloudinaryImage("docs/rmv_bgd/dog_couch_orig").effect(backgroundRemoval());
```

```js
new CloudinaryImage("docs/rmv_bgd/dog_couch_orig").effect(backgroundRemoval());
```

```python
CloudinaryImage("docs/rmv_bgd/dog_couch_orig").image(effect="background_removal")
```

```php
(new ImageTag('docs/rmv_bgd/dog_couch_orig'))
	->effect(Effect::backgroundRemoval());
```

```java
cloudinary.url().transformation(new Transformation().effect("background_removal")).imageTag("docs/rmv_bgd/dog_couch_orig");
```

```ruby
cl_image_tag("docs/rmv_bgd/dog_couch_orig", effect: "background_removal")
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation().Effect("background_removal")).BuildImageTag("docs/rmv_bgd/dog_couch_orig")
```

```dart
cloudinary.image('docs/rmv_bgd/dog_couch_orig').transformation(Transformation()
	.effect(Effect.backgroundRemoval()));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation().setEffect("background_removal")).generate("docs/rmv_bgd/dog_couch_orig")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().effect("background_removal")).generate("docs/rmv_bgd/dog_couch_orig");
```

```flutter
cloudinary.image('docs/rmv_bgd/dog_couch_orig').transformation(Transformation()
	.effect(Effect.backgroundRemoval()));
```

```kotlin
cloudinary.image {
	publicId("docs/rmv_bgd/dog_couch_orig")
	 effect(Effect.backgroundRemoval()) 
}.generate()
```

```jquery
$.cloudinary.image("docs/rmv_bgd/dog_couch_orig", {effect: "background_removal"})
```

```react_native
new CloudinaryImage("docs/rmv_bgd/dog_couch_orig").effect(backgroundRemoval());
```

Original image

Image with background removal applied

**See full syntax**: [e_background_removal](transformation_reference#e_background_removal) in the _Transformation Reference_.
**Try it out**: [Background removal](https://console.cloudinary.com/app/image/home/background-removal?media=image&collection=apparel&sample=me%2Fbgr-apparel-1.jpg).

You can combine this transformation with other transformation parameters too.

For example, to apply the grayscale effect, first specify `e_background_removal`, then specify `e_grayscale`:

![Dog on couch in grayscale with background removed](https://res.cloudinary.com/demo/image/upload/e_background_removal/e_grayscale/docs/rmv_bgd/dog_couch_orig "thumb:c_scale,h_200")

```nodejs
cloudinary.image("docs/rmv_bgd/dog_couch_orig", {transformation: [
  {effect: "background_removal"},
  {effect: "grayscale"}
  ]})
```

```react
new CloudinaryImage("docs/rmv_bgd/dog_couch_orig")
  .effect(backgroundRemoval())
  .effect(grayscale());
```

```vue
new CloudinaryImage("docs/rmv_bgd/dog_couch_orig")
  .effect(backgroundRemoval())
  .effect(grayscale());
```

```angular
new CloudinaryImage("docs/rmv_bgd/dog_couch_orig")
  .effect(backgroundRemoval())
  .effect(grayscale());
```

```js
new CloudinaryImage("docs/rmv_bgd/dog_couch_orig")
  .effect(backgroundRemoval())
  .effect(grayscale());
```

```python
CloudinaryImage("docs/rmv_bgd/dog_couch_orig").image(transformation=[
  {'effect': "background_removal"},
  {'effect': "grayscale"}
  ])
```

```php
(new ImageTag('docs/rmv_bgd/dog_couch_orig'))
	->effect(Effect::backgroundRemoval())
	->effect(Effect::grayscale());
```

```java
cloudinary.url().transformation(new Transformation()
  .effect("background_removal").chain()
  .effect("grayscale")).imageTag("docs/rmv_bgd/dog_couch_orig");
```

```ruby
cl_image_tag("docs/rmv_bgd/dog_couch_orig", transformation: [
  {effect: "background_removal"},
  {effect: "grayscale"}
  ])
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation()
  .Effect("background_removal").Chain()
  .Effect("grayscale")).BuildImageTag("docs/rmv_bgd/dog_couch_orig")
```

```dart
cloudinary.image('docs/rmv_bgd/dog_couch_orig').transformation(Transformation()
	.effect(Effect.backgroundRemoval())
	.effect(Effect.grayscale()));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation()
  .setEffect("background_removal").chain()
  .setEffect("grayscale")).generate("docs/rmv_bgd/dog_couch_orig")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation()
  .effect("background_removal").chain()
  .effect("grayscale")).generate("docs/rmv_bgd/dog_couch_orig");
```

```flutter
cloudinary.image('docs/rmv_bgd/dog_couch_orig').transformation(Transformation()
	.effect(Effect.backgroundRemoval())
	.effect(Effect.grayscale()));
```

```kotlin
cloudinary.image {
	publicId("docs/rmv_bgd/dog_couch_orig")
	 effect(Effect.backgroundRemoval())
	 effect(Effect.grayscale()) 
}.generate()
```

```jquery
$.cloudinary.image("docs/rmv_bgd/dog_couch_orig", {transformation: [
  {effect: "background_removal"},
  {effect: "grayscale"}
  ]})
```

```react_native
new CloudinaryImage("docs/rmv_bgd/dog_couch_orig")
  .effect(backgroundRemoval())
  .effect(grayscale());
```

To replace the background with a different image, apply the new background as an underlay. For example, replacing the couch with a road, scaling and positioning the dog appropriately:

![Dog on road](https://res.cloudinary.com/demo/image/upload/e_background_removal/c_scale,w_400/u_docs:road/fl_layer_apply,y_-200/docs/rmv_bgd/dog_couch_orig "thumb:c_scale,h_200")

```nodejs
cloudinary.image("docs/rmv_bgd/dog_couch_orig", {transformation: [
  {effect: "background_removal"},
  {width: 400, crop: "scale"},
  {underlay: "docs:road"},
  {flags: "layer_apply", y: -200}
  ]})
```

```react
new CloudinaryImage("docs/rmv_bgd/dog_couch_orig")
  .effect(backgroundRemoval())
  .resize(scale().width(400))
  .underlay(source(image("docs/road")).position(new Position().offsetY(-200)));
```

```vue
new CloudinaryImage("docs/rmv_bgd/dog_couch_orig")
  .effect(backgroundRemoval())
  .resize(scale().width(400))
  .underlay(source(image("docs/road")).position(new Position().offsetY(-200)));
```

```angular
new CloudinaryImage("docs/rmv_bgd/dog_couch_orig")
  .effect(backgroundRemoval())
  .resize(scale().width(400))
  .underlay(source(image("docs/road")).position(new Position().offsetY(-200)));
```

```js
new CloudinaryImage("docs/rmv_bgd/dog_couch_orig")
  .effect(backgroundRemoval())
  .resize(scale().width(400))
  .underlay(source(image("docs/road")).position(new Position().offsetY(-200)));
```

```python
CloudinaryImage("docs/rmv_bgd/dog_couch_orig").image(transformation=[
  {'effect': "background_removal"},
  {'width': 400, 'crop': "scale"},
  {'underlay': "docs:road"},
  {'flags': "layer_apply", 'y': -200}
  ])
```

```php
(new ImageTag('docs/rmv_bgd/dog_couch_orig'))
	->effect(Effect::backgroundRemoval())
	->resize(Resize::scale()->width(400))
	->underlay(Underlay::source(
	Source::image("docs/road"))
	->position((new Position())->offsetY(-200))
	);
```

```java
cloudinary.url().transformation(new Transformation()
  .effect("background_removal").chain()
  .width(400).crop("scale").chain()
  .underlay(new Layer().publicId("docs:road")).chain()
  .flags("layer_apply").y(-200)).imageTag("docs/rmv_bgd/dog_couch_orig");
```

```ruby
cl_image_tag("docs/rmv_bgd/dog_couch_orig", transformation: [
  {effect: "background_removal"},
  {width: 400, crop: "scale"},
  {underlay: "docs:road"},
  {flags: "layer_apply", y: -200}
  ])
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation()
  .Effect("background_removal").Chain()
  .Width(400).Crop("scale").Chain()
  .Underlay(new Layer().PublicId("docs:road")).Chain()
  .Flags("layer_apply").Y(-200)).BuildImageTag("docs/rmv_bgd/dog_couch_orig")
```

```dart
cloudinary.image('docs/rmv_bgd/dog_couch_orig').transformation(Transformation()
	.effect(Effect.backgroundRemoval())
	.resize(Resize.scale().width(400))
	.underlay(Underlay.source(
	Source.image("docs/road"))
	.position(Position().offsetY(-200))
	));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation()
  .setEffect("background_removal").chain()
  .setWidth(400).setCrop("scale").chain()
  .setUnderlay("docs:road").chain()
  .setFlags("layer_apply").setY(-200)).generate("docs/rmv_bgd/dog_couch_orig")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation()
  .effect("background_removal").chain()
  .width(400).crop("scale").chain()
  .underlay(new Layer().publicId("docs:road")).chain()
  .flags("layer_apply").y(-200)).generate("docs/rmv_bgd/dog_couch_orig");
```

```flutter
cloudinary.image('docs/rmv_bgd/dog_couch_orig').transformation(Transformation()
	.effect(Effect.backgroundRemoval())
	.resize(Resize.scale().width(400))
	.underlay(Underlay.source(
	Source.image("docs/road"))
	.position(Position().offsetY(-200))
	));
```

```kotlin
cloudinary.image {
	publicId("docs/rmv_bgd/dog_couch_orig")
	 effect(Effect.backgroundRemoval())
	 resize(Resize.scale() { width(400) })
	 underlay(Underlay.source(
	Source.image("docs/road")) {
	 position(Position() { offsetY(-200) })
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/rmv_bgd/dog_couch_orig", {transformation: [
  {effect: "background_removal"},
  {width: 400, crop: "scale"},
  {underlay: new cloudinary.Layer().publicId("docs:road")},
  {flags: "layer_apply", y: -200}
  ]})
```

```react_native
new CloudinaryImage("docs/rmv_bgd/dog_couch_orig")
  .effect(backgroundRemoval())
  .resize(scale().width(400))
  .underlay(source(image("docs/road")).position(new Position().offsetY(-200)));
```

See background removal being applied to product images on the fly in a [React app](react_image_transformations#code_explorer_optimization_background_removal_and_drop_shadow).

> **NOTES**:
>
> * There is a [special transformation count](transformation_counts#special_effect_calculations) for the background removal effect.

> * When Cloudinary is generating a derived version, you may get a 423 response returned until the version is ready. You can prepare derived versions in advance using an [eager transformation](eager_and_incoming_transformations#eager_transformations).

> * When Cloudinary is generating an [incoming transformation](eager_and_incoming_transformations#incoming_transformations), you may get a 420 response returned, with status `pending` until the asset is ready.

> * The background removal transformation imposes a limit of 6144 x 6144 pixels on its input images. If an image exceeds this limit, the transformation first scales down the image to fit the limit, and then processes it. The scaling doesn't affect the aspect ratio of the image, but it does alter its output dimensions.

> * Background removal on the fly isn't supported for [fetched](fetch_remote_images#fetch_and_deliver_remote_files) images.

## Defining the edges of the foreground object

If you know that your image has a foreground object with fine detail around its edges, for example fur, you can request to keep this detail by specifying the **fine edges** option.   

> **NOTES**:
>
> * You shouldn't use this option if you know that the object has more clear-cut edges. 

> * There is no need to use this option on images of human hair, as a special algorithm is applied if hair around a face is detected.

To do this on the fly, set the `effect` parameter to `background_removal:fineedges_y`:

![Furry paw](https://res.cloudinary.com/demo/image/upload/e_background_removal:fineedges_y/docs/paw.png "with_image:false")

```nodejs
cloudinary.image("docs/paw.png", {effect: "background_removal:fineedges_y"})
```

```react
new CloudinaryImage("docs/paw.png").effect(backgroundRemoval().fineEdges());
```

```vue
new CloudinaryImage("docs/paw.png").effect(backgroundRemoval().fineEdges());
```

```angular
new CloudinaryImage("docs/paw.png").effect(backgroundRemoval().fineEdges());
```

```js
new CloudinaryImage("docs/paw.png").effect(backgroundRemoval().fineEdges());
```

```python
CloudinaryImage("docs/paw.png").image(effect="background_removal:fineedges_y")
```

```php
(new ImageTag('docs/paw.png'))
	->effect(Effect::backgroundRemoval()->fineEdges());
```

```java
cloudinary.url().transformation(new Transformation().effect("background_removal:fineedges_y")).imageTag("docs/paw.png");
```

```ruby
cl_image_tag("docs/paw.png", effect: "background_removal:fineedges_y")
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation().Effect("background_removal:fineedges_y")).BuildImageTag("docs/paw.png")
```

```dart
cloudinary.image('docs/paw.png').transformation(Transformation()
	.effect(Effect.backgroundRemoval().fineEdges()));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation().setEffect("background_removal:fineedges_y")).generate("docs/paw.png")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().effect("background_removal:fineedges_y")).generate("docs/paw.png");
```

```flutter
cloudinary.image('docs/paw.png').transformation(Transformation()
	.effect(Effect.backgroundRemoval().fineEdges()));
```

```kotlin
cloudinary.image {
	publicId("docs/paw.png")
	 effect(Effect.backgroundRemoval() { fineEdges() }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/paw.png", {effect: "background_removal:fineedges_y"})
```

```react_native
new CloudinaryImage("docs/paw.png").effect(backgroundRemoval().fineEdges());
```

Original

Default background removal

Specifying fine edges

You can see the difference more clearly when you zoom in (click each image to open in a new tab):

Original

Default background removal

Specifying fine edges

> **TIP**: When [uploading or updating an image](#removing_the_background_on_upload_update), set the `background_removal` parameter to `cloudinary_ai:fine_edges`:

```multi
|ruby
Cloudinary::Uploader.upload("paw.jpg",
  public_id: "paw_fine",
  background_removal: 'cloudinary_ai:fine_edges',
  notification_url: "https://mysite.example.com/hooks")             
    
|php_2
$cloudinary->uploadApi()->upload("paw.jpg", [
    "public_id" => "paw_fine",
    "background_removal" => "cloudinary_ai:fine_edges",
    "notification_url" => "https://mysite.example.com/hooks"]);

|python
cloudinary.uploader.upload("paw.jpg",
  public_id = "paw_fine",
  background_removal = "cloudinary_ai:fine_edges",
  notification_url = "https://mysite.example.com/hooks")

|nodejs
cloudinary.v2.uploader.
upload("paw.jpg", 
  { public_id: "paw_fine",
    background_removal: "cloudinary_ai:fine_edges",
    notification_url: "https://mysite.example.com/hooks" })
.then(result=>console.log(result)); 
  
|java
cloudinary.uploader().upload("paw.jpg", 
  ObjectUtils.asMap(
    "public_id", "paw_fine",
    "background_removal", "cloudinary_ai:fine_edges",
    "notification_url", "https://mysite.example.com/hooks"));

|csharp
var uploadParams = new ImageUploadParams(){
  File = new FileDescription(@"paw.jpg"),
  PublicId = "paw_fine",
  BackgroundRemoval = "cloudinary_ai:fine_edges",
  NotificationUrl = "https://mysite.example.com/hooks"};
var uploadResult = cloudinary.Upload(uploadParams); 

|go
resp, err := cld.Upload.Upload(ctx, "paw.jpg", uploader.UploadParams{
        PublicID:          "paw_fine",
        BackgroundRemoval: "cloudinary_ai:fine_edges",
        NotificationURL:   "https://mysite.example.com/hooks"})

|android
MediaManager.get().upload("paw.jpg")
  .option("public_id", "paw_fine")
  .option("background_removal", "cloudinary_ai:fine_edges")
  .option("notification_url", "https://mysite.example.com/hooks").dispatch();

|swift
let params = CLDUploadRequestParams()
  .setPublicId("paw_fine")
  .setBackgroundRemoval("cloudinary_ai:fine_edges")
  .setNotificationUrl("https://mysite.example.com/hooks")
var mySig = MyFunction(params)  // your own function that returns a signature generated on your backend
params.setSignature(CLDSignature(signature: mySig.signature, timestamp: mySig.timestamp))
let request = cloudinary.createUploader().signedUpload(
  url: "paw.jpg", params: params)

|curl
curl https://api.cloudinary.com/v1_1/demo/image/upload -X POST -F 'file=@/path/to/paw.jpg' -F 'public_id=paw_fine' -F 'background_removal=cloudinary_ai:fine_edges' -F 'notification_url=https://mysite.example.com/hooks' -F 'timestamp=173719931' -F 'api_key=436464676' -F 'signature=a781d61f86a6f818af'

|cli
cld uploader upload "paw.jpg" public_id="paw_fine" background_removal="cloudinary_ai:fine_edges" notification_url="https://mysite.example.com/hooks"
```

## Delivering and transforming your new image

After the background has been removed from your image, you can take advantage of a variety of [image transformations](image_transformations) to deliver the new image to your users.

### Use case #1 - Add a shadow to a product image

If all the product images in your online store have a shadow, then after you've applied the background removal to this router photo, you could use the transformation code below to apply a shadow to the delivered image. 

![Add a shadow to the transparent router image](https://res.cloudinary.com/demo/image/upload/e_background_removal/e_dropshadow/c_scale,h_105/docs/rmv_bgd/router_orig "with_image:false")

```nodejs
cloudinary.image("docs/rmv_bgd/router_orig", {transformation: [
  {effect: "background_removal"},
  {effect: "dropshadow"},
  {height: 105, crop: "scale"}
  ]})
```

```react
new CloudinaryImage("docs/rmv_bgd/router_orig")
  .effect(backgroundRemoval())
  .effect(dropShadow())
  .resize(scale().height(105));
```

```vue
new CloudinaryImage("docs/rmv_bgd/router_orig")
  .effect(backgroundRemoval())
  .effect(dropShadow())
  .resize(scale().height(105));
```

```angular
new CloudinaryImage("docs/rmv_bgd/router_orig")
  .effect(backgroundRemoval())
  .effect(dropShadow())
  .resize(scale().height(105));
```

```js
new CloudinaryImage("docs/rmv_bgd/router_orig")
  .effect(backgroundRemoval())
  .effect(dropShadow())
  .resize(scale().height(105));
```

```python
CloudinaryImage("docs/rmv_bgd/router_orig").image(transformation=[
  {'effect': "background_removal"},
  {'effect': "dropshadow"},
  {'height': 105, 'crop': "scale"}
  ])
```

```php
(new ImageTag('docs/rmv_bgd/router_orig'))
	->effect(Effect::backgroundRemoval())
	->effect(Effect::dropShadow())
	->resize(Resize::scale()->height(105));
```

```java
cloudinary.url().transformation(new Transformation()
  .effect("background_removal").chain()
  .effect("dropshadow").chain()
  .height(105).crop("scale")).imageTag("docs/rmv_bgd/router_orig");
```

```ruby
cl_image_tag("docs/rmv_bgd/router_orig", transformation: [
  {effect: "background_removal"},
  {effect: "dropshadow"},
  {height: 105, crop: "scale"}
  ])
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation()
  .Effect("background_removal").Chain()
  .Effect("dropshadow").Chain()
  .Height(105).Crop("scale")).BuildImageTag("docs/rmv_bgd/router_orig")
```

```dart
cloudinary.image('docs/rmv_bgd/router_orig').transformation(Transformation()
	.effect(Effect.backgroundRemoval())
	.effect(Effect.dropShadow())
	.resize(Resize.scale().height(105)));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation()
  .setEffect("background_removal").chain()
  .setEffect("dropshadow").chain()
  .setHeight(105).setCrop("scale")).generate("docs/rmv_bgd/router_orig")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation()
  .effect("background_removal").chain()
  .effect("dropshadow").chain()
  .height(105).crop("scale")).generate("docs/rmv_bgd/router_orig");
```

```flutter
cloudinary.image('docs/rmv_bgd/router_orig').transformation(Transformation()
	.effect(Effect.backgroundRemoval())
	.effect(Effect.dropShadow())
	.resize(Resize.scale().height(105)));
```

```kotlin
cloudinary.image {
	publicId("docs/rmv_bgd/router_orig")
	 effect(Effect.backgroundRemoval())
	 effect(Effect.dropShadow())
	 resize(Resize.scale() { height(105) }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/rmv_bgd/router_orig", {transformation: [
  {effect: "background_removal"},
  {effect: "dropshadow"},
  {height: 105, crop: "scale"}
  ]})
```

```react_native
new CloudinaryImage("docs/rmv_bgd/router_orig")
  .effect(backgroundRemoval())
  .effect(dropShadow())
  .resize(scale().height(105));
```

Original router image

No background

No background + shadow

**Learn more**: [Apply a drop shadow effect](effects_and_artistic_enhancements#dropshadow_effect)

### Use case #2 - Apply green screen style backdrops

You can take advantage of Cloudinary's background removal to provide an app with fun effects. For example, you could allow users to upload images of themselves and then select new background locations by adding the desired scenery as an underlay behind your transparent background.

For example, you could use the following delivery code to relocate this woman from her office to the beach:

![Use an underlay image to place objects with removed backgrounds in different scenes](https://res.cloudinary.com/demo/image/upload/e_background_removal/c_scale,h_375/u_docs:bg_beach/c_scale,w_800/fl_layer_apply,g_south/docs/rmv_bgd/woman_orig.png "with_image:false")

```nodejs
cloudinary.image("docs/rmv_bgd/woman_orig.png", {transformation: [
  {effect: "background_removal"},
  {height: 375, crop: "scale"},
  {underlay: "docs:bg_beach"},
  {width: 800, crop: "scale"},
  {flags: "layer_apply", gravity: "south"}
  ]})
```

```react
new CloudinaryImage("docs/rmv_bgd/woman_orig.png")
  .effect(backgroundRemoval())
  .resize(scale().height(375))
  .underlay(
    source(
      image("docs/bg_beach").transformation(
        new Transformation().resize(scale().width(800))
      )
    ).position(new Position().gravity(compass("south")))
  );
```

```vue
new CloudinaryImage("docs/rmv_bgd/woman_orig.png")
  .effect(backgroundRemoval())
  .resize(scale().height(375))
  .underlay(
    source(
      image("docs/bg_beach").transformation(
        new Transformation().resize(scale().width(800))
      )
    ).position(new Position().gravity(compass("south")))
  );
```

```angular
new CloudinaryImage("docs/rmv_bgd/woman_orig.png")
  .effect(backgroundRemoval())
  .resize(scale().height(375))
  .underlay(
    source(
      image("docs/bg_beach").transformation(
        new Transformation().resize(scale().width(800))
      )
    ).position(new Position().gravity(compass("south")))
  );
```

```js
new CloudinaryImage("docs/rmv_bgd/woman_orig.png")
  .effect(backgroundRemoval())
  .resize(scale().height(375))
  .underlay(
    source(
      image("docs/bg_beach").transformation(
        new Transformation().resize(scale().width(800))
      )
    ).position(new Position().gravity(compass("south")))
  );
```

```python
CloudinaryImage("docs/rmv_bgd/woman_orig.png").image(transformation=[
  {'effect': "background_removal"},
  {'height': 375, 'crop': "scale"},
  {'underlay': "docs:bg_beach"},
  {'width': 800, 'crop': "scale"},
  {'flags': "layer_apply", 'gravity': "south"}
  ])
```

```php
(new ImageTag('docs/rmv_bgd/woman_orig.png'))
	->effect(Effect::backgroundRemoval())
	->resize(Resize::scale()->height(375))
	->underlay(Underlay::source(
	Source::image("docs/bg_beach")
	->transformation((new Transformation())
	->resize(Resize::scale()->width(800)))
	)
	->position((new Position())
	->gravity(
	Gravity::compass(
	Compass::south()))
	)
	);
```

```java
cloudinary.url().transformation(new Transformation()
  .effect("background_removal").chain()
  .height(375).crop("scale").chain()
  .underlay(new Layer().publicId("docs:bg_beach")).chain()
  .width(800).crop("scale").chain()
  .flags("layer_apply").gravity("south")).imageTag("docs/rmv_bgd/woman_orig.png");
```

```ruby
cl_image_tag("docs/rmv_bgd/woman_orig.png", transformation: [
  {effect: "background_removal"},
  {height: 375, crop: "scale"},
  {underlay: "docs:bg_beach"},
  {width: 800, crop: "scale"},
  {flags: "layer_apply", gravity: "south"}
  ])
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation()
  .Effect("background_removal").Chain()
  .Height(375).Crop("scale").Chain()
  .Underlay(new Layer().PublicId("docs:bg_beach")).Chain()
  .Width(800).Crop("scale").Chain()
  .Flags("layer_apply").Gravity("south")).BuildImageTag("docs/rmv_bgd/woman_orig.png")
```

```dart
cloudinary.image('docs/rmv_bgd/woman_orig.png').transformation(Transformation()
	.effect(Effect.backgroundRemoval())
	.resize(Resize.scale().height(375))
	.underlay(Underlay.source(
	Source.image("docs/bg_beach")
	.transformation(new Transformation()
	.resize(Resize.scale().width(800)))
	)
	.position(Position()
	.gravity(
	Gravity.compass(
	Compass.south()))
	)
	));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation()
  .setEffect("background_removal").chain()
  .setHeight(375).setCrop("scale").chain()
  .setUnderlay("docs:bg_beach").chain()
  .setWidth(800).setCrop("scale").chain()
  .setFlags("layer_apply").setGravity("south")).generate("docs/rmv_bgd/woman_orig.png")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation()
  .effect("background_removal").chain()
  .height(375).crop("scale").chain()
  .underlay(new Layer().publicId("docs:bg_beach")).chain()
  .width(800).crop("scale").chain()
  .flags("layer_apply").gravity("south")).generate("docs/rmv_bgd/woman_orig.png");
```

```flutter
cloudinary.image('docs/rmv_bgd/woman_orig.png').transformation(Transformation()
	.effect(Effect.backgroundRemoval())
	.resize(Resize.scale().height(375))
	.underlay(Underlay.source(
	Source.image("docs/bg_beach")
	.transformation(new Transformation()
	.resize(Resize.scale().width(800)))
	)
	.position(Position()
	.gravity(
	Gravity.compass(
	Compass.south()))
	)
	));
```

```kotlin
cloudinary.image {
	publicId("docs/rmv_bgd/woman_orig.png")
	 effect(Effect.backgroundRemoval())
	 resize(Resize.scale() { height(375) })
	 underlay(Underlay.source(
	Source.image("docs/bg_beach") {
	 transformation(Transformation {
	 resize(Resize.scale() { width(800) }) })
	 }) {
	 position(Position() {
	 gravity(
	Gravity.compass(
	Compass.south()))
	 })
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/rmv_bgd/woman_orig.png", {transformation: [
  {effect: "background_removal"},
  {height: 375, crop: "scale"},
  {underlay: new cloudinary.Layer().publicId("docs:bg_beach")},
  {width: 800, crop: "scale"},
  {flags: "layer_apply", gravity: "south"}
  ]})
```

```react_native
new CloudinaryImage("docs/rmv_bgd/woman_orig.png")
  .effect(backgroundRemoval())
  .resize(scale().height(375))
  .underlay(
    source(
      image("docs/bg_beach").transformation(
        new Transformation().resize(scale().width(800))
      )
    ).position(new Position().gravity(compass("south")))
  );
```

Original personal photo

No background

&nbsp;

No background + rainbow scene

No background + beach scene

## Guidelines and best practices

This transformation is based on a combination of neural networks that were trained on a large dataset to create precise segmentation maps of salient objects and refine those maps to accurately separate the edges of the foreground from the background. These neural networks were also optimized to enable returning the result within seconds regardless of the image size.1

In the great majority of cases, these deep-learning algorithms return high quality results. The following best practices can further increase the likelihood of good results:

* Make sure there is enough background around the foreground object(s) on all sides.
* Try to avoid large shadows. This is especially relevant if the background is a single color. For example, if the main subject is photographed against a plain light colored background, the object's shadow might be classified as part of the foreground.
* In some cases, hair or other very small or blurry parts on the edges of a foreground object might be blended with the background. For example, try to avoid hairs blowing in the wind.
* In some cases, strong changes in contrast, such as a bright lamp or a bright sun included in the photo, can impact the results. 
* Light-colored reflections on a shiny object (e.g. shine from the camera flash) may be treated as part of the background and removed, especially if the color of the reflection is similar to the main background color.
* Images containing transparent objects, such as a glass jug, may not give good results. 

However, as with any Deep Learning-based algorithm, even if you follow these guidelines, the results may not always be perfect. Additionally, keep in mind that the neural networks are continually training on new data and thus results may be different over time.

If you aren't satisfied with the results of a background removal operation, you can try the [Pixelz Remove the Background](remove_the_background_image_editing_addon) add-on, which automatically uploads your original image to the Pixelz team of human experts who manually remove the background of your image within 24 hours. When complete, the new image replaces your original one in your product environment. You can monitor the status using a `notification_url`.

1The transformation imposes a limit of 6144 x 6144 total pixels on its input images. If an image exceeds this limit, the transformation first scales down the image to fit the limit, and then processes it. The scaling doesn't affect the aspect ratio of the image, but it does alter its output dimensions.

## Removing the background on upload/update 

> **INFO**: This is legacy functionality, kept for backward compatibility reasons. We recommend [removing image backgrounds on the fly](#removing_the_background_on_the_fly), or if you want to store images with their backgrounds already removed, you can use the background removal transformation as an [incoming transformation](eager_and_incoming_transformations#incoming_transformations).

Unlike [removing the background on the fly](#removing_the_background_on_the_fly), when you remove a background on upload, only the background-removed image is stored, not the original. If it isn't already a PNG, it's converted to a PNG with a transparent background. 

{notes}

* Even if the originally uploaded image is within your file size product environment limits, large resolution images may result in very large file sizes for the returned PNG, and may exceed the max file size limits for your product environment. If the returned file exceeds your product environment limits, then it won't be stored in your product environment and the original will remain.
* Images with backgrounds removed in this way are backed up regardless of whether or not you've enabled backups globally for your product environment. See [Restore from backup](#restore_from_backup) for details.
* The [special transformation count](transformation_counts#special_effect_calculations) applied when removing backgrounds on the fly is also applicable when removing backgrounds on upload.

{/note}

The code below uploads the photo shown below on the left and activates background removal. The photo that ultimately gets stored in the product environment is the dog image shown on the right, with a fully transparent background.

```multi
|ruby
Cloudinary::Uploader.upload("dog_couch.jpg",
  public_id: "dog_couch",
  background_removal: 'cloudinary_ai',
  notification_url: "https://mysite.example.com/hooks")             
    
|php_2
$cloudinary->uploadApi()->upload("dog_couch.jpg", [
    "public_id" => "dog_couch",
    "background_removal" => "cloudinary_ai",
    "notification_url" => "https://mysite.example.com/hooks"]);

|python
cloudinary.uploader.upload("dog_couch.jpg",
  public_id = "dog_couch",
  background_removal = "cloudinary_ai",
  notification_url = "https://mysite.example.com/hooks")

|nodejs
cloudinary.v2.uploader
.upload("dog_couch.jpg", 
  { public_id: "dog_couch",
    background_removal: "cloudinary_ai",
    notification_url: "https://mysite.example.com/hooks" })
.then(result=>console.log(result)); 
  
|java
cloudinary.uploader().upload("dog_couch.jpg", 
  ObjectUtils.asMap(
    "public_id", "dog_couch",
    "background_removal", "cloudinary_ai",
    "notification_url", "https://mysite.example.com/hooks"));

|csharp
var uploadParams = new ImageUploadParams(){
  File = new FileDescription(@"dog_couch.jpg"),
  PublicId = "dog_couch",
  BackgroundRemoval = "cloudinary_ai",
  NotificationUrl = "https://mysite.example.com/hooks"};
var uploadResult = cloudinary.Upload(uploadParams); 

|go
resp, err := cld.Upload.Upload(ctx, "dog_couch.jpeg", uploader.UploadParams{
        PublicID:          "dog_couch",
        BackgroundRemoval: "cloudinary_ai",
        NotificationURL:   "https://mysite.example.com/hooks"})

|android
MediaManager.get().upload("dog_couch.jpg")
  .option("public_id", "dog_couch")
  .option("background_removal", "cloudinary_ai")
  .option("notification_url", "https://mysite.example.com/hooks").dispatch();

|swift
let params = CLDUploadRequestParams()
  .setPublicId("dog_couch")
  .setBackgroundRemoval("cloudinary_ai")
  .setNotificationUrl("https://mysite.example.com/hooks")
var mySig = MyFunction(params)  // your own function that returns a signature generated on your backend
params.setSignature(CLDSignature(signature: mySig.signature, timestamp: mySig.timestamp))
let request = cloudinary.createUploader().signedUpload(
  url: "dog_couch.jpg", params: params)

|curl
curl https://api.cloudinary.com/v1_1/demo/image/upload -X POST -F 'file=@/path/to/dog_couch.jpg' -F 'public_id=dog_couch' -F 'background_removal=cloudinary_ai' -F 'notification_url=https://mysite.example.com/hooks' -F 'timestamp=173719931' -F 'api_key=436464676' -F 'signature=a781d61f86a6f818af'

|cli
cld uploader upload "dog_couch.jpg" public_id="dog_couch" background_removal="cloudinary_ai" notification_url="https://mysite.example.com/hooks"
```

Original image to upload

Uploaded image withbackground removal applied

> **TIP**:
>
> You can use **upload presets** to centrally define a set of upload options including add-on operations to apply, instead of specifying them in each upload call. You can define multiple upload presets, and apply different presets in different upload scenarios. You can create new upload presets in the **Upload Presets** page of the [Console Settings](https://console.cloudinary.com/app/settings/upload/presets) or using the [upload_presets](admin_api#upload_presets) Admin API method. From the **Upload** page of the Console Settings, you can also select default upload presets to use for image, video, and raw API uploads (respectively) as well as default presets for image, video, and raw uploads performed via the Media Library UI. 
> **Learn more**: [Upload presets](upload_presets)

### Removing the background from existing images

You can remove the background from existing images using the `Update` Admin API method. The existing image is overwritten with the background-removed image.

```multi
|ruby
Cloudinary::Api.update("woman", 
  background_removal: "cloudinary_ai",
  notification_url: "https://mysite.example.com/hooks")

|php_2
$api->update("woman", [
  "background_removal" => "cloudinary_ai",
  "notification_url" => "https://mysite.example.com/hooks"]);

|python
cloudinary.api.update("woman",
  background_removal = "cloudinary_ai",
  notification_url = "https://mysite.example.com/hooks")

|nodejs
cloudinary.v2.api
.update("woman", 
  { background_removal: "cloudinary_ai",
    notification_url: "https://mysite.example.com/hooks" })
.then(result=>console.log(result));

|java
cloudinary.api().update("woman", 
  ObjectUtils.asMap(
    "background_removal", "cloudinary_ai",
    "notification_url", "https://mysite.example.com/hooks" ));

|csharp
var updateParams = new UpdateParams("woman"){
  BackgroundRemoval = "cloudinary_ai",
  NotificationUrl = "https://mysite.example.com/hooks"};
var updateResult = cloudinary.UpdateResource(updateParams);

|go
resp, err := cld.Admin.UpdateAsset(ctx, admin.UpdateAssetParams{
        PublicID:          "woman",
        BackgroundRemoval: "cloudinary_ai",
        NotificationURL:   "https://mysite.example.com/hooks"})

|cli
cld admin update "woman" background_removal="cloudinary_ai" notification_url="https://mysite.example.com/hooks"
```

### Asynchronous handling for upload/update

Although the background removal algorithm usually takes only a few seconds, it's still handled asynchronously after the original file is uploaded or updated. Therefore, the immediate upload response indicates that the `background_removal` status is `pending`. For example, here's the upload response from the above dog-on-couch image.

```json
{
    "asset_id": "5d83d02f6dcb3dad7198d1871ad41c96",
    "public_id": "dog_couch",
    "format": "jpg",
    "version": 1719311722,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2024-06-25T17:33:24Z",
    "bytes": 420050,
    "width": 1920,
    "height": 1280,
    "asset_folder": "",
    "display_name": "dog_couch",
    "access_mode": "public",
    "url": "http://res.cloudinary.com/cld-docs/image/upload/v1719311722/dog_couch.jpg",
    "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/v1719311722/dog_couch.jpg",
    "info": {
        "background_removal": {
            "cloudinary_ai": {
                "status": "pending"
            }
        }
    }
}
```

Immediately after you perform the upload or update method, the image in your product environment is your original image. When the background removal process is complete, the original image is overwritten with a PNG containing the foreground image and transparent background. 

If you requested a [notification](notifications) in your upload or update call by adding the `notification_url` parameter, the endpoint you specified will receive a JSON POST request when the background removal is complete, including the new `url` & `secure_url` with the updated **.png** file extension and new `version` number:

```json
{
  "info_kind": "cloudinary_ai",
  "info_status": "complete",
  "etag": "6567d798ca4087468dc7d23bcb8a45ec",
  "notification_type": "info",
  "asset_id": "5d83d02f6dcb3dad7198d1871ad41c96",
  "public_id": "dog_couch",
  "uploaded_at": "2024-06-25T17:33:24Z",
  "version": 1719311722,
  "url": "http://res.cloudinary.com/cld-docs/image/upload/v1719311722/dog_couch.png",
  "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/v1719311722/dog_couch.png",
  "info_data": {
    "cloudinary_ai_hints": [],
    "cloudinary_ai_fine_edges": false,
    "confidence_score": 0.94750563648
  },
  "notification_context": {
    "triggered_at": "2024-06-25T17:33:45.171703Z"
  },
  "signature_key": "138354577316849"
}

```

#### Confidence score

The notification response returns a confidence score between 0 and 1, which is a measure of how successful the background removal, and hence the resulting image, is likely to be. In the example above, it's 0.94750563648, which is high, indicating a successful background removal.  

For low scores, you could for example, send the image for [manual moderation](moderate_assets#moderating_assets_manually) using the [explicit](image_upload_api_reference#explicit) method, or perhaps use the [Pixelz - Remove the Background](remove_the_background_image_editing_addon) add-on instead.

In addition to the notification response, the confidence score is also reported in responses to calls to the [Admin API resources](admin_api#resources) endpoint where asset details are returned.

For example:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/upload/dog_couch
       
|ruby
Cloudinary::Api.resource('dog_couch')

|php_2
$api->asset("dog_couch");

|python
cloudinary.api.resource("dog_couch")

|nodejs
cloudinary.v2.api
.resource('dog_couch')
.then(result=>console.log(result));

|java
api.resource("dog_couch", ObjectUtils.emptyMap());

|csharp
cloudinary.GetResource("dog_couch");

|go
resp, err := cld.Admin.Asset(ctx, admin.AssetParams{PublicID: "dog_couch"})

|cli
cld admin resource dog_couch
```

Sample response:

```json
{
  "asset_id": "5d83d02f6dcb3dad7198d1871ad41c96",
  "public_id": "dog_couch",
  "format": "png",
  "version": 1719311749,
  "resource_type": "image",
  "type": "upload",
  "created_at": "2024-06-25T17:33:24Z",
  "bytes": 3156622,
  "width": 1920,
  "height": 1280,
  "backup": true,
  "asset_folder": "",
  "display_name": "dog_couch",
  "access_mode": "public",
  "url": "http://res.cloudinary.com/cld-docs/image/upload/v1719311749/dog_couch.png",
  "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/v1719311749/dog_couch.png",
  "info": {
    "background_removal": {
      "cloudinary_ai": {
        "status": "complete",
        "data": {
          "confidence_score": 0.94750563648
        }
      }
    }
  },
  "next_cursor": "dd229353a80af0d3712815cc1431e951166457364edd5d94c46b5030b2c56ef5",
  "derived": []
}

```

### Restore from backup

When the newly generated (background-removed) image overwrites the old one, both the original image and background-removed image are backed up and are accessible from the **View backed up versions** button, available when you open the **Edit Transformation** page for that image in the Media Library.  This backup is performed for all images where background removal is applied, even if you haven't [enabled backups](backups_and_version_management) globally for your product environment.

![Originals are stored as backups when you activate background removal](https://cloudinary-res.cloudinary.com/image/upload/bo_1px_solid_black/f_auto/q_auto/docs/misc/rmv_bgd_backup.png "thumb: w_400,dpr_2, width:400, popup:true")

> **NOTE**:
>
> If you don't want the images to be backed up, [contact support](https://support.cloudinary.com/hc/en-us/requests/new) to apply a setting to your product environment that disables this specific backup. With this setting applied:

> * If your product environment doesn't have global backup configured and backup wasn't requested during the upload (either in the request or in the upload preset), then none of the images are backed up. 

> * If your product environment does have global backup configured, or backup was requested during the upload (either in the request or in the upload preset), then only the original image is backed up, and not the background-removed one.

