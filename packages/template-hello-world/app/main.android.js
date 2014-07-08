var model = require("/modules/model");

var toDIP = function(context, num) {
    return android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, num, context.getResources().getDisplayMetrics());
};

var main = {
    init: function(activity) {
        var layout = new android.widget.LinearLayout(activity);
        layout.setOrientation(android.widget.LinearLayout.VERTICAL);
        activity.setContentView(layout);

        // Yes, looks ugly, but the UI TNS module is coming soon and you will not need to write such code any more.
        var titleView = new android.widget.TextView(activity);
        titleView.setText("Tap the button");
        titleView.setTextSize(30);
        titleView.setGravity(android.view.Gravity.CENTER);
        layout.addView(titleView);

        var messageView = new android.widget.TextView(activity);
        messageView.setText(model.getText());
        messageView.setTextSize(18);
        messageView.setGravity(android.view.Gravity.CENTER);

        var button = new android.widget.Button(activity);
        button.setText("Tap me!");
        var layoutParams = new android.widget.LinearLayout.LayoutParams(toDIP(activity, 300), toDIP(activity, 200));
        layoutParams.gravity = android.view.Gravity.CENTER;
        button.setLayoutParams(layoutParams);

        layout.addView(button);
        var listener = {
            onClick:  function() {
                console.log("onClick called");
                model.action();
                if (model.counter < 0) {
                    messageView.setLinksClickable(true);
                    messageView.setText(android.text.Html.fromHtml("<a href=\"http://github.com/nativescript/docs\">More info about NativeScript</a> "));
                    messageView.setMovementMethod(android.text.method.LinkMovementMethod.getInstance());
                } else {
                    messageView.setText(model.getText());
                }
            }
        };

        button.setOnClickListener(new android.view.View.OnClickListener(listener));

        layout.addView(messageView);
    }
};

var MainActivity = com.tns.NativeScriptActivity
    .extends({
                 onCreate: function() {
                     this.super.onCreate(null);
                     main.init(this);
                 }
             });

module.exports = MainActivity;