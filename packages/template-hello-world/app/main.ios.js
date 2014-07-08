require("globals");

var model = require("/modules/model");

var MainViewController = UIKit.UIViewController
    .extends({
                 viewDidLoad: function() {
                     this.super.viewDidLoad();

                     // Yes, looks ugly, but the UI TNS module is coming soon and you will not need to write such code any more.
                     this.titleLabel = UIKit.UILabel.initWithFrame(CoreGraphics.CGRectMake(0, 20, 200, 40));
                     this.setLabelStyle(this.titleLabel, "Tap the button", 20);
                     this.view.addSubview(this.titleLabel);

                     this.button = UIKit.UILabel.initWithFrame(CoreGraphics.CGRectMake(0, 60, 200, 40));
                     this.setLabelStyle(this.button, "Tap me!", 18);

                     this.button.userInteractionEnabled = true;
                     this.button.backgroundColor = UIKit.UIColor.lightGrayColor();
                     this.button.layer.borderWidth = 2;
                     this.button.layer.borderColor = UIKit.UIColor.blackColor().CGColor;

                     this.view.addSubview(this.button);

                     var tapGestureRecognizer = UIKit.UITapGestureRecognizer.initWithTargetAction(this, 'onClick');
                     this.button.addGestureRecognizer(tapGestureRecognizer);

                     this.messageView = UIKit.UITextView.initWithFrame(CoreGraphics.CGRectMake(0, 100, 200, 40));
                     this.messageView.editable = false;
                     this.setLabelStyle(this.messageView, model.getText(), 14);
                     this.view.addSubview(this.messageView);

                     this.centerSubview(this.titleLabel);
                     this.centerSubview(this.button);
                     this.centerSubview(this.messageView);
                 },

                 setLabelStyle: function(view, text, fontSize) {
                     view.font = UIKit.UIFont.fontWithNameSize("HelveticaNeue-Thin", fontSize || 12);
                     view.numberOfLines = 1;
                     view.textAlignment = UIKit.NSTextAlignment.NSTextAlignmentCenter;
                     view.text = text;
                 },

                 centerSubview: function(subview) {
                     var orientation = this.interfaceOrientation;

                     var isPortrait = orientation == UIKit.UIInterfaceOrientation.UIInterfaceOrientationPortrait ||
                                      orientation == UIKit.UIInterfaceOrientation.UIInterfaceOrientationPortraitUpsideDown;

                     var viewSize = this.view.frame.size;
                     var desiredSize = subview.sizeThatFits(viewSize);
                     desiredSize.width = desiredSize.width + 20;
                     desiredSize.height = desiredSize.height + 10;

                     var viewOrigin = subview.frame.origin;
                     var viewWidth = isPortrait ? viewSize.width : viewSize.height;
                     var left = (viewWidth - desiredSize.width) / 2;

                     subview.frame = CoreGraphics.CGRectMake(left, viewOrigin.y, desiredSize.width, desiredSize.height);
                 },

                 didRotateFromInterfaceOrientation: function(fromInterfaceOrientatin) {
                     this.centerSubview(this.titleLabel);
                     this.centerSubview(this.button);
                     this.centerSubview(this.messageLabel);
                     this.super.didRotateFromInterfaceOrientation(fromInterfaceOrientatin);
                 },

                 onClick: function() {
                     model.action();
                     if (model.counter < 0) {
                         this.messageView.text = "More info about NativeScript - http://github.com/nativescript/docs";
                         this.messageView.dataDetectorTypes = UIKit.UIDataDetectorTypes.UIDataDetectorTypeLink;
                         this.centerSubview(this.messageView);
                     } else {
                         this.messageView.text = model.getText();
                     }
                 }
             }, {
                 exposedMethods: {
                     'onClick': 'v@:@'
                 }
             });

module.exports = {
    MainViewController: MainViewController
};