# Face-detection based transformations


Cloudinary provides face-detection algorithms for automatically applying transformations according to the detected faces within an image.

Here are examples of some popular use cases that you can accomplish using transformations based on detected faces (combined with other transformations). Click each image to see the URL parameters applied in each case:

Generateprofile photos

Pixelatedetected faces

Blur and cropbased on detected faces

Overlay products onspecified facial attributes

> **TIP**:
>
> :title=Tips

> * **Face-detection** functionality detects whether faces exist and the coordinates of those faces (or other facial landmarks) in photos. This is not the same as **facial-recognition** technology, which refers to the ability to recognize which specific people are shown in a photo. While Cloudinary does not provide built-in _facial-recognition_ features, you can [combine Cloudinary functionality with other AI technologies](#facial_recognition_open_source) to address face recognition needs. 

> * If you find that any of the face-detection features described below do not give desired results, [contact our support team](https://support.cloudinary.com/hc/en-us/requests/new) who can enable a different face-detection algorithm for you to try.

> * You can override the coordinates saved by the automatic face-detection functionality using [custom face coordinates](custom_focus_areas#custom_face_coordinates).

## Face-detection based cropping

Cloudinary supports built-in face-detection capabilities that allow you to intelligently crop your images. To automatically [crop](resizing_and_cropping) an image so that the detected face(s) is used as the center of the derived picture, set the [`gravity`](resizing_and_cropping#control_gravity) parameter to one of the following values:

* `face` - the region of the image that includes the single largest face (`g_face` for URLs).
* `faces` - the region of the image that includes all the faces detected (`g_faces` for URLs).

For example, the image below of a model was uploaded to Cloudinary:

![model.jpg uploaded to Cloudinary](https://res.cloudinary.com/demo/image/upload/docs/model.jpg "thumb: w_400")

```nodejs
cloudinary.image("docs/model.jpg")
```

```react
new CloudinaryImage("docs/model.jpg");
```

```vue
new CloudinaryImage("docs/model.jpg");
```

```angular
new CloudinaryImage("docs/model.jpg");
```

```js
new CloudinaryImage("docs/model.jpg");
```

```python
CloudinaryImage("docs/model.jpg").image()
```

```php
(new ImageTag('docs/model.jpg'));
```

```java
cloudinary.url().transformation(new Transformation().imageTag("docs/model.jpg");
```

```ruby
cl_image_tag("docs/model.jpg")
```

```csharp
cloudinary.Api.UrlImgUp.BuildImageTag("docs/model.jpg")
```

```dart
cloudinary.image('docs/model.jpg').transformation(Transformation());
```

```swift
imageView.cldSetImage(cloudinary.createUrl().generate("docs/model.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().generate("docs/model.jpg");
```

```flutter
cloudinary.image('docs/model.jpg').transformation(Transformation());
```

```kotlin
cloudinary.image {
	publicId("docs/model.jpg") 
}.generate()
```

```jquery
$.cloudinary.image("docs/model.jpg")
```

```react_native
new CloudinaryImage("docs/model.jpg");
```

To create a 200x100 version with the [fill](#fill) cropping mode to keep as much as possible of the original image, and using the default `center` gravity **without face detection** (for comparison):

![200x100 filled without face detection](https://res.cloudinary.com/demo/image/upload/c_fill,h_200,w_100/docs/model.jpg)

```nodejs
cloudinary.image("docs/model.jpg", {height: 200, width: 100, crop: "fill"})
```

```react
new CloudinaryImage("docs/model.jpg").resize(fill().width(100).height(200));
```

```vue
new CloudinaryImage("docs/model.jpg").resize(fill().width(100).height(200));
```

```angular
new CloudinaryImage("docs/model.jpg").resize(fill().width(100).height(200));
```

```js
new CloudinaryImage("docs/model.jpg").resize(fill().width(100).height(200));
```

```python
CloudinaryImage("docs/model.jpg").image(height=200, width=100, crop="fill")
```

```php
(new ImageTag('docs/model.jpg'))
	->resize(Resize::fill()->width(100)
->height(200));
```

```java
cloudinary.url().transformation(new Transformation().height(200).width(100).crop("fill")).imageTag("docs/model.jpg");
```

```ruby
cl_image_tag("docs/model.jpg", height: 200, width: 100, crop: "fill")
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation().Height(200).Width(100).Crop("fill")).BuildImageTag("docs/model.jpg")
```

```dart
cloudinary.image('docs/model.jpg').transformation(Transformation()
	.resize(Resize.fill().width(100)
.height(200)));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation().setHeight(200).setWidth(100).setCrop("fill")).generate("docs/model.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().height(200).width(100).crop("fill")).generate("docs/model.jpg");
```

```flutter
cloudinary.image('docs/model.jpg').transformation(Transformation()
	.resize(Resize.fill().width(100)
.height(200)));
```

```kotlin
cloudinary.image {
	publicId("docs/model.jpg")
	 resize(Resize.fill() { width(100)
 height(200) }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/model.jpg", {height: 200, width: 100, crop: "fill"})
```

```react_native
new CloudinaryImage("docs/model.jpg").resize(fill().width(100).height(200));
```

Now adding the `face` gravity parameter to correctly fill the requested dimensions:

![200x100 filled with face detection](https://res.cloudinary.com/demo/image/upload/c_fill,g_face,h_200,w_100/docs/model.jpg)

```nodejs
cloudinary.image("docs/model.jpg", {gravity: "face", height: 200, width: 100, crop: "fill"})
```

```react
new CloudinaryImage("docs/model.jpg").resize(
  fill()
    .width(100)
    .height(200)
    .gravity(focusOn(face()))
);
```

```vue
new CloudinaryImage("docs/model.jpg").resize(
  fill()
    .width(100)
    .height(200)
    .gravity(focusOn(face()))
);
```

```angular
new CloudinaryImage("docs/model.jpg").resize(
  fill()
    .width(100)
    .height(200)
    .gravity(focusOn(face()))
);
```

```js
new CloudinaryImage("docs/model.jpg").resize(
  fill()
    .width(100)
    .height(200)
    .gravity(focusOn(face()))
);
```

```python
CloudinaryImage("docs/model.jpg").image(gravity="face", height=200, width=100, crop="fill")
```

```php
(new ImageTag('docs/model.jpg'))
	->resize(Resize::fill()->width(100)
->height(200)
	->gravity(
	Gravity::focusOn(
	FocusOn::face()))
	);
```

```java
cloudinary.url().transformation(new Transformation().gravity("face").height(200).width(100).crop("fill")).imageTag("docs/model.jpg");
```

```ruby
cl_image_tag("docs/model.jpg", gravity: "face", height: 200, width: 100, crop: "fill")
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation().Gravity("face").Height(200).Width(100).Crop("fill")).BuildImageTag("docs/model.jpg")
```

```dart
cloudinary.image('docs/model.jpg').transformation(Transformation()
	.resize(Resize.fill().width(100)
.height(200)
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation().setGravity("face").setHeight(200).setWidth(100).setCrop("fill")).generate("docs/model.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().gravity("face").height(200).width(100).crop("fill")).generate("docs/model.jpg");
```

```flutter
cloudinary.image('docs/model.jpg').transformation(Transformation()
	.resize(Resize.fill().width(100)
.height(200)
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```kotlin
cloudinary.image {
	publicId("docs/model.jpg")
	 resize(Resize.fill() { width(100)
 height(200)
	 gravity(
	Gravity.focusOn(
	FocusOn.face()))
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/model.jpg", {gravity: "face", height: 200, width: 100, crop: "fill"})
```

```react_native
new CloudinaryImage("docs/model.jpg").resize(
  fill()
    .width(100)
    .height(200)
    .gravity(focusOn(face()))
);
```

To create a 200x200 [thumbnail](#thumb) focused on the face of the woman, select the `thumb` crop mode and `face` gravity:

![200x200 thumb focused on the face of the woman](https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_200,w_200/docs/model.jpg)

```nodejs
cloudinary.image("docs/model.jpg", {gravity: "face", height: 200, width: 200, crop: "thumb"})
```

```react
new CloudinaryImage("docs/model.jpg").resize(
  thumbnail()
    .width(200)
    .height(200)
    .gravity(focusOn(face()))
);
```

```vue
new CloudinaryImage("docs/model.jpg").resize(
  thumbnail()
    .width(200)
    .height(200)
    .gravity(focusOn(face()))
);
```

```angular
new CloudinaryImage("docs/model.jpg").resize(
  thumbnail()
    .width(200)
    .height(200)
    .gravity(focusOn(face()))
);
```

```js
new CloudinaryImage("docs/model.jpg").resize(
  thumbnail()
    .width(200)
    .height(200)
    .gravity(focusOn(face()))
);
```

```python
CloudinaryImage("docs/model.jpg").image(gravity="face", height=200, width=200, crop="thumb")
```

```php
(new ImageTag('docs/model.jpg'))
	->resize(Resize::thumbnail()->width(200)
->height(200)
	->gravity(
	Gravity::focusOn(
	FocusOn::face()))
	);
```

```java
cloudinary.url().transformation(new Transformation().gravity("face").height(200).width(200).crop("thumb")).imageTag("docs/model.jpg");
```

```ruby
cl_image_tag("docs/model.jpg", gravity: "face", height: 200, width: 200, crop: "thumb")
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation().Gravity("face").Height(200).Width(200).Crop("thumb")).BuildImageTag("docs/model.jpg")
```

```dart
cloudinary.image('docs/model.jpg').transformation(Transformation()
	.resize(Resize.thumbnail().width(200)
.height(200)
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation().setGravity("face").setHeight(200).setWidth(200).setCrop("thumb")).generate("docs/model.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().gravity("face").height(200).width(200).crop("thumb")).generate("docs/model.jpg");
```

```flutter
cloudinary.image('docs/model.jpg').transformation(Transformation()
	.resize(Resize.thumbnail().width(200)
.height(200)
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```kotlin
cloudinary.image {
	publicId("docs/model.jpg")
	 resize(Resize.thumbnail() { width(200)
 height(200)
	 gravity(
	Gravity.focusOn(
	FocusOn.face()))
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/model.jpg", {gravity: "face", height: 200, width: 200, crop: "thumb"})
```

```react_native
new CloudinaryImage("docs/model.jpg").resize(
  thumbnail()
    .width(200)
    .height(200)
    .gravity(focusOn(face()))
);
```

You can also automatically [crop](#crop) exactly to the region determined by the face-detection mechanism without defining resize dimensions for the original image. The following example uses the `crop` mode together with `face` gravity for cropping the original image to the face of the woman:

![Cropped to the face of the woman without dimensions](https://res.cloudinary.com/demo/image/upload/c_crop,g_face/docs/model.jpg "thumb: w_1.0")

```nodejs
cloudinary.image("docs/model.jpg", {gravity: "face", crop: "crop"})
```

```react
new CloudinaryImage("docs/model.jpg").resize(crop().gravity(focusOn(face())));
```

```vue
new CloudinaryImage("docs/model.jpg").resize(crop().gravity(focusOn(face())));
```

```angular
new CloudinaryImage("docs/model.jpg").resize(crop().gravity(focusOn(face())));
```

```js
new CloudinaryImage("docs/model.jpg").resize(crop().gravity(focusOn(face())));
```

```python
CloudinaryImage("docs/model.jpg").image(gravity="face", crop="crop")
```

```php
(new ImageTag('docs/model.jpg'))
	->resize(Resize::crop()
	->gravity(
	Gravity::focusOn(
	FocusOn::face()))
	);
```

```java
cloudinary.url().transformation(new Transformation().gravity("face").crop("crop")).imageTag("docs/model.jpg");
```

```ruby
cl_image_tag("docs/model.jpg", gravity: "face", crop: "crop")
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation().Gravity("face").Crop("crop")).BuildImageTag("docs/model.jpg")
```

```dart
cloudinary.image('docs/model.jpg').transformation(Transformation()
	.resize(Resize.crop()
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation().setGravity("face").setCrop("crop")).generate("docs/model.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().gravity("face").crop("crop")).generate("docs/model.jpg");
```

```flutter
cloudinary.image('docs/model.jpg').transformation(Transformation()
	.resize(Resize.crop()
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```kotlin
cloudinary.image {
	publicId("docs/model.jpg")
	 resize(Resize.crop() {
	 gravity(
	Gravity.focusOn(
	FocusOn.face()))
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/model.jpg", {gravity: "face", crop: "crop"})
```

```react_native
new CloudinaryImage("docs/model.jpg").resize(crop().gravity(focusOn(face())));
```

For examples with multiple faces, the following image, showing a happy couple, was uploaded to Cloudinary:

![happy-couple.jpg uploaded to Cloudinary](https://res.cloudinary.com/demo/image/upload/docs/happy-couple.jpg "thumb: w_400")

```nodejs
cloudinary.image("docs/happy-couple.jpg")
```

```react
new CloudinaryImage("docs/happy-couple.jpg");
```

```vue
new CloudinaryImage("docs/happy-couple.jpg");
```

```angular
new CloudinaryImage("docs/happy-couple.jpg");
```

```js
new CloudinaryImage("docs/happy-couple.jpg");
```

```python
CloudinaryImage("docs/happy-couple.jpg").image()
```

```php
(new ImageTag('docs/happy-couple.jpg'));
```

```java
cloudinary.url().transformation(new Transformation().imageTag("docs/happy-couple.jpg");
```

```ruby
cl_image_tag("docs/happy-couple.jpg")
```

```csharp
cloudinary.Api.UrlImgUp.BuildImageTag("docs/happy-couple.jpg")
```

```dart
cloudinary.image('docs/happy-couple.jpg').transformation(Transformation());
```

```swift
imageView.cldSetImage(cloudinary.createUrl().generate("docs/happy-couple.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().generate("docs/happy-couple.jpg");
```

```flutter
cloudinary.image('docs/happy-couple.jpg').transformation(Transformation());
```

```kotlin
cloudinary.image {
	publicId("docs/happy-couple.jpg") 
}.generate()
```

```jquery
$.cloudinary.image("docs/happy-couple.jpg")
```

```react_native
new CloudinaryImage("docs/happy-couple.jpg");
```

You can specify the `thumb` crop mode and `face` gravity to create a 150x150 thumbnail centered specifically on the largest face in the image:

![150x150 thumb focused on the biggest face in the image](https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_150,w_150/docs/happy-couple.jpg)

```nodejs
cloudinary.image("docs/happy-couple.jpg", {gravity: "face", height: 150, width: 150, crop: "thumb"})
```

```react
new CloudinaryImage("docs/happy-couple.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .gravity(focusOn(face()))
);
```

```vue
new CloudinaryImage("docs/happy-couple.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .gravity(focusOn(face()))
);
```

```angular
new CloudinaryImage("docs/happy-couple.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .gravity(focusOn(face()))
);
```

```js
new CloudinaryImage("docs/happy-couple.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .gravity(focusOn(face()))
);
```

```python
CloudinaryImage("docs/happy-couple.jpg").image(gravity="face", height=150, width=150, crop="thumb")
```

```php
(new ImageTag('docs/happy-couple.jpg'))
	->resize(Resize::thumbnail()->width(150)
->height(150)
	->gravity(
	Gravity::focusOn(
	FocusOn::face()))
	);
```

```java
cloudinary.url().transformation(new Transformation().gravity("face").height(150).width(150).crop("thumb")).imageTag("docs/happy-couple.jpg");
```

```ruby
cl_image_tag("docs/happy-couple.jpg", gravity: "face", height: 150, width: 150, crop: "thumb")
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation().Gravity("face").Height(150).Width(150).Crop("thumb")).BuildImageTag("docs/happy-couple.jpg")
```

```dart
cloudinary.image('docs/happy-couple.jpg').transformation(Transformation()
	.resize(Resize.thumbnail().width(150)
.height(150)
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation().setGravity("face").setHeight(150).setWidth(150).setCrop("thumb")).generate("docs/happy-couple.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().gravity("face").height(150).width(150).crop("thumb")).generate("docs/happy-couple.jpg");
```

```flutter
cloudinary.image('docs/happy-couple.jpg').transformation(Transformation()
	.resize(Resize.thumbnail().width(150)
.height(150)
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```kotlin
cloudinary.image {
	publicId("docs/happy-couple.jpg")
	 resize(Resize.thumbnail() { width(150)
 height(150)
	 gravity(
	Gravity.focusOn(
	FocusOn.face()))
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/happy-couple.jpg", {gravity: "face", height: 150, width: 150, crop: "thumb"})
```

```react_native
new CloudinaryImage("docs/happy-couple.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .gravity(focusOn(face()))
);
```

To create a thumbnail focusing on all faces in the image, specify `faces` as the gravity instead of `face`:

![thumb focused on all faces in the image](https://res.cloudinary.com/demo/image/upload/c_thumb,g_faces,h_150,w_150/docs/happy-couple.jpg)

```nodejs
cloudinary.image("docs/happy-couple.jpg", {gravity: "faces", height: 150, width: 150, crop: "thumb"})
```

```react
new CloudinaryImage("docs/happy-couple.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .gravity(focusOn(faces()))
);
```

```vue
new CloudinaryImage("docs/happy-couple.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .gravity(focusOn(faces()))
);
```

```angular
new CloudinaryImage("docs/happy-couple.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .gravity(focusOn(faces()))
);
```

```js
new CloudinaryImage("docs/happy-couple.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .gravity(focusOn(faces()))
);
```

```python
CloudinaryImage("docs/happy-couple.jpg").image(gravity="faces", height=150, width=150, crop="thumb")
```

```php
(new ImageTag('docs/happy-couple.jpg'))
	->resize(Resize::thumbnail()->width(150)
->height(150)
	->gravity(
	Gravity::focusOn(
	FocusOn::faces()))
	);
```

```java
cloudinary.url().transformation(new Transformation().gravity("faces").height(150).width(150).crop("thumb")).imageTag("docs/happy-couple.jpg");
```

```ruby
cl_image_tag("docs/happy-couple.jpg", gravity: "faces", height: 150, width: 150, crop: "thumb")
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation().Gravity("faces").Height(150).Width(150).Crop("thumb")).BuildImageTag("docs/happy-couple.jpg")
```

```dart
cloudinary.image('docs/happy-couple.jpg').transformation(Transformation()
	.resize(Resize.thumbnail().width(150)
.height(150)
	.gravity(
	Gravity.focusOn(
	FocusOn.faces()))
	));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation().setGravity("faces").setHeight(150).setWidth(150).setCrop("thumb")).generate("docs/happy-couple.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().gravity("faces").height(150).width(150).crop("thumb")).generate("docs/happy-couple.jpg");
```

```flutter
cloudinary.image('docs/happy-couple.jpg').transformation(Transformation()
	.resize(Resize.thumbnail().width(150)
.height(150)
	.gravity(
	Gravity.focusOn(
	FocusOn.faces()))
	));
```

```kotlin
cloudinary.image {
	publicId("docs/happy-couple.jpg")
	 resize(Resize.thumbnail() { width(150)
 height(150)
	 gravity(
	Gravity.focusOn(
	FocusOn.faces()))
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/happy-couple.jpg", {gravity: "faces", height: 150, width: 150, crop: "thumb"})
```

```react_native
new CloudinaryImage("docs/happy-couple.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .gravity(focusOn(faces()))
);
```

You can also use the `fill` cropping mode together with `faces` gravity to correctly fill an image with your desired dimensions:

![60x150 filled to include all faces in the image](https://res.cloudinary.com/demo/image/upload/c_fill,g_faces,h_150,w_100/docs/happy-couple.jpg)

```nodejs
cloudinary.image("docs/happy-couple.jpg", {gravity: "faces", height: 150, width: 100, crop: "fill"})
```

```react
new CloudinaryImage("docs/happy-couple.jpg").resize(
  fill()
    .width(100)
    .height(150)
    .gravity(focusOn(faces()))
);
```

```vue
new CloudinaryImage("docs/happy-couple.jpg").resize(
  fill()
    .width(100)
    .height(150)
    .gravity(focusOn(faces()))
);
```

```angular
new CloudinaryImage("docs/happy-couple.jpg").resize(
  fill()
    .width(100)
    .height(150)
    .gravity(focusOn(faces()))
);
```

```js
new CloudinaryImage("docs/happy-couple.jpg").resize(
  fill()
    .width(100)
    .height(150)
    .gravity(focusOn(faces()))
);
```

```python
CloudinaryImage("docs/happy-couple.jpg").image(gravity="faces", height=150, width=100, crop="fill")
```

```php
(new ImageTag('docs/happy-couple.jpg'))
	->resize(Resize::fill()->width(100)
->height(150)
	->gravity(
	Gravity::focusOn(
	FocusOn::faces()))
	);
```

```java
cloudinary.url().transformation(new Transformation().gravity("faces").height(150).width(100).crop("fill")).imageTag("docs/happy-couple.jpg");
```

```ruby
cl_image_tag("docs/happy-couple.jpg", gravity: "faces", height: 150, width: 100, crop: "fill")
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation().Gravity("faces").Height(150).Width(100).Crop("fill")).BuildImageTag("docs/happy-couple.jpg")
```

```dart
cloudinary.image('docs/happy-couple.jpg').transformation(Transformation()
	.resize(Resize.fill().width(100)
.height(150)
	.gravity(
	Gravity.focusOn(
	FocusOn.faces()))
	));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation().setGravity("faces").setHeight(150).setWidth(100).setCrop("fill")).generate("docs/happy-couple.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().gravity("faces").height(150).width(100).crop("fill")).generate("docs/happy-couple.jpg");
```

```flutter
cloudinary.image('docs/happy-couple.jpg').transformation(Transformation()
	.resize(Resize.fill().width(100)
.height(150)
	.gravity(
	Gravity.focusOn(
	FocusOn.faces()))
	));
```

```kotlin
cloudinary.image {
	publicId("docs/happy-couple.jpg")
	 resize(Resize.fill() { width(100)
 height(150)
	 gravity(
	Gravity.focusOn(
	FocusOn.faces()))
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/happy-couple.jpg", {gravity: "faces", height: 150, width: 100, crop: "fill"})
```

```react_native
new CloudinaryImage("docs/happy-couple.jpg").resize(
  fill()
    .width(100)
    .height(150)
    .gravity(focusOn(faces()))
);
```

## Position overlays on detected faces 

To automatically [position an overlay](layers#layer_placement_gravity) over the detected face(s) in an image, set the [`gravity`](resizing_and_cropping#control_gravity) parameter to one of the following values:

* `face` - places an overlay over the single largest face in the image (`g_face` for URLs).
* `faces` - places an overlay over each of the faces in the image (`g_faces` for URLs).

For example, adding an overlay of the `purple-mask` image over both of the faces detected in the `young-couple` image, where each mask is resized to the same width as the detected face with the `region_relative` flag:

![Image with overlay placed over faces](https://res.cloudinary.com/demo/image/upload/l_docs:purple-mask/c_scale,fl_region_relative,w_1.0/fl_layer_apply,g_faces/docs/young-couple.jpg "thumb: w_400")

```nodejs
cloudinary.image("docs/young-couple.jpg", {transformation: [
  {overlay: "docs:purple-mask"},
  {flags: "region_relative", width: "1.0", crop: "scale"},
  {flags: "layer_apply", gravity: "faces"}
  ]})
```

```react
new CloudinaryImage("docs/young-couple.jpg").overlay(
  source(
    image("docs/purple-mask").transformation(
      new Transformation().resize(scale().width("1.0").regionRelative())
    )
  ).position(new Position().gravity(focusOn(faces())))
);
```

```vue
new CloudinaryImage("docs/young-couple.jpg").overlay(
  source(
    image("docs/purple-mask").transformation(
      new Transformation().resize(scale().width("1.0").regionRelative())
    )
  ).position(new Position().gravity(focusOn(faces())))
);
```

```angular
new CloudinaryImage("docs/young-couple.jpg").overlay(
  source(
    image("docs/purple-mask").transformation(
      new Transformation().resize(scale().width("1.0").regionRelative())
    )
  ).position(new Position().gravity(focusOn(faces())))
);
```

```js
new CloudinaryImage("docs/young-couple.jpg").overlay(
  source(
    image("docs/purple-mask").transformation(
      new Transformation().resize(scale().width("1.0").regionRelative())
    )
  ).position(new Position().gravity(focusOn(faces())))
);
```

```python
CloudinaryImage("docs/young-couple.jpg").image(transformation=[
  {'overlay': "docs:purple-mask"},
  {'flags': "region_relative", 'width': "1.0", 'crop': "scale"},
  {'flags': "layer_apply", 'gravity': "faces"}
  ])
```

```php
(new ImageTag('docs/young-couple.jpg'))
	->overlay(Overlay::source(
	Source::image("docs/purple-mask")
	->transformation((new Transformation())
	->resize(Resize::scale()->width(1.0)
	->regionRelative()
	))
	)
	->position((new Position())
	->gravity(
	Gravity::focusOn(
	FocusOn::faces()))
	)
	);
```

```java
cloudinary.url().transformation(new Transformation()
  .overlay(new Layer().publicId("docs:purple-mask")).chain()
  .flags("region_relative").width(1.0).crop("scale").chain()
  .flags("layer_apply").gravity("faces")).imageTag("docs/young-couple.jpg");
```

```ruby
cl_image_tag("docs/young-couple.jpg", transformation: [
  {overlay: "docs:purple-mask"},
  {flags: "region_relative", width: 1.0, crop: "scale"},
  {flags: "layer_apply", gravity: "faces"}
  ])
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation()
  .Overlay(new Layer().PublicId("docs:purple-mask")).Chain()
  .Flags("region_relative").Width(1.0).Crop("scale").Chain()
  .Flags("layer_apply").Gravity("faces")).BuildImageTag("docs/young-couple.jpg")
```

```dart
cloudinary.image('docs/young-couple.jpg').transformation(Transformation()
	.overlay(Overlay.source(
	Source.image("docs/purple-mask")
	.transformation(new Transformation()
	.resize(Resize.scale().width('1.0')
	.regionRelative()
	))
	)
	.position(Position()
	.gravity(
	Gravity.focusOn(
	FocusOn.faces()))
	)
	));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation()
  .setOverlay("docs:purple-mask").chain()
  .setFlags("region_relative").setWidth(1.0).setCrop("scale").chain()
  .setFlags("layer_apply").setGravity("faces")).generate("docs/young-couple.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation()
  .overlay(new Layer().publicId("docs:purple-mask")).chain()
  .flags("region_relative").width(1.0).crop("scale").chain()
  .flags("layer_apply").gravity("faces")).generate("docs/young-couple.jpg");
```

```flutter
cloudinary.image('docs/young-couple.jpg').transformation(Transformation()
	.overlay(Overlay.source(
	Source.image("docs/purple-mask")
	.transformation(new Transformation()
	.resize(Resize.scale().width('1.0')
	.regionRelative()
	))
	)
	.position(Position()
	.gravity(
	Gravity.focusOn(
	FocusOn.faces()))
	)
	));
```

```kotlin
cloudinary.image {
	publicId("docs/young-couple.jpg")
	 overlay(Overlay.source(
	Source.image("docs/purple-mask") {
	 transformation(Transformation {
	 resize(Resize.scale() { width(1.0F)
	 regionRelative()
	 }) })
	 }) {
	 position(Position() {
	 gravity(
	Gravity.focusOn(
	FocusOn.faces()))
	 })
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/young-couple.jpg", {transformation: [
  {overlay: new cloudinary.Layer().publicId("docs:purple-mask")},
  {flags: "region_relative", width: "1.0", crop: "scale"},
  {flags: "layer_apply", gravity: "faces"}
  ]})
```

```react_native
new CloudinaryImage("docs/young-couple.jpg").overlay(
  source(
    image("docs/purple-mask").transformation(
      new Transformation().resize(scale().width("1.0").regionRelative())
    )
  ).position(new Position().gravity(focusOn(faces())))
);
```

> **NOTE**: When gravity is set to one of the facial detection values and no face is detected in the image, then no overlay is placed at all.

## Returning the coordinates of facial landmarks

You can use the [getinfo](transformation_reference#fl_getinfo) flag together with a face-detection gravity option to return the coordinates of facial landmarks via a completely client-side operation.  Using this information, you can, for example, calculate the x and y offsets to specify the exact position of an overlay on a face, or you could pass the data back to other functions in your application.

For example, you can get the facial landmark coordinates in this image by using the `getinfo` flag together with a crop and a gravity option that detects a face.  In this example we have used `g_face`, but we could have also used `g_auto:face`, or even just `g_auto` (as the `g_auto` default behavior is to apply `g_auto:faces`).

![Plain face](https://res.cloudinary.com/demo/image/upload/c_scale,w_450/f_auto/q_auto/docs/plain_face.jpg "with_code: false, with_url: false")

![Information about plain face](https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,w_450/fl_getinfo/v1/docs/plain_face.jpg "with_image: false")

```nodejs
cloudinary.image("docs/plain_face.jpg", {transformation: [
  {gravity: "face", width: 450, crop: "thumb"},
  {flags: "getinfo"}
  ]})
```

```react
new CloudinaryImage("docs/plain_face.jpg")
  .resize(
    thumbnail()
      .width(450)
      .gravity(focusOn(face()))
  )
  .addFlag("get_info");
```

```vue
new CloudinaryImage("docs/plain_face.jpg")
  .resize(
    thumbnail()
      .width(450)
      .gravity(focusOn(face()))
  )
  .addFlag("get_info");
```

```angular
new CloudinaryImage("docs/plain_face.jpg")
  .resize(
    thumbnail()
      .width(450)
      .gravity(focusOn(face()))
  )
  .addFlag("get_info");
```

```js
new CloudinaryImage("docs/plain_face.jpg")
  .resize(
    thumbnail()
      .width(450)
      .gravity(focusOn(face()))
  )
  .addFlag("get_info");
```

```python
CloudinaryImage("docs/plain_face.jpg").image(transformation=[
  {'gravity': "face", 'width': 450, 'crop': "thumb"},
  {'flags': "getinfo"}
  ])
```

```php
(new ImageTag('docs/plain_face.jpg'))
	->resize(Resize::thumbnail()->width(450)
	->gravity(
	Gravity::focusOn(
	FocusOn::face()))
	)
	->addFlag(
	Flag::getInfo());
```

```java
cloudinary.url().transformation(new Transformation()
  .gravity("face").width(450).crop("thumb").chain()
  .flags("getinfo")).imageTag("docs/plain_face.jpg");
```

```ruby
cl_image_tag("docs/plain_face.jpg", transformation: [
  {gravity: "face", width: 450, crop: "thumb"},
  {flags: "getinfo"}
  ])
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation()
  .Gravity("face").Width(450).Crop("thumb").Chain()
  .Flags("getinfo")).BuildImageTag("docs/plain_face.jpg")
```

```dart
cloudinary.image('docs/plain_face.jpg').transformation(Transformation()
	.resize(Resize.thumbnail().width(450)
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	)
	.addFlag(
	Flag.getInfo()));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation()
  .setGravity("face").setWidth(450).setCrop("thumb").chain()
  .setFlags("getinfo")).generate("docs/plain_face.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation()
  .gravity("face").width(450).crop("thumb").chain()
  .flags("getinfo")).generate("docs/plain_face.jpg");
```

```flutter
cloudinary.image('docs/plain_face.jpg').transformation(Transformation()
	.resize(Resize.thumbnail().width(450)
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	)
	.addFlag(
	Flag.getInfo()));
```

```kotlin
cloudinary.image {
	publicId("docs/plain_face.jpg")
	 resize(Resize.thumbnail() { width(450)
	 gravity(
	Gravity.focusOn(
	FocusOn.face()))
	 })
	 addFlag(
	Flag.getInfo()) 
}.generate()
```

```jquery
$.cloudinary.image("docs/plain_face.jpg", {transformation: [
  {gravity: "face", width: 450, crop: "thumb"},
  {flags: "getinfo"}
  ]})
```

```react_native
new CloudinaryImage("docs/plain_face.jpg")
  .resize(
    thumbnail()
      .width(450)
      .gravity(focusOn(face()))
  )
  .addFlag("get_info");
```

This returns:

```
{
  "input": {
    "width": 640,
    "height": 426,
    "bytes": 49727
  },
  "landmarks": [
    [
      {
        "r_eye": {
          "x": 351,
          "y": 178
        },
        "l_eye": {
          "x": 432,
          "y": 180
        },
        "nose_tip": {
          "x": 395,
          "y": 231
        },
        "mouth_r": {
          "x": 358,
          "y": 255
        },
        "mouth_l": {
          "x": 428,
          "y": 255
        }
      }
    ]
  ],
  "resize": [
    {
      "x": 150,
      "y": 36,
      "width": 481,
      "height": 321
    },
    {
      "x_factor": 0.9355509355509356,
      "y_factor": 0.9355509355509356
    }
  ],
  "output": {
    "format": "jpg",
    "bytes": 35292,
    "width": 450,
    "height": 300
  }
}
```

The coordinates of the landmarks are relative to the top left of the original image. You can use this data to position an overlay with a `gravity` of `north_west` using the relevant returned coordinates as the x and y offsets.  Specifying an offset of 0,0 positions an overlay with its top left corner in the 0,0 position of the base image, so if you want to center the overlay on a particular coordinate, you need to adjust the coordinates by half of the width and height of the overlay.

For example, to position a red nose, resized to a width and height of 48 pixels, take the coordinates of `"nose_tip": {"x": 395,"y": 231},` and subtract half the width of the overlay (24 pixels) and three-quarters of height of the overlay (36 pixels) to leave an x-offset of 371 and a y-offset of 195. In this case, we want the overlay to be slightly higher, rather than centered on the tip of the nose, to make it look like she is wearing the red nose.

Putting all these parameters together you can overlay a red nose on the girl as follows:

![Red nose](https://res.cloudinary.com/demo/image/upload/l_docs:red-nose/c_scale,w_48/fl_layer_apply,g_north_west,x_371,y_195/c_scale,w_450/docs/plain_face.jpg)

```nodejs
cloudinary.image("docs/plain_face.jpg", {transformation: [
  {overlay: "docs:red-nose"},
  {width: 48, crop: "scale"},
  {flags: "layer_apply", gravity: "north_west", x: 371, y: 195},
  {width: 450, crop: "scale"}
  ]})
```

```react
new CloudinaryImage("docs/plain_face.jpg")
  .overlay(
    source(
      image("docs/red-nose").transformation(
        new Transformation().resize(scale().width(48))
      )
    ).position(
      new Position()
        .gravity(compass("north_west"))
        .offsetX(371)
        .offsetY(195)
    )
  )
  .resize(scale().width(450));
```

```vue
new CloudinaryImage("docs/plain_face.jpg")
  .overlay(
    source(
      image("docs/red-nose").transformation(
        new Transformation().resize(scale().width(48))
      )
    ).position(
      new Position()
        .gravity(compass("north_west"))
        .offsetX(371)
        .offsetY(195)
    )
  )
  .resize(scale().width(450));
```

```angular
new CloudinaryImage("docs/plain_face.jpg")
  .overlay(
    source(
      image("docs/red-nose").transformation(
        new Transformation().resize(scale().width(48))
      )
    ).position(
      new Position()
        .gravity(compass("north_west"))
        .offsetX(371)
        .offsetY(195)
    )
  )
  .resize(scale().width(450));
```

```js
new CloudinaryImage("docs/plain_face.jpg")
  .overlay(
    source(
      image("docs/red-nose").transformation(
        new Transformation().resize(scale().width(48))
      )
    ).position(
      new Position()
        .gravity(compass("north_west"))
        .offsetX(371)
        .offsetY(195)
    )
  )
  .resize(scale().width(450));
```

```python
CloudinaryImage("docs/plain_face.jpg").image(transformation=[
  {'overlay': "docs:red-nose"},
  {'width': 48, 'crop': "scale"},
  {'flags': "layer_apply", 'gravity': "north_west", 'x': 371, 'y': 195},
  {'width': 450, 'crop': "scale"}
  ])
```

```php
(new ImageTag('docs/plain_face.jpg'))
	->overlay(Overlay::source(
	Source::image("docs/red-nose")
	->transformation((new Transformation())
	->resize(Resize::scale()->width(48)))
	)
	->position((new Position())
	->gravity(
	Gravity::compass(
	Compass::northWest()))
->offsetX(371)
->offsetY(195))
	)
	->resize(Resize::scale()->width(450));
```

```java
cloudinary.url().transformation(new Transformation()
  .overlay(new Layer().publicId("docs:red-nose")).chain()
  .width(48).crop("scale").chain()
  .flags("layer_apply").gravity("north_west").x(371).y(195).chain()
  .width(450).crop("scale")).imageTag("docs/plain_face.jpg");
```

```ruby
cl_image_tag("docs/plain_face.jpg", transformation: [
  {overlay: "docs:red-nose"},
  {width: 48, crop: "scale"},
  {flags: "layer_apply", gravity: "north_west", x: 371, y: 195},
  {width: 450, crop: "scale"}
  ])
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation()
  .Overlay(new Layer().PublicId("docs:red-nose")).Chain()
  .Width(48).Crop("scale").Chain()
  .Flags("layer_apply").Gravity("north_west").X(371).Y(195).Chain()
  .Width(450).Crop("scale")).BuildImageTag("docs/plain_face.jpg")
```

```dart
cloudinary.image('docs/plain_face.jpg').transformation(Transformation()
	.overlay(Overlay.source(
	Source.image("docs/red-nose")
	.transformation(new Transformation()
	.resize(Resize.scale().width(48)))
	)
	.position(Position()
	.gravity(
	Gravity.compass(
	Compass.northWest()))
.offsetX(371)
.offsetY(195))
	)
	.resize(Resize.scale().width(450)));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation()
  .setOverlay("docs:red-nose").chain()
  .setWidth(48).setCrop("scale").chain()
  .setFlags("layer_apply").setGravity("north_west").setX(371).setY(195).chain()
  .setWidth(450).setCrop("scale")).generate("docs/plain_face.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation()
  .overlay(new Layer().publicId("docs:red-nose")).chain()
  .width(48).crop("scale").chain()
  .flags("layer_apply").gravity("north_west").x(371).y(195).chain()
  .width(450).crop("scale")).generate("docs/plain_face.jpg");
```

```flutter
cloudinary.image('docs/plain_face.jpg').transformation(Transformation()
	.overlay(Overlay.source(
	Source.image("docs/red-nose")
	.transformation(new Transformation()
	.resize(Resize.scale().width(48)))
	)
	.position(Position()
	.gravity(
	Gravity.compass(
	Compass.northWest()))
.offsetX(371)
.offsetY(195))
	)
	.resize(Resize.scale().width(450)));
```

```kotlin
cloudinary.image {
	publicId("docs/plain_face.jpg")
	 overlay(Overlay.source(
	Source.image("docs/red-nose") {
	 transformation(Transformation {
	 resize(Resize.scale() { width(48) }) })
	 }) {
	 position(Position() {
	 gravity(
	Gravity.compass(
	Compass.northWest()))
 offsetX(371)
 offsetY(195) })
	 })
	 resize(Resize.scale() { width(450) }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/plain_face.jpg", {transformation: [
  {overlay: new cloudinary.Layer().publicId("docs:red-nose")},
  {width: 48, crop: "scale"},
  {flags: "layer_apply", gravity: "north_west", x: 371, y: 195},
  {width: 450, crop: "scale"}
  ]})
```

```react_native
new CloudinaryImage("docs/plain_face.jpg")
  .overlay(
    source(
      image("docs/red-nose").transformation(
        new Transformation().resize(scale().width(48))
      )
    ).position(
      new Position()
        .gravity(compass("north_west"))
        .offsetX(371)
        .offsetY(195)
    )
  )
  .resize(scale().width(450));
```

## Position overlays avoiding detected faces

You may want to detect a face to avoid positioning an overlay on it. In this case, you can use `g_auto:face_avoid` together with the `getinfo` flag to find the area of the image that is least likely to include a face. Then, use these coordinates when adding the overlay.

For example, start with a URL that gets information about the part of the image to avoid:

![Image that avoids girl's face](https://res.cloudinary.com/demo/image/upload/c_thumb,g_auto:face_avoid,w_300/fl_getinfo/docs/plain_face.jpg "with_image:false")

```nodejs
cloudinary.image("docs/plain_face.jpg", {transformation: [
  {gravity: "auto:face_avoid", width: 300, crop: "thumb"},
  {flags: "getinfo"}
  ]})
```

```react
new CloudinaryImage("docs/plain_face.jpg")
  .resize(
    thumbnail()
      .width(300)
      .gravity(autoGravity().autoFocus(focusOn(face()).avoid()))
  )
  .addFlag("get_info");
```

```vue
new CloudinaryImage("docs/plain_face.jpg")
  .resize(
    thumbnail()
      .width(300)
      .gravity(autoGravity().autoFocus(focusOn(face()).avoid()))
  )
  .addFlag("get_info");
```

```angular
new CloudinaryImage("docs/plain_face.jpg")
  .resize(
    thumbnail()
      .width(300)
      .gravity(autoGravity().autoFocus(focusOn(face()).avoid()))
  )
  .addFlag("get_info");
```

```js
new CloudinaryImage("docs/plain_face.jpg")
  .resize(
    thumbnail()
      .width(300)
      .gravity(autoGravity().autoFocus(focusOn(face()).avoid()))
  )
  .addFlag("get_info");
```

```python
CloudinaryImage("docs/plain_face.jpg").image(transformation=[
  {'gravity': "auto:face_avoid", 'width': 300, 'crop': "thumb"},
  {'flags': "getinfo"}
  ])
```

```php
(new ImageTag('docs/plain_face.jpg'))
	->resize(Resize::thumbnail()->width(300)
	->gravity(
	Gravity::autoGravity()
	->autoFocus(
	AutoFocus::focusOn(
	FocusOn::face())->avoid())
	)
	)
	->addFlag(
	Flag::getInfo());
```

```java
cloudinary.url().transformation(new Transformation()
  .gravity("auto:face_avoid").width(300).crop("thumb").chain()
  .flags("getinfo")).imageTag("docs/plain_face.jpg");
```

```ruby
cl_image_tag("docs/plain_face.jpg", transformation: [
  {gravity: "auto:face_avoid", width: 300, crop: "thumb"},
  {flags: "getinfo"}
  ])
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation()
  .Gravity("auto:face_avoid").Width(300).Crop("thumb").Chain()
  .Flags("getinfo")).BuildImageTag("docs/plain_face.jpg")
```

```dart
cloudinary.image('docs/plain_face.jpg').transformation(Transformation()
	.resize(Resize.thumbnail().width(300)
	.gravity(
	Gravity.autoGravity()
	.autoFocus(
	AutoFocus.focusOn(
	FocusOn.face()).avoid())
	)
	)
	.addFlag(
	Flag.getInfo()));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation()
  .setGravity("auto:face_avoid").setWidth(300).setCrop("thumb").chain()
  .setFlags("getinfo")).generate("docs/plain_face.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation()
  .gravity("auto:face_avoid").width(300).crop("thumb").chain()
  .flags("getinfo")).generate("docs/plain_face.jpg");
```

```flutter
cloudinary.image('docs/plain_face.jpg').transformation(Transformation()
	.resize(Resize.thumbnail().width(300)
	.gravity(
	Gravity.autoGravity()
	.autoFocus(
	AutoFocus.focusOn(
	FocusOn.face()).avoid())
	)
	)
	.addFlag(
	Flag.getInfo()));
```

```kotlin
cloudinary.image {
	publicId("docs/plain_face.jpg")
	 resize(Resize.thumbnail() { width(300)
	 gravity(
	Gravity.autoGravity() {
	 autoFocus(
	AutoFocus.focusOn(
	FocusOn.face()) { avoid() })
	 })
	 })
	 addFlag(
	Flag.getInfo()) 
}.generate()
```

```jquery
$.cloudinary.image("docs/plain_face.jpg", {transformation: [
  {gravity: "auto:face_avoid", width: 300, crop: "thumb"},
  {flags: "getinfo"}
  ]})
```

```react_native
new CloudinaryImage("docs/plain_face.jpg")
  .resize(
    thumbnail()
      .width(300)
      .gravity(autoGravity().autoFocus(focusOn(face()).avoid()))
  )
  .addFlag("get_info");
```

The best area to focus on (avoiding the face) is given in the returned `g_auto_info` key:

```
"g_auto_info":[{"x":0,"y":208,"width":318,"height":211}]
```

You can use this information to position your overlay. Here, the text overlay is positioned with a slight offset from the returned x-coordinate (5px, rather than 0px), and is resized to fit the returned area accordingly (in this case 313px x 211px to take into account the 5px offset):

![Text overlay avoiding the girl's face](https://res.cloudinary.com/demo/image/upload/c_fit,co_rgb:FFFF00,h_211,l_text:Times_36_bold:Unleash%2520the%2520full%2520potential%2520of%2520your%2520media,w_313/fl_layer_apply,g_north_west,x_5,y_208/docs/plain_face.jpg)

```nodejs
cloudinary.image("docs/plain_face.jpg", {transformation: [
  {color: "#FFFF00", height: 211, overlay: {font_family: "Times", font_size: 36, font_weight: "bold", text: "Unleash%2520the%2520full%2520potential%2520of%2520your%2520media"}, width: 313, crop: "fit"},
  {flags: "layer_apply", gravity: "north_west", x: 5, y: 208}
  ]})
```

```react
new CloudinaryImage("docs/plain_face.jpg").addTransformation(
  "c_fit,co_rgb:FFFF00,h_211,l_text:Times_36_bold:Unleash%20the%20full%20potential%20of%20your%20media,w_313/fl_layer_apply,g_north_west,x_5,y_208"
);
```

```vue
new CloudinaryImage("docs/plain_face.jpg").addTransformation(
  "c_fit,co_rgb:FFFF00,h_211,l_text:Times_36_bold:Unleash%20the%20full%20potential%20of%20your%20media,w_313/fl_layer_apply,g_north_west,x_5,y_208"
);
```

```angular
new CloudinaryImage("docs/plain_face.jpg").addTransformation(
  "c_fit,co_rgb:FFFF00,h_211,l_text:Times_36_bold:Unleash%20the%20full%20potential%20of%20your%20media,w_313/fl_layer_apply,g_north_west,x_5,y_208"
);
```

```js
new CloudinaryImage("docs/plain_face.jpg").addTransformation(
  "c_fit,co_rgb:FFFF00,h_211,l_text:Times_36_bold:Unleash%20the%20full%20potential%20of%20your%20media,w_313/fl_layer_apply,g_north_west,x_5,y_208"
);
```

```python
CloudinaryImage("docs/plain_face.jpg").image(transformation=[
  {'color': "#FFFF00", 'height': 211, 'overlay': {'font_family': "Times", 'font_size': 36, 'font_weight': "bold", 'text': "Unleash%2520the%2520full%2520potential%2520of%2520your%2520media"}, 'width': 313, 'crop': "fit"},
  {'flags': "layer_apply", 'gravity': "north_west", 'x': 5, 'y': 208}
  ])
```

```php
(new ImageTag('docs/plain_face.jpg'))
	->overlay(Overlay::source(
	Source::text("Unleash%20the%20full%20potential%20of%20your%20media",(new TextStyle("Times",36))
	->fontWeight(
	FontWeight::bold())
	)
	->textFit(
	TextFit::size(313)->height(211))
	->textColor(Color::rgb("FFFF00"))
	)
	->position((new Position())
	->gravity(
	Gravity::compass(
	Compass::northWest()))
->offsetX(5)
->offsetY(208))
	);
```

```java
cloudinary.url().transformation(new Transformation()
  .color("#FFFF00").height(211).overlay(new TextLayer().fontFamily("Times").fontSize(36).fontWeight("bold").text("Unleash%2520the%2520full%2520potential%2520of%2520your%2520media")).width(313).crop("fit").chain()
  .flags("layer_apply").gravity("north_west").x(5).y(208)).imageTag("docs/plain_face.jpg");
```

```ruby
cl_image_tag("docs/plain_face.jpg", transformation: [
  {color: "#FFFF00", height: 211, overlay: {font_family: "Times", font_size: 36, font_weight: "bold", text: "Unleash%2520the%2520full%2520potential%2520of%2520your%2520media"}, width: 313, crop: "fit"},
  {flags: "layer_apply", gravity: "north_west", x: 5, y: 208}
  ])
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation()
  .Color("#FFFF00").Height(211).Overlay(new TextLayer().FontFamily("Times").FontSize(36).FontWeight("bold").Text("Unleash%2520the%2520full%2520potential%2520of%2520your%2520media")).Width(313).Crop("fit").Chain()
  .Flags("layer_apply").Gravity("north_west").X(5).Y(208)).BuildImageTag("docs/plain_face.jpg")
```

```dart
cloudinary.image('docs/plain_face.jpg').transformation(Transformation()
	.addTransformation("c_fit,co_rgb:FFFF00,h_211,l_text:Times_36_bold:Unleash%20the%20full%20potential%20of%20your%20media,w_313/fl_layer_apply,g_north_west,x_5,y_208"));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation()
  .setColor("#FFFF00").setHeight(211).setOverlay("text:Times_36_bold:Unleash%2520the%2520full%2520potential%2520of%2520your%2520media").setWidth(313).setCrop("fit").chain()
  .setFlags("layer_apply").setGravity("north_west").setX(5).setY(208)).generate("docs/plain_face.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation()
  .color("#FFFF00").height(211).overlay(new TextLayer().fontFamily("Times").fontSize(36).fontWeight("bold").text("Unleash%2520the%2520full%2520potential%2520of%2520your%2520media")).width(313).crop("fit").chain()
  .flags("layer_apply").gravity("north_west").x(5).y(208)).generate("docs/plain_face.jpg");
```

```flutter
cloudinary.image('docs/plain_face.jpg').transformation(Transformation()
	.addTransformation("c_fit,co_rgb:FFFF00,h_211,l_text:Times_36_bold:Unleash%20the%20full%20potential%20of%20your%20media,w_313/fl_layer_apply,g_north_west,x_5,y_208"));
```

```kotlin
cloudinary.image {
	publicId("docs/plain_face.jpg")
	 overlay(Overlay.source(
	Source.text("Unleash%20the%20full%20potential%20of%20your%20media",TextStyle("Times",36) {
	 fontWeight(
	FontWeight.bold())
	 }) {
	 textFit(
	TextFit.size(313) { height(211) })
	 textColor(Color.rgb("FFFF00"))
	 }) {
	 position(Position() {
	 gravity(
	Gravity.compass(
	Compass.northWest()))
 offsetX(5)
 offsetY(208) })
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/plain_face.jpg", {transformation: [
  {color: "#FFFF00", height: 211, overlay: new cloudinary.TextLayer().fontFamily("Times").fontSize(36).fontWeight("bold").text("Unleash%2520the%2520full%2520potential%2520of%2520your%2520media"), width: 313, crop: "fit"},
  {flags: "layer_apply", gravity: "north_west", x: 5, y: 208}
  ]})
```

```react_native
new CloudinaryImage("docs/plain_face.jpg").addTransformation(
  "c_fit,co_rgb:FFFF00,h_211,l_text:Times_36_bold:Unleash%20the%20full%20potential%20of%20your%20media,w_313/fl_layer_apply,g_north_west,x_5,y_208"
);
```

## Effects with face detection

To apply a blur or pixelation effect to the automatically detected faces in an image, use the `effect` parameter and set it to one of the following values:

* `blur_faces` - Automatically blur all detected faces in the image: the strength of the blur effect is determined by an optional extra value (Range: 1 to 2000, Default: 500). For example, `e_blur_faces:100` uses a mild blur effect with a strength of 100.
* `pixelate_faces` - Automatically pixelate all detected faces in the image. The width of the pixelation squares is determined by an optional extra value (Range: 1 to 200, Default: 5). For example, `e_pixelate_faces:3` uses pixelation squares 3 pixels wide.

For example, to automatically pixelate both of the faces detected in the `young-couple` image with pixelation squares 9 pixels wide:

![Image with faces blurred](https://res.cloudinary.com/demo/image/upload/e_pixelate_faces:9/docs/young-couple.jpg "thumb: w_400")

```nodejs
cloudinary.image("docs/young-couple.jpg", {effect: "pixelate_faces:9"})
```

```react
new CloudinaryImage("docs/young-couple.jpg").effect(
  pixelate()
    .squareSize(9)
    .region(faces())
);
```

```vue
new CloudinaryImage("docs/young-couple.jpg").effect(
  pixelate()
    .squareSize(9)
    .region(faces())
);
```

```angular
new CloudinaryImage("docs/young-couple.jpg").effect(
  pixelate()
    .squareSize(9)
    .region(faces())
);
```

```js
new CloudinaryImage("docs/young-couple.jpg").effect(
  pixelate()
    .squareSize(9)
    .region(faces())
);
```

```python
CloudinaryImage("docs/young-couple.jpg").image(effect="pixelate_faces:9")
```

```php
(new ImageTag('docs/young-couple.jpg'))
	->effect(Effect::pixelate()->squareSize(9)
	->region(
	Region::faces())
	);
```

```java
cloudinary.url().transformation(new Transformation().effect("pixelate_faces:9")).imageTag("docs/young-couple.jpg");
```

```ruby
cl_image_tag("docs/young-couple.jpg", effect: "pixelate_faces:9")
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation().Effect("pixelate_faces:9")).BuildImageTag("docs/young-couple.jpg")
```

```dart
cloudinary.image('docs/young-couple.jpg').transformation(Transformation()
	.effect(Effect.pixelate().squareSize(9)
	.region(
	Region.faces())
	));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation().setEffect("pixelate_faces:9")).generate("docs/young-couple.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().effect("pixelate_faces:9")).generate("docs/young-couple.jpg");
```

```flutter
cloudinary.image('docs/young-couple.jpg').transformation(Transformation()
	.effect(Effect.pixelate().squareSize(9)
	.region(
	Region.faces())
	));
```

```kotlin
cloudinary.image {
	publicId("docs/young-couple.jpg")
	 effect(Effect.pixelate() { squareSize(9)
	 region(
	Region.faces())
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/young-couple.jpg", {effect: "pixelate_faces:9"})
```

```react_native
new CloudinaryImage("docs/young-couple.jpg").effect(
  pixelate()
    .squareSize(9)
    .region(faces())
);
```

## Advanced facial attributes detection 

With the [Advanced Facial Attributes Detection](advanced_facial_attributes_detection_addon) add-on, you can extend the Cloudinary built-in features that involve semantic photo data extraction, image cropping and the positioning of image overlays. When using the add-on, your images are further processed and additional advanced face attributes are automatically extracted. Cloudinary can then use these additional details to smartly crop, position, rotate and overlay images according to the position of the detected faces or eyes. 

The advanced facial detection is applied by setting the [`gravity`](resizing_and_cropping#control_gravity) parameter to one of the following values:

* `adv_face` - detects the single largest face in the image (`g_adv_face` for URLs).
* `adv_faces` - detects all of the faces in the image (`g_adv_faces` for URLs).
* `adv_eyes` - detects all the pairs of eyes in the image (`g_adv_eyes` for URLs).

For example, to automatically overlay the image `glasses` over the detected eyes in the `young-couple` image. The glasses are resized to 170% the width of the detected eyes by adding the `region_relative` flag:

![Automatically placed glasses on detected faces](https://res.cloudinary.com/demo/image/upload/l_glasses/c_scale,fl_region_relative,w_1.7/fl_layer_apply,g_adv_eyes/docs/young-couple.jpg "thumb: w_400")

```nodejs
cloudinary.image("docs/young-couple.jpg", {transformation: [
  {overlay: "glasses"},
  {flags: "region_relative", width: "1.7", crop: "scale"},
  {flags: "layer_apply", gravity: "adv_eyes"}
  ]})
```

```react
new CloudinaryImage("docs/young-couple.jpg").overlay(
  source(
    image("glasses").transformation(
      new Transformation().resize(scale().width(1.7).regionRelative())
    )
  ).position(new Position().gravity(focusOn(advancedEyes())))
);
```

```vue
new CloudinaryImage("docs/young-couple.jpg").overlay(
  source(
    image("glasses").transformation(
      new Transformation().resize(scale().width(1.7).regionRelative())
    )
  ).position(new Position().gravity(focusOn(advancedEyes())))
);
```

```angular
new CloudinaryImage("docs/young-couple.jpg").overlay(
  source(
    image("glasses").transformation(
      new Transformation().resize(scale().width(1.7).regionRelative())
    )
  ).position(new Position().gravity(focusOn(advancedEyes())))
);
```

```js
new CloudinaryImage("docs/young-couple.jpg").overlay(
  source(
    image("glasses").transformation(
      new Transformation().resize(scale().width(1.7).regionRelative())
    )
  ).position(new Position().gravity(focusOn(advancedEyes())))
);
```

```python
CloudinaryImage("docs/young-couple.jpg").image(transformation=[
  {'overlay': "glasses"},
  {'flags': "region_relative", 'width': "1.7", 'crop': "scale"},
  {'flags': "layer_apply", 'gravity': "adv_eyes"}
  ])
```

```php
(new ImageTag('docs/young-couple.jpg'))
	->overlay(Overlay::source(
	Source::image("glasses")
	->transformation((new Transformation())
	->resize(Resize::scale()->width(1.7)
	->regionRelative()
	))
	)
	->position((new Position())
	->gravity(
	Gravity::focusOn(
	FocusOn::advancedEyes()))
	)
	);
```

```java
cloudinary.url().transformation(new Transformation()
  .overlay(new Layer().publicId("glasses")).chain()
  .flags("region_relative").width(1.7).crop("scale").chain()
  .flags("layer_apply").gravity("adv_eyes")).imageTag("docs/young-couple.jpg");
```

```ruby
cl_image_tag("docs/young-couple.jpg", transformation: [
  {overlay: "glasses"},
  {flags: "region_relative", width: 1.7, crop: "scale"},
  {flags: "layer_apply", gravity: "adv_eyes"}
  ])
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation()
  .Overlay(new Layer().PublicId("glasses")).Chain()
  .Flags("region_relative").Width(1.7).Crop("scale").Chain()
  .Flags("layer_apply").Gravity("adv_eyes")).BuildImageTag("docs/young-couple.jpg")
```

```dart
cloudinary.image('docs/young-couple.jpg').transformation(Transformation()
	.overlay(Overlay.source(
	Source.image("glasses")
	.transformation(new Transformation()
	.resize(Resize.scale().width(1.7)
	.regionRelative()
	))
	)
	.position(Position()
	.gravity(
	Gravity.focusOn(
	FocusOn.advancedEyes()))
	)
	));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation()
  .setOverlay("glasses").chain()
  .setFlags("region_relative").setWidth(1.7).setCrop("scale").chain()
  .setFlags("layer_apply").setGravity("adv_eyes")).generate("docs/young-couple.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation()
  .overlay(new Layer().publicId("glasses")).chain()
  .flags("region_relative").width(1.7).crop("scale").chain()
  .flags("layer_apply").gravity("adv_eyes")).generate("docs/young-couple.jpg");
```

```flutter
cloudinary.image('docs/young-couple.jpg').transformation(Transformation()
	.overlay(Overlay.source(
	Source.image("glasses")
	.transformation(new Transformation()
	.resize(Resize.scale().width(1.7)
	.regionRelative()
	))
	)
	.position(Position()
	.gravity(
	Gravity.focusOn(
	FocusOn.advancedEyes()))
	)
	));
```

```kotlin
cloudinary.image {
	publicId("docs/young-couple.jpg")
	 overlay(Overlay.source(
	Source.image("glasses") {
	 transformation(Transformation {
	 resize(Resize.scale() { width(1.7F)
	 regionRelative()
	 }) })
	 }) {
	 position(Position() {
	 gravity(
	Gravity.focusOn(
	FocusOn.advancedEyes()))
	 })
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("docs/young-couple.jpg", {transformation: [
  {overlay: new cloudinary.Layer().publicId("glasses")},
  {flags: "region_relative", width: "1.7", crop: "scale"},
  {flags: "layer_apply", gravity: "adv_eyes"}
  ]})
```

```react_native
new CloudinaryImage("docs/young-couple.jpg").overlay(
  source(
    image("glasses").transformation(
      new Transformation().resize(scale().width(1.7).regionRelative())
    )
  ).position(new Position().gravity(focusOn(advancedEyes())))
);
``` 

See the [Advanced Facial Attributes Detection](advanced_facial_attributes_detection_addon) documentation for more information and examples on using the add-on.

## Zoom level

When using either the [crop](resizing_and_cropping#crop) or [thumb](resizing_and_cropping#thumb) cropping modes and setting the [gravity](resizing_and_cropping#control_gravity) parameter to one of the face-detection values, the resulting image is delivered at a default zoom level. To control how much of the original image surrounding the face to keep, use the `zoom` parameter (`z` for URLs). This parameter accepts a decimal value that sets the new zoom level as a multiplier of the default zoom setting: a value less than 1.0 zooms out and a value greater than 1.0 zooms in. For example, `z_0.5` halves the default zoom to 50% and zooms out to include more of the background around the face, while `z_2.0` doubles the default zoom to 200% and zooms in to include less of the background around the face. 

Examples with the uploaded image called `woman`:

* Original image (scaled down): ![Original image](https://res.cloudinary.com/demo/image/upload/woman.jpg "thumb: w_400")

```nodejs
cloudinary.image("woman.jpg")
```

```react
new CloudinaryImage("woman.jpg");
```

```vue
new CloudinaryImage("woman.jpg");
```

```angular
new CloudinaryImage("woman.jpg");
```

```js
new CloudinaryImage("woman.jpg");
```

```python
CloudinaryImage("woman.jpg").image()
```

```php
(new ImageTag('woman.jpg'));
```

```java
cloudinary.url().transformation(new Transformation().imageTag("woman.jpg");
```

```ruby
cl_image_tag("woman.jpg")
```

```csharp
cloudinary.Api.UrlImgUp.BuildImageTag("woman.jpg")
```

```dart
cloudinary.image('woman.jpg').transformation(Transformation());
```

```swift
imageView.cldSetImage(cloudinary.createUrl().generate("woman.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().generate("woman.jpg");
```

```flutter
cloudinary.image('woman.jpg').transformation(Transformation());
```

```kotlin
cloudinary.image {
	publicId("woman.jpg") 
}.generate()
```

```jquery
$.cloudinary.image("woman.jpg")
```

```react_native
new CloudinaryImage("woman.jpg");
```
* Cropped with face detection and default zoom: ![Cropped with face detection and default zoom](https://res.cloudinary.com/demo/image/upload/c_crop,g_face/woman.jpg)

```nodejs
cloudinary.image("woman.jpg", {gravity: "face", crop: "crop"})
```

```react
new CloudinaryImage("woman.jpg").resize(crop().gravity(focusOn(face())));
```

```vue
new CloudinaryImage("woman.jpg").resize(crop().gravity(focusOn(face())));
```

```angular
new CloudinaryImage("woman.jpg").resize(crop().gravity(focusOn(face())));
```

```js
new CloudinaryImage("woman.jpg").resize(crop().gravity(focusOn(face())));
```

```python
CloudinaryImage("woman.jpg").image(gravity="face", crop="crop")
```

```php
(new ImageTag('woman.jpg'))
	->resize(Resize::crop()
	->gravity(
	Gravity::focusOn(
	FocusOn::face()))
	);
```

```java
cloudinary.url().transformation(new Transformation().gravity("face").crop("crop")).imageTag("woman.jpg");
```

```ruby
cl_image_tag("woman.jpg", gravity: "face", crop: "crop")
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation().Gravity("face").Crop("crop")).BuildImageTag("woman.jpg")
```

```dart
cloudinary.image('woman.jpg').transformation(Transformation()
	.resize(Resize.crop()
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation().setGravity("face").setCrop("crop")).generate("woman.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().gravity("face").crop("crop")).generate("woman.jpg");
```

```flutter
cloudinary.image('woman.jpg').transformation(Transformation()
	.resize(Resize.crop()
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```kotlin
cloudinary.image {
	publicId("woman.jpg")
	 resize(Resize.crop() {
	 gravity(
	Gravity.focusOn(
	FocusOn.face()))
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("woman.jpg", {gravity: "face", crop: "crop"})
```

```react_native
new CloudinaryImage("woman.jpg").resize(crop().gravity(focusOn(face())));
```
* Cropped with face detection and zoom set to 130%: ![Cropped with face detection and zoom set to 120%](https://res.cloudinary.com/demo/image/upload/c_crop,g_face,z_1.3/woman.jpg)

```nodejs
cloudinary.image("woman.jpg", {gravity: "face", zoom: "1.3", crop: "crop"})
```

```react
new CloudinaryImage("woman.jpg").resize(
  crop()
    .zoom(1.3)
    .gravity(focusOn(face()))
);
```

```vue
new CloudinaryImage("woman.jpg").resize(
  crop()
    .zoom(1.3)
    .gravity(focusOn(face()))
);
```

```angular
new CloudinaryImage("woman.jpg").resize(
  crop()
    .zoom(1.3)
    .gravity(focusOn(face()))
);
```

```js
new CloudinaryImage("woman.jpg").resize(
  crop()
    .zoom(1.3)
    .gravity(focusOn(face()))
);
```

```python
CloudinaryImage("woman.jpg").image(gravity="face", zoom="1.3", crop="crop")
```

```php
(new ImageTag('woman.jpg'))
	->resize(Resize::crop()->zoom(1.3)
	->gravity(
	Gravity::focusOn(
	FocusOn::face()))
	);
```

```java
cloudinary.url().transformation(new Transformation().gravity("face").zoom(1.3).crop("crop")).imageTag("woman.jpg");
```

```ruby
cl_image_tag("woman.jpg", gravity: "face", zoom: 1.3, crop: "crop")
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation().Gravity("face").Zoom(1.3).Crop("crop")).BuildImageTag("woman.jpg")
```

```dart
cloudinary.image('woman.jpg').transformation(Transformation()
	.resize(Resize.crop().zoom(1.3)
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation().setGravity("face").setZoom(1.3).setCrop("crop")).generate("woman.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().gravity("face").zoom(1.3).crop("crop")).generate("woman.jpg");
```

```flutter
cloudinary.image('woman.jpg').transformation(Transformation()
	.resize(Resize.crop().zoom(1.3)
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```kotlin
cloudinary.image {
	publicId("woman.jpg")
	 resize(Resize.crop() { zoom(1.3F)
	 gravity(
	Gravity.focusOn(
	FocusOn.face()))
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("woman.jpg", {gravity: "face", zoom: "1.3", crop: "crop"})
```

```react_native
new CloudinaryImage("woman.jpg").resize(
  crop()
    .zoom(1.3)
    .gravity(focusOn(face()))
);
```
* 150x150 thumbnail with face detection and default zoom: ![150x150 thumbnail with face detection and default zoom](https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_150,w_150/woman.jpg)

```nodejs
cloudinary.image("woman.jpg", {gravity: "face", height: 150, width: 150, crop: "thumb"})
```

```react
new CloudinaryImage("woman.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .gravity(focusOn(face()))
);
```

```vue
new CloudinaryImage("woman.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .gravity(focusOn(face()))
);
```

```angular
new CloudinaryImage("woman.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .gravity(focusOn(face()))
);
```

```js
new CloudinaryImage("woman.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .gravity(focusOn(face()))
);
```

```python
CloudinaryImage("woman.jpg").image(gravity="face", height=150, width=150, crop="thumb")
```

```php
(new ImageTag('woman.jpg'))
	->resize(Resize::thumbnail()->width(150)
->height(150)
	->gravity(
	Gravity::focusOn(
	FocusOn::face()))
	);
```

```java
cloudinary.url().transformation(new Transformation().gravity("face").height(150).width(150).crop("thumb")).imageTag("woman.jpg");
```

```ruby
cl_image_tag("woman.jpg", gravity: "face", height: 150, width: 150, crop: "thumb")
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation().Gravity("face").Height(150).Width(150).Crop("thumb")).BuildImageTag("woman.jpg")
```

```dart
cloudinary.image('woman.jpg').transformation(Transformation()
	.resize(Resize.thumbnail().width(150)
.height(150)
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation().setGravity("face").setHeight(150).setWidth(150).setCrop("thumb")).generate("woman.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().gravity("face").height(150).width(150).crop("thumb")).generate("woman.jpg");
```

```flutter
cloudinary.image('woman.jpg').transformation(Transformation()
	.resize(Resize.thumbnail().width(150)
.height(150)
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```kotlin
cloudinary.image {
	publicId("woman.jpg")
	 resize(Resize.thumbnail() { width(150)
 height(150)
	 gravity(
	Gravity.focusOn(
	FocusOn.face()))
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("woman.jpg", {gravity: "face", height: 150, width: 150, crop: "thumb"})
```

```react_native
new CloudinaryImage("woman.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .gravity(focusOn(face()))
);
```
* 150x150 thumbnail with face detection and zoom set to 70%: ![150x150 thumbnail with face detection and default zoom](https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_150,w_150,z_0.7/woman.jpg)

```nodejs
cloudinary.image("woman.jpg", {gravity: "face", height: 150, width: 150, zoom: "0.7", crop: "thumb"})
```

```react
new CloudinaryImage("woman.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .zoom(0.7)
    .gravity(focusOn(face()))
);
```

```vue
new CloudinaryImage("woman.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .zoom(0.7)
    .gravity(focusOn(face()))
);
```

```angular
new CloudinaryImage("woman.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .zoom(0.7)
    .gravity(focusOn(face()))
);
```

```js
new CloudinaryImage("woman.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .zoom(0.7)
    .gravity(focusOn(face()))
);
```

```python
CloudinaryImage("woman.jpg").image(gravity="face", height=150, width=150, zoom="0.7", crop="thumb")
```

```php
(new ImageTag('woman.jpg'))
	->resize(Resize::thumbnail()->width(150)
->height(150)
->zoom(0.7)
	->gravity(
	Gravity::focusOn(
	FocusOn::face()))
	);
```

```java
cloudinary.url().transformation(new Transformation().gravity("face").height(150).width(150).zoom(0.7).crop("thumb")).imageTag("woman.jpg");
```

```ruby
cl_image_tag("woman.jpg", gravity: "face", height: 150, width: 150, zoom: 0.7, crop: "thumb")
```

```csharp
cloudinary.Api.UrlImgUp.Transform(new Transformation().Gravity("face").Height(150).Width(150).Zoom(0.7).Crop("thumb")).BuildImageTag("woman.jpg")
```

```dart
cloudinary.image('woman.jpg').transformation(Transformation()
	.resize(Resize.thumbnail().width(150)
.height(150)
.zoom(0.7)
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```swift
imageView.cldSetImage(cloudinary.createUrl().setTransformation(CLDTransformation().setGravity("face").setHeight(150).setWidth(150).setZoom(0.7).setCrop("thumb")).generate("woman.jpg")!, cloudinary: cloudinary)
```

```android
MediaManager.get().url().transformation(new Transformation().gravity("face").height(150).width(150).zoom(0.7).crop("thumb")).generate("woman.jpg");
```

```flutter
cloudinary.image('woman.jpg').transformation(Transformation()
	.resize(Resize.thumbnail().width(150)
.height(150)
.zoom(0.7)
	.gravity(
	Gravity.focusOn(
	FocusOn.face()))
	));
```

```kotlin
cloudinary.image {
	publicId("woman.jpg")
	 resize(Resize.thumbnail() { width(150)
 height(150)
 zoom(0.7F)
	 gravity(
	Gravity.focusOn(
	FocusOn.face()))
	 }) 
}.generate()
```

```jquery
$.cloudinary.image("woman.jpg", {gravity: "face", height: 150, width: 150, zoom: "0.7", crop: "thumb"})
```

```react_native
new CloudinaryImage("woman.jpg").resize(
  thumbnail()
    .width(150)
    .height(150)
    .zoom(0.7)
    .gravity(focusOn(face()))
);
```

For more examples on using the zoom parameter see the article on [How to control the zoom level with automatic face-detection based image cropping](/blog/how_to_control_the_zoom_level_with_automatic_face_detection_based_image_cropping).

## Facial recognition (open source)
Cloudinary does not provide built-in _facial-recognition_ features. However, you can combine Cloudinary functionality with other AI technologies to address face recognition needs.

For example, the Cloudinary Solutions team built an [open-source library](https://github.com/cloudinary-devs/cloudinary-face-rekognition) that can learn and then auto-tag faces based on a **privately maintained** mapping between faces and names. This functionality could be used for internal applications, such as auto-mapping employee head shots to employee profile pages or tagging students in school event photos on a university website.

This open-source library uses an Amazon Rekognition lambda function, which is triggered by the [notification webhook](notifications) that's sent when photos are uploaded to a specified folder in Cloudinary, and afterwards uses Cloudinary's [Amazon Rekognition Auto-Tagging add-on](aws_rekognition_auto_tagging_addon) to automatically tag photos if they contain faces learned from that list.  

This [blog post](https://aws.amazon.com/blogs/apn/how-to-use-amazon-rekognition-on-cloudinary-to-auto-tag-faces-with-names/) walks you through the steps of using this open-source library to create your own private facial recognition auto-tagging app.