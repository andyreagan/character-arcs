if ("undefined" === typeof jQuery) throw Error("Please include jQuery prior to svBarChart.js");
if ("undefined" === typeof d3) throw Error("Please include d3.js prior to svBarChart.js");
var svReportModeEnum = {
    debugShort: "debugShort",
    debugLong: "debugLong",
    "final": "final"
};
Object.freeze && Object.freeze(svReportModeEnum);
svGlobalHelper = function() {
    this.tipsy1 = {
        fade: !0,
        gravity: $.fn.tipsy.autoSWSE,
        html: !0,
        delayIn: 200,
        delayOut: 500,
        opacity: .7
    };
    this.emotionColorMap = {
        joy: d3.rgb("#ff7f0e"),
        sadness: d3.rgb("#1f77b4"),
        trust: d3.rgb("#2ca02c"),
        disgust: d3.rgb("#8c564b"),
        fear: d3.rgb("#7f7f7f"),
        anger: d3.rgb("#d62728"),
        surprise: d3.rgb("#e377c2"),
        anticipation: d3.rgb("#17becf"),
        Joy: d3.rgb("#ff7f0e"),
        Sadness: d3.rgb("#1f77b4"),
        Trust: d3.rgb("#2ca02c"),
        Disgust: d3.rgb("#8c564b"),
        Fear: d3.rgb("#7f7f7f"),
        Anger: d3.rgb("#d62728"),
        Surprise: d3.rgb("#e377c2"),
        Anticipation: d3.rgb("#17becf")
    };
    var a = 0;
    this.getId = function() {
        return a++
    };
    this.createColorLookupFunction = function(a, b) {
        var e;
        if ("undefined" === typeof b || a.length > b.length) {
            var h = "category10";
            10 < a.length && (h = "category20");
            e = d3.scale[h]().domain(a)
        } else e = d3.scale.ordinal().range(b).domain(a);
        return function(a, b) {
            "undefined" === typeof b && (b = "none");
            switch (b) {
            case "littleDarker":
                return d3.rgb(e(a)).darker(1);
            case "darker":
            case "exclude":
                return d3.rgb(e(a)).darker(3);
            case "moreDarker":
                return d3.rgb(e(a)).darker(6);
            case "littleBrighter":
                return d3.rgb(e(a)).brighter(1);
            case "brighter":
                return d3.rgb(e(a)).brighter(3);
            case "moreBrighter":
                return d3.rgb(e(a)).brighter(6);
            default:
                return e(a)
            }
        }
    };
    this.getKeyFromValue = function(a, b) {
        for (var e in a)
            if (a[e] == b) return e
    };
    var b = "";
    this.customCodeURL = function(a) {
        "undefined" !== typeof a && (b = a);
        return b
    };
    var e = svReportModeEnum["final"];
    this.reportMode = function(a) {
        "undefined" !== typeof a && "undefined" !== typeof svGlobal.getKeyFromValue(svReportModeEnum, a) && (e = a);
        return e
    };
    var l =
        void 0;
    this.rootURL = function(a) {
        "undefined" !== typeof a && (l = a);
        return l
    };
    var m = void 0;
    this.currentScriptTitle = function(a) {
        "undefined" !== typeof a && (m = a);
        return m
    };
    var h = void 0;
    this.currentScript = function(a) {
        "undefined" !== typeof a && (h = a);
        return h
    };
    var p = $(location).attr("href").substr(0, document.URL.lastIndexOf("/") + 1);
    this.customDir = function(a) {
        "undefined" !== typeof a && (p = a);
        return p
    };
    this.cleanWpFormatting = function(a) {
        0 === a.lastIndexOf("<p>", 0) && (a = a.slice(3));
        a.indexOf("</p>", this.length - 4) === this.length -
            4 && (a = a.slice(0, -3));
        return a
    };
    return this
};
var svGlobal = new svGlobalHelper;
Array.prototype.contains = function(a) {
    return "undefined" === typeof a ? void 0 : 0 > this.indexOf(a) ? !1 : !0
};
Array.prototype.getMatches = function(a, b, e, l, m, h) {
    for (var p = [], t = 0; t < this.length; t++) {
        var v = this[t],
            u = v[a];
        "function" === typeof u && (u = v[a]());
        if (u == b) {
            if (null !== e && (u = v[e], "function" === typeof u && (u = v[e]()), u != l)) continue;
            if (null !== m && (u = v[m], "function" === typeof u && (u = v[m]()), u != h)) continue;
            p.push(v)
        }
    }
    return p
};
Array.prototype.last = function() {
    return this[this.length - 1]
};
String.format = function() {
    for (var a = arguments[0], b = 0; b < arguments.length - 1; b++) a = a.replace(new RegExp("\\{" + b + "\\}", "gm"), arguments[b + 1]);
    return a
};
String.prototype.format = function() {
    for (var a = this, b = 0; b < arguments.length; b++) a = a.replace(new RegExp("\\{" + b + "\\}", "gm"), arguments[b]);
    return a
};

function svPostObject(a) {
    "undefined" === typeof a && (a = {});
    this.getClass = function() {
        return "svPostObject"
    };
    var b = a.postSite;
    this.postSite = function(a) {
        "undefined" !== typeof a && (b = a);
        return b
    };
    var e = a.postVars;
    this.postVars = function(a) {
        "undefined" !== typeof a && (e = a);
        return e
    };
    var l = a.dataSuccessFunction;
    this.dataSuccessFunction = function(a) {
        "function" === typeof a && (l = a);
        return l
    };
    var m = a.dataFailFunction;
    this.dataFailFunction = function(a) {
        "function" === typeof a && (m = a);
        return m
    };
    var h = a.failFunction;
    this.failFunction =
        function(a) {
            "function" === typeof a && (h = a);
            return h
        };
    var p = a.alwaysFunction;
    this.alwaysFunction = function(a) {
        "function" === typeof a && (p = a);
        return p
    };
    var t = {};
    this.postData = function(a) {
        "undefined" !== typeof a && (t = a);
        return t
    };
    return Object.freeze ? Object.freeze(this) : this
}

function svPost(a) {
    "function" === typeof a.getClass && "svPostObject" === a.getClass() && (0 < svGlobal.customCodeURL().length && !a.postSite.startsWith(svGlobal.customCodeURL()) && (a.postSite = svGlobal.customCodeURL() + "/" + a.postSite), $.post(a.postSite(), a.postVars()).done(function(b) {
        var e, l;
        try {
            e = $.parseJSON(b), e.success && ("object" === typeof e.data ? a.postData(e.scriptData) : a.postData($.parseJSON(e.data))), l = !0
        } catch (m) {
            "function" === typeof a.failFunction() && (0 < b.length ? a.failFunction()(m.message + "<br/><br/>returned data:<br/>" +
                                                                                       b) : a.failFunction()(m.message)), l = !1
        }
        e.success ? "function" === typeof a.dataSuccessFunction() && a.dataSuccessFunction()(a) : "function" === typeof a.dataFailFunction() && a.dataFailFunction()(a);
        return l
    }).fail(function(b, e, l) {
        "function" === typeof a.failFunction() && a.failFunction()(e + ": " + l)
    }).always(function() {
        "function" === typeof a.alwaysFunction() && a.alwaysFunction()(a)
    }))
};
if ("undefined" === typeof jQuery) throw Error("Please include jQuery prior to ubColorLookup.js");
if ("undefined" === typeof d3) throw Error("Please include d3.js prior to ubColorLookup.js");
if ("undefined" === typeof svGlobal) throw Error("Please include svGlobal.js prior to ubColorLookup.js");
var ubColorLookup = function(a) {
    this.getClass = function() {
        return "ubColorLookup"
    };
    if ("undefined" !== typeof a && ("undefined" !== typeof a.keyList || "undefined" !== typeof a.customColorMap)) {
        var b = a.keyList,
            e = a.customColorArray;
        "undefined" !== typeof a.customColorMap && (b = [], e = [], $.each(a.customColorMap, function(a, h) {
            b.push(a);
            e.push(h)
        }));
        var l = function(a, b) {
            var e;
            if ("undefined" === typeof b || a.length > b.length) {
                var l = "category10";
                10 < a.length && (l = "category20");
                e = d3.scale[l]().domain(a)
            } else e = d3.scale.ordinal().range(b).domain(a);
            return function(a, b) {
                "undefined" === typeof b && (b = "none");
                switch (b) {
                case "littleDarker":
                    return d3.rgb(e(a)).darker(1);
                case "darker":
                case "exclude":
                    return d3.rgb(e(a)).darker(3);
                case "moreDarker":
                    return d3.rgb(e(a)).darker(6);
                case "littleBrighter":
                    return d3.rgb(e(a)).brighter(1);
                case "brighter":
                    return d3.rgb(e(a)).brighter(3);
                case "moreBrighter":
                    return d3.rgb(e(a)).brighter(6);
                default:
                    return e(a)
                }
            }
        }(b, e);
        this.getColorFor = function(a) {
            return "undefined" === typeof a || "undefined" !== typeof b && !b.contains(a) ?
                void 0 : l(a)
        };
        return Object.freeze ? Object.freeze(this) : this
    }
};
var svDataPoint = function(a, b, e) {
    this.getClass = function() {
        return "svDataPoint"
    };
    this.x = isNaN(parseFloat(a)) ? a : parseFloat(a);
    this.y = parseFloat(b);
    "undefined" === typeof e && (e = "false");
    this.last = "true" === e.toString().toLowerCase() ? !0 : !1
};
var svStackedDataPoint = function(a, b, e, l) {
    this.getClass = function() {
        return "svStackedDataPoint"
    };
    this.value = parseFloat(b);
    this.name = a;
    this.iconFilename = e;
    "undefined" === typeof l && (l = "false");
    this.last = "true" === l.toString().toLowerCase() ? !0 : !1;
    return Object.freeze ? Object.freeze(this) : this
};
if ("undefined" === typeof svDataPoint) throw Error("Please include svDataPoint.js prior to svDataSet.js");
var svDataSet = function(a, b, e) {
    this.getClass = function() {
        return "svDataSet"
    };
    "undefined" === typeof a && (a = "unnamedDataSet");
    var l = a;
    this.dataSetName = function(a) {
        "undefined" !== typeof a && (l = a);
        return l
    };
    var m = "undefined" !== typeof b ? b : a;
    this.dataSetLabel = function(a) {
        "undefined" !== typeof a && (m = a);
        return m
    };
    var h = [];
    !$.isArray(e) || "function" !== typeof e[0].getClass || "svDataPoint" !== e[0].getClass() && "svStackedDataPoint" !== e[0].getClass() || (h = e);
    this.dataPoints = function(a) {
        $.isArray(a) && 1 <= a.length && "function" ===
            a[0].getClass && "svDataPoint" === a[0].getClass() && (h = a);
        return h
    };
    var p = 0;
    this.total = function(a) {
        "undefined" !== typeof a && (p = a);
        return p
    };
    return Object.freeze ? Object.freeze(this) : this
};
if ("undefined" === typeof jQuery) throw Error("Please include jQuery prior to svInfoStat.js");
if ("undefined" === typeof d3) throw Error("Please include d3.js prior to svInfoStat.js");
if ("undefined" === typeof svGlobal) throw Error("Please include svGlobal.js prior to svInfoStat.js");
var svInfoStatSizeEnum = {
    small: "small",
    medium: "medium",
    large: "large"
};
Object.freeze && Object.freeze(svInfoStatSizeEnum);
var svInfoStatOptions = function() {
    this.getClass = function() {
        return "svInfoStatOptions"
    };
    var a = "infoStat_" + svGlobal.getId();
    this.id = function(b) {
        "undefined" !== typeof b && (a = b);
        return a
    };
    var b = "black";
    this.textColor = function(a) {
        "undefined" !== typeof a && (b = a);
        return b
    };
    var e = "#1f77b4";
    this.valueColor = function(a) {
        "undefined" !== typeof a && (e = a);
        return e
    };
    var l = svInfoStatSizeEnum.medium;
    this.size = function(a) {
        "undefined" !== typeof a && "undefined" !== typeof svGlobal.getKeyFromValue(svInfoStatSizeEnum, a) && (l = a);
        return l
    };
    var m = void 0;
    this.textSize = function(a) {
        "undefined" === typeof a || isNaN(parseInt(a)) || (m = parseInt(a));
        return m
    };
    var h = void 0;
    this.valueSize = function(a) {
        "undefined" === typeof a || isNaN(parseInt(a)) || (h = parseInt(a));
        return h
    };
    var p = 0;
    this.textTopMargin = function(a) {
        "undefined" === typeof a || isNaN(parseInt(a)) || (p = parseInt(a));
        return p
    };
    var t = 7;
    this.leftMargin = function(a) {
        "undefined" === typeof a || isNaN(parseInt(a)) || (t = parseInt(a));
        return t
    };
    var v = void 0;
    this.iconFile = function(a) {
        "undefined" !== typeof a && (v = a);
        return v
    };
    var u = void 0;
    this.iconWidth = function(a) {
        "undefined" === typeof a || isNaN(parseInt(a)) || (u = parseInt(a));
        return u
    };
    return Object.freeze ? Object.freeze(this) : this
},
    svInfoStatData = function(a) {
        "undefined" === typeof a && (a = {});
        this.getClass = function() {
            return "svInfoStatData"
        };
        var b = a.text || "";
        this.text = function(a) {
            "undefined" !== typeof a && (b = a);
            return b
        };
        var e = void 0 !== a.value ? a.value : 0;
        this.value = function(a) {
            "undefined" !== typeof a && (e = a);
            return e
        };
        return Object.freeze ? Object.freeze(this) : this
    },
    svInfoStat =
    function(a, b) {
        this.getClass = function() {
            return "svInfoStat"
        };
        if ("undefined" === typeof a || "function" !== typeof a.getClass || "svInfoStatData" !== a.getClass()) a = new svInfoStatData;
        if ("undefined" === typeof b || "function" !== typeof b.getClass || "svInfoStatOptions" !== b.getClass()) b = new svInfoStatOptions;
        this.div = $("<div/>", {
            id: b.id() + "Div"
        });
        var e, l, m, h = "<br/>",
            p = 0;
        switch (b.size()) {
        case "small":
            e = "12px";
            l = "15px";
            m = 20;
            p = "undefined" !== typeof b.textTopMargin() ? b.textTopMargin() : 0;
            h = "&nbsp;&nbsp;&nbsp;";
            break;
        case "large":
            e =
                "18px";
            l = "24px";
            m = 50;
            break;
        default:
        case "medium":
            e = "14px", l = "18px", m = 30
        }
        m = b.iconWidth() || m;
        e = b.textSize() || e;
        l = b.valueSize() || l;
        var t = 27 + (7 - b.leftMargin());
        b.iconFile() ? this.div.append("<div style='clear:left'><div style='float:left; margin-left:" + b.leftMargin() + "px; width:" + t + "px;'><img src='" + svGlobal.customDir() + "/images/" + b.iconFile() + "' width='" + m + "' style='vertical-align:middle; margin:5px 0px 5px 0px;'></img></div><div style='opacity:.8; float:left; margin-left:5px; margin-top:" + p + "px; padding:5px;  width:180px; vertical-align:middle;'><span class='thisInfoStatText' id='" +
                                       b.id() + "' style='font-size:" + e + "; color:" + b.textColor() + "; vertical-align:middle; text-align:center;'>" + a.text() + "</span>" + h + "<span class='thisInfoStatValue' style='float:right; font-size:" + l + "; color:" + b.valueColor() + "; font-weight:bold; vertical-align:middle; text-align:center;'>" + a.value() + "</span></div></div>") : this.div.append("<div style='opacity:.8;' ><span class='thisInfoStatText' id='" + b.id() + "' style='font-size:" + e + "; color:" + b.textColor() + "; margin-left:15px; vertical-align:middle;'>" + a.text() +
                                                                                                                                                                                                                                                                                                                                                                                                                    "</span><span class='thisInfoStatValue' style='font-size:" + l + "; color:" + b.valueColor() + "; margin-left:15px; font-weight:bold; vertical-align:middle;'>" + a.value() + "</span></div>");
        return this
    };
