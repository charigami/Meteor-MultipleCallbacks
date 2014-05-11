Meteor-MultipleCallbacks
========================

Enable multiple callbacks for created / rendered / destroyed events. Thanks Ivan Brykov for the first version. Discussion can be found here: https://groups.google.com/forum/#!topic/meteor-talk/YjpK0fbEY9o


## Quick Start

For now, simply put MultipleCallbacks.js in your client/lib folder.

## How to use

You can still use Template.name.eventname and it will be allways called first.

And if you want to add more callbacks you can do it like so:

    Template.rendered(null, function () {
        ...
    });

where null means that it will apply to all templates.

Or, you can specify your Template like so:

    Template.rendered('templateName', function () {
        ...
    });

You can do it for created, rendered and destroyed events.

