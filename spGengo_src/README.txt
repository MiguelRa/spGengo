spGengo SharePoint Plugin (source code)

This package contains all the source code of spGengo SharePoint Plugin.
It includes the following subpackages:

 - spGengo_MyGengoClient: a client library for accessing the myGengo 
Translate API. The library contains third-party code from myGengo.com.
Such code is licensed under the new BSD license
(http://mygengo.com/services/api/dev-docs/mygengo-code-license).

 - spGengo_Setup: Setup project that generates a spGengo installer.

 - spGengo_WebConfig: xml snnipet that must be added to the web.config file
 of site collections running the spGengo feature.

 - spGengo_WebPart: code of spGengo web part. To open this project you must first install WSS extensions for Visual Studio 2008.

 - spGengo_WebPart_resources: server resources needed by spGengo web part. 
These resources must be copied to global wpresources folder. The package 
contains the third-party javascript framework, Extjs, licensed under GPL
if used in open-source projects (http://extjs.com/license).