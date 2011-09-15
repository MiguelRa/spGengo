/**
 * Copyright (c) 2011 Miguel A. Ramos 
 * (mramosr85@gmail.com)
 *
 * This file is part of spGengo SharePoint Plugin.
 *
 * spGengo SharePoint Plugin is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * spGengo SharePoint Plugin is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with spGengo SharePoint Plugin.  If not, see <http://www.gnu.org/licenses/>.
 */

using System;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Net;
using System.Xml;
using System.IO;
using System.Threading;
using System.Text;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string response = string.Empty;
        bool debug = false;
        
        try
        {
            // load global settings
            debug = Convert.ToBoolean(ConfigurationManager.AppSettings["spGengo_debug"]);
            string apiUrl = ConfigurationManager.AppSettings["spGengo_apiUrl"];
            string responseFormat = ConfigurationManager.AppSettings["spGengo_responseFormat"];
            bool useProxy = Convert.ToBoolean(ConfigurationManager.AppSettings["spGengo_useProxy"]);
            string proxyHost = ConfigurationManager.AppSettings["spGengo_proxyHost"];
            int proxyPort = int.Parse(ConfigurationManager.AppSettings["spGengo_proxyPort"]);
            string proxyUsername = ConfigurationManager.AppSettings["spGengo_proxyUsername"];
            string proxyPassword = ConfigurationManager.AppSettings["spGengo_proxyPassword"];

            // retrieve params from request
            string publicKey = Request.Params["publicKey"];
            string privateKey = Request.Params["privateKey"];
            string type = Request.Params["type"];
            string slug = Request.Params["slug"];
            string body_src = Request.Params["body_src"];
            string lc_src = Request.Params["lc_src"];
            string lc_tgt = Request.Params["lc_tgt"];
            string tier = Request.Params["tier"];
            string auto_approve = Request.Params["auto_approve"];
            string custom_data = Request.Params["custom_data"];
            string comment = Request.Params["comment"];
            
            // initialize api client
            WebProxy proxy = null;
            if (useProxy)
            {
                proxy = new WebProxy(proxyHost, proxyPort);
                proxy.Credentials = new NetworkCredential(proxyUsername, proxyPassword);
            }
            myGengoClient.myGengoClient.initialize(apiUrl, publicKey, privateKey, responseFormat, proxy);

            // invoke api
            response = myGengoClient.myGengoClient.Translate_JobsRaw(type,
                slug,
                body_src,
                lc_src,
                lc_tgt,
                tier,
                auto_approve,
                custom_data,
                comment);           

            // return response
            Response.Write(response);
        }
        catch (Exception ex)
        {
            // return server error
            string debugInfo = string.Empty;
            if (debug)
            {
                debugInfo = "Message: " + ex.Message + "<br />" + "Type: " + ex.GetType().Name + "<br />" + "Source: " + ex.Source;
            }
            response = "{\"opstat\" : \"serverError\", \"response\" : \"" + debugInfo + "\"}";  

            // unescape response
            response = response.Replace("\\", "");
            response = response.Replace("'", "");

            // return
            Response.Write(response);

        }
        
    }

}
