const fs = require('fs');
const path = require('path');
const aws = require('aws-sdk');

module.exports = class S3UploadPlugin {
  constructor(bucketName, s3path, buildFolder, uploadFiles) {
    this.AWS = aws;
    this.AWS.config.loadFromPath('./environment/aws.config.json');
    this.bucketName = bucketName;
    this.s3 = new this.AWS.S3();
    this.buildPath = path.join(__dirname, `/${buildFolder}`);
    this.s3path = s3path;
    this.rootDirectoryIndex = this.buildPath.split('/').findIndex((item, index) => {
      if (item === buildFolder) return index;
    });
    this.uploadFiles = uploadFiles || [];
  }

  apply(compiler) {
    compiler.hooks.done.tap('Build Completed', () => {
      this.getUploadFiles(this.buildPath);
    });
  }

  filterUploadFiles = (files) => {
    return files.filter((fileName) => (this.uploadFiles.length ? this.uploadFiles.includes(fileName) : true));
  };

  getUploadFiles = (filePathParam) => {
    const files = fs.readdirSync(filePathParam);
    const filteredFiles = this.filterUploadFiles(files);

    filteredFiles.forEach((fileName) => {
      const filePath = path.join(filePathParam, fileName);
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        this.sendAws(filePath);
      } else {
        this.getUploadFiles(filePath);
      }
    });
  };

  sendAws = (filePath) => {
    const s3Params = {
      Bucket: this.bucketName,
      Key: `${this.s3path}/${filePath
        .split('/')
        .slice(this.rootDirectoryIndex + 1)
        .join('/')}`,
      Body: fs.readFileSync(filePath),
      ContentType: this.setMetaData(filePath)
    };

    this.s3.putObject(s3Params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log('Successfully uploaded', data);
      }
    });
  };

  setMetaData = (filePath) => {
    const extension = path.extname(filePath);
    switch (extension) {
      case '.html':
        return 'text/html';
      case '.js':
        return 'application/x-javascript';
      case '.css':
        return 'text/css';
      case '.json':
        return 'application/json';
      case '.png':
        return 'image/png';
      case '.jpg':
        return 'image/jpg';
      case '.ico':
        return 'image/x-icon';
      case '.3gp':
        return 'video/3gpp';
      case '.ai':
        return 'application/postscript';
      case '.aif':
        return 'audio/x-aiff';
      case '.aifc':
        return 'audio/x-aiff';
      case '.aiff':
        return 'audio/x-aiff';
      case '.asc':
        return 'text/plain';
      case '.atom':
        return 'application/atom+xml';
      case '.au':
        return 'audio/basic';
      case '.avi':
        return 'video/x-msvideo';
      case '.bcpio':
        return 'application/x-bcpio';
      case '.bin':
        return 'application/octet-stream';
      case '.bmp':
        return 'image/bmp';
      case '.cdf':
        return 'application/x-netcdf';
      case '.cgm':
        return 'image/cgm';
      case '.class':
        return 'application/octet-stream';
      case '.cpio':
        return 'application/x-cpio';
      case '.cpt':
        return 'application/mac-compactpro';
      case '.csh':
        return 'application/x-csh';
      case '.dcr':
        return 'application/x-director';
      case '.dif':
        return 'video/x-dv';
      case '.dir':
        return 'application/x-director';
      case '.djv':
        return 'image/vnd.djvu';
      case '.djvu':
        return 'image/vnd.djvu';
      case '.dll':
        return 'application/octet-stream';
      case '.dmg':
        return 'application/octet-stream';
      case '.dms':
        return 'application/octet-stream';
      case '.doc':
        return 'application/msword';
      case '.dtd':
        return 'application/xml-dtd';
      case '.dv':
        return 'video/x-dv';
      case '.dvi':
        return 'application/x-dvi';
      case '.dxr':
        return 'application/x-director';
      case '.eps':
        return 'application/postscript';
      case '.etx':
        return 'text/x-setext';
      case '.exe':
        return 'application/octet-stream';
      case '.ez':
        return 'application/andrew-inset';
      case '.flv':
        return 'video/x-flv';
      case '.gif':
        return 'image/gif';
      case '.gram':
        return 'application/srgs';
      case '.grxml':
        return 'application/srgs+xml';
      case '.gtar':
        return 'application/x-gtar';
      case '.gz':
        return 'application/x-gzip';
      case '.hdf':
        return 'application/x-hdf';
      case '.hqx':
        return 'application/mac-binhex40';
      case '.htm':
        return 'text/html';
      case '.ice':
        return 'x-conference/x-cooltalk';
      case '.ics':
        return 'text/calendar';
      case '.ief':
        return 'image/ief';
      case '.ifb':
        return 'text/calendar';
      case '.iges':
        return 'model/iges';
      case '.igs':
        return 'model/iges';
      case '.jnlp':
        return 'application/x-java-jnlp-file';
      case '.jp2':
        return 'image/jp2';
      case '.jpe':
        return 'image/jpeg';
      case '.jpeg':
        return 'image/jpeg';
      case '.kar':
        return 'audio/midi';
      case '.latex':
        return 'application/x-latex';
      case '.lha':
        return 'application/octet-stream';
      case '.lzh':
        return 'application/octet-stream';
      case '.m3u':
        return 'audio/x-mpegurl';
      case '.m4a':
        return 'audio/mp4a-latm';
      case '.m4p':
        return 'audio/mp4a-latm';
      case '.m4u':
        return 'video/vnd.mpegurl';
      case '.m4v':
        return 'video/x-m4v';
      case '.mac':
        return 'image/x-macpaint';
      case '.man':
        return 'application/x-troff-man';
      case '.mathml':
        return 'application/mathml+xml';
      case '.me':
        return 'application/x-troff-me';
      case '.mesh':
        return 'model/mesh';
      case '.mid':
        return 'audio/midi';
      case '.midi':
        return 'audio/midi';
      case '.mif':
        return 'application/vnd.mif';
      case '.mov':
        return 'video/quicktime';
      case '.movie':
        return 'video/x-sgi-movie';
      case '.mp2':
        return 'audio/mpeg';
      case '.mp3':
        return 'audio/mpeg';
      case '.mp4':
        return 'video/mp4';
      case '.mpe':
        return 'video/mpeg';
      case '.mpeg':
        return 'video/mpeg';
      case '.mpg':
        return 'video/mpeg';
      case '.mpga':
        return 'audio/mpeg';
      case '.ms':
        return 'application/x-troff-ms';
      case '.msh':
        return 'model/mesh';
      case '.mxu':
        return 'video/vnd.mpegurl';
      case '.nc':
        return 'application/x-netcdf';
      case '.oda':
        return 'application/oda';
      case '.ogg':
        return 'application/ogg';
      case '.ogv':
        return 'video/ogv';
      case '.pbm':
        return 'image/x-portable-bitmap';
      case '.pct':
        return 'image/pict';
      case '.pdb':
        return 'chemical/x-pdb';
      case '.pdf':
        return 'application/pdf';
      case '.pgm':
        return 'image/x-portable-graymap';
      case '.pgn':
        return 'application/x-chess-pgn';
      case '.pic':
        return 'image/pict';
      case '.pict':
        return 'image/pict';
      case '.pnm':
        return 'image/x-portable-anymap';
      case '.pnt':
        return 'image/x-macpaint';
      case '.pntg':
        return 'image/x-macpaint';
      case '.ppm':
        return 'image/x-portable-pixmap';
      case '.ppt':
        return 'application/vnd.ms-powerpoint';
      case '.ps':
        return 'application/postscript';
      case '.qt':
        return 'video/quicktime';
      case '.qti':
        return 'image/x-quicktime';
      case '.qtif':
        return 'image/x-quicktime';
      case '.ra':
        return 'audio/x-pn-realaudio';
      case '.ram':
        return 'audio/x-pn-realaudio';
      case '.ras':
        return 'image/x-cmu-raster';
      case '.rdf':
        return 'application/rdf+xml';
      case '.rgb':
        return 'image/x-rgb';
      case '.rm':
        return 'application/vnd.rn-realmedia';
      case '.roff':
        return 'application/x-troff';
      case '.rtf':
        return 'text/rtf';
      case '.rtx':
        return 'text/richtext';
      case '.sgm':
        return 'text/sgml';
      case '.sgml':
        return 'text/sgml';
      case '.sh':
        return 'application/x-sh';
      case '.shar':
        return 'application/x-shar';
      case '.silo':
        return 'model/mesh';
      case '.sit':
        return 'application/x-stuffit';
      case '.skd':
        return 'application/x-koan';
      case '.skm':
        return 'application/x-koan';
      case '.skp':
        return 'application/x-koan';
      case '.skt':
        return 'application/x-koan';
      case '.smi':
        return 'application/smil';
      case '.smil':
        return 'application/smil';
      case '.snd':
        return 'audio/basic';
      case '.so':
        return 'application/octet-stream';
      case '.spl':
        return 'application/x-futuresplash';
      case '.src':
        return 'application/x-wais-source';
      case '.sv4cpio':
        return 'application/x-sv4cpio';
      case '.sv4crc':
        return 'application/x-sv4crc';
      case '.svg':
        return 'image/svg+xml';
      case '.swf':
        return 'application/x-shockwave-flash';
      case '.t':
        return 'application/x-troff';
      case '.tar':
        return 'application/x-tar';
      case '.tcl':
        return 'application/x-tcl';
      case '.tex':
        return 'application/x-tex';
      case '.texi':
        return 'application/x-texinfo';
      case '.texinfo':
        return 'application/x-texinfo';
      case '.tif':
        return 'image/tiff';
      case '.tiff':
        return 'image/tiff';
      case '.tr':
        return 'application/x-troff';
      case '.tsv':
        return 'text/tab-separated-values';
      case '.txt':
        return 'text/plain';
      case '.ustar':
        return 'application/x-ustar';
      case '.vcd':
        return 'application/x-cdlink';
      case '.vrml':
        return 'model/vrml';
      case '.vxml':
        return 'application/voicexml+xml';
      case '.wav':
        return 'audio/x-wav';
      case '.wbmp':
        return 'image/vnd.wap.wbmp';
      case '.wbxml':
        return 'application/vnd.wap.wbxml';
      case '.webm':
        return 'video/webm';
      case '.wml':
        return 'text/vnd.wap.wml';
      case '.wmlc':
        return 'application/vnd.wap.wmlc';
      case '.wmls':
        return 'text/vnd.wap.wmlscript';
      case '.wmlsc':
        return 'application/vnd.wap.wmlscriptc';
      case '.wmv':
        return 'video/x-ms-wmv';
      case '.wrl':
        return 'model/vrml';
      case '.xbm':
        return 'image/x-xbitmap';
      case '.xht':
        return 'application/xhtml+xml';
      case '.xhtml':
        return 'application/xhtml+xml';
      case '.xls':
        return 'application/vnd.ms-excel';
      case '.xml':
        return 'application/xml';
      case '.xpm':
        return 'image/x-xpixmap';
      case '.xsl':
        return 'application/xml';
      case '.xslt':
        return 'application/xslt+xml';
      case '.xul':
        return 'application/vnd.mozilla.xul+xml';
      case '.xwd':
        return 'image/x-xwindowdump';
      case '.xyz':
        return 'chemical/x-xyz';
      case '.zip':
        return 'application/zip';
      default:
        return 'application/octet-stream';
    }
  };
};