if ("undefined" === typeof jQuery) throw Error("Please include jQuery prior to svBarChart.js");
if ("undefined" === typeof d3) throw Error("Please include d3.js prior to svBarChart.js");
if ("undefined" === typeof svGlobal) throw Error("Please include svGlobal.js prior to svBarChart.js");
if ("undefined" === typeof ubColorLookup) throw Error("Please include ubColorLookup.js prior to svBarChart.js");
if ("undefined" === typeof svDataSet) throw Error("Please include svDataSet.js prior to svBarChart.js");
if ("undefined" === typeof svDataPoint) throw Error("Please include svDataPoint.js prior to svBarChart.js");
var svBarChartTypeEnum = {
    bar: "bar",
    point: "point"
};
Object.freeze && Object.freeze(svBarChartTypeEnum);
var svBarChartOptions = function() {
    this.getClass = function() {
        return "svBarChartOptions"
    };
    var a = 300;
    this.width = function(c) {
        "undefined" === typeof c || isNaN(parseInt(c)) || (a = parseInt(c));
        return a
    };
    var b = 200;
    this.height = function(a) {
        "undefined" === typeof a || isNaN(parseInt(a)) || (b = parseInt(a));
        return b
    };
    var e = {
        top: 20,
        right: 10,
        bottom: 20,
        left: 40
    };
    this.margin = function(a) {
        "undefined" !== typeof a && (e = a);
        return e
    };
    var l = svBarChartTypeEnum.bar;
    this.chartType = function(a) {
        "undefined" !== typeof a && "undefined" !== typeof svGlobal.getKeyFromValue(svBarChartTypeEnum,
                                                                                    a) && (l = a);
        return l
    };
    var m = 5;
    this.yTickCount = function(a) {
        "undefined" === typeof a || isNaN(parseInt(a)) || (m = parseInt(a));
        return m
    };
    var h = void 0;
    this.yDomain = function(a) {
        $.isArray(a) && 2 === a.length && (h = a);
        return h
    };
    var p = void 0;
    this.title = function(a) {
        "undefined" !== typeof a && (p = a);
        return p
    };
    var t = void 0;
    this.yAxisLabel = function(a) {
        "undefined" !== typeof a && (t = a);
        return t
    };
    var v = !1;
    this.showLegend = function(a) {
        "boolean" === typeof a && (v = a);
        return v
    };
    var u = !0;
    this.usePointLabel = function(a) {
        "boolean" === typeof a &&
            (u = a);
        return u
    };
    var w = !1;
    this.justPercentageTooltip = function(a) {
        "boolean" === typeof a && (w = a);
        return w
    };
    var q = !1;
    this.useXTotal = function(a) {
        "boolean" === typeof a && (q = a);
        return q
    };
    var n = null;
    this.sortBySetName = function(a) {
        "undefined" !== typeof a && (n = a);
        return n
    };
    var f = void 0;
    this.colorLookup = function(a) {
        "undefined" !== typeof a && "function" === typeof a.getClass && "ubColorLookup" === a.getClass() && (f = a);
        return f
    };
    var g = void 0;
    this.customColorArray = function(a) {
        $.isArray(a) && (g = a);
        return g
    };
    var s = !1;
    this.useHollowAndFill =
        function(a) {
            "boolean" === typeof a && (s = a);
            return s
        };
    var k = d3.format(".0f");
    this.numberFormat = function(a) {
        typeof a === typeof k && (k = a);
        return k
    };
    var d = "svBarChart_" + svGlobal.getId();
    this.divID = function(a) {
        "undefined" !== typeof a && (d = a);
        return d
    };
    return Object.freeze ? Object.freeze(this) : this
},
    svBarChartData = function(a) {
        "undefined" === typeof a && (a = {});
        this.getClass = function() {
            return "svBarChartData"
        };
        var b = void 0;
        isNaN(parseFloat(a.total)) || (b = parseFloat(a.total));
        this.total = function() {
            return b
        };
        var e = [];
        if ($.isArray(a.dataSetList))
            if ("function" ===
                a.dataSetList[0].getClass && "svDataSet" === a.dataSetList[0].getClass()) e = a.dataSetList;
        else {
            var l = [];
            $.each(a.dataSetList, function(a, b) {
                if ("undefined" !== typeof b.dataSetName && ("undefined" !== typeof b.data || $.isArray(b.data))) {
                    var e = [];
                    $.each(b.data, function(a, b) {
                        if ("undefined" !== typeof b.x && "undefined" !== typeof b.y) {
                            var h = new svDataPoint(b.x, b.y, b.last);
                            e.push(h)
                        }
                    });
                    var t = new svDataSet(b.dataSetName, b.dataSetLabel, e);
                    l.push(t)
                }
            });
            e = l
        }
        this.dataSetList = function() {
            return e
        };
        return Object.freeze ? Object.freeze(this) :
            this
    },
    svBarChart = function(a, b) {
        this.getClass = function() {
            return "svBarChart"
        };
        if ("undefined" === typeof a || "function" !== typeof a.getClass || "svBarChartData" !== a.getClass()) a = new svBarChartData;
        if ("undefined" === typeof b || "undefined" === typeof b.getClass || "svBarChartOptions" !== b.getClass()) b = new svBarChartOptions;
        var e = b.height(),
            l = b.margin(),
            m = b.divID();
        this.div = b.$div || (m ? $("#" + m) : void 0);
        "undefined" === typeof this.div && (this.div = $('<div style="padding:10px 10px 0px 10px;"></div>', {
            id: m,
            width: b.width(),
            height: e
        }));
        var h = [],
            p, t;
        if (2 === a.dataSetList().length && b.useHollowAndFill()) {
            $.each(a.dataSetList()[0].dataPoints(), function(a, c) {
                h.push(c.x)
            });
            p = new ubColorLookup({
                keyList: h
            });
            var v = [];
            $.each(a.dataSetList(), function(a, c) {
                v.push(c.dataSetName())
            });
            t = new ubColorLookup({
                keyList: v,
                customColorArray: b.customColorArray()
            })
        } else 1 === a.dataSetList().length ? $.each(a.dataSetList()[0].dataPoints(), function(a, c) {
            h.push(c.x)
        }) : $.each(a.dataSetList(), function(a, c) {
            h.push(c.dataSetName())
        }), "undefined" !== typeof b.customColorArray() &&
            h.length <= b.customColorArray().length && (p = new ubColorLookup({
                keyList: h,
                customColorArray: b.customColorArray()
            })), t = p = b.colorLookup() || p || new ubColorLookup({
                keyList: h
            });
        if ("null" !== typeof b.sortBySetName()) {
            var u = a.dataSetList().getMatches("dataSetName", b.sortBySetName())[0];
            "undefined" !== typeof u && (m = u.dataPoints(), m.sort(function(a, c) {
                return !a.last && !c.last || a.last && c.last ? d3.descending(a.y, c.y) : a.last ? 1 : -1
            }), u.dataPoints(m), $.each(a.dataSetList(), function(a, c) {
                if (c.dataSetName() !== u.dataSetName()) {
                    var f = [];
                    $.each(u.dataPoints(), function(a, d) {
                        var b = c.dataPoints().getMatches("x", d.x)[0];
                        "undefined" !== typeof b && f.push(b)
                    });
                    c.dataPoints(f)
                }
            }))
        }
        var m = b.width() - l.left - l.right,
            e = e - l.top - l.bottom,
            w = b.numberFormat(),
            q = d3.scale.ordinal().rangeRoundBands([0, m], .34).domain(a.dataSetList()[0].dataPoints().map(function(a) {
                return a.x
            })),
            n = d3.svg.axis().scale(q).orient("bottom").tickSize(0),
            f = 0,
            g = 0;
        "undefined" === typeof b.yDomain() ? $.each(a.dataSetList(), function(a, c) {
            var b = c.dataPoints().map(function(a) {
                return a.y
            }),
                d = d3.max(b),
                b = d3.min(b);
            d > f && (f = d);
            b < g && (g = b)
        }) : (g = b.yDomain()[0], f = b.yDomain()[1]);
        var s = d3.scale.linear().range([e, 0]).domain([g, f]),
            k = d3.svg.axis().scale(s).orient("left");
        0 <= b.yTickCount() && k.ticks(b.yTickCount());
        l = d3.select(this.div[0]).append("svg").attr("class", "barChart").attr("width", m + l.left + l.right).attr("height", e + l.top + l.bottom).append("g").attr("transform", "translate(" + l.left + "," + l.top + ")");
        l.append("g").attr("class", "x axis").attr("transform", "translate(0," + s(0) + ")").call(n).selectAll("text").attr("class",
                                                                                                                            "barLabel").style("text-anchor", "start").attr("dy", "0em").attr("transform", function() {
                                                                                                                                return "rotate(-90) translate(10, 0)"
                                                                                                                            });
        "undefined" !== typeof b.yAxisLabel() && l.append("g").attr("class", "y axis").call(k).append("text").attr("transform", "translate(" + m + ", -25)").attr("y", 6).style("text-anchor", "end").text(b.yAxisLabel());
        l.append("text").attr("class", "barChartTitle").attr("transform", "translate(0 ,-15)").attr("y", 6).text(function() {
            return "undefined" !== typeof b.title() ? b.title() : "undefined" !== typeof b.yAxisLabel &&
                null !== b.yAxisLabel ? b.yAxisLabel : "Count"
        });
        f = 0;
        $.each(a.dataSetList(), function(c, b) {
            var d = b.dataPoints().map(function(a) {
                return a.y
            });
            0 === typeof a.total() || -1 === a.total() ? b.total(d3.sum(d)) : -2 === a.total() ? b.total(null) : b.total(a.total());
            d = d3.max(d);
            d > f && (f = d)
        });
        "undefined" !== typeof a.benchmark && ("average" === a.benchmark.type ? l.selectAll(".benchmark").data(a.benchmark.data).enter().append("line").attr("class", "benchmark").attr("x1", function(a) {
            return q(a.x)
        }).attr("y1", function(a) {
            return s(a.y)
        }).attr("x2",
                function(a) {
                    return q(a.x) + q.rangeBand()
                }).attr("y2", function(a) {
                    return s(a.y)
                }).style("stroke", benchmarkColor).attr("stroke-width", lineWidth).style("fill", "red").style("opacity", .5).attr("original-title", function(c) {
                    return a.benchmark.dataSetName() + ": " + w(c.y)
                }) : "boxAndWhisker" === a.benchmark.type && (l.selectAll(".benchmark median").data(a.benchmark.data).enter().append("line").attr("class", "benchmark median").attr("x1", function(a) {
                    return q(a.x)
                }).attr("y1", function(a) {
                    return s(a.median)
                }).attr("x2",
                        function(a) {
                            return q(a.x) + q.rangeBand()
                        }).attr("y2", function(a) {
                            return s(a.median)
                        }).style("stroke", boxWhiskerPlotColor).attr("stroke-width", lineWidth).style("fill", "none").style("opacity", .5).attr("original-title", function(a) {
                            return "Median: " + w(a.median)
                        }), l.selectAll(".benchmark interQuartile").data(a.benchmark.data).enter().append("rect").attr("class", "benchmark interQuartile").attr("x", function(a) {
                            return q(a.x)
                        }).attr("width", q.rangeBand()).attr("y", function(a) {
                            return s(a.upperQuartile)
                        }).attr("height",
                                function(a) {
                                    return s(a.lowerQuartile) - s(a.upperQuartile)
                                }).style("stroke", boxWhiskerPlotColor).style("stroke-width", lineWidth).style("fill-opacity", 0).style("opacity", .5).attr("original-title", function(a) {
                                    return "Inter-quartile range: " + a.lowerQuartile + " to " + a.upperQuartile
                                }), l.selectAll(".benchmark outlierUpper").data(a.benchmark.data).enter().append("line").attr("class", "benchmark outlierUpper").attr("x1", function(a) {
                                    return q(a.x) + q.rangeBand() / 2
                                }).attr("y1", function(a) {
                                    return s(a.upperQuartile)
                                }).attr("x2",
                                        function(a) {
                                            return q(a.x) + q.rangeBand() / 2
                                        }).attr("y2", function(a) {
                                            return s(a.upperFence)
                                        }).style("stroke", boxWhiskerPlotColor).attr("stroke-width", lineWidth).style("fill-opacity", 0).style("opacity", .5).attr("original-title", function(a) {
                                            return "Median: " + w(a.median)
                                        }), l.selectAll(".benchmark outlierLower").data(a.benchmark.data).enter().append("line").attr("class", "benchmark outlierLower").attr("x1", function(a) {
                                            return q(a.x) + q.rangeBand() / 2
                                        }).attr("y1", function(a) {
                                            return s(a.lowerQuartile)
                                        }).attr("x2",
                                                function(a) {
                                                    return q(a.x) + q.rangeBand() / 2
                                                }).attr("y2", function(a) {
                                                    return s(a.lowerFence)
                                                }).style("stroke", boxWhiskerPlotColor).attr("stroke-width", lineWidth).style("fill", "none").style("opacity", .5).attr("original-title", function(a) {
                                                    return "Median: " + w(a.median)
                                                })), l.selectAll(".benchmark").each(function() {
                                                    $(this).tipsy(svGlobal.tipsy1)
                                                }));
        if (1 === a.dataSetList().length) {
            var d = a.dataSetList()[0];
            if (b.chartType() === svBarChartTypeEnum.bar) {
                var c = l.selectAll(".bar").data(d.dataPoints()).enter().append("rect").attr("class",
                                                                                             "bar").attr("x", function(a) {
                                                                                                 return q(a.x)
                                                                                             }).attr("width", q.rangeBand()).attr("y", function(a) {
                                                                                                 return 0 > a.y ? s(0) : s(a.y)
                                                                                             }).attr("height", function(a) {
                                                                                                 return Math.abs(s(0) - s(a.y))
                                                                                             }).style("fill", function(a, c) {
                                                                                                 return b.useHollowAndFill() && 0 === c || a.last ? "#ffffff" : p.getColorFor(a.x)
                                                                                             }).style("stroke", function(a) {
                                                                                                 return "#ffffff" === p.getColorFor(a.x) ? "#696969" : a.last ? "#696969" : p.getColorFor(a.x)
                                                                                             }).style("stroke-width", 2).attr("shape-rendering", "crispEdges").style("opacity", .4).attr("original-title", function(a) {
                                                                                                 var c =
                                                                                                     d.dataSetLabel();
                                                                                                 b.usePointLabel() && (c = a.x);
                                                                                                 return 0 < d.total() ? (c = c + ": " + parseInt(a.y / d.total() * 100 + .5) + "%", b.justPercentageTooltip() ? c : c += " (" + a.y + " of " + d.total() + ")") : c + ": " + a.y
                                                                                             });
                c.each(function() {
                    $(this).tipsy(svGlobal.tipsy1)
                })
                    } else if (b.chartType() === svBarChartTypeEnum.point) {
                        var A = d3.min([10, q.rangeBand() / 2]),
                            y = l.selectAll(".point").data(d.dataPoints()).enter().append("circle").attr("class", "point").attr("cx", function(a) {
                                return q(a.x) + q.rangeBand() / 2
                            }).attr("cy", function(a) {
                                return s(a.y)
                            }).attr("r",
                                    A).style("fill", function(a) {
                                        return p.getColorFor(a.x)
                                    }).style("opacity", .4).attr("original-title", function(a) {
                                        var c = d.dataSetLabel();
                                        b.usePointLabel() && (c = a.x);
                                        return 0 < d.total() ? c + ": " + parseInt(a.y / d.total() * 100 + .5) + "% (" + a.y + " of " + d.total() + ")" : d.dataSetLabel() + ": " + a.y
                                    });
                        y.each(function() {
                            $(this).tipsy(svGlobal.tipsy1)
                        })
                            }
        } else {
            var F = q.rangeBand() / a.dataSetList().length,
                A = d3.min([F / 2, 10]),
                n = l.selectAll(".dataX").data(a.dataSetList()[0].dataPoints().map(function(a) {
                    return a.x
                })).enter().append("g").attr("class",
                                             "g");
            if (b.useXTotal()) {
                var z = {};
                $.each(a.dataSetList(), function(a, c) {
                    $.each(c.dataPoints(), function(a, c) {
                        z[c.x] = "undefined" === typeof z[c.x] ? c.y : z[c.x] + c.y
                    })
                        })
                    }
            $.each(n[0], function(d, f) {
                $.each(a.dataSetList(), function(a, g) {
                    b.chartType() === svBarChartTypeEnum.bar ? (c = d3.select(f).append("rect").attr("class", "bar").attr("width", F - 3).attr("x", function() {
                        return "undefined" !== typeof g.dataPoints()[d] ? q(g.dataPoints()[d].x) + F * a : 0
                    }).attr("y", function() {
                        return "undefined" !== typeof g.dataPoints()[d] ? s(g.dataPoints()[d].y) :
                            0
                    }).attr("height", function() {
                        return "undefined" !== typeof g.dataPoints()[d] ? e - s(g.dataPoints()[d].y) : 0
                    }).style("fill", function() {
                        return b.useHollowAndFill() ? 0 === a ? "#ffffff" : g.dataPoints()[d].last ? "#696969" : p.getColorFor(g.dataPoints()[d].x) : p.getColorFor(g.dataSetName())
                    }).style("stroke-width", 2).style("stroke", function(a) {
                        return b.useHollowAndFill() ? g.dataPoints()[d].last ? "#696969" : p.getColorFor(g.dataPoints()[d].x) : "#ffffff" === p.getColorFor(g.dataSetName()) ? "#696969" : p.getColorFor(g.dataSetName())
                    }).attr("shape-rendering",
                            "crispEdges").style("opacity", .4).attr("original-title", function(a) {
                                return "undefined" !== typeof g.dataPoints()[d] ? b.useXTotal() ? d3.round(g.dataPoints()[d].y / z[g.dataPoints()[d].x] * 100, 0) + "% " + g.dataSetLabel() : 0 < g.total() ? parseInt(g.dataPoints()[d].y / g.total() * 100 + .5) + "% (" + g.dataPoints()[d].y + " of " + g.total() + " " + g.dataSetName() + ")" : w(g.dataPoints()[d].y) + ": " + g.dataSetName() : ""
                            }), c.each(function() {
                                $(this).tipsy(svGlobal.tipsy1)
                            })) : b.chartType() === svBarChartTypeEnum.point && (y = d3.select(f).append("circle").attr("class",
                                                                                                                        "point").attr("cx", function(c) {
                                                                                                                            return "undefined" !== typeof g.dataPoints()[d] ? q(g.dataPoints()[d].x) + A + F * a : 0
                                                                                                                        }).attr("cy", function(a) {
                                                                                                                            return "undefined" !== typeof g.dataPoints()[d] ? s(g.dataPoints()[d].y) : 0
                                                                                                                        }).attr("r", function() {
                                                                                                                            return "undefined" !== typeof g.dataPoints()[d] ? A : 0
                                                                                                                        }).style("fill", p.getColorFor(g.dataSetName())).style("opacity", .4).attr("original-title", function(a) {
                                                                                                                            return "undefined" !== typeof g.dataPoints()[d] ? 0 < g.total() ? parseInt(g.dataPoints()[d].y / g.total() * 100 + .5) + "% (" + g.dataPoints()[d].y +
                                                                                                                                " of " + g.total() + " " + g.dataSetName() + ")" : w(g.dataPoints()[d].y) + ": " + g.dataSetName() : ""
                                                                                                                        }), y.each(function() {
                                                                                                                            $(this).tipsy(svGlobal.tipsy1)
                                                                                                                        }))
                })
                    })
                }
        1 < a.dataSetList().length && b.showLegend() && (l = l.selectAll(".legend").data(a.dataSetList()).enter().append("g").attr("class", "legend").attr("transform", function(a, c) {
            return "translate(0," + (-19 + 13 * c) + ")"
        }), b.chartType() === svBarChartTypeEnum.bar ? l.append("rect").attr("x", m - 10).attr("width", 10).attr("height", 10).style("fill", function(a, c) {
            return b.useHollowAndFill() &&
                0 === c ? "#ffffff" : t.getColorFor(a.dataSetName())
        }).style("stroke-width", 2).style("stroke", function(a) {
            return "#ffffff" === t.getColorFor(a.dataSetName()) ? "#696969" : t.getColorFor(a.dataSetName())
        }).attr("shape-rendering", "crispEdges").style("opacity", .4).style("stroke-opacity", .4) : b.chartType() === svBarChartTypeEnum.point && l.append("circle").attr("cx", m - 5).attr("cy", 5).attr("r", 5).style("fill", function(a) {
            return t.getColorFor(a.dataSetName())
        }).style("opacity", .4), l.append("text").attr("class", "legend").attr("x",
                                                                               m - 14).attr("y", 9).attr("font-size", 12).style("text-anchor", "end").text(function(a) {
                                                                                   return a.dataSetLabel()
                                                                               }));
        return this
    };
