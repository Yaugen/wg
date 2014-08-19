(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/filterItemsTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div>\r\n\t<label for=\"item-filter\">Filter:</label>\r\n\t<select id=\"item-filter\">\r\n\t\t";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "filters");
if(t_3) {for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("filter", t_4);
output += "\r\n\t\t\t<option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"value", env.autoesc), env.autoesc);
output += "\" ";
if(runtime.memberLookup((t_4),"selected", env.autoesc)) {
output += "selected";
;
}
output += ">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"label", env.autoesc), env.autoesc);
output += "</option>\r\n\t\t";
;
}
}
frame = frame.pop();
output += "\r\n\t</select>\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/itemContainer.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"item-container\">\r\n\t<ul class=\"item-list\"></ul>\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/itemListTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "items");
if(t_3) {for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("item", t_4);
output += "\r\n\t";
env.getTemplate("templates/itemTemplate.html", function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
t_5.render(context.getVariables(), frame.push(), function(t_8,t_6) {
if(t_8) { cb(t_8); return; }
output += t_6
output += "\r\n";
})});
}
}
frame = frame.pop();
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/itemMacro.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var macro_t_1 = runtime.makeMacro(
["text"], 
["selected"], 
function (l_text, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
frame.set("text", l_text);
frame.set("selected", kwargs.hasOwnProperty("selected") ? kwargs["selected"] : "");
var t_2 = "";t_2 += "\r\n\t<li class=\"item\">\r\n\t\t<span>";
t_2 += runtime.suppressValue(l_text, env.autoesc);
t_2 += "</span>\r\n\t\t";
if(runtime.contextOrFrameLookup(context, frame, "selected")) {
t_2 += "\r\n\t\t\t<i class=\"icon\">X</i>\r\n\t\t";
;
}
t_2 += "\r\n\t</li>\r\n";
;
frame = frame.pop();
return new runtime.SafeString(t_2);
});
context.addExport("itemMacro");
context.setVariable("itemMacro", macro_t_1);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/itemTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<li class=\"item\">\r\n\t<span>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "item"), env.autoesc);
output += "</span>\r\n\t";
if(runtime.contextOrFrameLookup(context, frame, "selected")) {
output += "\r\n\t\t<i class=\"icon\">X</i>\r\n\t";
;
}
output += "\r\n</li>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/searchItemsTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div>\r\n\t<label for=\"item-search\">Search:</label>\r\n\t<input type=\"text\" id=\"item-search\"/>\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/selectItemsDialogTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div>\r\n\t<div class=\"js-search\"></div>\r\n\t<div class=\"js-filter\"></div>\r\n\t<div class=\"js-items-container\"></div>\r\n\t<div class=\"js-selected-items\"></div>\r\n\t<div class=\"js-confirm\">\r\n\t\t<a class=\"button js-confirm-button\" href=\"#\">Select</a>\r\n\t\t<a class=\"button js-cancel-button\" href=\"#\">Cancel</a>\r\n\t</div>\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/selectItemsTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div>\r\n\t<div class=\"selected-items js-selected-items\"></div>\r\n\t<a class=\"button js-edit-selection\" href=\"#\">Edit selection</a>\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/selectedItemsContainerTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div>\r\n\t<div class=\"selected-items js-selected-items\"></div>\r\n\t<a class=\"button js-edit-selection\" href=\"#\">Edit selection</a>\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/selectedItemsTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<ul class=\"selected-items\">\r\n\t";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "items");
if(t_3) {for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("item", t_4);
output += "\r\n\t\t";
env.getTemplate("templates/itemTemplate.html", function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
t_5.render(context.getVariables(), frame.push(), function(t_8,t_6) {
if(t_8) { cb(t_8); return; }
output += t_6
output += "\r\n\t";
})});
}
}
frame = frame.pop();
output += "\r\n</ul>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
