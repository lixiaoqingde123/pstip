exports.input = __dirname;

var path = require( 'path' );
exports.output = path.resolve( __dirname, 'output' );

var moduleEntries = 'html,htm,phtml,tpl,vm,js';
var pageEntries = 'html,htm,phtml,tpl,vm';


exports.getProcessors = function () {
    function JsUnicodeReplacer( options ) {
        AbstractProcessor.call( this, options );
    }
    
    JsUnicodeReplacer.prototype = new global.AbstractProcessor();
    JsUnicodeReplacer.prototype.name = "JsUnicodeReplacer";
    JsUnicodeReplacer.prototype.process = function ( file, processContext, callback ) {
        if ( file.extname === 'js' ) {
            file.setData( file.data.replace( /[^\x00-\xff]/g, function ( match ) {
                return '\\u' + match.charCodeAt( 0 ).toString( 16 )
            }) );
        }

        callback();
    };
    
    return [ 
        new LessCompiler( {
            entryExtnames: pageEntries
        } ), 
        //new CssCompressor(),
        new CssImporter(),
        new ModuleCompiler( {
            configFile: 'module.conf',
            entryExtnames: moduleEntries
        } ), 
        new JsCompressor(), 
        new PathMapper( {
            replacements: [
                { type: 'html', tag: 'link', attribute: 'href', extnames: pageEntries },
                { type: 'html', tag: 'img', attribute: 'src', extnames: pageEntries },
                { type: 'html', tag: 'script', attribute: 'src', extnames: pageEntries },
                { extnames: moduleEntries, replacer: 'module-config' }
            ],
            from: 'src',
            to: './'
        } ),
        new JsUnicodeReplacer()
    ];
};

exports.exclude = [
    '/tool',
    '/doc',
    '/test',
    '/module.conf',
    '/dep/packages.manifest',
    '/dep/*/*/test',
    '/dep/*/*/doc',
    '/dep/*/*/demo',
    '/dep/*/*/tool',
    '/dep/*/*/*.md',
    '/dep/*/*/package.json',
    '/edp-*',
    '/.edpproj',
    '.svn',
    '.git',
    '.gitignore',
    '.idea',
    '.project',
    'Desktop.ini',
    'Thumbs.db',
    '.DS_Store',
    '*.tmp',
    '*.bak',
    '*.swp',
     /* 用户自定义忽略文件 */
    'README.md',
    'build.sh',
    'src/control.js',
    'src/tip.js',
    'src/tangram-1.3.9.source.js'
];

exports.injectProcessor = function ( processors ) {
    for ( var key in processors ) {
        global[ key ] = processors[ key ];
    }
};