if ("undefined" === typeof jQuery) throw Error("Please include jQuery prior to svBarChart.js");
if ("undefined" === typeof d3) throw Error("Please include d3.js prior to svBarChart.js");
if ("undefined" === typeof svGlobal) throw Error("Please include svGlobal.js prior to svBarChart.js");
if ("undefined" === typeof ubColorLookup) throw Error("Please include ubColorLookup.js prior to svBarChart.js");
if ("undefined" === typeof svDataSet) throw Error("Please include svDataSet.js prior to svBarChart.js");
if ("undefined" === typeof svDataPoint) throw Error("Please include svDataPoint.js prior to svBarChart.js");
var svStackedBarChartOrientationEnum = {
    horizontal: "horizontal",
    vertical: "vertical"
};
Object.freeze && Object.freeze(svStackedBarChartOrientationEnum);
var svStackedBarChartOptions = function() {
    this.getClass = function() {
        return "svBarChartOptions"
    };
    var a = 300;
    this.width = function(c) {
        "undefined" === typeof c || isNaN(parseInt(c)) || (a = parseInt(c));
        return a
    };
    var b = 200;
    this.height = function(a) {
        "undefined" === typeof a || isNaN(parseInt(a)) || (b = parseInt(a));
        return b
    };
    var e = {
        top: 5,
        right: 10,
        bottom: 20,
        left: 40
    };
    this.margin = function(a) {
        "undefined" !== typeof a && (e = a);
        return e
    };
    var l = svStackedBarChartOrientationEnum.horizontal;
    this.chartOrientation = function(a) {
        "undefined" !==
            typeof a && "undefined" !== typeof svGlobal.getKeyFromValue(svStackedBarChartOrientationEnum, a) && (l = a);
        return l
    };
    var m = 5;
    this.yTickCount = function(a) {
        "undefined" === typeof a || isNaN(parseInt(a)) || (m = parseInt(a));
        return m
    };
    var h = void 0;
    this.yDomain = function(a) {
        $.isArray(a) && 2 === a.length && (h = a);
        return h
    };
    var p = void 0;
    this.title = function(a) {
        "undefined" !== typeof a && (p = a);
        return p
    };
    var t = !1;
    this.hideLabel = function(a) {
        "boolean" === typeof a && (t = a);
        return t
    };
    var v = !1;
    this.xAxis = function(a) {
        "boolean" === typeof a &&
            (v = a);
        return v
    };
    var u = !1;
    this.yAxis = function(a) {
        "boolean" === typeof a && (u = a);
        return u
    };
    var w = void 0;
    this.yAxisLabel = function(a) {
        "undefined" !== typeof a && (w = a);
        return w
    };
    var q = !1;
    this.showLegend = function(a) {
        "boolean" === typeof a && (q = a);
        return q
    };
    var n = !1;
    this.justPercentageTooltip = function(a) {
        "boolean" === typeof a && (n = a);
        return n
    };
    var f = !1;
    this.useXTotal = function(a) {
        "boolean" === typeof a && (f = a);
        return f
    };
    var g = null;
    this.sortBySetName = function(a) {
        "undefined" !== typeof a && (g = a);
        return g
    };
    var s = void 0;
    this.colorLookup =
        function(a) {
            "undefined" !== typeof a && "function" === typeof a.getClass && "ubColorLookup" === a.getClass() && (s = a);
            return s
        };
    var k = void 0;
    this.customColorArray = function(a) {
        $.isArray(a) && (k = a);
        return k
    };
    var d = !1;
    this.useHollowAndFill = function(a) {
        "boolean" === typeof a && (d = a);
        return d
    };
    var c = d3.format(".0f");
    this.numberFormat = function(a) {
        typeof a === typeof c && (c = a);
        return c
    };
    var A = "svStackedBarChart_" + svGlobal.getId();
    this.divID = function(a) {
        "undefined" !== typeof a && (A = a);
        return A
    };
    return Object.freeze ? Object.freeze(this) :
        this
},
    svStackedBarChartData = function(a) {
        "undefined" === typeof a && (a = {});
        this.getClass = function() {
            return "svStackedBarChartData"
        };
        var b = void 0;
        isNaN(parseFloat(a.total)) || (b = parseFloat(a.total));
        this.total = function() {
            return b
        };
        var e = svStackedBarChartOrientationEnum.horizontal;
        "undefined" !== typeof a.orientation && "undefined" !== typeof svGlobal.getKeyFromValue(svStackedBarChartOrientationEnum, a.orientation) && (e = svGlobal.getKeyFromValue(svStackedBarChartOrientationEnum, a.orientation));
        this.orientation = function() {
            return e
        };
        var l = [];
        if ($.isArray(a.stackedDataSetList))
            if ("function" === a.stackedDataSetList[0].getClass && "svDataSet" === a.dataSetList[0].getClass()) l = a.stackedDataSetList;
        else {
            var m = [];
            $.each(a.stackedDataSetList, function(a, b) {
                if ("undefined" !== typeof b.dataSetLabel && ("undefined" !== typeof b.data || $.isArray(b.data))) {
                    var e = [];
                    $.each(b.data, function(a, b) {
                        if ("undefined" !== typeof b.name && "undefined" !== typeof b.value) {
                            var h = new svStackedDataPoint(b.name, b.value, b.iconFilename, b.last);
                            e.push(h)
                        }
                    });
                    var l = new svDataSet(b.dataSetName,
                                          b.dataSetLabel, e);
                    l.total(b.dataSetTotal);
                    m.push(l)
                }
            });
            l = m
        }
        this.stackedDataSetList = function() {
            return l
        };
        return Object.freeze ? Object.freeze(this) : this
    },
    svStackedBarChart = function(a, b) {
        var e, l = [];
        $.each(a.stackedDataSetList(), function(a, d) {
            $.each(d.dataPoints(), function(a, d) {
                0 <= $.inArray(d.name, l) || l.push(d.name)
            })
                });
        "function" === typeof b.colorLookup() && "ubColorLookup" === b.colorLookup().getClass() ? e = b.colorLookup : b.customColorArray() && l.length <= b.customColorArray().length && (e = svGlobal.createColorLookupFunction(l,
                                                                                                                                                                                                                                 b.customColorArray()));
        e = e || svGlobal.createColorLookupFunction(l);
        var m = 5;
        b.hideLabel() || (m = 20);
        b.showLegend() && (m += 10 * l.length);
        var h = b.margin().left || 25 + 15 * (1 < a.stackedDataSetList.length ? 1 : 0),
            p = b.margin().bottom || 30,
            h = b.margin() || {
                top: m,
                right: 10,
                bottom: p,
                left: h
            },
            t = h.top + h.bottom + 20,
            m = b.width(),
            p = b.height();
        p < t && (p = t);
        t = b.divID() || svGlobal.getId();
        this.div = $("#" + t);
        "undefined" === typeof this.div && (this.div = $('<div style="padding:10px 10px 0px 10px;"></div>', {
            id: t,
            width: m,
            height: p
        }));
        var t = a.stackedDataSetList().map(function(a) {
            return a.dataSetLabel
        }),
            v = b.numberFormat(),
            u = d3.select(this.div[0]).append("svg").attr("class", "stackedBarChart").attr("width", m).attr("height", p).append("g");
        if (b.chartOrientation() === svStackedBarChartOrientationEnum.horizontal) {
            var w = d3.scale.ordinal().rangeRoundBands([h.top, p - h.bottom], .1).domain(t),
                t = d3.svg.axis().scale(w).orient("left");
            b.yTickCount() && t.ticks(b.yTickCount());
            var q = 0;
            $.each(a.stackedDataSetList(), function(b, d) {
                var c = d.dataPoints().map(function(a) {
                    return a.value
                }),
                    c = d3.sum(c);
                "undefined" === typeof d.total ||
                    -1 === d.total() ? d.total(c) : -2 === a.total() && d.total(void 0);
                c > q && (q = c)
            });
            var n = d3.scale.linear().range([h.left, m - h.right]).domain([0, q]),
                f = d3.scale.linear().range([0, m - h.left - h.right]).domain([0, q]),
                n = d3.svg.axis().scale(n).orient("bottom");
            b.xAxis() && u.append("g").attr("class", "x axis").attr("transform", "translate(0," + (p - h.bottom) + ")").call(n);
            b.yAxis() && 1 < a.stackedDataSetList().length && u.append("g").attr("class", "y axis").attr("transform", "translate(" + h.left + ",0)").call(t);
            var g = 0;
            $.each(a.stackedDataSetList(),
                   function(b, d) {
                       var c = d.dataPoints().map(function(a) {
                           return a.value
                       }),
                           c = d3.sum(c);
                       "undefined" === typeof d.total() || -1 === d.total() ? d.total = c : -2 === a.total() && (d.total = void 0);
                       c > g && (g = c)
                   });
            u.selectAll(".dataY").data(a.stackedDataSetList()).enter().append("g").attr("class", function(a, d) {
                return "dataY__" + d
            }).attr("transform", "translate (" + h.left + ",0)");
            var s;
            $.each(a.stackedDataSetList(), function(a, d) {
                var c = 0;
                $.each(d.dataPoints(), function(g, h) {
                    var l = 0 < w.rangeBand() ? w.rangeBand() : 30;
                    if ("undefined" !== typeof h.iconFilename) {
                        var p =
                            .88 * l;
                        u.select(".dataY__" + a).append("image").attr("xlink:href", svGlobal.customDir() + "/images/" + h.iconFilename).attr("x", c + f(h.value / 2) - p / 2 + "px").attr("y", .05 * l + 1 + "px").attr("width", p + "px").attr("height", p + "px").style("opacity", 1)
                    }
                    s = u.select(".dataY__" + a).append("rect").attr("class", "bar").attr("x", function() {
                        return c
                    }).attr("width", f(h.value)).attr("y", function() {
                        return w(d.dataSetLabel())
                    }).attr("height", l + "px").style("fill", e(h.name)).style("stroke", function() {
                        return "#ffffff" === e(h.name) ? "#696969" :
                            e(h.name)
                    }).style("stroke-width", 2).style("shape-rendering", "crispEdges").style("opacity", .4).attr("original-title", function(a) {
                        return 0 < d.total() ? (a = h.name + ": " + parseInt(h.value / d.total() * 100 + .5) + "%", b.justPercentageTooltip() ? a : a += " (" + h.value + " of " + d.total() + ")") : v(h.value) + ": " + h.name
                    });
                    c += f(h.value);
                    s.each(function() {
                        $(this).tipsy(svGlobal.tipsy1)
                    })
                        })
                    })
                }
        b.hideLabel() || "undefined" === typeof b.label() || u.append("text").attr("class", "stackedBarChartTitle").attr("transform", "translate(" + (h.left - 10) +
                                                                                                                         ", 20 )").text(b.label());
        1 < l.length && b.showLegend() && (h = u.selectAll(".legend").data(l).enter().append("g").attr("class", "legend").attr("transform", function(a, d) {
            return "translate(0," + (5 + 15 * d) + ")"
        }), h.append("rect").attr("x", m - 10).attr("width", 10).attr("height", 10).style("fill", function(a) {
            return e(a)
        }).style("opacity", .4), h.append("text").attr("class", "legend").attr("x", m - 14).attr("y", 9).attr("font-size", 8).style("text-anchor", "end").text(function(a) {
            return a
        }));
        return this
    };
