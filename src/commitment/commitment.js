/**
 * @file v卡承诺浮层
 * @author Wanglei(wanglei23@baidu.com)
 */

define( function(require){


    // 模板TPL
    var TPL = {
        commitmentList : ''
            + '<ul class="icon-commitment-wraper">'
            +     '#{item1}'
            +     '#{item2}'
            +     '#{item3}'
            +     '#{item4}'
            +     '#{item5}'
            + '</ul>',

        item1 : ''
            + '<li class="icon-item1">'
            +     '<span>'
            +         '<a href=#{url} target="_blank">'
            +             '#{text}'
            +         '</a>'
            +     '</span>'
            +'</li>',

        item2 : ''
            + '<li class="icon-item2">'
            +     '<span>'
            +         '<a href=#{url} target="_blank">'
            +             '#{text}'
            +         '</a>'
            +     '</span>'
            +'</li>',

        item3 : ''
            + '<li class="icon-item3">'
            +     '<span>'
            +         '<a href=#{url} target="_blank">'
            +             '#{text}'
            +         '</a>'
            +     '</span>'
            +'</li>',

        item4 : ''
            + '<li class="icon-item4">'
            +     '<span>'
            +         '<a href=#{url} target="_blank">'
            +             '#{text}'
            +         '</a>'
            +     '</span>'
            +'</li>',

        item5 : ''
            + '<li class="icon-item5">'
            +     '<span>'
            +         '<a href=#{url} target="_blank">'
            +             '#{text}'
            +         '</a>'
            +     '</span>'
            +'</li>'
    };

    // 浮层默认配置数据
    var conf = {
        // 自动绑定本控件功能的class
        triggers: 'ec-ui-tip',
        // 当浮层是居中显示时，左侧若要限制位置(im情况下)，则传入domId
        leftLimiteDomId: 'ec_im_container',
        // bl 浮层水平偏移
        layerOffsetLeft: 5,
        // bl和bc,浮层垂直偏移
        layerOffsetTop: 5,
        // 浮层消失延迟
        hideDelay: 500
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

    /**
     * 当显示浮层是bc时，修正浮层以及箭头的位置，使浮层左侧边缘与外层容器一致
     *
     * @param {[type]} arrow 小箭头dom元素
     * @param {[type]} layer 浮层dom元素
     */
    function resetPositionBc(arrow, layer) {
        // 浮层left
        var mainLeft = parseInt(layer.main.style.left, 10);
        // 箭头left
        var arrowLeft = parseInt(layer.elements.arrow.style.left, 10);
        // 当浮层是居中显示时，左侧若要限制位置(im情况下)，则传入domId
        var leftLimiteDom = baidu.g(conf.leftLimiteDomId);
        // 计算dom节点的left，若left不存在，则等于浮层的left
        var limiteLeft = leftLimiteDom ?
            parseInt(baidu.dom.getPosition(leftLimiteDom).left, 10) : mainLeft;

        // 修正浮层left
        layer.main.style.left = limiteLeft + 'px';
        // 修正小箭头left
        layer.elements.arrow.style.left = mainLeft +
            arrowLeft - limiteLeft + 'px';
    }

    /**
     * 当显示浮层是bl时，修正浮层以及箭头的位置，调整水平偏移
     *
     * @param {[type]} arrow 小箭头dom元素
     * @param {[type]} layer 浮层dom元素
     */
    function resetPositionBl(arrow, layer) {
        // 浮层left
        var mainLeft = parseInt(layer.main.style.left, 10);
        // 浮层整体水平偏移
        var layerOffsetLeft = conf.layerOffsetLeft || 0;

        // 小箭头水平偏移
        var arrowOffsetLeft = conf.arrowOffsetLeft || 0;

        // 修正浮层left
        layer.main.style.left = mainLeft - layerOffsetLeft + 'px';
        // 修正小箭头left
        layer.elements.arrow.style.left =
            layerOffsetLeft + arrowOffsetLeft + 'px';
    }

    /**
     * 当显示浮层是br时，修正浮层以及箭头的位置，调整水平偏移
     *
     * @param {[type]} arrow 小箭头dom元素
     * @param {[type]} layer 浮层dom元素
     */
    function resetPositionBr(arrow, layer) {
        // 浮层left
        var mainLeft = parseInt(layer.main.style.left, 10);
        // 浮层整体水平偏移
        var layerOffsetLeft = conf.layerOffsetLeft || 0;
        // 箭头left
        var arrowLeft = parseInt(layer.elements.arrow.style.left, 10);

        // 小箭头水平偏移
        var arrowOffsetLeft = conf.arrowOffsetLeft || 0;

        // 修正浮层left
        layer.main.style.left = mainLeft + layerOffsetLeft + 'px';
        // 修正小箭头left
        layer.elements.arrow.style.left =
            arrowLeft - layerOffsetLeft + arrowOffsetLeft  + 'px';

    }

    /**
     * 显示浮层时，发送日志
     *
     * @param {[type]} logType 日志类型：
     * v身份： identity
     * 电话： telephone
     * 优惠券： coupon
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

    /**
     * 显示浮层，修正小箭头和浮层位置以及发送日志
     *
     * @param {[type]} arrow 小箭头dom元素
     * @param {[type]} layer 浮层dom元素
     */
    function onShow(arrow, layer) {

        // 浮层出现位置，默认左对齐
        var dir = 'bl';

        // 获取dom中 data-tooltips 属性
        var dataTools = arrow.target.getAttribute('data-tooltips');

        // 判断 data-tooltips 属性 是否正确
        if(dataTools) {
            dir = /[trblc]{2}/.test(dataTools) ? dataTools : '1';
        }

        // 当显示浮层是bc时，修正浮层以及箭头的位置
        if('bc' === dir) {
            resetPositionBc(arrow, layer);
        }

        // 当显示浮层是bl时，修正浮层以及箭头的位置
        if('bl' === dir) {
            resetPositionBl(arrow, layer);
        }

        // 当显示浮层是br时，修正浮层以及箭头的位置
        if('br' === dir) {
            resetPositionBr(arrow, layer);
        }

        // 下拉菜单浮层，发送日志
        if( baidu.dom.hasClass(arrow.target, 'icon-commitment')) {
            sendLog('commitment');
        }
    }

    /**
     * 显示浮层前，拼装html
     *
     * @param {[type]} arrow 小箭头dom元素
     * @param {[type]} layer 浮层dom元素
     */
    function onBeforeShow(arrow, layer) {

        // 标题html
        var title = '';
        // 内容html
        var content = '';

        var arrowDom = arrow.target;
        // 给浮层添加class ecl-ui-tip-ps 重定义样式
        baidu.dom.addClass(layer.main, 'ecl-ui-tip-ps');

        // 左侧浮层不限制宽度，去掉ecl-ui-tip-ps-limite-width类
        // 右侧浮层限制宽度，添加ecl-ui-tip-ps-limite-width类
        baidu.dom[
            'true' === arrow.target.getAttribute('data-tip-limite')
                ? 'addClass' : 'removeClass'
        ](layer.main, 'ecl-ui-tip-ps-limite-width');

        // 从dom属性中获取承诺浮层的数据
        var commitmentJson = getDataFromAttr(arrowDom, 'data-commitment');

        // 构造下拉承诺浮层html by wanglei23
        if(commitmentJson) {
            content = commitmentBodyHtml(commitmentJson);
        }

        layer.title = title;
        layer.content = content;
    }

    /**
     * 承诺浮层html
     * @param  {Object} json v身份数据
     * @return {string}      返回拼装好的标题html
     */
    function commitmentBodyHtml(json) {
        var item1Html =
            json.item1
            ?
            format('item1', {
                text: json.item1.text,
                url: json.item1.url
            })
            :
            '';

        var item2Html =
            json.item2
            ?
            format('item2', {
                text: json.item2.text,
                url: json.item2.url
            })
            :
            '';

        var item3Html =
            json.item3
            ?
            format('item3', {
                text: json.item3.text,
                url: json.item3.url
            })
            :
            '';

        var item4Html =
            json.item4
            ?
            format('item4', {
                text: json.item4.text,
                url: json.item4.url
            })
            :
            '';

        var item5Html =
            json.item5
            ?
            format('item5', {
                text: json.item5.text,
                url: json.item5.url
            })
            :
            '';
        var html = format(
            'commitmentList',
            {
                item1 : item1Html,
                item2 : item2Html,
                item3 : item3Html,
                item4 : item4Html,
                item5 : item5Html
            }
        );
        return html;
    }

    // 根据数据，渲染模板
    function format(type, obj) {
        obj = obj || {};
        return baidu.format(TPL[type], obj);
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
     * 载入指定url的css文件
     *
     * @param {[type]} url css文件地址
     */
    function loadCss(url) {
        var link = document.createElement( 'link' );
        link.setAttribute( 'rel', 'stylesheet' );
        link.setAttribute( 'type', 'text/css' );
        link.setAttribute( 'href', url );

        var parent = document.getElementsByTagName( 'head' )[ 0 ] ||
            document.body;
        parent.appendChild( link );

        parent = null;
        link = null;
    }

    // 仅执行一次
    var tipControl;

    function init(opts) {

            baidu.dom.ready(function() {

                // 增加判断，避免同一页面引入多个浮层
                if(!tipControl) {

                // 本地调试，引入css文件
                // var url = 'src/commitment/commitment.css';

                // 测试机调试，引入css文件
                var url = 'http://1.wlstatic.newoffline.bae.baidu.com/lib/ecom/common/api/commitment0902/commitment.css';
                // var url = 'http://0.cgzero.newoffline.bae.baidu.com/lib/ecom/common/api/commitment0902/commitment.css';

                // 线上，引入css文件
                // var url = 'http://s1.bdstatic.com/r/www/cache/biz/ecom/common/api/commitment0902/commitment.css';



                loadCss(url);

                // 合并用户配置与默认配置
                baidu.object.extend(conf, opts || {});

                // 本地调试，引入pstiplib组件
                // var Tip = require('../pstiplib/pstiplib');

                // 线上，压成一份，引入tip组件，还需修改module.conf
                var Tip = require('./tip'); // 打包的时候 control、tip和dropdownmenu都打到一起

                // 线上，抽出公共部分，引入pstiplib组件
                // var Tip = require('ecom/common/api/pstiplib0902/pstiplib');

                    tipControl = new Tip({
                        // 浮层的显示模式，鼠标滑过显示
                        mode: 'over',
                        // 自动绑定本控件功能的class
                        triggers: conf.triggers,
                        // 默认显示箭头左对齐
                        arrow: 'bl',
                        // 浮层消失的延迟时间
                        hideDelay: conf.hideDelay,
                        // x 轴和 y 轴方向偏移量
                        offset: {
                            x: conf.layerOffsetLeft,
                            y: conf.layerOffsetTop
                        },

                        onShow: function(obj) {
                            onShow(obj, this);
                        },

                        onBeforeShow: function (obj) {
                            onBeforeShow(obj, this);
                        }
                    }).render();
                }

            });

    }
    // return模块
    return {init: init};
});
