var eventNames = ['created', 'rendered', 'destroyed'];
var methodNames = ['Created', 'Rendered', 'Destroyed'];

// does not work when this methods are not instantiated before, don't know why
_.each(Template, function(template, templateName) {
    if (template.kind === 'Template_' + templateName) {
        _.each(eventNames, function(eventName) {
            Template[templateName][eventName] = function() {};
        });
    }
});

_.each(eventNames, function(eventName, i) {
    Template[eventName] = function(template_name, callback) {
        var _base;
        this['_' + eventName + '_callbacks'] || (this['_' + eventName + '_callbacks'] = {});
        (_base = this['_' + eventName + '_callbacks'])[template_name] || (_base[template_name] = []);
        return this['_' + eventName + '_callbacks'][template_name].push(callback);
    };

    Template['bootstrap' + methodNames[i] + 'Callbacks'] = function() {
        return _.each(this, function(template, templateName) {
            if (template.kind === 'Template_' + templateName) {
                var superFunction = Template[templateName][eventName];

                return Template[templateName][eventName] = function() {
                    var self;
                    superFunction();
                    return _.each(_.union(Template['_' + eventName + '_callbacks'][templateName], Template['_' + eventName + '_callbacks'][null]), function(func) {
                        return func && func.bind(self)();
                    });
                };
            }
        });
    };
});

Meteor.startup(function() {
    Template.bootstrapCreatedCallbacks();
    Template.bootstrapRenderedCallbacks();
    Template.bootstrapDestroyedCallbacks();
});