if ("undefined" === typeof jQuery) throw Error("Please include jQuery prior to svBarChart.js");
if ("undefined" === typeof d3) throw Error("Please include d3.js prior to svBarChart.js");
if ("undefined" === typeof svGlobal) throw Error("Please include svGlobal.js prior to svBarChart.js");
if ("undefined" === typeof ubColorLookup) throw Error("Please include ubColorLookup.js prior to svBarChart.js");
var svEmotionSignatureTypesEnum = {
    positive: "positive",
    negative: "negative",
    joy: "joy",
    sadness: "sadness",
    fear: "fear",
    anger: "anger",
    trust: "trust",
    disgust: "disgust",
    anticipation: "anticipation",
    surprise: "surprise",
    totalEmotion: "totalEmotion",
    optimism: "optimism",
    love: "love",
    submission: "submission",
    awe: "awe",
    disapproval: "disapproval",
    remorse: "remorse",
    contempt: "contempt",
    aggressiveness: "aggressiveness"
};
Object.freeze && Object.freeze(svEmotionSignatureTypesEnum);
var svEmotionSignatureChartOptions = function() {
    this.getClass = function() {
        return "svEmotionSignatureChartOptions"
    };
    var a = 600;
    this.width = function(b) {
        "undefined" === typeof b || isNaN(parseInt(b)) || (a = parseInt(b));
        return a
    };
    var b = 250;
    this.height = function(a) {
        "undefined" === typeof a || isNaN(parseInt(a)) || (b = parseInt(a));
        return b
    };
    var e = {
        top: 50,
        right: 10,
        bottom: 20,
        left: 10
    };
    this.margin = function(a) {
        "undefined" !== typeof a && (e = a);
        return e
    };
    var l = 1;
    this.stackPower = function(a) {
        "undefined" === typeof a || isNaN(parseInt(a)) ||
            (l = parseInt(a));
        return l
    };
    var m = !1;
    this.stack = function(a) {
        "boolean" === typeof a && (m = a);
        return m
    };
    var h = "svEMotionSignatureChart_" + svGlobal.getId();
    this.divID = function(a) {
        "undefined" !== typeof a && (h = a);
        return h
    };
    return Object.freeze ? Object.freeze(this) : this
},
    svEmotionSignatureChartData = function(a) {
        "undefined" === typeof a && (a = {});
        this.getClass = function() {
            return "svEmotionSignatureChartData"
        };
        var b = [];
        if ($.isArray(a.esList)) {
            var e = [];
            $.each(a.esList, function(a, b) {
                if ("undefined" !== typeof b.name && "undefined" !==
                    typeof b.emotionVector) {
                    var l = {
                        name: b.name,
                        emotionVector: {}
                    };
                    $.each(b.emotionVector, function(a, b) {
                        "undefined" !== typeof svGlobal.getKeyFromValue(svEmotionSignatureTypesEnum, a) && (l.emotionVector[a] = b)
                    });
                    e.push(l)
                }
            });
            b = e
        }
        this.esList = function() {
            return b
        };
        var l = void 0;
        if ("undefined" !== typeof a.baseline && "undefined" !== typeof a.baseline.emotionVector) {
            var m = {
                emotionVector: {}
            };
            $.each(a.baseline.emotionVector, function(a, b) {
                "undefined" !== typeof svGlobal.getKeyFromValue(svEmotionSignatureTypesEnum, a) && (m.emotionVector[a] =
                                                                                                    b)
            });
            l = m
        }
        this.baseline = function() {
            return l
        }
    },
    svEmotionSignatureChart = function(a, b) {
        var e = b.divID() || svGlobal.getId(),
            l = b.width(),
            m = b.height(),
            h = b.margin();
        this.div = e ? $("#" + e) : void 0;
        "undefined" === typeof this.div && (this.div = $('<div style="padding:10px 10px 0px 10px;"></div>', {
            id: e,
            width: l,
            height: m
        }));
        this.id = e;
        var p = [],
            t = [],
            v = [],
            u = [],
            w = [],
            q = [],
            n = b.stackPower();
        $.each(a.esList(), function(a, c) {
            p.push(c.name);
            var b;
            b = Math.pow(c.emotionVector.positive, n) + Math.pow(c.emotionVector.negative, n);
            b = 0 === b ? 0 :
                (Math.pow(c.emotionVector.positive, n) - Math.pow(c.emotionVector.negative, n)) / b;
            t.push(b);
            b = Math.pow(c.emotionVector.joy, n) + Math.pow(c.emotionVector.sadness, n);
            b = 0 === b ? 0 : (Math.pow(c.emotionVector.joy, n) - Math.pow(c.emotionVector.sadness, n)) / b;
            v.push(b);
            b = Math.pow(c.emotionVector.trust, n) + Math.pow(c.emotionVector.disgust, n);
            b = 0 === b ? 0 : (Math.pow(c.emotionVector.trust, n) - Math.pow(c.emotionVector.disgust, n)) / b;
            u.push(b);
            b = Math.pow(c.emotionVector.fear, n) + Math.pow(c.emotionVector.anger, n);
            b = 0 === b ? 0 : (Math.pow(c.emotionVector.fear,
                                        n) - Math.pow(c.emotionVector.anger, n)) / b;
            w.push(b);
            b = Math.pow(c.emotionVector.surprise, n) + Math.pow(c.emotionVector.anticipation, n);
            b = 0 === b ? 0 : (Math.pow(c.emotionVector.surprise, n) - Math.pow(c.emotionVector.anticipation, n)) / b;
            q.push(b)
        });
        "undefined" !== typeof a.baseline() && (e = Math.pow(a.baseline().emotionVector.positive, n) + Math.pow(a.baseline().emotionVector.negative, n), e = 0 === e ? 0 : (Math.pow(a.baseline().emotionVector.positive, n) - Math.pow(a.baseline().emotionVector.negative, n)) / e, t.push(e), e = Math.pow(a.baseline().emotionVector.joy,
                                                                                                                                                                                                                                                                                                              n) + Math.pow(a.baseline().emotionVector.sadness, n), e = 0 === e ? 0 : (Math.pow(a.baseline().emotionVector.joy, n) - Math.pow(a.baseline().emotionVector.sadness, n)) / e, v.push(e), e = Math.pow(a.baseline().emotionVector.trust, n) + Math.pow(a.baseline().emotionVector.disgust, n), e = 0 === e ? 0 : (Math.pow(a.baseline().emotionVector.trust, n) - Math.pow(a.baseline().emotionVector.disgust, n)) / e, u.push(e), e = Math.pow(a.baseline().emotionVector.fear, n) + Math.pow(a.baseline().emotionVector.anger, n), e = 0 === e ? 0 : (Math.pow(a.baseline().emotionVector.fear,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             n) - Math.pow(a.baseline().emotionVector.anger, n)) / e, w.push(e), e = Math.pow(a.baseline().emotionVector.surprise, n) + Math.pow(a.baseline().emotionVector.anticipation, n), e = 0 === e ? 0 : (Math.pow(a.baseline().emotionVector.surprise, n) - Math.pow(a.baseline().emotionVector.anticipation, n)) / e, q.push(e));
        var f = svGlobal.createColorLookupFunction(p),
            g = [d3.min(t), d3.max(t)],
            s = [d3.min(v), d3.max(v)],
            k = [d3.min(u), d3.max(u)],
            d = [d3.min(w), d3.max(w)],
            e = [d3.min(q), d3.max(q)],
            c = [],
            g = d3.scale.linear().domain(g).range([m - h.bottom -
                                                   12, h.top + 12
                                                  ]);
        c.push(g);
        s = d3.scale.linear().domain(s).range([m - h.bottom - 12, h.top + 12]);
        c.push(s);
        k = d3.scale.linear().domain(k).range([m - h.bottom - 12, h.top + 12]);
        c.push(k);
        d = d3.scale.linear().domain(d).range([m - h.bottom - 12, h.top + 12]);
        c.push(d);
        e = d3.scale.linear().domain(e).range([m - h.bottom - 12, h.top + 12]);
        c.push(e);
        var A = [{
            top: "Positive",
            bottom: "Negative"
        }, {
            top: "Joy",
            bottom: "Sadness"
        }, {
            top: "Trust",
            bottom: "Disgust"
        }, {
            top: "Fear",
            bottom: "Anger"
        }, {
            top: "Surprise",
            bottom: "Anticipation"
        }],
            y = d3.select(this.div[0]).append("svg").attr("width",
                                                          l).attr("height", m).append("g");
        y.append("text").attr("class", "esPlotTitle").attr("text-anchor", "left").attr("x", h.left).attr("y", 11).text("Emotion Signature");
        "undefined" !== typeof a.baseline() && (y.append("line").attr("class", "emotionAxis").attr("x1", h.left + 15).attr("y1", 25).attr("x2", h.left + 15 + 15).attr("y2", 25).attr("stroke-width", 2).attr("stroke", "black").attr("fill", "black").attr("shape-rendering", "crispEdges"), y.append("text").attr("class", "emotionAxisLabel").attr("text-anchor", "beginning").attr("x",
                                                                                                                                                                                                                                                                                                                                                                                       h.left + 15 + 15 + 5).attr("y", 29).text("Average Level"));
        a.esList(a.esList().sort(function(a, c) {
            return d3.descending(a.emotionVector.positive - a.emotionVector.negative, c.emotionVector.positive - c.emotionVector.negative)
        }));
        var e = a.esList().length,
            F = d3.round((m - h.top - h.bottom) / e),
            z = h.top + F / 2,
            K = [];
        $.each(a.esList(), function(a, c) {
            y.append("text").attr("class", "nameLabel").attr("text-anchor", "end").attr("x", 80).attr("y", z + 3).text(function() {
                return c.name
            });
            K.push(z);
            z += F
        });
        for (var B = 0 < a.esList().length ? (l - h.left -
                                              140) / 4.5 : 100, I = {}, r = 0; 5 > r; r++) y.append("line").attr("class", "emotionAxis").attr("x1", B * r + 160).attr("y1", m - h.bottom).attr("x2", B * r + 160).attr("y2", h.top).attr("stroke-width", 1).attr("stroke", "black").attr("fill", "black").attr("shape-rendering", "crispEdges"), "undefined" !== typeof a.baseline() && (l = Math.pow(a.baseline().emotionVector[A[r].top.toLowerCase()], n) + Math.pow(a.baseline().emotionVector[A[r].bottom.toLowerCase()], n), e = Math.pow(a.baseline().emotionVector[A[r].top.toLowerCase()], n) / l - Math.pow(a.baseline().emotionVector[A[r].bottom.toLowerCase()],
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      n) / l, y.append("line").attr("class", "baseline").attr("x1", B * r + 160 - 7.5).attr("y1", c[r](e)).attr("x2", B * r + 167.5).attr("y2", c[r](e)).attr("stroke-width", 2).attr("stroke", "black").attr("fill", "black").attr("shape-rendering", "crispEdges")), y.append("text").attr("class", "emotionAxisLabel").attr("text-anchor", "middle").attr("x", B * r + 160).attr("y", h.top - 10).text(A[r].top), y.append("text").attr("class", "emotionAxisLabel").attr("text-anchor", "middle").attr("x", B * r + 160).attr("y", m - 5).text(A[r].bottom), $.each(a.esList(),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        function(d, g) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "undefined" === typeof I[g.name] && (I[g.name] = [], I[g.name].push({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                x: 90,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                y: K[d]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }), I[g.name].push({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                x: 110,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                y: K[d]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            y.append("circle").attr("class", "emotionVectorValue").attr("stroke", function(a) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                f(g.name)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }).attr("stroke-width", 3).attr("fill", function(a) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                return f(g.name)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }).attr("cx", B * r + 160).attr("cy", function() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                var d;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                1 === a.esList().length & b.stack() ? d = Math.pow(g.emotionVector[A[r].top.toLowerCase()], n) : (d = Math.pow(g.emotionVector[A[r].top.toLowerCase()], n) + Math.pow(g.emotionVector[A[r].bottom.toLowerCase()],
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      n), d = Math.pow(g.emotionVector[A[r].top.toLowerCase()], n) / d - Math.pow(g.emotionVector[A[r].bottom.toLowerCase()], n) / d);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                I[g.name].push({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    x: B * r + 160,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    y: c[r](d)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                return c[r](d)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }).attr("r", 6)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });
        var x = d3.svg.line().x(function(a) {
            return a.x
        }).y(function(a) {
            return a.y
        });
        $.each(I, function(a, c) {
            y.append("path").attr("d", function() {
                return x(c)
            }).attr("class", "emotionPath").attr("stroke", function(c) {
                return f(a)
            }).attr("stroke-width", 3.6)
        })
            };
if ("undefined" === typeof jQuery) throw Error("Please include jQuery prior to svBarChart.js");
if ("undefined" === typeof d3) throw Error("Please include d3.js prior to svBarChart.js");
if ("undefined" === typeof svGlobal) throw Error("Please include svGlobal.js prior to svBarChart.js");
if ("undefined" === typeof ubColorLookup) throw Error("Please include ubColorLookup.js prior to svBarChart.js");
var svCIDOptions = function() {
    this.getClass = function() {
        return "scCIDOptions"
    };
    var a = 900;
    this.width = function(b) {
        "undefined" === typeof b || isNaN(parseInt(b)) || (a = parseInt(b));
        return a
    };
    var b = 600;
    this.height = function(a) {
        "undefined" === typeof a || isNaN(parseInt(a)) || (b = parseInt(a));
        return b
    };
    var e = {
        top: 1,
        right: 80,
        bottom: 30,
        left: 80
    };
    this.margin = function(a) {
        "undefined" !== typeof a && (e = a);
        return e
    };
    var l = "svCID_" + svGlobal.getId();
    this.divID = function(a) {
        "undefined" !== typeof a && (l = a);
        return l
    };
    var m = void 0;
    this.maxGroupCount =
        function(a) {
            "undefined" === typeof a || isNaN(parseInt(a)) || (m = parseInt(a));
            return m
        }
},
    svCIDData = function(a) {
        "undefined" === typeof a && (a = {});
        this.getClass = function() {
            return "svCIDData"
        };
        var b = [];
        $.isArray(a.mainCharacterData) && $.each(a.mainCharacterData, function(a, e) {
            b.push({
                name: e.name,
                pathBlocks: e.pathBlocks
            })
        });
        this.mainCharacterData = function() {
            return b
        };
        var e = [];
        $.isArray(a.mainCharacterEvents) && $.each(a.mainCharacterEvents, function(a, b) {
            e.push({
                cidSceneNumber: b.cidSceneNumber,
                name: b.name,
                event: b.event
            })
        });
        this.mainCharacterEvents = function() {
            return e
        };
        var l = [];
        $.isArray(a.sceneNotes) && $.each(a.sceneNotes, function(a, b) {
            l.push({
                cidSceneNumber: b.cidSceneNumber,
                group: b.group,
                groupPopulation: b.groupPopulation,
                note: b.note
            })
        });
        this.sceneNotes = function() {
            return l
        };
        var m = [];
        $.isArray(a.background) && $.each(a.background, function(a, b) {
            m.push({})
        });
        this.background = function() {
            return m
        }
    },
    svCID = function(a, b) {
        function e(a, b) {
            if ("undefined" !== typeof b) {
                var f = +a.cidSceneNumber,
                    g;
                if ("undefined" !== typeof b.pathBlocks) {
                    b.pathBlocks.forEach(function(a) {
                        a.startSceneNumber <=
                            f && a.endSceneNumber >= f && (g = a)
                    });
                    if (g) {
                        var e = -c * g.positions[f - g.startSceneNumber];
                        return d(g.groups[f - g.startSceneNumber] + p) + e
                    }
                    return d(1)
                }
            }
        }

        function l(a) {
            var b = [],
                c = 0;
            $.each(a, function(a, b) {
                $.each(b.pathBlocks, function(a, b) {
                    var d = d3.max(b.groups);
                    d > c && (c = d)
                })
                    });
            for (var d = 0; b.length <= c;) b.push(d), b[d - 1] = [], d++;
            var f = d3.max(a.map(function(a) {
                return d3.max(a.pathBlocks.map(function(a) {
                    return a.endSceneNumber
                }))
            }));
            $.each(b, function(a, b) {
                for (; b.length <= f;) b.push(0)
            });
            $.each(a, function(a, c) {
                $.each(c.pathBlocks,
                       function(a, c) {
                           var d = c.startSceneNumber;
                           $.each(c.groups, function(a, c) {
                               b[c][d + a]++
                           })
                               })
                    });
            var g = 0;
            $.each(b, function(a, b) {
                var c = d3.max(b);
                c > g && (g = c)
            });
            return g
        }
        var m = b.divID(),
            h = b.margin();
        this.div = $("<div/>", {
            id: m,
            width: b.width(),
            height: b.height()
        });
        this.id = m;
        var p = .5,
            t = 1 / a.mainCharacterData().length,
            m = a.mainCharacterData(),
            v = [];
        m.forEach(function(a) {
            a.pathBlocks.forEach(function(a) {
                v.push(a.endSceneNumber)
            })
        });
        var u = d3.max(v),
            w = a.sceneNotes(),
            q = a.mainCharacterEvents(),
            n = d3.scale.linear().domain([0,
                                          u
                                         ]).rangeRound([h.left, b.width() - h.right]),
            f = d3.scale.linear().domain([0, u]).rangeRound([0, b.width() - h.left - h.right]),
            g = [];
        m.forEach(function(a) {
            a.pathBlocks.forEach(function(a) {
                g.push(a.groups)
            })
        });
        var s = d3.merge(g),
            k = function(a) {
                for (var b = [], c = 0; c < a.length; c++) 0 <= a[c] && (b = b.concat(a[c]));
                return b
            }(s),
            k = +d3.min(k),
            s = +d3.max(s) + 1,
            d = d3.scale.linear().domain([k, s]).rangeRound([b.height() - h.top - h.bottom, 0]),
            k = d3.scale.linear().domain([0, s - k]).rangeRound([0, b.height() - h.top - h.bottom]);
        "undefined" === typeof b.maxGroupCount() &&
            b.maxGroupCount(l(m));
        var c = parseInt(k(1) / (b.maxGroupCount() + 1));
        14 < c && (c = 14);
        var A = parseInt(c / 3 + .5),
            s = d3.select(this.div[0]).append("svg").attr("width", b.width()).attr("height", b.height());
        if ("debugShort" === svGlobal.reportMode() || "debugFull" === svGlobal.reportMode()) {
            var y = d3.svg.axis().scale(n).orient("bottom").ticks(20),
                F = d3.svg.axis().scale(d).orient("left");
            s.append("g").attr("class", "axis").attr("transform", "translate(0," + (b.height() - h.bottom) + ")").call(y);
            s.append("g").attr("class", "axis").attr("transform",
                                                     "translate(" + (h.left - 50) + ",0)").call(F)
        }
        var y = a.mainCharacterData().map(function(a) {
            return a.name
        }),
            z = svGlobal.createColorLookupFunction(y);
        if (0 !== a.background().length) {
            var K = svGlobal.createColorLookupFunction(args.background.map(function(a) {
                return a.stageName
            })),
                y = args.background,
                F = d3.sum(y.map(function(a) {
                    return a.count
                })),
                B = d3.scale.linear().domain([0, F]).range([h.left, args.width - h.right]),
                F = s.selectAll("g .stage").data(y).enter().append("g").attr("class", "stage"),
                I = [];
            y.forEach(function(a) {
                I.push(a.count)
            });
            F.append("rect").attr("class", "cidBackground").attr("x", function(a, b) {
                return B(d3.sum(I.slice(0, b))) + "px"
            }).attr("y", 0).attr("width", function(a) {
                return B(a.count) - h.left + "px"
            }).attr("height", args.height + h.top + h.bottom).attr("fill", function(a, b) {
                return K(a.stageName)
            });
            F.append("text").attr("class", "stageLabel").text(function(a) {
                return 0 < a.count ? a.stageName : ""
            }).attr("transform", function(a, b) {
                return "translate(" + (B(d3.sum(I.slice(0, b)) + a.count / 2) + 6) + "," + (args.height - h.bottom + 15) + ") rotate(-90)"
            }).attr("class",
                    "stageLabel")
        }
        var r = d3.svg.line().interpolate("basis").x(function(a) {
            return a.x
        }).y(function(a) {
            return a.y
        });
        (function(a) {
            a.forEach(function(a) {
                a.pathBlocks.forEach(function(b) {
                    for (var f = b.groups, g = b.positions, e = [], k = !1, s = 0; s < f.length; s++)
                        if (!(0 > f[s])) {
                            var k = !0,
                                l = 0;
                            s < f.length && -1 !== f[s + 1] && (f[s + 1] > f[s] ? l = -t * g[s] : f[s + 1] < f[s] && (l = t * g[s]), 1 <= l && (l = 1));
                            0 < s && -1 !== f[s - 1] && (f[s - 1] > f[s] ? l = t * g[s] : f[s - 1] < f[s] && (l = -t * g[s]), 1 <= l && (l = 1));
                            var h = [],
                                l = s + parseInt(b.startSceneNumber) + l;
                            h.x = n(l);
                            h.y = d(d3.round(f[s]) +
                                    p) - c * g[s];
                            e[s - 0] = h
                        }
                    k && (b.points = e, b.path = r(e), b.name = a.name)
                })
            })
        })(m);
        var x = Math.abs(k(1) - k(0)),
            D = Math.abs(f(1) - f(0));
        if (0 < w.length) {
            var w = s.selectAll("rect .region").data(w).enter().append("g").attr("class", "region"),
                C;
            w.append("rect").attr("class", "noteRects note").attr("x", function(a) {
                return n(a.cidSceneNumber) - D
            }).attr("y", function(a) {
                var b = (a.groupPopulation - 1) * c / 3;
                C = d(a.group + 1) - b;
                0 > C - 2 && (C = 2);
                return C
            }).attr("width", function() {
                return 2 * D
            }).attr("height", function(a) {
                return x * (1 * (a.groupPopulation +
                                 1) / b.maxGroupCount())
            }).attr("rx", 10).attr("ry", 10).attr("original-title", function(a) {
                return a.note
            }).each(function(a) {
                $(this).tipsy(svGlobal.tipsy1)
            });
            w.append("text").attr("class", "printOnly").text(function(a, b) {
                return b + 1
            }).attr("text-anchor", "middle").attr("transform", function(a) {
                var b = n(a.cidSceneNumber);
                a = d(a.group + p) - c * (a.groupPopulation / 2 - .75) - x / 4;
                return "translate(" + b + "," + a + ")"
            })
        }
        s.selectAll("g .path").data(m).enter().append("g").attr("class", "path").selectAll("g pathBlock").data(function(a) {
            return a.pathBlocks
        }).enter().append("g").attr("class",
                                    "pathBlock").append("path").attr("d", function(a) {
                                        return a.path
                                    }).attr("class", "pathLine").attr("stroke", function(a) {
                                        return z(a.name)
                                    }).attr("stroke-width", A).append("title").text(function(a) {
                                        return a.name
                                    });
        s.selectAll("text .pathLabel").data(m).enter().append("text").attr("class", "pathLabel").text(function(a) {
            return a.name
        }).attr("x", function(a) {
            return 0 < a.pathBlocks[0].startSceneNumber ? n(d3.round(a.pathBlocks[0].startSceneNumber)) - 2 * (7 + .6 * c) : n(d3.round(a.pathBlocks[0].startSceneNumber)) - 7
        }).attr("y",
                function(a) {
                    return d(d3.round(a.pathBlocks[0].groups[0]) + p) - c * a.pathBlocks[0].positions[0] + c / 4
                }).attr("text-anchor", "end");
        s.selectAll("text .pathLabelEnd").data(m).enter().append("text").attr("class", "pathLabel").attr("x", function(a) {
            var b = a.pathBlocks.length - 1,
                c = 0;
            a.pathBlocks[b].endSceneNumber < u && (c = 5);
            return n(d3.round(a.pathBlocks[b].endSceneNumber)) + 7 + c
        }).attr("y", function(a) {
            var b = a.pathBlocks.length - 1,
                f = a.pathBlocks[b].groups.length - 1;
            return d(d3.round(a.pathBlocks[b].groups[f]) + p) - c * a.pathBlocks[b].positions[f] +
                c / 4
        }).text(function(a) {
            return a.pathBlocks[a.pathBlocks.length - 1].endSceneNumber < u ? "" : a.name
        }).attr("text-anchor", "start");
        if ("undefined" !== typeof q) {
            var q = s.selectAll(".event").data(q).enter().append("g").attr("class", "event"),
                X = [];
            m.forEach(function(a) {
                X[a.name] = a
            });
            q.append("circle").attr("class", "eventCircle").attr("stroke", function(a) {
                return z(a.name)
            }).attr("stroke-width", A).attr("fill", function(a) {
                return z(a.name)
            }).attr("cx", function(a) {
                a = "Birth" === a.event ? n(a.cidSceneNumber - .5) : n(a.cidSceneNumber);
                return a
            }).attr("cy", function(a) {
                return e(a, X[a.name])
            }).attr("r", .4 * c).style("opacity", .75).on("mouseover", function() {
                d3.select(this).attr("stroke-width", 2 * A).style("stroke", "magenta").style("fill", "magenta").style("opacity", .9)
            }).on("mouseout", function(a) {
                d3.select(this).attr("stroke-width", A).style("stroke", z(a.name)).style("fill", z(a.name)).style("opacity", .75)
            }).attr("original-title", function(a) {
                return "Birth" === a.event ? a.name + " is born." : "Death" === a.event ? a.name + " dies." : a.event
            }).each(function() {
                $(this).tipsy(svGlobal.tipsy1)
            })
                }
        return this
    };
if ("undefined" === typeof jQuery) throw Error("Please include jQuery prior to svCore.js");
if ("undefined" === typeof d3) throw Error("Please include d3.js prior to svCore.js");
if ("undefined" === typeof svGlobal) throw Error("Please include svGlobal.js prior to svCore.js");
if ("undefined" === typeof svBarChart) throw Error("Please include svBarChart.js prior to svCore.js");
if ("undefined" === typeof svStackedBarChart) throw Error("Please include svStackedBarChart.js prior to svCore.js");

function getFailFunction(a) {}

function getScriptListFailFunction(a) {}

function initializeSvSearch() {
    0 === $("#svSearchDiv").length && $("#searchDiv").append('<div id="svSearchDiv" class="ui-widget"><label for="svScriptSearchBox">Search scripts: </label><input id="svScriptSearchBox" placeholder="Entere script title"><input type="hidden" id="script-id"></div>');
    updateSearch()
}

function updateSearch(a) {
    "undefined" === typeof a ? (a = new svPostObject({
        postSite: "getScriptList.php",
        postVars: {},
        dataSuccessFunction: updateSearch,
        dataFailFunction: getScriptListFailFunction,
        failFunction: getFailFunction,
        alwaysFunction: void 0
    }), svPost(a)) : (a = a.postData().scriptList, "undefined" !== typeof a && (a.sort(function(a, e) {
        return d3.ascending(a.title, e.title)
    }), $.each(a, function(a, e) {
        e.value = e.title
    }), $("#svScriptSearchBox").autocomplete({
        minLength: 0,
        source: a,
        focus: function(a, e) {
            $("#svScriptSearchBox").val(e.item.title);
            return !1
        },
        select: function(a, e) {
            $("#svScriptSearchBox").val(e.item.title);
            $("#script-id").val(e.item.id);
            $("#project-description").html(e.item.year);
            $("#searchDiv").hide();
            $("#loadingText").html("Loading script: " + e.item.title);
            initializeSvReportPage(e.item.filename);
            return !1
        }
    }).autocomplete("instance")._renderItem = function(a, e) {
        return $("<li>").append("<a>" + e.title + "<br>" + e.year + "</a>").appendTo(a)
    }))
}

function refreshScriptDetails(a) {}

function getScriptDataSuccessFunction(a) {
    a = a.postData();
    ScriptometerViz.DisplayReport(a, "reportDiv")
}

function getScriptDataFailFunction(a) {}

function getScriptDataAlwaysFunction(a) {}

function doesFileExist(a) {
    return $.ajax({
        type: "HEAD",
        url: a,
        success: function(a) {
            return !0
        },
        error: function(a, e) {
            return !1
        }
    })
}

function initializeSvReportPage(a) {
    var b;
    null === a || "undefined" === typeof a ? b = "./data/defaultScript.json" : (0 !== a.lastIndexOf("data/", 0) && (b = svGlobal.customDir() + "data/"), -1 === a.indexOf(".json", a.length - 5) && (a += ".json"), b += a);
    if (!doesFileExist(b)) return !1;
    a = new svPostObject({
        postSite: svGlobal.customDir() + "/getScriptData.php",
        postVars: {
            scriptDataFilename: b
        },
        dataSuccessFunction: getScriptDataSuccessFunction,
        dataFailFunction: getScriptDataFailFunction,
        failFunction: getFailFunction,
        alwaysFunction: getScriptDataAlwaysFunction
    });
    svPost(a);
    return !0
}
var ScriptometerViz = function(a, b) {
    function e(a) {
        if ("undefined" === typeof a) return "pink";
        switch (a.toLowerCase()) {
        case "joy":
            return b.rgb("#ff7f0e");
        case "sadness":
            return b.rgb("#1f77b4");
        case "trust":
            return b.rgb("#2ca02c");
        case "disgust":
            return b.rgb("#8c564b");
        case "fear":
            return b.rgb("#7f7f7f");
        case "anger":
            return b.rgb("#d62728");
        case "surprise":
            return b.rgb("#e377c2");
        case "anticipation":
            return b.rgb("#17becf")
        }
    }

    function l(a, g) {
        var e = document.createElementNS(b.ns.prefix.svg, "path");
        e.setAttribute("d",
                       a);
        for (var k = e.getTotalLength(), d = [0], c = 0;
             (c += g) < k;) d.push(c);
        d.push(k);
        return d.map(function(a) {
            var b = e.getPointAtLength(a),
                b = [b.x, b.y];
            b.t = a / k;
            return b
        })
    }

    function m(a) {
        return b.range(a.length - 1).map(function(b) {
            var e = [a[b - 1], a[b], a[b + 1], a[b + 2]];
            e.t = (a[b].t + a[b + 1].t) / 2;
            return e
        })
    }

    function h(a, b, e, k) {
        var d = e[0],
            c = a[0],
            l = k[0] - d,
            h = b[0] - c;
        e = e[1];
        a = a[1];
        k = k[1] - e;
        b = b[1] - a;
        c = (h * (e - a) - b * (d - c)) / (b * l - h * k);
        return [d + c * l, e + c * k]
    }

    function p(a, b) {
        var e = a[1] - b[1],
            k = b[0] - a[0],
            d = Math.sqrt(e * e + k * k);
        return [e / d, k / d]
    }

    function t(a, g, e) {
        "undefined" === typeof e && (e = 0);
        a = b.select("#reportDiv").append("svg").attr("class", "svgScratchpad").attr("display", "none").append("g").append("svg:path").attr("d", a).attr("class", "pathLine").node();
        var k = a.getTotalLength(),
            d;
        e = g - e;
        for (var c;;) {
            c = Math.floor((e + k) / 2);
            d = a.getPointAtLength(c);
            if ((c === k || c === e) && d.x !== g) break;
            if (d.x > g) k = c;
            else if (d.x < g) e = c;
            else break
        }
        b.select(".svgScratchpad").remove();
        return d.y
    }

    function v(a) {
        return parseInt(q(a).substring(0, 2), 16)
    }

    function u(a) {
        return parseInt(q(a).substring(2,
                                       4), 16)
    }

    function w(a) {
        return parseInt(q(a).substring(4, 6), 16)
    }

    function q(a) {
        return "#" === a.charAt(0) ? a.substring(1, 7) : a
    }
    var n = {
        vizList: [],
        DisplayReport: function(f, g) {
            "undefined" === typeof g && (g = "scriptomerReportDiv", a("body").append("<div id='" + g + "'></div>"));
            var l = a("#" + g);
            l.show();
            if (this.VerifyReport(f).fail) {
                a("#loadingDiv").hide();
                var k = {
                    id: "header__title",
                    type: "title",
                    text: "OOPS! Error loading report data for: " + svGlobal.currentScriptTitle(),
                    clearBoth: !1
                };
                k.text = "" + k.text + "<a href='http://www.ultrablue.net' style='display:inline; float:right;'><img src = '" +
                    svGlobal.customDir() + "/images/UltraBlueLogo_web_purple.png' style='border: 0; width:100px; vertical-align:middle;' ></a><br/><p style='font-size:80%; margin-top:10px;'>hmmm... whaddya say we just head back to the script report library and try again?</p>";
                k = this.Header(k);
                l.append(k.div);
                l.append('<button id= "errorBackButton"></button>');
                a("#errorBackButton").button({
                    icons: {
                        primary: "ui-icon-arrowreturnthick-1-w"
                    },
                    label: "Back to library"
                }).click(function(a) {
                    a.preventDefault();
                    window.location.href =
                        svGlobal.rootURL() + "/script-library"
                })
            } else {
                document.title = "Scriptometer: " + f.header.scriptName;
                k = f.vizList.getMatches("id", "header__title")[0];
                k.clearBoth = !1;
                k.text = "" + k.text + "<a href='http://www.ultrablue.net' style='display:inline; float:right;'><img src = '" + svGlobal.customDir() + "/images/UltraBlueLogo_web_purple.png' style='border: 0; width:100px; vertical-align:middle;' ></a>";
                k = this.Header(k);
                l.append(k.div);
                0 === a("#summaryDiv").length && l.append('<div id="summaryDiv" width="300"><div/>');
                var k =
                    a("#summaryDiv"),
                    d = '<div id="dialog-summaryHelp" title="Script Summary"><img src="' + svGlobal.customDir() + '/images/summaryHelp.png"></img></div>',
                    d = this.Header({
                        type: "section",
                        text: "Script Summary",
                        helpDialogID: "dialog-summaryHelp",
                        helpDialog: d
                    });
                k.append(d.div);
                var d = new svInfoStatData(f.vizList.getMatches("id", "infoStat__totalScenes")[0]),
                    c = new svInfoStatOptions;
                c.iconWidth(18);
                c.size(svInfoStatSizeEnum.small);
                c.textTopMargin(4);
                c.iconFile("sceneClapBoard.png");
                d = new svInfoStat(d, c);
                k.append(d.div);
                d = new svInfoStatData(f.vizList.getMatches("id", "infoStat__totalWords")[0]);
                c = new svInfoStatOptions;
                c.iconWidth(18);
                c.size(svInfoStatSizeEnum.small);
                c.textTopMargin(4);
                c.iconFile("scriptPagesA.png");
                d = new svInfoStat(d, c);
                k.append(d.div);
                d = new svInfoStatData(f.vizList.getMatches("id", "infoStat__dialogActionRatio")[0]);
                c = new svInfoStatOptions;
                c.size(svInfoStatSizeEnum.small);
                c.textTopMargin(4);
                c.iconWidth(24);
                c.iconFile("dialogActionRatio.png");
                d = new svInfoStat(d, c);
                k.append(d.div);
                d = new svStackedBarChartData(f.vizList.getMatches("id",
                                                                   "stackedBarChart__dialogActionWords")[0]);
                c = new svStackedBarChartOptions;
                c.divID("summaryDiv");
                c.width(235);
                c.height(30);
                c.showLegend(!1);
                c.hideLabel(!0);
                var h = c.margin();
                h.left = 45;
                h.bottom = 10;
                c.margin(h);
                c.xAxis(!1);
                c.yAxis(!1);
                c.customColorArray(["#1f77b4", "#d62728"]);
                c.justPercentageTooltip(!0);
                d = new svStackedBarChart(d, c);
                k.append(d.div);
                this.vizList.push(d);
                d = new svInfoStatData(f.vizList.getMatches("id", "infoStat__dialogGradeLevel")[0]);
                c = new svInfoStatOptions;
                c.size(svInfoStatSizeEnum.small);
                c.iconWidth(24);
                c.leftMargin(4);
                c.iconFile("dialogGradeLevel.png");
                d = new svInfoStat(d, c);
                k.append(d.div);
                d = new svInfoStatData(f.vizList.getMatches("id", "infoStat__characterCount")[0]);
                c = new svInfoStatOptions;
                c.size(svInfoStatSizeEnum.small);
                c.textTopMargin(2);
                c.iconWidth(24);
                c.iconFile("otherCharacters.png");
                d = new svInfoStat(d, c);
                k.append(d.div);
                d = a("#summaryDiv");
                c = new svStackedBarChartData(f.vizList.getMatches("id", "stackedBarChart__characterCount")[0]);
                h = new svStackedBarChartOptions;
                h.divID("summaryDiv");
                h.width(235);
                h.height(30);
                h.showLegend(!1);
                h.hideLabel(!0);
                var m = h.margin();
                m.left = 45;
                m.bottom = 10;
                h.margin(m);
                h.xAxis(!1);
                h.yAxis(!1);
                h.customColorArray(["#9467bd", "#2ca02c"]);
                c = new svStackedBarChart(c, h);
                d.append(c.div);
                this.vizList.push(c);
                d = new svInfoStatData(f.vizList.getMatches("id", "infoStat__sentiment")[0]);
                c = new svInfoStatOptions;
                c.size(svInfoStatSizeEnum.small);
                c.textTopMargin(2);
                c.iconWidth(24);
                c.iconFile("emotion.png");
                d = new svInfoStat(d, c);
                k.append(d.div);
                d = a("#summaryDiv");
                c = new svStackedBarChartData(f.vizList.getMatches("id",
                                                                   "stackedBarChart__sentiment")[0]);
                h = new svStackedBarChartOptions;
                h.divID("summaryDiv");
                h.width(235);
                h.height(30);
                h.showLegend(!1);
                h.hideLabel(!0);
                m = h.margin();
                m.left = 45;
                m.bottom = 10;
                h.margin(m);
                h.xAxis(!1);
                h.yAxis(!1);
                h.customColorArray(["#ffffff", "#696969"]);
                h.justPercentageTooltip(!0);
                c = new svStackedBarChart(c, h);
                d.append(c.div);
                this.vizList.push(c);
                d = new svInfoStatData(f.vizList.getMatches("id", "infoStat__sentimentLinearity")[0]);
                c = new svInfoStatOptions;
                c.size(svInfoStatSizeEnum.small);
                c.iconWidth(25);
                c.iconFile("emotionalLinearity.png");
                c.textTopMargin(5);
                d = new svInfoStat(d, c);
                k.append(d.div);
                d = new svInfoStatData(f.vizList.getMatches("id", "infoStat__emotionDensity")[0]);
                c = new svInfoStatOptions;
                c.size(svInfoStatSizeEnum.small);
                c.textTopMargin(2);
                c.iconWidth(24);
                c.iconFile("emotionDensity.png");
                d = new svInfoStat(d, c);
                k.append(d.div);
                d = new svInfoStatData(f.vizList.getMatches("id", "infoStat__emotionalImpact")[0]);
                c = new svInfoStatOptions;
                c.size(svInfoStatSizeEnum.small);
                c.iconWidth(30);
                c.iconFile("emotionalPunch.png");
                c.textTopMargin(5);
                d = new svInfoStat(d, c);
                k.append(d.div);
                k.append('<div id="emotionTotalsBarChart" class="emotionTotalsBarChartDiv"></div>');
                d = new svBarChartData(f.vizList.getMatches("id", "barChart__emotionTotals")[0]);
                c = new svBarChartOptions;
                c.divID("emotionTotalsBarChart");
                c.margin({
                    top: 35,
                    right: 10,
                    bottom: 5,
                    left: 10
                });
                c.width(240);
                c.height(120);
                c.title(d.title || "Emotion Totals");
                c.yTickCount(5);
                c.justPercentageTooltip(!0);
                c.colorLookup(new ubColorLookup({
                    customColorMap: svGlobal.emotionColorMap
                }));
                d = new svBarChart(d, c);
                k.append(d.div);
                this.vizList.push(d);
                0 === a("#characterBarChartsDiv").length && l.append('<div id="characterBarChartsDiv"><div/>');
                k = a("#characterBarChartsDiv");
                d = '<div id="dialog-characterHelp" title="Character Comparisons"><img src="' + svGlobal.customDir() + '/images/mainCharacterComparisonsHelp.png"></img></div>';
                d = this.Header({
                    type: "section",
                    text: "Main Character Comparisons",
                    helpDialogID: "dialog-characterHelp",
                    helpDialog: d
                });
                k.append(d.div);
                k.append('<div id="characterScenesBarChart" class="characterBarChartDiv"></div>');
                d = new svBarChartData(f.vizList.getMatches("id", "barChart__characterScenes")[0]);
                c = new svBarChartOptions;
                c.divID("characterScenesBarChart");
                c.width(265);
                c.height(140);
                c.yTickCount(4);
                c.yAxisLabel("");
                c.sortBySetName(d.dataSetList()[0].dataSetName());
                c.title(d.title || "Number of Scenes");
                d = new svBarChart(d, c);
                k.append(d.div);
                this.vizList.push(d);
                k.append('<div id="characterWordsBarChart" class="characterBarChartDiv"></div>');
                d = new svBarChartData(f.vizList.getMatches("id", "barChart__characterWords")[0]);
                c = new svBarChartOptions;
                c.divID("characterWordsBarChart");
                c.width(265);
                c.height(140);
                c.title(d.title || "Dialog Words");
                c.yTickCount(5);
                c.yAxisLabel("");
                c.sortBySetName(d.dataSetList()[0].dataSetName());
                c.justPercentageTooltip(!0);
                d = new svBarChart(d, c);
                k.append(d.div);
                this.vizList.push(d);
                k.append('<div id="characterDialogGradeLevelBarChart" class="characterBarChartDiv"></div>');
                d = new svBarChartData(f.vizList.getMatches("id", "barChart__characterDialogGradeLevel")[0]);
                c = new svBarChartOptions;
                c.divID("characterDialogGradeLevelBarChart");
                c.width(265);
                c.height(140);
                c.title(d.title || "Dialog Grade Level");
                c.yTickCount(5);
                c.yAxisLabel("");
                c.sortBySetName(d.dataSetList()[0].dataSetName());
                d = new svBarChart(d, c);
                k.append(d.div);
                this.vizList.push(d);
                k.append('<div id="characterEmotionalContributionBarChart" class="characterBarChartDiv"></div>');
                d = new svBarChartData(f.vizList.getMatches("id", "barChart__characterEmotionalContribution")[0]);
                c = new svBarChartOptions;
                c.divID("characterEmotionalContributionBarChart");
                c.width(265);
                c.height(140);
                c.title(d.title || "Emotional Contribution");
                c.yTickCount(5);
                c.sortBySetName(d.dataSetList()[0].dataSetName());
                c.justPercentageTooltip(!0);
                c.usePointLabel(!0);
                d = new svBarChart(d, c);
                k.append(d.div);
                this.vizList.push(d);
                k.append('<div id="characterEmotionSignatureDiv"><div/>');
                d = new svEmotionSignatureChartData(f.vizList.getMatches("id", "esPlot__byCharacter")[0]);
                c = new svEmotionSignatureChartOptions;
                c.divID("characterEmotionSignatureDiv");
                c.width(560);
                c.height(200);
                d = new svEmotionSignatureChart(d, c);
                k.append(d.div);
                this.vizList.push(d);
                k.append('<div id="characterSentimentBarChart" class="characterBarChartDiv"></div>');
                d = new svBarChartData(f.vizList.getMatches("id", "barChart__characterSentiment")[0]);
                c = new svBarChartOptions;
                c.divID("characterSentimentBarChart");
                c.width(265);
                c.height(140);
                c.title(d.title || "Sentiment");
                c.yTickCount(5);
                c.sortBySetName(d.dataSetList()[0].dataSetName());
                c.justPercentageTooltip(!0);
                c.showLegend(!0);
                c.customColorArray(["#ffffff", "#696969"]);
                c.useHollowAndFill(!0);
                c.useXTotal(!0);
                d =
                    new svBarChart(d, c);
                k.append(d.div);
                this.vizList.push(d);
                0 === a("#sceneExplorerDiv").length && l.append('<div id="sceneExplorerDiv"><div/>');
                d = a("#sceneExplorerDiv");
                k = '<div id="dialog-sceneExplorerHelp" title="Scene Explorer"><img src="' + svGlobal.customDir() + '/images/sceneExplorerHelp.png"></img></div>';
                k = this.Header({
                    type: "section",
                    text: "Scene Explorer",
                    helpDialogID: "dialog-sceneExplorerHelp",
                    helpDialog: k
                });
                d.append(k.div);
                0 === a("#timeHistoryDiv").length && d.append('<div id="timeHistoryDiv"><div/>');
                k = a("#timeHistoryDiv");
                k.append('<div id="dialogGradeLevelTimeHistory" class="timeHistory"></div>');
                c = f.vizList.getMatches("id", "thPlot__dialogGradeLevel")[0];
                "undefined" !== typeof c && (c.divID = "dialogGradeLevelTimeHistory", c.width = 600, c.height = 170, c.margin = {
                    top: 20,
                    right: 10,
                    bottom: 20,
                    left: 45
                }, c.xAxisOff = !0, c.legend = !1, c.yAxisFormat = b.format(".0f"), c.yTickCount = 5, c.iconFile = "dialogGradeLevel.png", c.showGradientLegend = !0, c.gradientLegendLabel = "Level of Action", c.hideOriginalDataLine = !0, c = new this.ThPlot(c),
                                             k.append(c.div), this.vizList.push(c));
                k.append('<div id="sentimentWalkTimeHistory" class="timeHistory"></div>');
                c = f.vizList.getMatches("id", "thPlot__sentimentWalk")[0];
                "undefined" !== typeof c && (c.divID = "sentimentWalkTimeHistory", c.width = 600, c.height = 170, c.margin = {
                    top: 20,
                    right: 10,
                    bottom: 20,
                    left: 45
                }, c.xAxisOff = !0, c.yAxis = !1, c.legend = !1, c.showGradientLegend = !0, c.gradientLegendLabel = "Emotion Density", c.hideOriginalDataLine = !0, c.iconFile = "emotionAxis.png", c.iconHeight = 50, c = new this.ThPlot(c), k.append(c.div),
                                             this.vizList.push(c));
                k.append('<div id="EmotionPowerBarsTimeHistory" class="timeHistory"></div>');
                c = f.vizList.getMatches("id", "thPlot__EmotionPowerBars")[0];
                "undefined" !== typeof c && (c.divID = "EmotionPowerBarsTimeHistory", c.width = 600, c.legend = !1, c.iconFile = "emotionPower.png", c.iconHeight = 25, c.colorLookup = e, c = new this.ThPowerBars(c), k.append(c.div), this.vizList.push(c));
                0 === a("#scriptDisplayDivParent").length && d.append('<div id="scriptDisplayDivParent" class ="scriptDisplayWrapper" style="position: relative"><div/>');
                d = a("#scriptDisplayDivParent");
                c = this.Header({
                    type: "section",
                    text: "Scene Notes",
                    id: "sceneNotesDisplayTitle",
                    useClass: "printOnly"
                });
                d.append(c.div);
                d.append('<div id="sceneNotes" class="printOnly"><ol id="sceneNotesList"></ol></div>');
                c = this.Header({
                    type: "section",
                    text: "Script",
                    id: "scriptDisplayTitle",
                    useClass: "webOnly"
                });
                d.append(c.div);
                0 === a("#scriptViewWrapper").length && d.append('<div id="scriptViewWrapper"  class="content" style=""><div id="scriptView"></div></div>');
                a("#scriptViewWrapper").mCustomScrollbar({
                    scrollButtons: {
                        enable: !0,
                        scrollType: "stepped"
                    },
                    keyboard: {
                        scrollType: "stepped"
                    },
                    mouseWheel: {
                        scrollAmount: 80
                    },
                    theme: "rounded-gray",
                    advanced: {
                        updateOnContentResize: !0
                    }
                });
                c = this.Header({
                    type: "section",
                    text: "Emotion",
                    id: "vfEmotionTitle",
                    useClass: "webOnly"
                });
                d.append(c.div);
                0 === a("#vfEmotionDiv").length && d.append('<div id="vfEmotionDiv"; class="webOnly"; ><div/>');
                k.append('<div id="sceneTimeBar" class="timeHistory"></div>');
                d = f.vizList.getMatches("id", "sceneTimeBar__1")[0];
                d.divID = "emotionWalkTimeHistory";
                d.width = 600;
                d.margin = {
                    top: 7,
                    right: 10,
                    bottom: 30,
                    left: 45
                };
                d.height = 40 + d.margin.bottom;
                d.$scriptDisplayDivWrapper = a("#scriptDisplayDivParent");
                d.$sceneNotesList = a("#sceneNotesList");
                d.$scriptDisplayDiv = a("#scriptView");
                d.$scriptDisplayTitle = a("#scriptDisplayTitle");
                d.$emotionDiv = a("#vfEmotionDiv");
                d.$emotionDivTitle = a("#vfEmotionTitle");
                d.sv = this;
                d = new this.SceneTimeBar(d);
                k.append(d.div);
                this.vizList.push(d);
                k = '<div id="dialog-cidHelp" title="Character Interaction"><img src="' + svGlobal.customDir() + '/images/characterInteractionHelp.png"></img></div>';
                k = this.Header({
                    type: "section",
                    text: "Character Interaction",
                    helpDialogID: "dialog-cidHelp",
                    helpDialog: k
                });
                l.append(k.div);
                0 === a("#cidDiv").length && l.append('<div id="cidDiv"><div/>');
                l = a("#cidDiv");
                k = new svCIDData(f.vizList.getMatches("id", "cid__0")[0]);
                1 < k.mainCharacterData().length && (d = new svCIDOptions, d.width(1100), d.height(100 * (k.mainCharacterData().length - 1)), k = svCID(k, d), l.append(k.div), this.vizList.push(k));
                a("#loadingDiv").hide()
            }
        },
        VerifyReport: function(a) {
            var b = a.version;
            "undefined" === typeof b &&
                (b = .1);
            var e = !1,
                k = "",
                d = 1,
                c = "";
            if (0 < b) return "undefined" === typeof a.header ? (k += c + d++ + ": missing header", c = "<br/>", k += c + d++ + ": missing header", e = !0) : "undefined" === typeof a.header.reportType && (k += c + d++ + ": missing header", c = "<br/>", e = !0), "undefined" === typeof a.vizList && (k += c + d++ + ": missing viz list", e = !0), {
                fail: e,
                summaryHtml: k
            }
        },
        DisplayGenericReport: function(b, g) {
            "undefined" === typeof g && (g = "scriptomerReportDiv", a("body").append("<div id='" + g + "'></div>"));
            switch (b.header.reportType) {
            case "singleScript":
                n.DisplayReport(b,
                                g);
                break;
            case "scriptComparison":
                n.DisplayComparisonReport(b, g);
                break;
            case "scriptPopulationComparison":
                n.DisplayPopulationComparisonReport(b, g);
                break;
            default:
                alert("Unknown report type: " + b.header.reportType)
            }
        },
        DisplayComparisonReport: function(b, g) {
            a("#" + g);
            var e = [],
                k = [];
            a.each(b.scriptReportList, function(a, b) {
                var f = b.vizList.getMatches("id", "table__scriptOverview");
                e.push(f);
                f = b.vizList.getMatches("id", "table__characterOverview");
                k.push(f)
            })
                },
        ThBarPlot: function(f) {
            var g = f.id;
            "undefined" === typeof g &&
                (g = svGlobal.getId());
            this.div = a('<div style="padding:10px 10px 0px 10px; width:' + f.width + "; height:" + f.height + ';"></div>', {
                id: g
            });
            this.id = g;
            var e = [];
            a.each(f.dataSetList, function(a, b) {
                e.push(b.dataName)
            });
            "undefined" !== typeof f.benchmark && e.push(f.benchmark.name);
            for (var k = svGlobal.createColorLookupFunction(e), d = f.margin || {
                top: 10,
                right: 10,
                bottom: 10,
                left: 40
            }, g = f.width - d.left - d.right, c = f.height - d.top - d.bottom, h = f.format || b.format(".0f"), l = [], m = 0; m < f.dataSetList[0].data.length; m++) l.push(m);
            l = 2;
            1 < f.dataSetList.length &&
                (l = 3);
            var l = (g - 4) / f.dataSetList[0].data.length - l,
                n = b.scale.linear().range([0, g - 2]).domain([0, f.dataSetList[0].data.length]),
                p = b.scale.linear().range([c, 0]),
                h = b.svg.axis().scale(p).orient("left").tickFormat(h),
                t = b.select(this.div[0]).append("svg").attr("width", g + d.left + d.right).attr("height", c + d.top + d.bottom).append("g").attr("transform", "translate(" + d.left + "," + d.top + ")"),
                q = 0,
                r = 0;
            a.each(f.dataSetList, function(a, c) {
                var d = c.data,
                    f = b.max(d);
                f > q && (q = f);
                d = b.min(d);
                d < r && (r = d)
            });
            m = 0 !== q ? .1 * Math.abs(q) : 0 !==
                r ? .1 * Math.abs(r) : 1;
            p.domain([r - m, q + m]);
            t.append("g").attr("class", "x axis").append("line").attr("x1", 0).attr("y1", p(0)).attr("x2", g).attr("y2", p(0)).style("stroke", "black").attr("stroke-width", 10);
            "undefined" !== typeof f.benchmark && (m = b.svg.line().interpolate("basis").x(function(a, b) {
                return n(b) + 2
            }).y(function(a) {
                return p(a)
            }), t.append("g").append("svg:path").attr("class", "dataPath").attr("d", m(f.benchmark.data)).style("stroke", k(f.benchmark.name)).attr("stroke-width", 5).style("fill", "none").style("opacity",
                                                                                                                                                                                                   function() {
                                                                                                                                                                                                       return .2
                                                                                                                                                                                                   }));
            if (void 0 !== f.background && 0 !== f.background.length) {
                var c = f.background,
                    x = [];
                a.each(c, function(a, b) {
                    x.push(b.stageName)
                });
                for (var D = svGlobal.createColorLookupFunction(x), m = 0; m < c.length; m++) c[m].xSum = 0 === m ? 0 : c[m - 1].count + c[m - 1].xSum;
                c = graph.selectAll("g .stage").data(c).enter().append("g").attr("class", "stage");
                c.append("rect").attr("class", "thBackground").attr("x", function(a, b) {
                    return xScale(a.xSum) + "px"
                }).attr("y", d.top / 2).attr("width", function(a) {
                    return xScaleDelta(a.count) +
                        "px"
                }).attr("height", f.height - d.bottom - d.top / 2).attr("fill", function(a, b) {
                    return D(a.stageName)
                });
                c.append("text").attr("class", "smallStageLabel").text(function(a) {
                    if (0 < a.count) return a.stageName
                }).attr("transform", function(a, b) {
                    return positionStageLabel(a, b)
                })
            } else t.append("rect").attr("class", "thBackground").attr("x", 0).attr("y", 0).attr("width", g).attr("height", c).attr("fill", "#B19D79");
            if (1 === f.dataSetList.length) d = f.dataSetList[0], t.selectAll(".bar").data(d.data).enter().append("rect").attr("class",
                                                                                                                               function(a) {
                                                                                                                                   return 0 > a ? "bar negative" : "bar positive"
                                                                                                                               }).attr("x", function(a, b) {
                                                                                                                                   return n(b) + 2
                                                                                                                               }).attr("y", function(a) {
                                                                                                                                   a = Math.max(0, a);
                                                                                                                                   return p(a)
                                                                                                                               }).attr("width", l).attr("height", function(a) {
                                                                                                                                   return Math.abs(p(0) - p(a))
                                                                                                                               }).style("fill", function(a) {
                                                                                                                                   return k(f.dataSetList[0].name, 0 > a ? "littleDarker" : "littleBrighter")
                                                                                                                               }).style("opacity", .4);
            else {
                var C = l / f.dataSetList.length,
                    d = t.selectAll(".dataX").data(f.dataSetList[0].data).enter().append("g").attr("class", "g");
                a.each(d[0], function(c, d) {
                    a.each(f.dataSetList,
                           function(a, f) {
                               b.select(d).append("rect").attr("class", "bar").attr("width", C - 1).attr("x", function(b, d) {
                                   return n(c) + a * C + 2
                               }).attr("y", function() {
                                   var a = Math.max(0, f.data[c]);
                                   return p(a)
                               }).attr("height", function() {
                                   return Math.abs(p(0) - p(f.data[c]))
                               }).style("fill", function() {
                                   return k(f.dataName, 0 > f.data[c] ? "littleDarker" : "littleBrighter")
                               }).style("opacity", .4)
                           })
                        })
                    }
            t.append("g").attr("class", "y axis").call(h).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor",
                                                                                                                                                 "end").text(function() {
                                                                                                                                                     return null === f.yAxisLabel ? "Count" : f.yAxisLabel
                                                                                                                                                 });
            1 < e.length && f.legend && (d = t.selectAll(".legend").data(e).enter().append("g").attr("class", "legend").attr("transform", function(a, b) {
                return "translate(0," + 20 * b + ")"
            }), d.append("rect").attr("x", g - 10).attr("width", 10).attr("height", 10).style("fill", function(a) {
                return k(a)
            }).style("opacity", .4), d.append("text").attr("class", "legend").attr("x", g - 14).attr("y", 9).attr("font-size", 12).style("text-anchor", "end").text(function(a) {
                return a
            }));
            return this
        },
        ThPlot: function(f) {
            var g = f.width || 900,
                e = f.height || 300,
                k = f.id || svGlobal.getId();
            this.div = a("<div/>", {
                id: k,
                width: g,
                height: e
            });
            this.id = k;
            var d = f.margin || {
                top: 10,
                right: 10,
                bottom: 50,
                left: 40
            };
            f.yLabel && f.yAxis && (d.left = 60 <= d.left ? d.left : 60);
            var c = g - d.left - d.right,
                n = e - d.top - d.bottom,
                y = 0,
                q;
            f.xRange ? (y = f.xRange.min, q = f.xRange.max) : a.each(f.dataList, function(c, d) {
                var f = a.map(d.data, function(a) {
                    return a.x
                }),
                    e = b.max(f);
                "undefined" === typeof q && (q = e);
                e > q && (q = e);
                f = b.min(f);
                "undefined" === typeof y && (y =
                                             f);
                f < y && (y = f)
            });
            var z = b.scale.linear().domain([0, q]).range([d.left, d.left + c]),
                u = b.scale.linear().domain([0, q]).range([0, c]),
                B = 0,
                v = 0,
                r = 0,
                x = B + .1 * B;
            f.yRange ? (r = f.yRange.min, x = f.yRange.max) : (a.each(f.dataList, function(c, d) {
                var e = a.map(d.data, function(a) {
                    return a.y
                }),
                    g = b.max(e);
                g > B && (B = g);
                e = b.min(e);
                e < v && (v = 0 > e ? f.allowNegative ? e : 0 : e)
            }), x = B + .1 * (B - v), f.allowNegative && (r = v - .1 * (B - v)));
            var D = b.scale.linear().domain([r, x]).range([f.height - d.bottom, d.top]),
                C = b.scale.linear().domain([r, x]).range([f.height - d.bottom,
                                                           d.top
                                                          ]),
                w = f.lineType || "basis",
                L = b.svg.line().interpolate(w).x(function(a, b) {
                    return z(a.x)
                }).y(function(a) {
                    return D(a.y)
                }),
                H = b.select(this.div[0]).append("svg"),
                G = H.attr("width", g).attr("height", e).append("g"),
                J = b.svg.axis().scale(z);
            f.xTickCount && J.ticks(f.xTickCount);
            f.xAxisOff && (G.attr("margin-top", 30), J.ticks(0));
            G.append("g").attr("class", "x axis ticNumber").attr("transform", "translate(0, " + D(0) + ")").call(J);
            "undefined" !== typeof f.title && G.append("text").attr("class", "thPlotTitle").attr("text-anchor",
                                                                                                 "start").attr("x", d.left).attr("y", 15).text(f.title);
            f.yAxis && (J = f.yAxisFormat || b.format(".1f"), C = b.svg.axis().scale(C).ticks(10).tickSize(5).tickFormat(J).orient("left"), f.yTickCount && C.ticks(f.yTickCount), G.append("svg:g").attr("class", "y axis").attr("transform", "translate(" + d.left + ",0)").call(C));
            f.yLabel && G.append("text").attr("class", "y label").attr("text-anchor", "middle").attr("dy", ".75em").attr("transform", "translate(8," + (f.height - d.bottom) / 2 + ")rotate(-90)").text(f.yLabel);
            "undefined" !== typeof f.iconFile &&
                (C = f.iconHeight || 25, H.append("image").attr("xlink:href", svGlobal.customDir() + "/images/" + f.iconFile).attr("x", "0px").attr("y", e / 2 - C / 2 + "px").attr("width", "28px").attr("height", C + "px").style("opacity", 1));
            w = "normal";
            if ("undefined" !== typeof f.background && 0 !== f.backgroundData.length) switch (f.backgroundType) {
                case "areaFill":
                if (1 < f.dataList.length) break;
                var M = f.iconSize || 18,
                    E = f.dataList[0],
                    ca = L(E.data);
                if ("undefined" !== typeof f.backgroundData[0].iconFile) {
                    for (var O = !1, P = .7, Q = .3, T = 0; !O;) a.each(E.data, function(a,
                                                                                         b) {
                        if (u(b.x) < 1.5 * M || z(b.x) > z(E.data[E.data.length - 1].x) - 1.5 * M) return !0;
                        for (var c = !0, d = 0; 4 > d; d++) {
                            if (E.data[a + d].y < Q || E.data[a + d].y > P) c = !1;
                            if (c) return T = a + 2, O = !0, !1
                        }
                    }), O || (.86 > P && .14 < Q ? (P += .05, Q -= .05) : O = !0);
                    e = z(0 < E.data[T].x ? E.data[T].x : y + .05 * (q - y));
                    J = x - r;
                    C = D(r + .95 * J);
                    J = D(r + .05 * J) - M;
                    G.append("image").attr("xlink:href", svGlobal.customDir() + "/images/" + f.backgroundData[0].iconFile).attr("x", e).attr("y", C).attr("width", M + "px").attr("height", M + "px").style("opacity", 1);
                    G.append("image").attr("xlink:href",
                                           svGlobal.customDir() + "/images/" + f.backgroundData[1].iconFile).attr("x", e).attr("y", J).attr("width", "20px").attr("height", "20px").style("opacity", 1)
                }
                var R = "",
                    Y = "";
                a.each(E.data, function(a, b) {
                    R += Y + z(b.x) + "," + t(ca, z(b.x), d.left);
                    Y = " "
                });
                x = z(E.data[E.data.length - 1].x) + "," + D(x) + " " + z(E.data[0].x) + "," + D(x) + " ";
                r = z(E.data[E.data.length - 1].x) + "," + D(r) + " " + z(E.data[0].x) + "," + D(r) + " ";
                G.append("g").append("svg:polygon").attr("class", "thPlotAreaFill").style("fill", f.backgroundData[0].color).attr("points", x +
                                                                                                                                  R);
                G.append("g").append("svg:polygon").attr("class", "thPlotAreaFill").style("fill", f.backgroundData[1].color).attr("points", r + R);
                w = "black";
                break;
                default:
                var r = f.background,
                Z = [];
                a.each(r, function(a, b) {
                    Z.push(b.stageName)
                });
                for (var da = svGlobal.createColorLookupFunction(Z), x = 0; x < r.length; x++) r[x].xSum = 0 === x ? 0 : r[x - 1].count + r[x - 1].xSum;
                r = G.selectAll("g .stage").data(r).enter().append("g").attr("class", "stage");
                r.append("rect").attr("class", "thBackground").attr("x", function(a, b) {
                    return z(a.xSum) + "px"
                }).attr("y",
                        d.top / 2).attr("width", function(a) {
                            return u(a.count) + "px"
                        }).attr("height", f.height - d.bottom - d.top / 2).attr("fill", function(a, b) {
                            return da(a.stageName)
                        });
                r.append("text").attr("class", "smallStageLabel").text(function(a) {
                    if (0 < a.count) return a.stageName
                }).attr("transform", function(a, b) {
                    return "translate(" + (z(a.xSum + a.count / 2) + 4) + "," + (f.height - d.bottom - 15) + ") rotate(-90)"
                })
            }
            var aa = [];
            a.each(f.dataList, function(a, b) {
                aa.push(b.dataName)
            });
            var U = svGlobal.createColorLookupFunction(aa);
            f.dataList.sort(function(a,
                                     c) {
                return b.ascending(a.benchmark, c.benchmark)
            });
            var ba = !1,
                S;
            a.each(f.dataList, function(c, e) {
                if ("undefined" === typeof e.level) G.append("g").append("svg:path").attr("class", "dataPath").attr("d", L(e.data)).style("stroke", function() {
                    return "black" === w ? "black" : U(e.dataName)
                }).attr("stroke-width", 5).style("fill", "none").style("opacity", function() {
                    return "none" === w ? 0 : e.benchmark ? .2 : "black" === w ? .4 : .7
                }).attr("original-title", e.dataName);
                else {
                    ba = "undefined" !== typeof f.showGradientLegend ? f.showGradientLegend :
                        !0;
                    var g = L(e.data);
                    "undefined" !== typeof f.hideOriginalDataLine && !1 !== f.hideOriginalDataLine || G.append("g").append("svg:path").attr("class", "dataPath").attr("d", g).style("stroke", U(e.dataName)).attr("stroke-width", 5).style("fill", "none").style("opacity", .7);
                    document.createElementNS(b.ns.prefix.svg, "path").setAttribute("d", g);
                    var k = [];
                    a.each(e.data, function(a, b) {
                        k.push(b)
                    });
                    var g = jQuery.extend(!0, {}, k[0]),
                        r = k[1].x - k[0].x,
                        s = k[1].y - k[0].y;
                    g.x = 0;
                    g.y = k[0].y - s * k[0].x / r;
                    k.unshift(g);
                    var n = [];
                    a.each(e.level,
                           function(a, b) {
                               n.push(b)
                           });
                    g = jQuery.extend(!0, {}, n[0]);
                    r = n[1].x - n[0].x;
                    s = n[1].y - n[0].y;
                    g.x = 0;
                    g.y = n[0].y - s * n[0].x / r;
                    n.unshift(g);
                    for (var x = L(n), g = [], r = 0; r < e.level.length; r++) g.push(D(n[r].y));
                    var r = b.max(g),
                        y = b.min(g),
                        q = r - y;
                    0 === q && (q = 1);
                    S = b.scale.linear().domain([1, .6, .4, 0]).range(["blue", "green", "yellow", "red"]);
                    g = l(L(k), 3);
                    g = m(g);
                    G.selectAll("path").data(g).enter().append("path").style("stroke-linejoin", "round").style("stroke-width", 1).style("stroke-linecap", "round").style("fill", function(a, b) {
                        var c =
                            t(x, a[2][0], d.left);
                        return S((c - y) / q)
                    }).style("stroke", function(a, b) {
                        var c = t(x, a[2][0], d.left);
                        return S((c - y) / q)
                    }).attr("d", function(a) {
                        var b = a[0],
                            c = a[1],
                            d = a[2],
                            f = a[3];
                        a = p(c, d);
                        var e = [c[0] + 2.5 * a[0], c[1] + 2.5 * a[1]],
                            g = [d[0] + 2.5 * a[0], d[1] + 2.5 * a[1]],
                            k = [d[0] - 2.5 * a[0], d[1] - 2.5 * a[1]],
                            l = [c[0] - 2.5 * a[0], c[1] - 2.5 * a[1]];
                        b && (b = p(b, c), b = [c[0] + b[0] + a[0], c[1] + b[1] + a[1]], e = h(c, b, e, g), l = h(c, b, l, k));
                        f && (c = p(d, f), b = [d[0] + c[0] + a[0], d[1] + c[1] + a[1]], g = h(d, b, e, g), k = h(d, b, l, k));
                        return "M" + e + "L" + g + " " + k + " " + l + "Z"
                    })
                }
            });
            f.legend &&
                (r = H.selectAll(".legend").data(f.dataList).enter().append("g").attr("class", "legend").attr("transform", function(a, b) {
                    return "translate(0," + (12 * b + 20) + ")"
                }), r.append("rect").attr("x", g - 35).attr("y", 2.5).attr("width", 15).attr("height", 5).style("fill", function(a) {
                    return U(a.dataName)
                }).style("opacity", function(a) {
                    return a.benchmark ? .2 : .7
                }), r.append("text").attr("class", "legend").attr("x", g - 39).attr("y", 9).attr("font-size", 12).style("text-anchor", "end").text(function(a) {
                    return a.dataName
                }));
            if (ba) {
                r = f.gradientLegendLabel ||
                    "";
                g = d.left + c - 90;
                H.append("text").attr("class", "gradientLegendTitle").attr("x", g).attr("y", 10).style("text-anchor", "start").style("font-weight", "bold").text(r);
                r = f.gradientLegendLowLabel || "low";
                H.append("text").attr("class", "gradientLegendText").attr("x", g).attr("y", 20).style("text-anchor", "start").text(r);
                r = f.gradientLegendHighLabel || "high";
                H.append("text").attr("class", "gradientLegendText").attr("x", d.left + c).attr("y", 20).style("text-anchor", "end").text(r);
                for (var V = g + 16, W = V + 52, N = V; N < W; N += 3) H.append("svg:rect").attr("x",
                                                                                                 N).attr("y", 15).attr("width", 3).attr("height", 5).style("fill", function() {
                                                                                                     return S((W - N) / (W - V))
                                                                                                 })
            }
            this.showSceneFrameSelection = function(a) {
                null === b.select("#sceneFrameSelection__" + k)[0][0] && (H.append("rect").attr("id", "sceneFrameSelection__" + k).attr("class", "vizFrameIndicatorOff").attr("x", 0).attr("y", d.top).attr("width", 10).attr("height", n), H.append("line").attr("id", "sceneFrameSelectionStart__" + k).attr("class", "vizFrameBoundaryIndicatorOff").attr("x1", 0).attr("y1", d.top).attr("x2", 0).attr("y2", n),
                                                                          H.append("line").attr("id", "sceneFrameSelectionEnd__" + k).attr("class", "vizFrameBoundaryIndicatorOff").attr("x1", 10).attr("y1", d.top).attr("x2", 10).attr("y2", n));
                b.select("#sceneFrameSelection__" + k).classed("vizFrameIndicatorOn", !0).classed("vizFrameIndicatorOff", !1).attr("x", a.x).attr("width", a.frameWidth);
                b.select("#sceneFrameSelectionStart__" + k).classed("vizFrameBoundaryIndicatorOn", !0).classed("vizFrameBoundaryIndicatorOff", !1).attr("x1", a.x).attr("y1", d.top).attr("x2", a.x).attr("y2", d.top + n);
                b.select("#sceneFrameSelectionEnd__" + k).classed("vizFrameBoundaryIndicatorOn", !0).classed("vizFrameBoundaryIndicatorOff", !1).attr("x1", a.x + a.frameWidth).attr("y1", d.top).attr("x2", a.x + a.frameWidth).attr("y2", d.top + n)
            };
            this.hideSceneFrameSelection = function() {
                b.select("#sceneFrameSelection__" + k).classed("vizFrameIndicatorOn", !1).classed("vizFrameIndicatorOff", !0);
                b.select("#sceneFrameSelectionStart__" + k).classed("vizFrameBoundaryIndicatorOn", !1).classed("vizFrameBoundaryIndicatorOff", !0);
                b.select("#sceneFrameSelectionEnd__" +
                         k).classed("vizFrameBoundaryIndicatorOn", !1).classed("vizFrameBoundaryIndicatorOff", !0)
            }
        },
        ThPowerBars: function(f) {
            var e = f.margin || {
                top: 30,
                right: 10,
                bottom: 15,
                left: 45
            },
                l = f.powerBarHeight || 24,
                k = f.powerBarMargin || 15,
                d = f.width || 900,
                c = f.dataList.length * l + (f.dataList.length - 1) * k + e.top + e.bottom,
                h = f.id || svGlobal.getId();
            this.div = a("<div/>", {
                id: h,
                width: d,
                height: c
            });
            this.id = h;
            f.yLabel && f.yAxis && (e.left = 60 <= e.left ? e.left : 60);
            var m = d - e.left - e.right,
                n = c - e.top - e.bottom,
                p = 0,
                q;
            f.xRange ? (p = f.xRange.min, q = f.xRange.max) :
                a.each(f.dataList, function(c, d) {
                    var f = a.map(d.data, function(a) {
                        return a.x
                    }),
                        e = b.max(f);
                    "undefined" === typeof q && (q = e);
                    e > q && (q = e);
                    f = b.min(f);
                    "undefined" === typeof p && (p = f);
                    f < p && (p = f)
                });
            var t = b.scale.linear().domain([p, q]).range([e.left, e.left + m]),
                u = 0;
            f.yRange ? u = f.yRange.max : a.each(f.dataList, function(c, d) {
                var f = a.map(d.data, function(a) {
                    return a.y
                }),
                    f = b.max(f);
                f > u && (u = f)
            });
            var r = b.scale.linear().domain([-u, u]).range([l, 0]),
                m = f.lineType || "basis";
            b.svg.line().interpolate(m).x(function(a, b) {
                return t(a.x)
            }).y(function(a) {
                return r(a.y)
            });
            var x = b.select(this.div[0]).append("svg"),
                D = x.attr("width", d).attr("height", c).append("g");
            "undefined" !== typeof f.title && D.append("text").attr("class", "thPlotTitle").attr("text-anchor", "start").attr("x", e.left).attr("y", 15).text(f.title);
            "undefined" !== typeof f.iconFile && (m = f.iconHeight || 25, x.append("image").attr("xlink:href", svGlobal.customDir() + "/images/" + f.iconFile).attr("x", "0px").attr("y", c / 2 - m / 2 + "px").attr("width", "28px").attr("height", m + "px").style("opacity", 1));
            var C = [];
            a.each(f.dataList, function(a,
                                        b) {
                C.push(b.dataName)
            });
            var v = f.colorLookup || svGlobal.createColorLookupFunction(C),
                w = b.svg.area().x(function(a) {
                    return t(a.x)
                }).y0(function(a) {
                    return r(0)
                }).y1(function(a) {
                    return r(a.y)
                }),
                H = b.svg.area().x(function(a) {
                    return t(a.x)
                }).y0(function(a) {
                    return r(0)
                }).y1(function(a) {
                    return r(-a.y)
                });
            a.each(f.dataList, function(a, b) {
                D.append("text").attr("class", "powerBarLabel").attr("text-anchor", "start").attr("x", e.left).attr("y", e.top + a * (l + k)).attr("fill", v(b.dataName)).text(b.dataName);
                D.append("g").append("svg:path").attr("class",
                                                      "dataPowerBar").attr("d", w(b.data)).style("fill", v(b.dataName)).style("opacity", function() {
                                                          return .6
                                                      }).attr("transform", "translate(0, " + (e.top + a * (l + k)) + ")")
            });
            a.each(f.dataList, function(a, b) {
                D.append("g").append("svg:path").attr("class", "dataPowerBar").attr("d", H(b.data)).style("fill", v(b.dataName)).style("opacity", function() {
                    return .6
                }).attr("transform", "translate(0, " + (e.top + a * (l + k)) + ")")
            });
            f.legend && (f = x.selectAll(".legend").data(f.dataList).enter().append("g").attr("class", "legend").attr("transform",
                                                                                                                      function(a, b) {
                                                                                                                          return "translate(0," + (12 * b + 20) + ")"
                                                                                                                      }), f.append("rect").attr("x", d - 35).attr("y", 2.5).attr("width", 15).attr("height", 5).style("fill", function(a) {
                                                                                                                          return v(a.dataName)
                                                                                                                      }).style("opacity", function(a) {
                                                                                                                          return a.benchmark ? .2 : .7
                                                                                                                      }), f.append("text").attr("class", "legend").attr("x", d - 39).attr("y", 9).attr("font-size", 12).style("text-anchor", "end").text(function(a) {
                                                                                                                          return a.dataName
                                                                                                                      }));
            this.showSceneFrameSelection = function(a) {
                null === b.select("#sceneFrameSelection__" + h)[0][0] && (x.append("rect").attr("id",
                                                                                                "sceneFrameSelection__" + h).attr("class", "vizFrameIndicatorOff").attr("x", 0).attr("y", e.top).attr("width", 10).attr("height", n), x.append("line").attr("id", "sceneFrameSelectionStart__" + h).attr("class", "vizFrameBoundaryIndicatorOff").attr("x1", 0).attr("y1", e.top).attr("x2", 0).attr("y2", n), x.append("line").attr("id", "sceneFrameSelectionEnd__" + h).attr("class", "vizFrameBoundaryIndicatorOff").attr("x1", 10).attr("y1", e.top).attr("x2", 10).attr("y2", n));
                b.select("#sceneFrameSelection__" + h).classed("vizFrameIndicatorOn", !0).classed("vizFrameIndicatorOff", !1).attr("x", a.x).attr("width", a.frameWidth);
                b.select("#sceneFrameSelectionStart__" + h).classed("vizFrameBoundaryIndicatorOn", !0).classed("vizFrameBoundaryIndicatorOff", !1).attr("x1", a.x).attr("y1", e.top).attr("x2", a.x).attr("y2", e.top + n);
                b.select("#sceneFrameSelectionEnd__" + h).classed("vizFrameBoundaryIndicatorOn", !0).classed("vizFrameBoundaryIndicatorOff", !1).attr("x1", a.x + a.frameWidth).attr("y1", e.top).attr("x2", a.x + a.frameWidth).attr("y2", e.top + n)
            };
            this.hideSceneFrameSelection =
                function() {
                    b.select("#sceneFrameSelection__" + h).classed("vizFrameIndicatorOn", !1).classed("vizFrameIndicatorOff", !0);
                    b.select("#sceneFrameSelectionStart__" + h).classed("vizFrameBoundaryIndicatorOn", !1).classed("vizFrameBoundaryIndicatorOff", !0);
                    b.select("#sceneFrameSelectionEnd__" + h).classed("vizFrameBoundaryIndicatorOn", !1).classed("vizFrameBoundaryIndicatorOff", !0)
                }
        },
        SceneTimeBar: function(f) {
            var e = f.id;
            "undefined" === typeof e && (e = svGlobal.getId());
            var h = f.width || 900,
                k = f.height || 100,
                d = this;
            a(document).on("touchstart",
                           function(a) {
                               a.target.classList.contains("vizFrame") && !a.target.classList.contains("vizFrameSelected") && a.preventDefault()
                           });
            a(document).on("touchmove", function(c) {
                var e = c.originalEvent.changedTouches[0],
                    g = document.elementFromPoint(e.clientX, e.clientY),
                    e = b.select(g);
                if (e.classed("vizFrame")) {
                    var h = e.node().getBBox(),
                        k = g.id.replace("vizFrame__", ""),
                        k = f.vizFrameList.getMatches("index", k)[0];
                    e.classed("vizFrameHover") || e.classed("vizFrameSelected") ? (c.preventDefault, a(g).tipsy("show")) : (a(".vizFrame").tipsy("hide"),
                                                                                                                            c = b.select(".vizFrameSelected"), c[0][0] && (g = c.attr("id"), g = g.replace("vizFrame__", ""), g = f.vizFrameList.getMatches("index", g)[0], c = c.node().getBBox(), b.selectAll(".vizFrameHover").classed("vizFrameHover", !1), b.selectAll(".vizFrameSelected").classed("vizFrameSelected", !1), d.FrameSelection({
                                                                                                                                select: !1,
                                                                                                                                x: c.x,
                                                                                                                                frameWidth: c.width,
                                                                                                                                vf: g
                                                                                                                            })), b.select(".vizFrameHover").classed("vizFrameHover", !1), e.classed("vizFrameHover", !0), d.FrameHover({
                                                                                                                                hover: !0,
                                                                                                                                x: h.x,
                                                                                                                                frameWidth: h.width,
                                                                                                                                vf: k
                                                                                                                            }))
                }
            });
            a(document).on("touchend",
                           function(c) {
                               var e = c.originalEvent.changedTouches[0],
                                   e = document.elementFromPoint(e.clientX, e.clientY),
                                   g = b.select(e);
                               if (g.classed("vizFrame")) {
                                   c.preventDefault();
                                   var h = g.node().getBBox(),
                                       k = e.id.replace("vizFrame__", ""),
                                       k = f.vizFrameList.getMatches("index", k)[0];
                                   a(".vizFrame").tipsy("hide");
                                   var l = b.select(".vizFrameSelected"),
                                       m;
                                   if (l[0][0]) {
                                       m = l.attr("id");
                                       var n = m.replace("vizFrame__", ""),
                                           n = f.vizFrameList.getMatches("index", n)[0],
                                           l = l.node().getBBox();
                                       b.selectAll(".vizFrameHover").classed("vizFrameHover", !1);
                                       b.selectAll(".vizFrameSelected").classed("vizFrameSelected", !1);
                                       d.FrameSelection({
                                           select: !1,
                                           x: l.x,
                                           frameWidth: l.width,
                                           vf: n
                                       })
                                   }
                                   if ("undefined" === typeof m || m !== e.id) b.selectAll(".vizFrame").classed("vizFrameSelected", !1), g.classed("vizFrameSelected", !0), d.FrameSelection({
                                       select: !0,
                                       x: h.x,
                                       frameWidth: h.width,
                                       vf: k
                                   });
                                   c.preventDefault()
                               } else b.select(".vizFrameSelected")
                           });
            d.vizFrame = function(c, d) {
                var f = this;
                f.index = c;
                f.sceneTimeFrameList = [];
                "undefined" !== typeof d && f.AddSceneTimeFrame(d);
                f.duration = function() {
                    return b.sum(f.sceneTimeFrameList.map(function(a) {
                        return a.duration
                    }))
                };
                f.scriptText = function() {
                    var b = "",
                        c = "";
                    a.each(f.sceneTimeFrameList, function(a, d) {
                        b += c + d.scriptText;
                        c = "&#13;&#10;"
                    });
                    return b
                };
                f.AddSceneTimeFrame = function(a) {
                    f.sceneTimeFrameList.push(a)
                };
                f.sceneRangeText = function() {
                    return 1 === f.sceneTimeFrameList.length ? "Scene #" + (f.sceneTimeFrameList[0].index + 1) : "Scenes #" + (f.sceneTimeFrameList[0].index + 1) + " thru #" + (f.sceneTimeFrameList.last().index + 1)
                };
                return f
            };
            d.div = a("<div/>", {
                id: e,
                width: h
            });
            d.id = e;
            d.childVizIdList = f.childVizIdList;
            d.sv = f.sv;
            var c = f.margin || {
                top: 7,
                right: 10,
                bottom: 7,
                left: 45
            };
            d.$scriptDisplayDivWrapper = f.$scriptDisplayDivWrapper || void 0;
            d.$sceneNotesList = f.$sceneNotesList;
            d.$scriptDisplayDiv = f.$scriptDisplayDiv || d.div.find(".sceneFrameScriptViewer");
            d.$scriptDisplayTitle = f.$scriptDisplayTitle || d.div.find(".sceneFrameScriptViewerTitle");
            d.$emotionDiv = f.$emotionDiv || d.div.find(".emotionDiv");
            d.$emotionDivTitle = f.$emotionDivTitle || d.div.find(".emotionDivTitle");
            d.maxSingleEmotion = f.maxSingleEmotion;
            d.maxSentiment = f.maxSentiment;
            d.sentimentBarChartDataZero =
                new svBarChartData({
                    legend: 0,
                    total: 1,
                    type: "compare",
                    dataSetList: [{
                        dataSetName: "sentiment",
                        dataSetLabel: "Sentiment",
                        data: [{
                            x: "Positive",
                            y: 0
                        }, {
                            x: "Negative",
                            y: 0
                        }]
                    }]
                });
            d.sentimentBarChartOptions = new svBarChartOptions;
            d.sentimentBarChartOptions.divID("vfEmotionDiv");
            d.sentimentBarChartOptions.margin({
                top: 30,
                right: 10,
                bottom: 5,
                left: 30
            });
            d.sentimentBarChartOptions.width(180);
            d.sentimentBarChartOptions.height(120);
            d.sentimentBarChartOptions.title("Sentiment Totals");
            d.sentimentBarChartOptions.yDomain([0, 1.1 *
                                                d.maxSentiment
                                               ]);
            d.sentimentBarChartOptions.justPercentageTooltip(!0);
            d.sentimentBarChartOptions.useHollowAndFill(!0);
            d.sentimentBarChartOptions.customColorArray(["#ffffff", "#696969"]);
            d.emotionBarChartDataZero = new svBarChartData({
                total: 1,
                dataSetList: [{
                    dataSetName: "emotionaComponents",
                    dataSetLabel: "Emotion Components",
                    data: [{
                        x: "Joy",
                        y: 0
                    }, {
                        x: "Sadness",
                        y: 0
                    }, {
                        x: "Trust",
                        y: 0
                    }, {
                        x: "Disgust",
                        y: 0
                    }, {
                        x: "Fear",
                        y: 0
                    }, {
                        x: "Anger",
                        y: 0
                    }, {
                        x: "Surprise",
                        y: 0
                    }, {
                        x: "Anticipation",
                        y: 0
                    }]
                }]
            });
            d.emotionBarChartOptions = new svBarChartOptions;
            d.emotionBarChartOptions.divID("vfEmotionDiv");
            d.emotionBarChartOptions.margin({
                top: 30,
                right: 10,
                bottom: 5,
                left: 15
            });
            d.emotionBarChartOptions.width(300);
            d.emotionBarChartOptions.height(120);
            d.emotionBarChartOptions.title("EmotionTotals");
            d.emotionBarChartOptions.yDomain([0, 1.1 * d.maxSingleEmotion]);
            d.emotionBarChartOptions.justPercentageTooltip(!0);
            d.emotionBarChartOptions.colorLookup(new ubColorLookup({
                customColorMap: svGlobal.emotionColorMap
            }));
            var e = h - c.left - c.right,
                l = k - c.top - c.bottom,
                m = f.totalDuration,
                n = b.scale.linear().domain([0, m]).range([c.left, c.left + e]),
                p = b.scale.linear().domain([0, m]).range([0, e]),
                e = b.select(d.div[0]).append("svg"),
                q = e.attr("width", h).attr("height", k).append("g");
            e.append("image").attr("xlink:href", svGlobal.customDir() + "/images/sceneClapBoard.png").attr("x", "5px").attr("y", (c.top + l) / 2 - 10 + "px").attr("width", "20px").attr("height", "20px").style("opacity", 1);
            var t = 0,
                u = 0;
            a.each(f.vizFrameList, function(f, e) {
                e.vizFrameNotes && (u++, q.append("circle").attr("class", "vizFrameMarker").attr("cx",
                                                                                                 function() {
                                                                                                     return n(t) + p(e.duration) / 2
                                                                                                 }).attr("cy", c.top + l / 2).attr("r", 2).style("fill", "red").style("opacity", 1).attr("original-title", e.sceneRangeText + "<br/>" + e.vizFrameNotes), q.append("text").attr("class", "printOnly").attr("text-anchor", "middle").attr("x", function() {
                                                                                                     return n(t) + p(e.duration) / 2
                                                                                                 }).attr("y", c.top + l + c.bottom / 2).text(u), d.$sceneNotesList.append('<li class="sceneNoteListItem">' + e.vizFrameNotes + "</li>"));
                q.append("rect").attr("class", "vizFrame").attr("id", "vizFrame__" + f).attr("x", n(t)).attr("y",
                                                                                                             c.top).attr("width", function() {
                                                                                                                 return p(e.duration)
                                                                                                             }).attr("height", l).attr("stroke-width", 2).attr("rx", 3).attr("ry", 3).attr("original-title", function() {
                                                                                                                 return e.vizFrameNotes ? e.sceneRangeText + "<br/>" + e.vizFrameNotes : e.sceneRangeText
                                                                                                             }).on("mouseover", function() {
                                                                                                                 if (!b.select(this).classed("vizFrameSelected") && (b.select(this).classed("vizFrameHover", !0), 0 === b.selectAll(".vizFrameSelected")[0].length)) {
                                                                                                                     var a = b.select(this).node().getBBox();
                                                                                                                     d.FrameHover({
                                                                                                                         hover: !0,
                                                                                                                         x: a.x,
                                                                                                                         frameWidth: a.width,
                                                                                                                         vf: e
                                                                                                                     })
                                                                                                                 }
                                                                                                             }).on("mouseout",
                                                                                                                   function() {
                                                                                                                       if (!b.select(this).classed("vizFrameSelected") && (b.select(this).classed("vizFrameHover", !1), 0 === b.selectAll(".vizFrameSelected")[0].length)) {
                                                                                                                           var a = b.select(this).node().getBBox();
                                                                                                                           d.FrameHover({
                                                                                                                               hover: !1,
                                                                                                                               x: a.x,
                                                                                                                               frameWidth: a.width,
                                                                                                                               vf: e
                                                                                                                           })
                                                                                                                       }
                                                                                                                   }).on("mouseup", function() {
                                                                                                                       var a = b.select(this),
                                                                                                                           c = a.node().getBBox();
                                                                                                                       b.select(".vizFrameHover").classed("vizFrameHover", !1);
                                                                                                                       a.classed("vizFrameSelected") ? (a.classed("vizFrameSelected", !1), d.FrameSelection({
                                                                                                                           select: !1,
                                                                                                                           x: c.x,
                                                                                                                           frameWidth: c.width,
                                                                                                                           vf: e
                                                                                                                       })) : (b.selectAll(".vizFrame").classed("vizFrameSelected", !1), a.classed("vizFrameSelected", !0), d.FrameSelection({
                                                                                                                           select: !0,
                                                                                                                           x: c.x,
                                                                                                                           frameWidth: c.width,
                                                                                                                           vf: e
                                                                                                                       }))
                                                                                                                   }).each(function() {
                                                                                                                       a(this).tipsy(svGlobal.tipsy1)
                                                                                                                   });
                t += e.duration
            });
            a("body").keyup(function(c) {
                if ((37 === c.which || 39 === c.which || 40 === c.which) && 0 < a(".vizFrameSelected").length) {
                    c.preventDefault();
                    var d = a(".vizFrameSelected").attr("id"),
                        e = parseInt(d.split("__")[1]),
                        g = !1;
                    37 === c.which && 0 < e ? (d = "vizFrame__" + (e - 1), g = !0) : 39 === c.which && e < f.vizFrameList.length - 1 ? (d = "vizFrame__" + (e + 1), g = !0) : 40 === c.which && (g = !0);
                    g && b.select("#" + d).on("mouseup").apply(b.select("#" + d)[0][0])
                }
            });
            d.FrameHover({
                vf: {
                    emotionSignature: {
                        totalEmotion: 0
                    }
                }
            });
            return d
        }
    };
    n.SceneTimeBar.prototype.FrameHover = function(b) {
        var e = this;
        "undefined" === typeof e.vizRegisterList && (e.vizRegisterList = [], a.each(e.sv.vizList, function(a, b) {
            "undefined" !== typeof b.id && 0 <= e.childVizIdList.indexOf(b.id) && e.vizRegisterList.push(b)
        }));
        e.$scriptDisplayDivWrapper && e.$scriptDisplayDivWrapper.css("color", "gray");
        e.$emotionDivTitle && e.$emotionDivTitle.css("color",
                                                     "gray");
        e.$scriptDisplayDiv.empty();
        e.$scriptDisplayTitle.html("Script ");
        e.$emotionDivTitle.html("Emotion ");
        var h, k;
        b.hover ? (e.$scriptDisplayDivWrapper && e.$scriptDisplayDivWrapper.css("color", "black"), e.$emotionDivTitle && e.$emotionDivTitle.css("color", "black"), e.$scriptDisplayTitle.html("Script - " + b.vf.sceneRangeText), e.$scriptDisplayDiv.append(b.vf.scriptHTML), a.each(e.vizRegisterList, function(a, c) {
            c.showSceneFrameSelection(b)
        }), e.$emotionDiv && (e.$emotionDiv.empty(), e.$emotionDivTitle.html("Emotion - " +
                                                                             b.vf.sceneRangeText), h = new svBarChartData({
                                                                                 total: -1,
                                                                                 dataSetList: [{
                                                                                     dataSetName: "emotionaComponents",
                                                                                     dataSetLabel: "Emotion Components",
                                                                                     data: [{
                                                                                         x: "Joy",
                                                                                         y: b.vf.emotionSignature.emotionVector.joy
                                                                                     }, {
                                                                                         x: "Sadness",
                                                                                         y: b.vf.emotionSignature.emotionVector.sadness
                                                                                     }, {
                                                                                         x: "Trust",
                                                                                         y: b.vf.emotionSignature.emotionVector.trust
                                                                                     }, {
                                                                                         x: "Disgust",
                                                                                         y: b.vf.emotionSignature.emotionVector.disgust
                                                                                     }, {
                                                                                         x: "Fear",
                                                                                         y: b.vf.emotionSignature.emotionVector.fear
                                                                                     }, {
                                                                                         x: "Anger",
                                                                                         y: b.vf.emotionSignature.emotionVector.anger
                                                                                     }, {
                                                                                         x: "Surprise",
                                                                                         y: b.vf.emotionSignature.emotionVector.surprise
                                                                                     }, {
                                                                                         x: "Anticipation",
                                                                                         y: b.vf.emotionSignature.emotionVector.anticipation
                                                                                     }]
                                                                                 }]
                                                                             }), k = new svBarChartData({
                                                                                 total: b.vf.emotionSignature.sentimentPos + b.vf.emotionSignature.sentimentNeg,
                                                                                 dataSetList: [{
                                                                                     dataSetName: "sentiment",
                                                                                     dataSetLabel: "Sentiment",
                                                                                     data: [{
                                                                                         x: "Positive",
                                                                                         y: b.vf.emotionSignature.sentimentPos
                                                                                     }, {
                                                                                         x: "Negative",
                                                                                         y: b.vf.emotionSignature.sentimentNeg
                                                                                     }]
                                                                                 }]
                                                                             }), new svBarChart(k, e.sentimentBarChartOptions), new svBarChart(h, e.emotionBarChartOptions))) : (a.each(e.vizRegisterList, function(a, b) {
                                                                                 b.hideSceneFrameSelection()
                                                                             }),
                                                                                                                                                                                 e.$emotionDiv && (e.$emotionDiv.empty(), new svBarChart(e.sentimentBarChartDataZero, e.sentimentBarChartOptions), new svBarChart(e.emotionBarChartDataZero, e.emotionBarChartOptions)))
    };
    n.SceneTimeBar.prototype.FrameSelection = function(a) {
        a.hover = a.select;
        this.FrameHover(a)
    };
    n.DonutChart = function(e) {
        var g = e.id;
        "undefined" === typeof g && (g = svGlobal.getId());
        this.div = a("<div/>", {
            id: g,
            width: e.width,
            height: e.height
        });
        var h = [];
        a.each(e.dataSetList, function(b, c) {
            h.push(0);
            a.each(c.data, function(a, c) {
                h[b] += parseFloat(c.y)
            })
                });
        g = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        };
        e.margin && (g = e.margin);
        var k = [];
        a.each(e.dataSetList[0].data, function(a, b) {
            k.push(b.x)
        });
        var d = svGlobal.createColorLookupFunction(k),
            c = e.width - g.left - g.right,
            l = e.height - g.top - g.bottom,
            m = Math.min(c, l) / 2,
            n = m / (e.dataSetList.length + 1),
            p = m / (e.dataSetList.length + 1),
            q = 1 < e.dataSetList.length ? 3 : 0,
            t = b.select(this.div[0]).attr("width", c).attr("height", l).append("svg").attr("width", e.width).attr("height", e.height).append("g").attr("transform", "translate(" + (c / 2 + g.left) + "," +
                                                                                                                                                        (l / 2 + g.top) + ")"),
            u = b.layout.pie().sort(null).value(function(a) {
                return a.y
            });
        a.each(e.dataSetList, function(c, e) {
            if (!(2 < c)) {
                var f = b.svg.arc().innerRadius(n + p * c).outerRadius(n + p * (c + 1) - q),
                    g = t.selectAll(".arc_" + c).data(u(e.data)).enter().append("g").attr("class", "arc arc_" + c);
                g.append("path").attr("d", f).style("fill", function(a, b) {
                    return d(a.data.x)
                }).style("opacity", .3);
                g.attr("original-title", function(a, b) {
                    return a.data.x + ": " + parseInt(a.data.y / h[c] * 100 + .5) + "% (" + a.data.y + " of " + h[c] + " total in " + e.dataSetName +
                        ")"
                }).each(function() {
                    a(this).tipsy(svGlobal.tipsy1)
                })
                    }
        });
        return this
    };
    n.Table = function(e) {
        var g = e.id;
        "undefined" === typeof g && (g = svGlobal.getId());
        this.div = "undefined" === typeof e.divID ? a('<div  style="margin:10px 10px 20px 10px;"></div>', {
            id: g
        }) : a("#" + e.divID);
        var h = a('<table id="table_' + g + '" class="svTable">\t</table>');
        this.div.append(h);
        var k = [];
        a.each(e.headerList, function(a, b) {
            0 !== b.colSpan && k.push(b)
        });
        b.select(h[0]).selectAll("th").data(k).enter().append("th").attr("class", "svTableHeader").attr("colSpan",
                                                                                                        function(a) {
                                                                                                            return a.colSpan
                                                                                                        }).text(function(a) {
                                                                                                            return a.columnHeader
                                                                                                        }).style("text-align", function(a, b) {
                                                                                                            return e.alignData[b].headerAlign
                                                                                                        }).style("background-color", function() {
                                                                                                            return "undefined" !== typeof e.headerColor ? "rgba(" + e.headerColor + ")" : "rgba(255,255,255,0)"
                                                                                                        });
        var d = [],
            g = e.tableData.map(function(a) {
                return a.group
            });
        "undefined" !== typeof g ? a.each(g, function(b, c) {
            0 <= a.inArray(c, d) || d.push(c)
        }) : a.each(e.tableData, function(b, c) {
            e.groupList.push(c.rowData[e.indexor]);
            0 <= a.inArray(c.rowSata[e.indexor],
                           d) || d.push(c.rowData[e.indexor])
        });
        var c = svGlobal.createColorLookupFunction(d);
        "undefined" !== typeof e.indexor && e.tableData.sort(function(a, c) {
            var d = a.rowData[e.indexor],
                g = +a.rowData[e.indexor];
            isNaN(g) || (d = g);
            var g = c.rowData[e.indexor],
                h = +c.rowData[e.indexor];
            isNaN(h) || (g = h);
            return b.descending(d, g)
        });
        a.each(e.tableData, function(a, b) {
            var d, g, k;
            "undefined" !== b.group ? (d = v(c(b.group)), g = u(c(b.group)), k = w(c(b.group))) : (d = v(c(b.rowData[e.indexor])), g = u(c(b.rowData[e.indexor])), k = w(c(b.rowData[e.indexor])));
            h.append('<tr class="svTableRow" style="background-color:' + ("rgba(" + d + "," + g + "," + k + ",0.2)") + ';"></tr>')
        });
        h.find("tr").each(function(b, c) {
            var d = 0;
            a.each(e.tableData[b].rowData, function(b, g) {
                var h = "";
                "undefined" !== typeof e.suffixMap && (h = e.suffixMap[b]);
                switch (e.alignData[d].cellAlign) {
                case "left":
                    a(c).append("<td class='svTableCellLeft'>" + g + h + "</td>");
                    break;
                case "right":
                    a(c).append("<td class='svTableCellRight'>" + g + h + "</td>");
                    break;
                default:
                    a(c).append("<td class='svTableCellCenter'>" + g + h + "</td>")
                }
                d++
            })
                });
        return this
    };
    n.Header = function(b) {
        var e = b.id || "text_" + svGlobal.getId(),
            h = b.useClass || "",
            k = !1;
        "undefined" !== typeof b.helpDialogID && "undefined" !== typeof b.helpDialog && (k = !0);
        var d = b.clearBoth ? "clear:both;" : "";
        this.div = a('<div class="' + h + '" />', {
            id: e + "Div"
        });
        var c;
        switch (b.type) {
        case "title":
            c = "<h2 class='svHeaderTitle' id='" + e + "' style='" + d + "'>" + b.text + "</h2><hr class='style-two print-style-two'>";
            break;
        case "section":
            c = k ? "<h3 class='svHeaderSection' id='" + e + "' style='margin-left:5px; vertical-align:middle;'>" +
                b.text + "<img src='" + svGlobal.customDir() + "/images/help_circle.png' id='img_" + b.helpDialogID + "' style='vertical-align:middle; margin:0px 0px 0px 10px;'></img></h3><hr class='style-one print-style-one'>" : "<h3 class='svHeaderSection' id='" + e + "'>" + b.text + "</h3><hr class='style-one print-style-one'>";
            break;
        case "subsection":
            c = "<h4 class='svHeaderSubsection' id='" + e + "'>" + b.text + "</h4><hr class='style-two print-style-two'>";
            break;
        case "info":
            c = "<h3 class='svHeaderInfo' id='" + e + "'>" + b.text + "</h3><p class='svHeaderInfoMessage'>" +
                b.subtext + "</p>"
        }
        this.div.append(c);
        k && (a(this.div).append(b.helpDialog), a(this.div).find("#" + b.helpDialogID).hide(), a(this.div).find("#img_" + b.helpDialogID).hover(function() {
            this.src = svGlobal.customDir() + "/images/grayHelp_circle.png"
        }, function() {
            this.src = svGlobal.customDir() + "/images/help_circle.png"
        }).click(function(c) {
            a("#" + b.helpDialogID).dialog({
                modal: !0,
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                buttons: {
                    Ok: function() {
                        a(this).dialog("close")
                    }
                },
                width: 800
            })
        }));
        return this
    };
    b.selection.prototype.moveToFront =
        function() {
            return this.each(function() {
                this.parentNode.appendChild(this)
            })
                };
    b.selection.prototype.moveToBack = function() {
        return this.each(function() {
            var a = this.parentNode.firstChild;
            a && this.parentNode.insertBefore(this, a)
        })
            };
    return n
}(jQuery, d3);
