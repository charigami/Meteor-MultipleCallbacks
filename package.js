Package.describe({
    summary : 'Enable multiple callbacks for created, rendered and destroyed events'
});

Package.on_use(function (api) {
    api.use(['templating', 'underscore'], ['client']);
    api.add_files('client/lib/multiple_callbacks.js', ['client']);
    if (api.export) api.export('MultipleCallbacks');
});

Package.on_test(function(api){
    api.use([
        'tinytest',
        'test-helpers',
        'templating',
        'underscore',
        'session',
        'deps'
    ], 'client');

    api.add_files('client/lib/multiple_callbacks.js', ['client']);

    api.add_files([
        'test/test-templates.html',
        'test/multiple_callback_test.js'
    ], ['client']);

});