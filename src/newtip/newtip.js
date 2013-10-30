/**
 * @file 检索端浮层统一
 * @author Wanglei (wanglei23@baidu.com)
 */

define( function(require){

    var baidu = T;

    if(!baidu.dom.getAncestorByClass){
        baidu.dom.getAncestorByClass = function(i,k) {
            return baidu.dom.getAncestorBy(i,function(l) {
                return baidu.dom.hasClass(l,k);
            });
        };
    }

    /**
     * 已经通过
     */
    var yijingtonguo = '\u5df2\u7ecf\u901a\u8fc7';

    /**
     * 百度信誉星级
     */
    var baiduxinyuxingji = '\u767e\u5ea6\u4fe1\u8a89\u661f\u7ea7';

    /**
     * 具有
     */
    var juyou = '\u5177\u6709';

    /**
     * 百度身份认证
     */
    var baidushenfenrenzheng = '\u767e\u5ea6\u8eab\u4efd\u8ba4\u8bc1';

    /**
     * 优惠券链接
     */
    var youhuiquanlianjie = '\u4f18\u60e0\u5238\u94fe\u63a5';

    /**
     * 优惠详情
     */
    var youhuixiangqing = '\u4f18\u60e0\u8be6\u60c5';

    /**
     * 咨询电话
     */
    var zixundianhua = '\u54a8\u8be2\u7535\u8bdd';

    var TPL = {
        // a标签 链接模板
        a: ''
            + '<span#{billing}>'
            +     '<a target="_blank"  href="#{url}" onmousedown="return c({'
            +         '\'title\':this.innerHTML,'
            +         '\'url\':this.href'
            +         ',#{options}'
            +         '});">'
            +         '#{text}'
            +     '</a>'
            + '</span>',

        // 浮层列表模板
        list : ''
            + '<div class="c-tip-info">'
            +     '<ul>'
            +         '#{medical}#{airline}#{dfa}#{identity}#{personal}'
            +     '</ul>'
            + '</div>',

        // 医疗模板
        medical : ''
            + '<li class="c-tip-item-i">'
            +     '<i class="c-icon c-icon-right '
            +                'c-gap-icon-right-small c-tip-item-icon"></i>'
            +     '<span>#{text}</span>'
            + '</li>',

        // 企业v模板
        identity : ''
            + '<li class="c-tip-item-i">'
            +     '<i class="c-icon c-icon-v-noborder '
            +                 'c-gap-icon-right-small c-tip-item-icon"></i>'
            + yijingtonguo
            +     '#{text}#{a}'
            +'</li>'
            + '#{starlevel}',

        // 企业v传入自定义图片
        identityiImg : ''
            + '<li class="c-tip-item-i">'
            +     '<img class="c-customicon c-gap-icon-right-small '
            +                 'c-tip-item-icon" src="#{img}">'
            + yijingtonguo
            +     '#{text}#{a}'
            +'</li>'
            + '#{starlevel}',

        // 个人v模板
        personal : ''
            + '<li class="c-tip-item-i">'
            +     '<i class="c-icon c-icon-person-noborder '
            +                 'c-gap-icon-right-small c-tip-item-icon"></i>'
            + yijingtonguo
            +     '#{text}#{a}'
            +'</li>'
            + '#{starlevel}',

        // 个人v传入自定义图片
        personalImg : ''
            + '<li class="c-tip-item-i">'
            +     '<img height=16 width=16 class="c-customicon '
            +         'c-gap-icon-right-small c-tip-item-icon" src="#{img}">'
            + yijingtonguo
            +     '#{text}#{a}'
            +'</li>'
            + '#{starlevel}',

        // 航协模板
        airline : ''
            + '<li class="c-tip-item-i">'
            +     '<img height=16 width=16 class="c-customicon '
            +         'c-gap-icon-right-small c-tip-item-icon" src="#{img}">'
            + juyou
            + '#{a}的#{text}</li>',

        // 药监局模板
        dfa : ''
            + '<li class="c-tip-item-i">'
            +     '<img height=16 width=16 class="c-customicon '
            +         'c-gap-icon-right-small c-tip-item-icon" src="#{img}">'
            +     '#{text}'
            + '</li>',

        // 百度信誉星级模板
        starlevel : ''
            + '<li class="c-tip-item-i">'
            +     baiduxinyuxingji
            +     '<i class="c-icon c-icon-star-gray">'
            +         '<i style="width: #{credit}%;" '
            +               'class="c-icon c-icon-star"></i>'
            +     '</i>'
            + '</li>',

        // 惠模板
        coupon : ''
            + '<div class="c-tip-info EC_PP">'
            +     '<a target="_blank" href="#{url}" class="coupon-ck" onmousedown="return c({'
            +         '\'title\':this.innerHTML,'
            +         '\'url\':this.href,'
            +         '\'fm\':\'#{fm}\','
            +         '\'rsv_ct\':\'#{rsv_ct}\','
            +         '\'p1\':#{p1},'
            +         '\'p2\':#{p2}'
            +         '});">'
            +         '#{text}'
            +     '</a>'
            + '</div>',

        // 电话模板
        phone : ''
            + '<div class="c-tip-info">'
            +     '#{text}'
            + '</div>',

        // 承诺模板
        commitmentList : ''
            + '<div class="c-tip-info">'
            +     '<ul>'
            +         '#{commitmentContent}'
            +     '</ul>'
            + '</div>',

        commitmentItem : ''
            +  '<li class="c-tip-item-i">'
            +      '<span>'
            +          '<i class="c-icon c-icon-circle-blue-s ec-vertical-baseline '
            +                   'c-gap-icon-right-small c-tip-item-icon"></i>'
            +          '<a href=#{url} target="_blank" onmousedown="return c({'
            +               '\'title\': this.innerHTML,'
            +               '\'url\': this.href,'
            +               '\'fm\': \'#{fm}\','
            +               '\'p1\': \'#{p1}\''
            +               '});">'
            +             '#{text}'
            +          '</a>'
            +      '</span>'
            +  '</li>'
    };

    var conf = {
        offset: {
            identity: {
                x: 0,
                y: 30
            },
            commitment: {
                x: 0,
                y: 30
            },
            coupon: {
                x: 0,
                y: 30
            },
            tel: {
                x: 0,
                y: 30
            }
        }
    };

    var sendLogUrl = '';

    // 发日志方法，摘自zxui
    var send = (function () {
        var list = [];
        var encode = function (value) {
            return encodeURIComponent(value);
        };

        return function (data) {
            var index = list.push(new Image()) - 1;

            list[index].onload = list[index].onerror = function () {
                list[index] = list[index].onload = list[index].onerror = null;
                delete list[index];
            };

            var url = sendLogUrl + '?' + baidu.url.jsonToQuery(data, encode);
            list[index].src = url;
        };
    })();

    function getParentElem(elem) {
        return elem.parentElement || elem.parentNode || null;
    }

    // 根据数据，渲染模板
    function format(type, obj) {
        obj = obj || {};
        return baidu.format(TPL[type], obj);
    }

    /**
     * 格式化链接数据
     *
     * @param {[type]} obj 链接数据
     * @param {[type]} text 链接文本
     * @return {[type]} 返回拼装好的html
     */
    function dataFormatForA(obj, text) {
        // 格式后数据
        var formatObj = {};
        // 返回的html
        var html = '';

        if(obj) {
            // 链接中自定义的属性数据
            var optionArray = [];
            for(var key in obj) {
                // 过滤billing、url、text为key的数据
                if('billing' === key || 'url' === key || 'text' === key) {
                    continue;
                }
                optionArray.push(
                    ''
                    + '\''
                    + key
                    + '\''
                    + ':'
                    + '\''
                    + obj[key]
                    + '\''
                );

            }
            formatObj = {
                // 若需要计费，则给外层span增加class为EC_PP
                billing: obj.billing && ' class="EC_PP"',
                // 链接的url
                url: obj.url,
                // 链接的文本
                text: obj.text || text,
                // 链接中自定义的属性数据
                options: optionArray.join(',')
            };
            html = format('a', formatObj);
        }
        return html;
    }

    /**
     * 格式化新样式数据
     *
     * @param {[type]} type 新样式类型
     * @param {[type]} obj 新样式数据
     * @return {[type]} 返回拼装好的html
     */
    function dataForamtForRow(type, obj) {
        var html = '';
        if(obj) {
            // 格式化链接数据
            var aHtml = dataFormatForA(obj.a, baidushenfenrenzheng);
            // 格式化信誉等级数据
            var starlevel = format('starlevel', {
                credit: parseInt(obj.credit, 10) * 20
            });
            html = format(type, {
                text: obj.text,
                a: aHtml,
                starlevel: starlevel,
                img: obj.img
            });
        }
        // 返回拼装好的html
        return html;
    }

    /**
     * 获取元素指定属性的值，并返回json格式
     *
     * @param {[type]} ele dom元素
     * @param {[type]} type dom元素的指定属性
     * @return {[type]} 指定属性值的json对象
     */
    function getDataFromAttr(ele, type) {
        // 获取元素指定属性的值
        var attr = ele.getAttribute(type);
        // 返回json对象
        return attr && baidu.json.parse(attr);
    }

    /**
     * v身份新样式html
     *
     * @param {[type]} json v身份数据
     * @return {[type]} 返回拼装好的标题html
     */
    function authBodyHtml(json) {

        // 医疗 html
        var medical = dataForamtForRow('medical' ,json.medical);
        // 企业加v html
        var identity = dataForamtForRow('identity',json.identity);
        // 个人加v html
        var personal = dataForamtForRow('personal',json.personal);
        // 航协 html
        var airline = dataForamtForRow('airline', json.airline);
        // 药监局 html
        var dfa = dataForamtForRow('dfa',json.dfa);

        // 所有新样式，有则显示，没有不显示
        var list = format(
            'list',
            {
                medical: medical,
                identity:identity,
                airline: airline,
                dfa: dfa,
                personal: personal
            }
        );

        var contentHTML = '' + list;

        return contentHTML;
    }

    /**
     * 承诺浮层html
     * @param  {Object} json v身份数据
     * @return {string}      返回拼装好的标题html
     */
    function commitmentBodyHtml(json) {
        var itemHtml = '';
        for (var key in json) {
            if (json.hasOwnProperty(key)) {
                itemHtml += format('commitmentItem', {
                    text: json[key].text,
                    url: json[key].url,
                    fm: json[key].fm,
                    p1: json[key].p1
                });
            }
        }

        var html = format(
            'commitmentList',
            {
                commitmentContent : itemHtml
            }
        );
        return html;
    }

    /**
     * 显示浮层时，发送日志
     *
     * @param {[type]} logType 日志类型：
     * v身份： identity
     */
    function sendLog(logType) {

        // 从浮层配置中读取发送日志地址以及发送参数
        var statistics = conf.statistics;

        if(statistics && statistics[logType] && statistics[logType]['url']) {

            // 若是大搜索页面，需添加 searchId ，如下qid即为 searchId
            var bds = window.bds || {};
            var qid = '';
            if (bds && bds.comm && bds.comm.qid) {
                qid = bds.comm.qid;
            }
            /**
             * 日志约定必选参数有，searchId，当前页面的url，时间戳
             * @type {Object}
             */
            var query = {
                qid: qid,
                url: window.document.location.href,
                timestamp: +new Date()
            };

            // 获取发送日志地址
            sendLogUrl = statistics[logType]['url'];

            // 合并对应日志类型的下可选参数
            baidu.object.extend(query, statistics[logType]['query'] || {});

            // 发送日志
            send(query);
        }
    }

    var checkTipComponentTimer;

    function checkTipComponent(opts) {
        if (!bds || !bds.se || !bds.se.tip) {
            checkTipComponentTimer = setTimeout(function() {
                checkTipComponent();
            }, 10);
        }
        else {
            checkTipComponentTimer && clearTimeout(checkTipComponentTimer);
            renderIdentityTip(opts);
            // renderCouponTip(opts);
            renderTelTip(opts);
            renderCommitmentTip(opts);
        }
    }

    function renderIdentityTip(opts) {
        // 自然结果和商业结果认证icon节点集合
        var identityDomList =
                    baidu.q('c-icon-v').concat(baidu.q('c-icon-person'));

        for (var i = 0, len = identityDomList.length; i < len; i++) {
            // 筛选商业结果
            if (
                baidu.dom.getAncestorByClass(identityDomList[i], 'EC_ppim_top')
                ||
                baidu.dom.getAncestorByClass(identityDomList[i], 'EC_im')
                ||
                baidu.dom.getAncestorByClass(identityDomList[i], 'ec_pp_top')
            ) {
                var offset = conf.offset.identity || {
                    x: 0,
                    y: 30
                };

                var arrow = {
                    has :  1,
                    offset : 10
                };

                if (identityDomList[i].getAttribute('data-tip-limite')) {
                    var rightContainerOffset = parseInt(
                        baidu.dom.getPosition(baidu.dom.g('ec_im_container')).left,
                        10
                    );
                    var domOffset = parseInt(
                        baidu.dom.getPosition(identityDomList[i]).left,
                        10
                    );
                    var sub = Math.abs(rightContainerOffset - domOffset);
                    offset = {
                        x: sub,
                        y: 30
                    };
                    arrow = {
                        has :  1,
                        offset : sub
                    };
                }

                var identityData = getDataFromAttr(
                    identityDomList[i],
                    'data-renzheng'
                );
                var content = authBodyHtml(identityData);
                var tip = new bds.se.tip({
                    target: identityDomList[i],
                    title: identityData.title,
                    content: content,
                    offset: offset,
                    arrow: arrow
                });
                tip.onShow = function(){
                    sendLog('identity');
                };
            }
        }
    }

    function renderCouponTip(opts) {
        var couponDomList = baidu.q('c-icon-hui');
        for (var i = 0, len = couponDomList.length; i < len; i++) {
            var parentDom = getParentElem(couponDomList[i]);
            if (
                parentDom
                &&
                parentDom.className.search(/\bEC_PP\b/) != -1
            ) {
                var couponData = getDataFromAttr(
                    couponDomList[i],
                    'data-coupon'
                );
                var content = format('coupon', couponData);
                var tip = new bds.se.tip({
                    target: couponDomList[i],
                    title: youhuixiangqing + ':',
                    content: content,
                    offset: conf.offset.coupon || {
                        x: 0,
                        y: 30
                    }
                });
                // var ckData = couponDomList[i].getAttribute('ck-data');
                // var ckDom = baidu.dom.q('coupon-ck', tip.content)[0];
                // if (ckDom) {
                //     (function () {
                //         var b = 0,
                //             c, a, q, p, o, l, k, d, r, g, j, u;
                //         a = q = p = o = l = k = d = r = g = j = u = 0;

                //         function s(w) {
                //             var i = window.event || w;
                //             u = i.target || i.srcElement;
                //             while (u && u.tagName != "A") {
                //                 u = u.parentNode
                //             }
                //             r = new Date().getTime();
                //             a = 9999;
                //             q = i.clientX;
                //             p = i.clientY;
                //             if (!g) {
                //                 k = 0
                //             } else {
                //                 k = r - g
                //             } if (v()) {
                //                 n()
                //             }
                //         }
                //         function e() {
                //             j = new Date().getTime();
                //             a = j - r;
                //             if (v()) {
                //                 n()
                //             }
                //         }
                //         function h(w) {
                //             var i = window.event || w;
                //             b += 1;
                //             if (!o) {
                //                 o = i.clientX
                //             }
                //             if (!l) {
                //                 l = i.clientY
                //             }
                //             g = new Date().getTime()
                //         }
                //         function v() {
                //             c = 0;
                //             if (d = /link\?url\=([^\&]+)/.exec(u.href)) {
                //                 for (var x = 0; x < (((b * ckData) % 99) + 9); ++x) {
                //                     var w = d[1].length < 20 ? d[1].length : 20;
                //                     c += d[1].charCodeAt((a * x) % w)
                //                 }
                //                 return true
                //             } else {
                //                 if (d = /\?url\=([^\.]+)\./.exec(u.href)) {
                //                     for (var x = 0; x < (((b * ckData) % 99) + 9); ++x) {
                //                         c += d[1].charCodeAt((a * x) % d[1].length)
                //                     }
                //                     return true
                //                 }
                //             }
                //             return false
                //         }
                //         function n() {
                //             var w = "&ck=" + [c, b, a, q, p, o, l, k].join(".");
                //             if (u.href) {
                //                 var i = u.href;
                //                 if (i.indexOf("&ck=") == -1) {
                //                     u.href += w
                //                 } else {
                //                     u.href = i.replace(/&ck=[\w.]*/, w)
                //                 }
                //             }
                //         }
                //         function m(z, y, x) {
                //             for (var w in y) {
                //                 if (window.attachEvent) {
                //                     z.attachEvent("on" + y[w], x[w])
                //                 } else {
                //                     z.addEventListener(y[w], x[w], false)
                //                 }
                //             }
                //         }
                //         m(ckDom, ["mouseover", "mousedown", "mouseup"], [
                //             function (i) {
                //                 h(i)
                //             },
                //             function (i) {
                //                 s(i)
                //             },
                //             function () {
                //                 e()
                //             }
                //         ])
                //     })();
                // }
            }
        }
    }

    function renderTelTip(opts) {
        var phoneDomList = baidu.q('c-icon-phone');
        for (var i = 0, len = phoneDomList.length; i < len; i++) {
            var parentDom = getParentElem(phoneDomList[i]);
            if (
                parentDom
                &&
                parentDom.className.search(/\bEC_PP\b/) != -1
            ) {
                var phoneData = getDataFromAttr(
                    phoneDomList[i],
                    'data-phone'
                );

                var content = format('phone', phoneData);
                var tip = new bds.se.tip({
                    target: phoneDomList[i],
                    title: zixundianhua + ':',
                    content: content,
                    offset: conf.offset.tel || {
                        x: 0,
                        y: 30
                    }
                });
            }
        }
    }

    function renderCommitmentTip(opts) {
        var commitmentDomList = baidu.q('c-icon-nuo');
        for (var i = 0, len = commitmentDomList.length; i < len; i++) {
            var parentDom = getParentElem(commitmentDomList[i]);
            if (
                parentDom
                &&
                parentDom.className.search(/\bEC_PP\b/) != -1
            ) {
                var commitmentData = getDataFromAttr(
                    commitmentDomList[i],
                    'data-commitment'
                );
                var content = commitmentBodyHtml(commitmentData);
                var tip = new bds.se.tip({
                    target: commitmentDomList[i],
                    content: content,
                    offset: conf.offset.commitment || {
                        x: 0,
                        y: 30
                    }
                });
            }
        }
    }

    function init(opts) {
        baidu.dom.ready(function() {
            baidu.object.extend(conf, opts || {});
            checkTipComponent(conf);
        });
    }

    return {
        init: init
    };
});
