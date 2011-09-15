spGengo SharePoint Plugin (binary)

This package contains all the required components for deploying spGengo
SharePoint Plugin.
It includes the following subpackages:

 - spGengo_MyGengoClient: three assemblies the plugin needs. 
They are MiguelRa.MyGengoClient, MiguelRa.Util, Newtonsoft.Json.Net20.

 - spGengo_WebConfig: xml snnipet that must be added to the web.config file
 of site collections running the spGengo web part.

 - spGengo_WebPart: contains the SharePoint plugin and batch files to 
install and uninstall it. 

 - spGengo_WebPart_resources: server resources needed by spGengo web part. 
These resources must be copied to global wpresources folder. The package 
contains the third-party javascript framework, Extjs, licensed under GPL
if used in open-source projects (http://extjs.com/license).