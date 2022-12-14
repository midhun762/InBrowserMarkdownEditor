!(function (a) {
    "use strict";
    function b(b, c, d, e, f) {
        if (c.length) {
            f.show();
            var g = new FormData(),
                h = 0;
            for (h = 0; h < c.length; h++) g.append("file" + h, c[h]);
            a.ajax({ url: b, type: "POST", contentType: !1, data: g, processData: !1, cache: !1, dataType: "json" })
                .done(function (a) {
                    var b = "";
                    a.length > 1 && (b = "\n");
                    for (var c = 0; c < a.length; c++) e.insertSnippet(d, "![](" + a[c] + ")" + b);
                })
                .always(function () {
                    f.hide();
                });
        }
    }
    function c(b) {
        var c,
            d = a(window).height(),
            e = b.offset().top;
        d > e && ((c = d - e), b.css("height", c + "px"));
    }
    function d(a, b) {
        a.commands.addCommand({
            name: "bold",
            bindKey: { win: "Ctrl-B", mac: "Command-B" },
            exec: function (a) {
                var c = a.session.getTextRange(a.getSelectionRange());
                "" === c ? b.insertSnippet(a, "**${1:text}**") : b.insertSnippet(a, "**" + c + "**");
            },
            readOnly: !1,
        }),
            a.commands.addCommand({
                name: "italic",
                bindKey: { win: "Ctrl-I", mac: "Command-I" },
                exec: function (a) {
                    var c = a.session.getTextRange(a.getSelectionRange());
                    "" === c ? b.insertSnippet(a, "*${1:text}*") : b.insertSnippet(a, "*" + c + "*");
                },
                readOnly: !1,
            }),
            a.commands.addCommand({
                name: "link",
                bindKey: { win: "Ctrl-K", mac: "Command-K" },
                exec: function (a) {
                    var c = a.session.getTextRange(a.getSelectionRange());
                    "" === c ? b.insertSnippet(a, "[${1:text}](http://$2)") : b.insertSnippet(a, "[" + c + "](http://$1)");
                },
                readOnly: !1,
            });
    }
    function e(a, b) {
        0 === a.getCursorPosition().column ? (a.navigateLineStart(), a.insert(b + " ")) : (a.navigateLineStart(), a.insert(b + " "), a.navigateLineEnd());
    }
    function f(b, c) {
        var d = "";
        return (
            (d += '<div class="md-loading"><span class="md-icon-container"><span class="md-icon"></span></span></div>'),
            (d += '<div class="md-toolbar">'),
            (d += '<div class="btn-toolbar">'),
            (d += '<div class="btn-group">'),
            (d += '<button type="button" data-mdtooltip="tooltip" title="' + c.label.btnHeader1 + '" class="md-btn btn btn-sm btn-default" data-btn="h1">H1</button>'),
            (d += '<button type="button" data-mdtooltip="tooltip" title="' + c.label.btnHeader2 + '" class="md-btn btn btn-sm btn-default" data-btn="h2">H2</button>'),
            (d += '<button type="button" data-mdtooltip="tooltip" title="' + c.label.btnHeader3 + '" class="md-btn btn btn-sm btn-default" data-btn="h3">H3</button>'),
            (d += "</div>"),
            (d += '<div class="btn-group">'),
            (d += '<button type="button" data-mdtooltip="tooltip" title="' + c.label.btnBold + '" class="md-btn btn btn-sm btn-default" data-btn="bold"><span class="glyphicon glyphicon-bold"></span></button>'),
            (d += '<button type="button" data-mdtooltip="tooltip" title="' + c.label.btnItalic + '" class="md-btn btn btn-sm btn-default" data-btn="italic"><span class="glyphicon glyphicon-italic"></span></button>'),
            (d += "</div>"),
            (d += '<div class="btn-group">'),
            (d += '<button type="button" data-mdtooltip="tooltip" title="' + c.label.btnList + '" class="md-btn btn btn-sm btn-default" data-btn="ul"><span class="glyphicon glyphicon glyphicon-list"></span></button>'),
            (d += '<button type="button" data-mdtooltip="tooltip" title="' + c.label.btnOrderedList + '" class="md-btn btn btn-sm btn-default" data-btn="ol"><span class="glyphicon glyphicon-th-list"></span></button>'),
            (d += "</div>"),
            (d += '<div class="btn-group">'),

           
            c.imageUpload === !0 &&
                (d +=
                    '<div data-mdtooltip="tooltip" title="' +
                    c.label.btnUpload +
                    '" class="btn btn-sm btn-default md-btn-file"><span class="glyphicon glyphicon-upload"></span><input class="md-input-upload" type="file" multiple accept=".jpg,.jpeg,.png,.gif"></div>'),
            (d += "</div>"),
           
            c.preview === !0 &&
                ((d += '<div class="btn-group pull-right">'),
                (d += '<button type="button" class="md-btn btn btn-sm btn-default btn-edit active" data-btn="edit"><span class="glyphicon glyphicon-pencil"></span> ' + c.label.btnEdit + "</button>"),
                (d += '<button type="button" class="md-btn btn btn-sm btn-default btn-preview" data-btn="preview"><span class="glyphicon glyphicon-eye-open"></span> ' + c.label.btnPreview + "</button>"),
                (d += "</div>")),
            (d += "</div>"),
            (d += "</div>"),
            (d += '<div class="md-editor">' + a("<div>").text(b).html() + "</div>"),
            (d += '<div class="md-preview" style="display:none"></div>')
        );
    }
    var g = {
        init: function (g) {
            var h,
                i = a.extend(!0, {}, a.fn.markdownEditor.defaults, g),
                j = this,
                k = !1,
                l = !1;
            j.addClass("md-textarea-hidden"), (h = a("<div/>")), j.after(h), h.addClass("md-container").html(f(j.val(), i)), "function" == typeof a().tooltip && h.find('[data-mdtooltip="tooltip"]').tooltip({ container: "body" });
            var m = h.find(".md-editor"),
                n = h.find(".md-preview"),
                o = h.find(".md-loading");
            h.css({ width: i.width }), m.css({ height: i.height, fontSize: i.fontSize }), n.css({ height: i.height });
            var p,
                q = ace.edit(m[0]);
            return (
                q.setTheme("ace/theme/" + i.theme),
                q.getSession().setMode("ace/mode/markdown"),
                q.getSession().setUseWrapMode(!0),
                q.getSession().setUseSoftTabs(i.softTabs),
                q.getSession().on("change", function () {
                    j.val(q.getSession().getValue());
                }),
                q.setHighlightActiveLine(!1),
                q.setShowPrintMargin(!1),
                q.renderer.setShowGutter(!1),
                ace.config.loadModule("ace/ext/language_tools", function () {
                    (p = ace.require("ace/snippets").snippetManager), d(q, p);
                }),
                i.imageUpload &&
                    (h.find(".md-input-upload").on("change", function () {
                        var c = a(this).get(0).files;
                        b(i.uploadPath, c, q, p, o);
                    }),
                    h.on("dragenter", function (a) {
                        a.stopPropagation(), a.preventDefault();
                    }),
                    h.on("dragover", function (a) {
                        a.stopPropagation(), a.preventDefault();
                    }),
                    h.on("drop", function (a) {
                        a.preventDefault();
                        var c = a.originalEvent.dataTransfer.files;
                        b(i.uploadPath, c, q, p, o);
                    })),
              
                h.find(".md-btn").click(function () {
                    var b = a(this).data("btn"),
                        d = q.session.getTextRange(q.getSelectionRange());
                    "h1" === b
                        ? e(q, "#")
                        : "h2" === b
                        ? e(q, "##")
                        : "h3" === b
                        ? e(q, "###")
                        : "ul" === b
                        ? e(q, "*")
                        : "ol" === b
                        ? e(q, "1.")
                        : "bold" === b
                        ? q.execCommand("bold")
                        : "italic" === b
                        ? q.execCommand("italic")
                        : "link" === b
                        ? q.execCommand("link")
                        : "image" === b
                        ? "" === d
                            ? p.insertSnippet(q, "![${1:text}](http://$2)")
                            : p.insertSnippet(q, "![" + d + "](http://$1)")
                        : "edit" === b
                        ? ((k = !1), n.hide(), m.show(), h.find(".btn-edit").addClass("active"), h.find(".btn-preview").removeClass("active"), l === !0 && c(m))
                        : "preview" === b
                        ? ((k = !0),
                          n.html('<p style="text-align:center; font-size:16px">' + i.label.loading + "...</p>"),
                          i.onPreview(q.getSession().getValue(), function (a) {
                              n.html(a);
                          }),
                          m.hide(),
                          n.show(),
                          h.find(".btn-preview").addClass("active"),
                          h.find(".btn-edit").removeClass("active"),
                          l === !0 && c(n))
                        : "fullscreen" === b &&
                          (l === !0
                              ? ((l = !1), a("body, html").removeClass("md-body-fullscreen"), h.removeClass("md-fullscreen"), m.css("height", i.height), n.css("height", i.height))
                              : ((l = !0), a("body, html").addClass("md-body-fullscreen"), h.addClass("md-fullscreen"), c(k === !1 ? m : n)),
                          q.resize()),
                        q.focus();
                }),
                this
            );
        },
        content: function () {
            var a = ace.edit(this.find(".md-editor")[0]);
            return a.getSession().getValue();
        },
        setContent: function (a) {
            var b = ace.edit(this.find(".md-editor")[0]);
            b.setValue(a, 1);
        },
    };
    (a.fn.markdownEditor = function (b) {
        return g[b] ? g[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " does not exist on jQuery.markdownEditor") : g.init.apply(this, arguments);
    }),
        (a.fn.markdownEditor.defaults = {
            width: "100%",
            height: "400px",
            fontSize: "14px",
            
            softTabs: !0,
            fullscreen: !0,
            imageUpload: !1,
            uploadPath: "",
            preview: !1,
            onPreview: function (a, b) {
                b(a);
            }, 
            label: {
                btnHeader1: "Header 1",
                btnHeader2: "Header 2",
                btnHeader3: "Header 3",
                btnBold: "Bold",
                btnItalic: "Italic",
                btnList: "Unordered list",
                btnOrderedList: "Ordered list",
                 btnEdit: "Edit",
                btnPreview: "Preview",
                btnFullscreen: "Fullscreen",
                loading: "Loading",
            },
        });
})(jQuery);
