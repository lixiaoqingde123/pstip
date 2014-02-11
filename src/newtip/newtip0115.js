/**
 * @file 大搜索 商业广告 tip
 * @author Wanglei [wanglei23@baidu.com]
 */

define( function(require) {

    // 已经通过
    var yijingtonguo = '\u5df2\u7ecf\u901a\u8fc7';

    // 百度信誉星级
    var baiduxinyuxingji = '\u767e\u5ea6\u4fe1\u8a89\u661f\u7ea7';

    // 具有
    var juyou = '\u5177\u6709';

    // 百度身份认证
    var baidushenfenrenzheng = '\u767e\u5ea6\u8eab\u4efd\u8ba4\u8bc1';

    // 优惠详情
    var youhuixiangqing = '\u4f18\u60e0\u8be6\u60c5';

    // 咨询电话
    var zixundianhua = '\u54a8\u8be2\u7535\u8bdd';

    /**
     * 信誉成长值:
     */
    var xinyuchengzhangzhi = '\u4fe1\u8a89\u6210\u957f\u503c\u003a\u0020';

    /**
     * 查看V信誉档案
     */
    var chakanvxinyudangan = '\u67e5\u770b\u0056\u4fe1\u8a89\u6863\u6848';

    var PROCESS_MAX = 100;

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

        // 查看v信誉档案
        // checkArchive: ''
        //     + '<span#{billing}>'
        //     +     '<a target="_blank"  href="#{url}" onmousedown="return c({'
        //     +         '\'title\':this.innerHTML,'
        //     +         '\'url\':this.href'
        //     +         ',#{options}'
        //     +         '});">'
        //     +         '#{text}'
        //     +     '</a>'
        //     + '</span>',

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

        // 企业v模板 进度条
        identityProcess : ''
            + '<li class="c-tip-item-i">'
            // +     '<i class="c-customicon c-icon-v#{processLevel}-noborder '
            // +                 'c-gap-icon-right-small c-tip-item-icon"></i>'
            + '<img src="http://tag.baidu.com/views/v#{processLevel}.png" '
            + ' class="c-customicon c-gap-icon-right-small c-tip-item-icon">'
            + yijingtonguo
            +     '#{text}#{a}'
            + '</li>'
            + '#{process}',
            // + '<li class="c-tip-item-i">'
            // +     '#{checkArchive}'
            // + '</li>',

        // 企业v传入自定义图片
        identityImg : ''
            + '<li class="c-tip-item-i">'
            +     '<img class="c-customicon c-gap-icon-right-small '
            +                 'c-tip-item-icon" src="#{img}">'
            + yijingtonguo
            +     '#{text}#{a}'
            +'</li>'
            + '#{starlevel}',

        // 企业v传入自定义图片 进度条
        identityProcessImg : ''
            + '<li class="c-tip-item-i">'
            +     '<img class="c-customicon c-gap-icon-right-small '
            +                 'c-tip-item-icon" src="#{img}">'
            + yijingtonguo
            +     '#{text}#{a}'
            +'</li>'
            + '#{process}',
            // + '<li class="c-tip-item-i">'
            // +     '#{checkArchive}'
            // + '</li>',

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

        // 信誉度新模板
        process : ''
            + '<li class="c-tip-item-i">'
            +     xinyuchengzhangzhi
            +     '<i class="EC_process">'
            +     '</i>'
            + '</li>',

        // 惠模板
        coupon : ''
            + '<div class="c-tip-info EC_PP">'
            +     '<a target="_blank" href="#{url}" class="coupon-ck" '
            +       'onmousedown="return c({'
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
        tel : ''
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
            +          '<i class="c-icon c-icon-circle-blue-s '
            +               'ec-vertical-baseline c-gap-icon-right-small '
            +                   'c-tip-item-icon"></i>'
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
                x: 10,
                y: 25
            },
            commitment: {
                x: 10,
                y: 25
            },
            coupon: {
                x: 10,
                y: 25
            },
            tel: {
                x: 10,
                y: 25
            }
        }
    };

    /**
     * 对字符串进行%#&+=以及和\s匹配的所有字符进行url转义
     * from tangram
     *
     * @param  {String} source 需要转义的字符串
     */
    function escapeSymbol (source) {
        return String(source).replace(
            /[#%&+=\/\\\ \　\f\r\n\t]/g,
            function(all) {
                return ''
                    + '%'
                    + (0x100 + all.charCodeAt())
                            .toString(16)
                            .substring(1)
                            .toUpperCase();
            }
        );
    }

    /**
     * 将json对象解析成query字符串
     * from tangram
     *
     * @param  {Object} json        需要解析的json对象
     * @param  {?Function} replacerOpt 对值进行特殊处理的函数，
     *                                     function (value, key)
     */
    function jsonToQuery (json, replacerOpt) {
        var result = [];
        var itemLen;
        var replacer = replacerOpt || function (value) {
            return escapeSymbol(value);
        };

        $.each(json, function(key, item){
            // 这里只考虑item为数组、字符串、数字类型，不考虑嵌套的object
            if ($.isArray(item)) {
                itemLen = item.length;
                // value的值需要encodeURIComponent转义吗？
                // FIXED 优化了escapeSymbol函数
                while (itemLen--) {
                    result.push(key + '=' + replacer(item[itemLen], key));
                }
            } else {
                result.push(key + '=' + replacer(item, key));
            }
        });

        return result.join('&');
    }

    /**
     * 对目标字符串进行格式化
     * from tangram
     *
     * @param  {String} source 目标字符串
     * @param  {Object|String} opts   提供相应数据的对象或多个字符串
     */
    function bFormat (source, opts) {
        source = String(source);
        var data = Array.prototype.slice.call(arguments,1);
        var toString = Object.prototype.toString;
        if(data.length){
            data =
                data.length == 1
                    ?
            // ie 下 Object.prototype.toString.call(null) == '[object Object]'
                    (
                        opts !== null
                            && (/\[object Array\]|\[object Object\]/
                                    .test(toString.call(opts)))
                        ?
                        opts
                        :
                        data
                    )
                    :
                    data;
            return source.replace(
                /#\{(.+?)\}/g,
                function (match, key) {
                    var replacer = data[key];
                    // chrome 下 typeof /a/ == 'function'
                    if ('[object Function]' == toString.call(replacer)) {
                        replacer = replacer(key);
                    }
                    return ('undefined' == typeof replacer ? '' : replacer);
                }
            );
        }
        return source;
    }

    /**
     * 类ES5 Function.bind 的实现
     *
     * @param  {Function} fn      要执行的函数
     * @param  {Object}   context 上下文对象(this)
     */
    function bind (fn, context) {
        if (arguments.length < 2 && context === undefined) {
            return fn;
        }

        var _method = fn;
        var _slice = Array.prototype.slice;
        var args = _slice.call(arguments, 2);

        return function () {
            var array = _slice.call(arguments, 0);
            _method.apply(context, args.concat(array));
        };
    }

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

            var url = sendLogUrl + '?' + jsonToQuery(data, encode);
            list[index].src = url;
        };
    })();

    // 根据数据，渲染模板
    function format (type, obj) {
        obj = obj || {};
        return bFormat(TPL[type], obj);
    }

    /**
     * 格式化链接数据
     *
     * @param {Object} obj 链接数据
     * @param {String} text 链接文本
     * @return {String} 返回拼装好的html
     */
    function dataFormatForA (obj, text) {
        // 格式后数据
        var formatObj = {};
        // 返回的html
        var html = '';

        if (obj) {
            // 链接中自定义的属性数据
            var optionArray = [];
            for (var key in obj) {
                // 过滤billing、url、text为key的数据
                if ('billing' === key || 'url' === key || 'text' === key) {
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

            /*if (text === chakanvxinyudangan) {
                var clsName = '';

                if (obj.billing) {
                    clsName = '"EC_PP EC_check_archive"';
                }
                else {
                    clsName = '"EC_check_archive"';
                }
                formatObj = {
                    // 若需要计费，则给外层span增加class为EC_PP
                    billing: ' class=' + clsName,
                    // 链接的url
                    url: obj.url,
                    // 链接的文本
                    text: obj.text || text,
                    // 链接中自定义的属性数据
                    options: optionArray.join(',')
                };
                html = format('checkArchive', formatObj);
            }
            else {
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
            }*/
        }
        return html;
    }

    /**
     * 格式化新样式数据
     *
     * @param {String} type 新样式类型
     * @param {Object} obj 新样式数据
     * @return {String} 返回拼装好的html
     */
    function dataForamtForRow (type, obj) {
        var html = '';

        if (obj) {
            // 格式化链接数据
            var aHtml = dataFormatForA(obj.a, baidushenfenrenzheng);
            if (obj.process) { // 进度条小流量判断

                // 右下角 查看v信誉档案 链接数据
                // var checkArchiveContent = dataFormatForA(
                //     obj.a,
                //     chakanvxinyudangan
                // );
                var processLevel;
                var level = parseInt(obj.process, 10);
                if (level >= 0 && level <= 40) {
                    processLevel = 1;
                }
                else if (level >= 41 && level <= 90) {
                    processLevel = 2;
                }
                else {
                    processLevel = 3;
                }
                var process = format('process');
                html = format(type, {
                    text: obj.text,
                    a: aHtml,
                    process: process,
                    img: obj.img,
                    processLevel: processLevel
                    // ,checkArchive: checkArchiveContent
                });
            }
            else {
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
        }
        // 返回拼装好的html
        return html;
    }

    /**
     * from baidu.json.parse
     */
    function parseJson (data) {
        return (new Function('return (' + data + ')'))();
    }

    /**
     * 获取元素指定属性的值，并返回json格式
     *
     * @param {jQuery} ele dom元素
     * @param {String} type dom元素的指定属性
     */
    function getDataFromAttr (ele, type) {
        // 获取元素指定属性的值
        var attr = ele.attr(type);
        // 返回json对象
        return attr && parseJson(attr);
    }

    /**
     * v身份新样式html
     *
     * @param {Object} json v身份数据
     * @return {String} 返回拼装好的标题html
     */
    function authBodyHtml (json) {
        // 医疗 html
        var medical = dataForamtForRow('medical', json.medical);

        // 企业加v html
        var identity;
        if (json.identity) {
            if (json.identity.img) {
                if (json.identity.process) {
                    identity = dataForamtForRow(
                        'identityProcessImg',
                        json.identity
                    );
                }
                else {
                    identity = dataForamtForRow(
                        'identityImg',
                        json.identity
                    );
                }
            }
            else {
                if (json.identity.process) {
                    identity = dataForamtForRow(
                        'identityProcess',
                        json.identity
                    );
                }
                else {
                    identity = dataForamtForRow(
                        'identity',
                        json.identity
                    );
                }
            }
        }

        // 个人加v html
        var personal;
        if (json.personal && json.personal.img) {
            personal = dataForamtForRow('personalImg', json.personal);
        }
        else {
            personal = dataForamtForRow('personal', json.personal);
        }

        // 航协 html
        var airline = dataForamtForRow('airline', json.airline);

        // 药监局 html
        var dfa = dataForamtForRow('dfa', json.dfa);

        // 所有新样式，有则显示，没有不显示
        var list = format(
            'list',
            {
                medical: medical,
                identity: identity,
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
     *
     * @param  {Object} json v身份数据
     * @return {string}      返回拼装好的标题html
     */
    function commitmentBodyHtml (json) {
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
                commitmentContent: itemHtml
            }
        );

        return html;
    }

    /**
     * 显示浮层时，发送日志
     *
     * @param {String} logType 日志类型：
     * v身份： identity
     */
    function sendLog (logType) {
        // 从浮层配置中读取发送日志地址以及发送参数
        var statistics = conf.statistics;

        if(statistics && statistics[logType] && statistics[logType]['url']) {
            // 若是大搜索页面，需添加 searchId ，如下qid即为 searchId
            var bds = window.bds || {};
            var qid = '';
            if (bds && bds.comm && bds.comm.qid) {
                qid = bds.comm.qid;
            }

            // 日志约定必选参数有，searchId，当前页面的url，时间戳
            var query = {
                qid: qid,
                url: window.document.location.href,
                timestamp: +new Date()
            };

            // 获取发送日志地址
            sendLogUrl = statistics[logType]['url'];

            // 合并对应日志类型的下可选参数
            $.extend(query, statistics[logType]['query'] || {});

            // 发送日志
            send(query);
        }
    }

    var checkTipComponentTimer;

    /**
     * 检测大搜索页面中bds.se.tip对象
     */
    function checkTipComponent (opts) {
        if (!bds || !bds.se || !bds.se.tip) {
            checkTipComponentTimer = setTimeout(function () {
                checkTipComponent(opts);
            }, 10);
        }
        else {
            checkTipComponentTimer && clearTimeout(checkTipComponentTimer);
            renderTip('identity', opts);
            renderTip('coupon', opts);
            renderTip('tel', opts);
            renderTip('commitment', opts);
        }
    }

    /**
     * tip浮层显示时的回调
     *
     * @param  {String} tipType  浮层类型
     * @param  {String} attrKey  用于获取dom属性的key
     * @param  {?String} tipTitle 浮层里面的标题
     */
    function doShow (tipType, attrKey, tipTitle) {
        if (tipType === 'identity') {
            sendLog(tipType);
        }

        var me = this;
        if (!me.alreadyRender) {
            me.op.offset = conf.offset[tipType];
            var triggerEl = me.getTarget();
            var $triggerEl = $(triggerEl);
            if ($triggerEl.attr('data-tip-limite')) {
                var rightContainerOffset = parseInt(
                    $('#ec_im_container').position().left,
                    10
                );

                var domOffset = parseInt(
                    $triggerEl.position().left,
                    10
                );

                var sub =
                    Math.abs(rightContainerOffset - domOffset);

                me.op.offset = {
                    x: sub,
                    y: 25
                };

                me.op.arrow = {
                    has :  1,
                    offset : sub
                };
            }

            var data = getDataFromAttr($triggerEl, attrKey);

            if (tipType === 'identity') {
                var url = $triggerEl.attr('href');
                if (data.identity) {
                    if (data.identity.a) {
                        if (data.identity.a.url) {
                            data.identity.a.url = url;
                        }
                    }
                }
                if (data.personal) {
                    if (data.personal.a) {
                        if (data.personal.a.url) {
                            data.personal.a.url = url;
                        }
                    }
                }
                var tipContent = authBodyHtml(data);
                me.setTitle(data.title);
                me.setContent(tipContent);
                if (data[tipType] && data[tipType].process) {
                    A.use(
                        'ecomprogress',
                        function () {
                            A.ui.ecomprogress(
                                me.getDom().find('i.EC_process')[0],
                                data[tipType].process,
                                PROCESS_MAX
                            );
                        }
                    );
                }
            }
            else {
                var tipContent;
                if (tipType === 'commitment') {
                    tipContent = commitmentBodyHtml(data);
                }
                else {
                    tipContent = format(tipType, data);
                    me.setTitle(tipTitle);
                }

                me.setContent(tipContent);

                if (tipType === 'coupon') {
                    var aChildren = me.getDom().find('a');
                    var aList = [];
                    for (
                        var j = 0, aLen = aChildren.length;
                        j < aLen;
                        j++
                    ) {
                        if (
                            aChildren[j].tagName.toLowerCase()
                            ===
                            'a'
                        ) {
                            aList.push(aChildren[j]);
                        }
                    }

                    if (aList.length) {
                        E.pl.ck(aList, E.pl.imTimesign);
                    }
                }
            }
            me.alreadyRender = true;
        }
    }

    /**
     * 渲染浮层
     *
     * @param  {String} type 浮层类型
     * @param  {Object} opts 参数
     */
    function renderTip (type, opts) {
        var domList;    // icon节点集合
        var tipTitle;   // tip的title
        var attrKey;    // 节点dom属性的key

        switch (type) {
            case 'identity':
                domList = $('.c-icon-v, .c-icon-high-v, .c-icon-person');
                attrKey = 'data-renzheng';
                break;
            case 'coupon':
                domList = $('.c-icon-hui');
                tipTitle = youhuixiangqing + '：';
                attrKey = 'data-coupon';
                break;
            case 'tel':
                domList = $('.c-icon-phone');
                tipTitle = zixundianhua + '：';
                attrKey = 'data-phone';
                break;
            case 'commitment':
                domList = $('.c-icon-nuo');
                attrKey = 'data-commitment';
                break;
            default:
                break;
        }

        for (var i = 0, len = domList.length; i < len; i++) {
            var $el = $(domList[i]);
            if (type !== 'identity') {
                var $parentDom = $el.parent();
                if (
                    $parentDom.length
                    &&
                    $parentDom.hasClass('EC_PP')
                ) {
                    var tip = new bds.se.tip({
                        target: $el[0]
                    });
                    tip.onShow = bind(doShow, tip, type, attrKey, tipTitle);
                }
            }
            else {
                // 筛选商业结果
                if (
                    $el.parents('.EC_ppim_top').length
                    ||
                    $el.parents('.EC_im').length
                    ||
                    $el.parents('.ec_pp_top').length
                ) {
                    var tip = new bds.se.tip({
                        target: $el[0]
                    });
                    tip.onShow = bind(doShow, tip, type, attrKey);
                }
            }
        }
    }

    /**
     * 初始化
     */
    function init(opts) {
        $(document).ready(function () {
            $.extend(conf, opts || {});
            checkTipComponent(conf);
        });
    }

    return {
        init: init
    };
});
