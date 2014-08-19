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
output += "\r\n\t<li>";
output += runtime.suppressValue(t_4, env.autoesc);
output += "</li>\r\n";
;
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/selectItemsDialogTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div>\r\n\t<div class=\"js-search\">\r\n\t\t<label for=\"item-search\">Search:</label>\r\n\t\t<input type=\"text\" id=\"item-search\"/>\r\n\t</div>\r\n\t<div class=\"js-filter\">\r\n\t\t<label for=\"item-filter\">Filter:</label>\r\n\t\t<select id=\"item-filter\"></select>\r\n\t</div>\r\n\t<div class=\"js-items-container\">\r\n\t\t<ul>\r\n\t\t\t";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "items");
if(t_3) {for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("item", t_4);
output += "\r\n\t\t\t\t<li>";
output += runtime.suppressValue(t_4, env.autoesc);
output += "</li>\r\n\t\t\t";
;
}
}
frame = frame.pop();
output += "\r\n\t\t</ul>\r\n\t</div>\r\n\t<div class=\"js-selected-items\"></div>\r\n\t<div class=\"js-confirm\">\r\n\t\t<a class=\"button js-confirm-button\" href=\"#\"></a>\r\n\t\t<a class=\"button js-cancel-button\" href=\"#\"></a>\r\n\t</div>\r\n</div>";
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
