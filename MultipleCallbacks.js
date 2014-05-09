// does not work when this methods are not instantiated before, don't know why
_.each(Template, function (template, templateName) {
    if (template.kind === 'Template_' + templateName) {
        Template[templateName].created = function () {};
        Template[templateName].rendered = function () {};
        Template[templateName].destroyed = function () {};
    }
});

Template.created = function (template_name, callback) {
    var _base;
    this._created_callbacks || (this._created_callbacks = {});
    (_base = this._created_callbacks)[template_name] || (_base[template_name] = []);
    return this._created_callbacks[template_name].push(callback);
};

Template.bootstrapCreatedCallbacks = function () {
    return _.each(this, function (template, templateName) {
        if (template.kind === 'Template_' + templateName) {
            var superFunction = Template[templateName].created;

            return Template[templateName].created = function () {
                var self;
                superFunction();
                return _.each(_.union(Template._created_callbacks[templateName], Template._created_callbacks[null]), function (func) {
                    return func && func.bind(self)();
                });
            };
        }
    });
};

Template.rendered = function (template_name, callback) {
    var _base;
    this._rendered_callbacks || (this._rendered_callbacks = {});
    (_base = this._rendered_callbacks)[template_name] || (_base[template_name] = []);
    return this._rendered_callbacks[template_name].push(callback);
};

Template.bootstrapRenderedCallbacks = function () {
    return _.each(this, function (template, templateName) {
        if (template.kind === 'Template_' + templateName) {
            var superFunction = Template[templateName].rendered;

            return Template[templateName].rendered = function () {
                var self;
                superFunction();
                return _.each(_.union(Template._rendered_callbacks[templateName], Template._rendered_callbacks[null]), function (func) {
                    return func && func.bind(self)();
                });
            };
        }
    });
};

Template.destroyed = function (template_name, callback) {
    var _base;
    this._destroyed_callbacks || (this._destroyed_callbacks = {});
    (_base = this._destroyed_callbacks)[template_name] || (_base[template_name] = []);
    return this._destroyed_callbacks[template_name].push(callback);
};

Template.bootstrapDestroyedCallbacks = function () {
    return _.each(this, function (template, templateName) {
        if (template.kind === 'Template_' + templateName) {
            var superFunction = Template[templateName].destroyed;

            return Template[templateName].destroyed = function () {
                var self;
                superFunction();
                return _.each(_.union(Template._destroyed_callbacks[templateName], Template._destroyed_callbacks[null]), function (func) {
                    return func && func.bind(self)();
                });
            };
        }
    });
};

Meteor.startup(function () {
    Template.bootstrapCreatedCallbacks();
    Template.bootstrapRenderedCallbacks();
    Template.bootstrapDestroyedCallbacks();
});